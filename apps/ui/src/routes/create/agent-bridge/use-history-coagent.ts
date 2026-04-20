import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core"

import { useHistory } from "@/routes/create/hooks/use-history"

export function useHistoryCoAgent() {
  const { canGoBack, canGoForward, goBack, goForward } = useHistory()

  useCopilotReadable({
    description:
      "Undo/redo availability for the /create customizer's preset history.",
    value: { canGoBack, canGoForward },
  })

  useCopilotAction({
    name: "undo",
    description: "Step one change back in the customizer history.",
    parameters: [],
    handler: () => {
      if (!canGoBack) return "Nothing to undo."
      goBack()
      return "Stepped back."
    },
  })

  useCopilotAction({
    name: "redo",
    description: "Step one change forward in the customizer history.",
    parameters: [],
    handler: () => {
      if (!canGoForward) return "Nothing to redo."
      goForward()
      return "Stepped forward."
    },
  })
}
