import { useCopilotAction } from "@copilotkit/react-core"

import {
  PREVIEW_ITEMS,
  validateEnum,
} from "@/routes/create/agent-bridge/validation"
import { useDesignSystemSearchParams } from "@/routes/create/lib/search-params"

export function usePreviewCoAgent() {
  const [, setParams] = useDesignSystemSearchParams()

  useCopilotAction({
    name: "setPreviewItem",
    description: "Switch the previewed registry item in the customizer.",
    parameters: [
      {
        name: "item",
        type: "string",
        required: true,
        description: `One of: ${PREVIEW_ITEMS.join(", ")}.`,
      },
    ],
    handler: ({ item }) => {
      const err = validateEnum("previewItem", item)
      if (err) return err
      setParams({ item: item as string })
      return `Previewing ${item}.`
    },
  })
}
