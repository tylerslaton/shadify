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
from src.middleware import apply_structured_output_schema, normalize_context
from src.weather import get_weather
from langgraph.checkpoint.memory import MemorySaver

_ = load_dotenv()

class AgentState(CopilotKitState):
    proverbs: List[str]

class AgentContext(TypedDict, total=False):
    output_schema: dict[str, Any]

agent = create_agent(
    model="openai:gpt-5.2",
    tools=[get_weather],
    middleware=[normalize_context, CopilotKitMiddleware(), apply_structured_output_schema],
    context_schema=AgentContext,
    state_schema=AgentState,
    checkpointer = MemorySaver(),
    system_prompt=(
        "You are a weather reporter. The user will ask questions about the weather.\n"
        "Use the get_weather tool for specific locations, then create a full report.\n"
        "Call the tool with a specific place in the format: City, State, Country.\n"
        "If the user gives a broad region (e.g., 'North Alabama') choose 2-4\n"
        "representative cities in that region and fetch each via get_weather.\n"
        "Present a multi-city report."
    ),
)

graph = agent

app = FastAPI()

add_langgraph_fastapi_endpoint(
    app=app,
    agent=LangGraphAGUIAgent(
        name="sample_agent",
        description="A weather reporter agent that fetches real-time weather data for locations.",
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
