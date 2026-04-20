import { useDefaultRenderTool } from "@copilotkit/react-core/v2"

import { ToolCallCard } from "@/routes/create/agent-bridge/tool-call-card"

// Registers a wildcard renderer so every tool call surfaced by the agent
// shows the animated status card instead of disappearing silently.
export function useToolRendererCoAgent() {
  useDefaultRenderTool({
    render: ({ name, parameters, status, result }) => (
      <ToolCallCard
        name={name}
        parameters={parameters}
        status={status}
        result={result}
      />
    ),
  })
}
