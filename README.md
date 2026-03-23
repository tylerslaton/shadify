# Shadify

Describe a UI in plain English. Get a live, interactive [shadcn/ui](https://ui.shadcn.com/) page back. Export it as clean React code.

https://github.com/user-attachments/assets/b14bebd6-527a-48bd-94f5-d27fea8808aa

## Built With

- **[shadcn/ui](https://ui.shadcn.com/)** — The AI composes from real shadcn components (cards, charts, forms, menus, layouts). Every generated page is accessible, polished, and uses the same components you'd `npx shadcn add` into your own project.
- **[CopilotKit](https://www.copilotkit.ai/)** — Streams structured UI from the agent to the browser in real time. Passes the full component schema as agent context so the model knows exactly what it can build.
- **[LangGraph](https://www.langchain.com/langgraph)** — Powers the agent backend. Handles reasoning, tool use (web search, site extraction via Tavily), and conversation memory across turns.
- **[Render](https://render.com/)** — All three services deploy from a single `render.yaml` Blueprint. Render wires service URLs together automatically via `fromService` references — push to `main` and you're live.

## Architecture

Three services in a pnpm monorepo:

```
UI (React + Vite)  →  Runtime (Hono + CopilotKit)  →  Agent (FastAPI + LangGraph)
```

| Service | Path | What it does |
|---|---|---|
| `ui` | `apps/ui` | Chat interface, component rendering, code export |
| `runtime` | `apps/runtime` | CopilotKit runtime, routes messages to the agent |
| `agent` | `apps/agent` | LangGraph agent with search tools, returns structured UI |

## Quick Start

```bash
pnpm install
```

Add your keys:

```bash
# apps/runtime/.env
OPENAI_API_KEY=sk-...

# apps/agent/.env
OPENAI_API_KEY=sk-...
TAVILY_API_KEY=tvly-...
```

```bash
pnpm dev
```

UI runs at [localhost:5173](http://localhost:5173). Runtime on 4000, agent on 8123.

## Deploy

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

Or connect your repo — `render.yaml` defines everything.

## License

MIT
