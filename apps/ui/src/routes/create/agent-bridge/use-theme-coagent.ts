import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core"
import { useTheme } from "next-themes"

import {
  COLOR_MODES,
  validateEnum,
  type ColorMode,
} from "@/routes/create/agent-bridge/validation"

// Uses next-themes directly rather than calling useThemeToggle(), which also
// registers the `D` keyboard shortcut — we don't want to duplicate that.
export function useThemeCoAgent() {
  const { theme, resolvedTheme, setTheme } = useTheme()

  useCopilotReadable({
    description:
      "Current color mode of the /create customizer. `preference` is the user's explicit setting (may be 'system'); `resolved` is the effective light/dark value.",
    value: {
      preference: theme ?? "system",
      resolved: resolvedTheme ?? "light",
    },
  })

  useCopilotAction({
    name: "setColorMode",
    description: "Set the color mode. 'toggle' flips between light and dark.",
    parameters: [
      {
        name: "mode",
        type: "string",
        required: true,
        description: `One of: ${COLOR_MODES.join(", ")}.`,
      },
    ],
    handler: ({ mode }) => {
      const err = validateEnum("colorMode", mode)
      if (err) return err
      const m = mode as ColorMode
      if (m === "toggle") {
        const next = resolvedTheme === "dark" ? "light" : "dark"
        setTheme(next)
        return `Toggled to ${next}.`
      }
      setTheme(m)
      return `Set color mode to ${m}.`
    },
  })
}
