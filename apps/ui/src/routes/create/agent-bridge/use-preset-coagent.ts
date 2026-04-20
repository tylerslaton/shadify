import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core"

import { PRESETS } from "@/registry/config"
import {
  findPresetByName,
  validateEnum,
} from "@/routes/create/agent-bridge/validation"
import { useDesignSystemSearchParams } from "@/routes/create/lib/search-params"

export function usePresetCoAgent() {
  const [, setParams] = useDesignSystemSearchParams()

  useCopilotReadable({
    description:
      "Named presets available on the /create customizer. Use `applyPreset` with one of these names.",
    value: PRESETS.map((p) => ({
      name: p.name,
      title: p.title,
      description: p.description,
    })),
  })

  useCopilotAction({
    name: "applyPreset",
    description:
      "Apply a named preset, overwriting the current design system params (base, style, colors, fonts, radius, etc.).",
    parameters: [
      {
        name: "name",
        type: "string",
        required: true,
        description: "Preset name, e.g. 'radix-vega' or 'radix-nova'.",
      },
    ],
    handler: ({ name }) => {
      const err = validateEnum("presetName", name)
      if (err) return err
      const preset = findPresetByName(name as string)
      if (!preset) return `Unknown preset: ${name}.`
      setParams({
        base: preset.base,
        style: preset.style,
        baseColor: preset.baseColor,
        theme: preset.theme,
        chartColor: preset.chartColor,
        iconLibrary: preset.iconLibrary,
        font: preset.font,
        fontHeading: preset.fontHeading,
        menuAccent: preset.menuAccent,
        menuColor: preset.menuColor,
        radius: preset.radius,
      })
      return `Applied preset "${preset.name}".`
    },
  })
}
