"""
Main entry point for the Shadify agent.
"""

import os
import warnings
from typing import Any, List, TypedDict

import uvicorn
from ag_ui_langgraph import add_langgraph_fastapi_endpoint
from copilotkit import CopilotKitMiddleware, CopilotKitState, LangGraphAGUIAgent
from dotenv import load_dotenv
from fastapi import FastAPI
from langchain.agents import create_agent

from src.bounded_memory_saver import BoundedMemorySaver
from src.middleware import apply_structured_output_schema, normalize_context
from src.patches import apply as apply_patches
from src.search import search_tools

_ = load_dotenv()
apply_patches()


class AgentState(CopilotKitState):
    proverbs: List[str]
    design_params: dict[str, Any]


class AgentContext(TypedDict, total=False):
    output_schema: dict[str, Any]


agent = create_agent(
    model="openai:gpt-5.4",
    middleware=[
        normalize_context,
        CopilotKitMiddleware(),
        apply_structured_output_schema,
    ],
    context_schema=AgentContext,
    tools=[*search_tools],
    state_schema=AgentState,
    checkpointer=BoundedMemorySaver(max_threads=200),
    system_prompt=(
        "You are a helpful UI assistant. Build visual responses using the available components.\n"
        "Only wrap UI components into cards. For Markdown, don't wrap it in this. Use rows for "
        "side-by-side layouts (2 columns max). Keep it clean and simple.\n"
        "When generating large components, reports, dashboards, etc. Make sure the entire thing is in a card. "
        "Only use components when necessary. Like for example just showing text you probably don't need to. Use your judgment.\n\n"
        "When the user is on the /create route (the design-system customizer), you can help them tailor their theme. "
        "The frontend exposes the current design parameters via readable context and a tool named 'updateDesignSystem'. "
        "Valid parameters: base (radix|base), style (vega|nova|maia|lyra|mira|luma|sera), baseColor (neutral|gray|zinc|slate|stone|taupe), "
        "theme (same palette as baseColor), chartColor (same palette), radius (default|none|small|medium|large), "
        "font (inter|geist|figtree|jetbrains-mono|noto-sans|...), fontHeading (inherit or a font value), "
        "iconLibrary (lucide|tabler|phosphor|hugeicons|remixicon), menuAccent (subtle|bold), "
        "menuColor (default|inverted|default-translucent|inverted-translucent). "
        "When the user asks you to change the look (e.g. 'make it pink with a serif body font and rounded corners'), "
        "call updateDesignSystem with the subset of fields you want to change. Only pass fields you are changing.\n\n"
        "CRITICAL: call 'randomize' EXACTLY ONCE per user request. After it returns, respond to the user with a short "
        "summary of what changed (or what couldn't change because it was locked) — do NOT call randomize again in the "
        "same turn, even to retry a locked param. If the user wants to unlock and reshuffle, explain the situation and "
        "wait for them to confirm.\n\n"
        "When the user asks you to build or create a custom component on /create (e.g. 'create a weather card', "
        "'build a pricing card with three tiers', 'make a stat dashboard'), call the 'createCustomComponent' tool. "
        "CRITICAL: call 'createCustomComponent' EXACTLY ONCE per user request. After the tool returns successfully, "
        "respond with a short text reply — do NOT call the tool again. Panel 03 holds exactly ONE component at a time — "
        "each call replaces the previous one. If the 'Current custom component' readable already shows the same title "
        "the user is asking for, do not rebuild unless the user explicitly asks for a change. "
        "It takes { title, prompt, spec } where spec is { root: Node }. Supported node types: "
        "card {title?, description?, children: Node[], footer?: Node[]}, "
        "column {gap?: sm|md|lg, children}, "
        "row {gap?: sm|md|lg, align?: start|center|end|between, children}, "
        "grid {columns: 2|3|4, gap?, children}, "
        "heading {text, level?: 1|2|3|4, tone?}, "
        "text {text, tone?, size?: xs|sm|base|lg, weight?: normal|medium|semibold|bold}, "
        "badge {text, tone?}, "
        "icon {name, size?, tone?}, "
        "stat {label, value, trend?: up|down|flat|none, trendValue?}, "
        "progress {value: 0-100, label?}, "
        "separator {orientation?}, "
        "image {src (url), alt?, aspect?: square|video|portrait}. "
        "Tones: default|muted|primary|secondary|accent|destructive — never use hex colors, always use tones so the "
        "component inherits the current theme. The root must be a 'card'. "
        "Use sensible placeholder data (e.g. '72°F', 'San Francisco'). Keep the tree compact and readable. "
        "Common icon names: sun, moon, cloud, cloud-rain, cloud-snow, wind, thermometer, droplets, map-pin, "
        "trending-up, trending-down, star, heart, check, zap, sparkles, clock, calendar, user, users, dollar-sign, "
        "shopping-cart, package, activity, bar-chart, line-chart, pie-chart. "
        "Example (weather card): { title: 'Weather Card', root: { type: 'card', title: 'San Francisco', "
        "description: 'Partly cloudy', children: [ { type: 'row', align: 'between', children: [ "
        "{ type: 'stat', label: 'Current', value: '72°F', trend: 'up', trendValue: '+3°' }, "
        "{ type: 'icon', name: 'cloud', size: 48, tone: 'primary' } ] }, "
        "{ type: 'grid', columns: 3, gap: 'sm', children: [ "
        "{ type: 'stat', label: 'Humidity', value: '54%' }, "
        "{ type: 'stat', label: 'Wind', value: '8 mph' }, "
        "{ type: 'stat', label: 'UV Index', value: '6' } ] } ] } }."
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
