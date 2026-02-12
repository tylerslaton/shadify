# Hashbrown + CopilotKit Starter Template

This repo is a starter for exploring how to stream structured model output into React UIs using Hashbrown, then wire that flow through CopilotKit + a LangGraph agent.

You can use it as a playground for:

- Streaming JSON parsing
- Streaming markdown with Magic Text
- Defining UI kits the model can render
- Exposing UI kit schemas to CopilotKit/agent runtime

## Quick Start

### Prerequisites

- Node.js 20+
- npm (or pnpm)
- Python 3.11+ (for the LangGraph agent)

### Setup

Set your OpenAI key for the agent in `agent/.env`:

```bash
OPENAI_API_KEY=...
```

Install dependencies:

```bash
npm install
```

Run UI + agent together:

```bash
npm run dev
```

App URL: `http://localhost:3000`

## What To Explore

### JSON Parser

The parser demos show chunk-by-chunk JSON parsing with live resolved values.

- Demo page: `src/app/parser/page.tsx`
- AST visualization: `src/app/ast/page.tsx`
- Chat renderer parser usage: `src/components/custom-message-renderer.tsx`
  - Uses `useJsonParser(message.content ?? "", kit.schema)` to parse streaming assistant output.

Routes:

- `/parser`
- `/ast`

### Magic Text

Magic Text renders streamed markdown while text is still arriving.

- Demo page: `src/app/magic-text/page.tsx`
  - Uses `<MagicTextRenderer>{markdownSlice}</MagicTextRenderer>`
- Also visible in composed UI output styling in:
  - `src/app/ui-renderer/page.tsx`
  - `src/components/custom-message-renderer.tsx`

Route:

- `/magic-text`

### UI Kits

The UI kit defines what components the model is allowed to emit.

- UI kit definition: `src/components/chat/chat-kit.tsx`
  - `useUiKit(...)`
  - `exposeMarkdown()`
  - `exposeComponent(WeatherCard, { ...props })`
- Weather component used by the kit: `src/components/weather.tsx`

Route to test parsed JSON -> rendered components:

- `/ui-renderer`

### Exposing UI Kits To CopilotKit

The flow is:

1. Build schema from the Hashbrown UI kit in the frontend.
2. Pass schema via CopilotKit runtime context.
3. Read schema in the agent and enforce structured output.

Code references:

- Frontend context wiring: `src/app/page.tsx`
  - `const chatKit = useChatKit()`
  - `useAgentContext({ description: "output_schema", value: s.toJsonSchema(chatKit.schema) })`
- CopilotKit runtime endpoint: `src/app/api/copilotkit/route.ts`
  - Registers `sample_agent` with `LangGraphAgent`.
- Agent schema consumption: `agent/main.py`
  - `apply_structured_output_schema(...)`
  - Applies `ProviderStrategy(schema=schema, strict=True)` when `output_schema` is present.

Route:

- `/` (chat experience)

## Project Map

- `src/app/page.tsx`: Main chat page (CopilotKit + custom renderer)
- `src/components/custom-message-renderer.tsx`: Streaming parse + kit rendering
- `src/components/chat/chat-kit.tsx`: Hashbrown UI kit and exposed components
- `src/app/parser/page.tsx`: JSON parser playground
- `src/app/ast/page.tsx`: Parser AST playground
- `src/app/magic-text/page.tsx`: Magic Text playground
- `src/app/ui-renderer/page.tsx`: JSON-to-UI renderer playground
- `src/app/api/copilotkit/route.ts`: CopilotKit runtime API route
- `agent/main.py`: LangGraph agent, tools, and structured output middleware

## Troubleshooting

- If the agent does not start, run `npm run install:agent` and confirm Python tooling is available.
- If API calls fail, verify `agent/.env` contains `OPENAI_API_KEY`.
- If chat cannot reach the agent, confirm LangGraph is running on `http://localhost:8123` (default in `src/app/api/copilotkit/route.ts`).
