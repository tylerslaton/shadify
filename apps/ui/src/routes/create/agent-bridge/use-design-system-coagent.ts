import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core"

import { ENUMS, validateEnum } from "@/routes/create/agent-bridge/validation"
import { useHistoryCoAgent } from "@/routes/create/agent-bridge/use-history-coagent"
import { useLocksCoAgent } from "@/routes/create/agent-bridge/use-locks-coagent"
import { usePresetCoAgent } from "@/routes/create/agent-bridge/use-preset-coagent"
import { usePreviewCoAgent } from "@/routes/create/agent-bridge/use-preview-coagent"
import { useRandomizeCoAgent } from "@/routes/create/agent-bridge/use-randomize-coagent"
import { useResetCoAgent } from "@/routes/create/agent-bridge/use-reset-coagent"
import { useThemeCoAgent } from "@/routes/create/agent-bridge/use-theme-coagent"
import { useToolRendererCoAgent } from "@/routes/create/agent-bridge/use-tool-renderer-coagent"
import { useDesignSystemSearchParams } from "@/routes/create/lib/search-params"

const DESIGN_SYSTEM_FIELDS = [
  "base",
  "style",
  "baseColor",
  "theme",
  "chartColor",
  "radius",
  "font",
  "fontHeading",
  "iconLibrary",
  "menuAccent",
  "menuColor",
  "item",
] as const

// Exposes the /create page's design-system state to the CopilotKit agent and
// registers actions the agent can call to drive the customizer. Mount this
// hook anywhere under the /create tree (e.g. inside CreateRoute).
export function useDesignSystemCoAgent() {
  const [params, setParams] = useDesignSystemSearchParams()

  useCopilotReadable({
    description:
      "Current design system parameters on the /create page. Keys: base, style, baseColor, theme, chartColor, radius, font, fontHeading, iconLibrary, menuAccent, menuColor, item.",
    value: params,
  })

  useCopilotReadable({
    description:
      "Allowed values for each design-system parameter on the /create customizer. Always pick values from these enums.",
    value: ENUMS,
  })

  useCopilotAction({
    name: "updateDesignSystem",
    description:
      "Update one or more design system parameters on the /create customizer. Only include fields you want to change. Values must come from the enums readable.",
    parameters: [
      { name: "base", type: "string", required: false, description: "Component library." },
      { name: "style", type: "string", required: false, description: "Style name." },
      { name: "baseColor", type: "string", required: false, description: "Base neutral color." },
      { name: "theme", type: "string", required: false, description: "Accent theme palette." },
      { name: "chartColor", type: "string", required: false, description: "Chart color palette." },
      { name: "radius", type: "string", required: false, description: "Corner radius." },
      { name: "font", type: "string", required: false, description: "Body font id." },
      { name: "fontHeading", type: "string", required: false, description: "Heading font id, or 'inherit'." },
      { name: "iconLibrary", type: "string", required: false, description: "Icon library id." },
      { name: "menuAccent", type: "string", required: false, description: "Menu accent: subtle | bold." },
      { name: "menuColor", type: "string", required: false, description: "Menu color variant." },
      { name: "item", type: "string", required: false, description: "Preview item id (free-form)." },
    ],
    handler: (args) => {
      const clean: Record<string, string> = {}
      for (const field of DESIGN_SYSTEM_FIELDS) {
        const value = (args as Record<string, unknown>)[field]
        if (typeof value !== "string" || value === "") continue
        if (field === "item") {
          clean[field] = value
          continue
        }
        const err = validateEnum(field, value)
        if (err) return err
        clean[field] = value
      }
      if (Object.keys(clean).length === 0) return "No changes proposed."
      setParams(clean)
      return `Applied: ${JSON.stringify(clean)}`
    },
  })

  useLocksCoAgent()
  useHistoryCoAgent()
  useRandomizeCoAgent()
  useResetCoAgent()
  useThemeCoAgent()
  usePresetCoAgent()
  usePreviewCoAgent()
  useToolRendererCoAgent()
}
