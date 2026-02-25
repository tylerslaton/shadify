"""
This is the main entry point for the agent.
It defines the workflow graph, state, tools, nodes and edges.
"""

import os
import warnings
from typing import Any, List, TypedDict

from dotenv import load_dotenv
from fastapi import FastAPI
import uvicorn
from langchain.agents import create_agent
from langchain.agents.middleware import before_agent
from copilotkit import CopilotKitMiddleware, CopilotKitState, LangGraphAGUIAgent
from ag_ui_langgraph import add_langgraph_fastapi_endpoint
from ag_ui_langgraph.agent import LangGraphAgent
from src.middleware import apply_structured_output_schema, normalize_context
from langgraph.checkpoint.memory import MemorySaver

from src.search import search_tools

_ = load_dotenv()

# Patch: when ag_ui_langgraph falsely triggers the regenerate path (due to tool
# messages inflating checkpoint count), get_checkpoint_before_message raises
# "Message ID not found in history". Return None instead so prepare_stream can
# fall through to the normal streaming path.
_original_prepare_stream = LangGraphAgent.prepare_stream

async def _patched_prepare_stream(self, input, agent_state, config):
    result = await _original_prepare_stream(self, input=input, agent_state=agent_state, config=config)
    if result is not None:
        return result
    # prepare_regenerate_stream returned None — fall through to normal path.
    # Re-run the original but with an empty checkpoint so it skips the regenerate check.
    agent_state = agent_state._replace(values={**agent_state.values, "messages": []})
    return await _original_prepare_stream(self, input=input, agent_state=agent_state, config=config)

_original_get_checkpoint = LangGraphAgent.get_checkpoint_before_message

async def _patched_get_checkpoint(self, message_id, thread_id):
    try:
        return await _original_get_checkpoint(self, message_id, thread_id)
    except ValueError:
        return None

# Also patch set_message_in_progress: the library sets messages_in_process[id] = None
# after tool calls end, then .get(id, {}) returns None (key exists), and {**None} crashes.
_original_set_message_in_progress = LangGraphAgent.set_message_in_progress

def _patched_set_message_in_progress(self, run_id, data):
    current = self.messages_in_process.get(run_id) or {}
    self.messages_in_process[run_id] = {**current, **data}

LangGraphAgent.prepare_stream = _patched_prepare_stream
LangGraphAgent.get_checkpoint_before_message = _patched_get_checkpoint
LangGraphAgent.set_message_in_progress = _patched_set_message_in_progress


class AgentState(CopilotKitState):
    proverbs: List[str]

class AgentContext(TypedDict, total=False):
    output_schema: dict[str, Any]

agent = create_agent(
    model="openai:gpt-5.2",
    middleware=[normalize_context, CopilotKitMiddleware(), apply_structured_output_schema],
    context_schema=AgentContext,
    tools=[*search_tools],
    state_schema=AgentState,
    checkpointer=MemorySaver(),
    system_prompt=(
        "You are a helpful UI assistant. Build visual responses using the available components.\n"
        "Only wrap UI components into cards. For Markdown, don't wrap it in this. Use rows for"
        "side-by-side layouts (3 columns max). Keep it clean and simple.\n"
        "When generating large components, reports, dashboards, etc. Make sure the entire thing is in a card."
        "Only use components, when necessary. Like for example just showing text you probably need to. Use your judgment."
    ),
)

graph = agent

app = FastAPI()

add_langgraph_fastapi_endpoint(
    app=app,
    agent=LangGraphAGUIAgent(
        name="sample_agent",
        description="A UI assistant that builds rich visual responses using layout, chart, menubar, and card components.",
        graph=graph,
    ),
    path="/",
)

def main():
    """Run the uvicorn server."""
    port = int(os.getenv("PORT", "8123"))
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=True,
    )


warnings.filterwarnings("ignore", category=UserWarning, module="pydantic")
if __name__ == "__main__":
    main()
