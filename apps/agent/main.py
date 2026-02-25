"""
This is the main entry point for the agent.
It defines the workflow graph, state, tools, nodes and edges.
"""

from typing import Any, List, TypedDict

from langchain.agents import create_agent
from copilotkit import CopilotKitMiddleware, CopilotKitState
from src.middleware import apply_structured_output_schema
from src.weather import get_weather

class AgentState(CopilotKitState):
    proverbs: List[str]

class AgentContext(TypedDict, total=False):
    output_schema: dict[str, Any]

agent = create_agent(
    model="openai:gpt-5.2",
    tools=[get_weather],
    middleware=[CopilotKitMiddleware(), apply_structured_output_schema],
    context_schema=AgentContext,
    state_schema=AgentState,
    system_prompt=(
        "You are a weather reporter. The user will ask questions about the weather.\n"
        "Use the get_weather tool for specific locations, then create a full report.\n"
        "Call the tool with a specific place in the format: City, State, Country.\n"
        "If the user gives a broad region (e.g., 'North Alabama'), choose 2-4\n"
        "representative cities in that region and fetch each via get_weather.\n"
        "Present a multi-city report."
    ),
)

graph = agent
