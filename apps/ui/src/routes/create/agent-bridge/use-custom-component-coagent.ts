import * as React from "react"
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core"

import { useCustomComponent } from "@/routes/create/hooks/use-custom-component"
import { parseCustomComponentSpec } from "@/routes/create/lib/custom-component-spec"
import { useDesignSystemSearchParams } from "@/routes/create/lib/search-params"

function hashSpec(value: unknown): string {
  try {
    return JSON.stringify(value)
  } catch {
    return String(value)
  }
}

export function useCustomComponentCoAgent() {
  const { spec, version, beginBuild, setSpec } = useCustomComponent()
  const [, setParams] = useDesignSystemSearchParams()
  const lastHashRef = React.useRef<string>("")

  useCopilotReadable({
    description:
      "Current custom component in preview panel 03. If 'title' is present, panel 03 already shows a built component — do NOT call createCustomComponent again for the same request. Only rebuild when the user asks for a different component or asks to change this one.",
    value: spec
      ? { title: spec.title, version, present: true }
      : { present: false },
  })

  useCopilotAction({
    name: "createCustomComponent",
    description:
      "Build a custom component (e.g. weather card, pricing card, stat tile) and show it in preview panel 03. Pass a structured component tree using the allowlisted node types. The component inherits the current theme automatically — use `tone` (primary/secondary/accent/muted/destructive) instead of hex colors. Call this ONCE per user request; after success, respond with text — do not retry.",
    parameters: [
      {
        name: "title",
        type: "string",
        required: true,
        description: "Short label for this component (e.g. 'Weather Card').",
      },
      {
        name: "prompt",
        type: "string",
        required: false,
        description: "The user's original request, for context.",
      },
      {
        name: "spec",
        type: "object",
        required: true,
        description:
          "Component tree. Shape: { title: string, root: Node }. Node types: card {title?, description?, children, footer?}, column {children, gap?}, row {children, gap?, align?}, grid {columns: 2|3|4, children, gap?}, heading {text, level?: 1-4, tone?}, text {text, tone?, size?, weight?}, badge {text, tone?}, icon {name, size?, tone?}, stat {label, value, trend?: up|down|flat|none, trendValue?}, progress {value: 0-100, label?}, separator {orientation?}, image {src, alt?, aspect?}. Tone values: default|muted|primary|secondary|accent|destructive. Always pass a root node wrapped in a 'card'.",
      },
    ],
    handler: async (args) => {
      const { title, prompt, spec: specArg } = args as {
        title: string
        prompt?: string
        spec: unknown
      }

      const candidate =
        specArg && typeof specArg === "object" && "root" in (specArg as object)
          ? { title, ...(specArg as object) }
          : { title, root: specArg }

      const callHash = hashSpec({ title, spec: candidate })
      if (callHash === lastHashRef.current) {
        return `Panel 03 already shows "${title}" (unchanged). No update needed.`
      }

      const parsed = parseCustomComponentSpec(candidate)
      if (!parsed.ok) return parsed.error

      lastHashRef.current = callHash
      // Clear the previous component first so panel 03 shows a building state
      // before the new tree mounts — one component at a time.
      beginBuild(title)
      setParams({ item: "custom" })
      await new Promise((resolve) => setTimeout(resolve, 80))
      setSpec(parsed.value, prompt)
      return `Built "${title}" in panel 03. Stop. Respond to the user with text; do not call createCustomComponent again.`
    },
  })
}
