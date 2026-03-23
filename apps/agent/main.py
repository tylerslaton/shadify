"""
Main entry point for the Shadify agent.
"""

import os
import warnings
from typing import Any, List, TypedDict

from dotenv import load_dotenv
from fastapi import FastAPI
import uvicorn
from langchain.agents import create_agent
from copilotkit import CopilotKitMiddleware, CopilotKitState, LangGraphAGUIAgent
from ag_ui_langgraph import add_langgraph_fastapi_endpoint
from src.middleware import apply_structured_output_schema, normalize_context
from src.patches import apply as apply_patches
from langgraph.checkpoint.memory import MemorySaver

from src.search import search_tools

_ = load_dotenv()
apply_patches()


class BoundedMemorySaver(MemorySaver):
    """MemorySaver that evicts oldest threads when exceeding max_threads."""

    def __init__(self, max_threads: int = 200):
        super().__init__()
        self.max_threads = max_threads

    def put(self, config, checkpoint, metadata, new_versions):
        result = super().put(config, checkpoint, metadata, new_versions)
        if len(self.storage) > self.max_threads:
            oldest_keys = sorted(self.storage.keys())[
                : len(self.storage) - self.max_threads
            ]
            for key in oldest_keys:
                del self.storage[key]
        return result


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
    checkpointer=BoundedMemorySaver(max_threads=200),
    system_prompt=(
        "You are a helpful UI assistant. Build visual responses using the available components.\n"
        "Only wrap UI components into cards. For Markdown, don't wrap it in this. Use rows for "
        "side-by-side layouts (2 columns max). Keep it clean and simple.\n"
        "When generating large components, reports, dashboards, etc. Make sure the entire thing is in a card. "
        "Only use components when necessary. Like for example just showing text you probably don't need to. Use your judgment."
    ),
)

app = FastAPI()

add_langgraph_fastapi_endpoint(
    app=app,
    agent=LangGraphAGUIAgent(
        name="sample_agent",
        description="A UI assistant that builds rich visual responses using layout, chart, menubar, and card components.",
        graph=agent,
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
