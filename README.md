# CopilotKit - Streaming JSON Parser + UI Renderer

I have been working on a new streaming JSON parser that manages its state within React. It preserves object identities while parsing chunks, allowing for fine-grained reactivity and improved UI performance.

This repository demos using this new streaming JSON parser along with a JSON UI renderer to let an LLM build a dynamic user interface from a fixed set of React components. It uses CopilotKit to build a user interface on top of a LangGraph agent.

## Getting Started

### Prerequisites

- Node.js
- pnpm
- Python 3 (for the LangGraph agent)

### Setup

Create a `.env` file in `./agent` with an OpenAI API key:

```sh
OPENAI_API_KEY=...
```

Install dependencies:

```sh
pnpm install
```

Start the dev server:

```sh
pnpm dev
```

## Relevant Code Paths

- `./src/components/chat/chat-kit.tsx` -> Builds a UI kit of React components that the LLM can use when generating a response.

- `./src/app/page.tsx` -> Derives JSON schema from the UI kit and forwards it to the agent using `useCopilotReadable`

- `./agent/main.py` -> Reads the schema from `useCopilotReadable` and applies it as a structured output.

- `./src/components/custom-message-renderer.tsx` -> Parses the streaming JSON and renders it into a user interface

## Troubleshooting

- If the agent fails to start, confirm your Python environment can install the agent dependencies in `./agent`.
- If you see missing API key errors, double-check that `OPENAI_API_KEY` is present in `./agent/.env`.
