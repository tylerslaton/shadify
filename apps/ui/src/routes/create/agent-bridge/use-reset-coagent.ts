import { useCopilotAction } from "@copilotkit/react-core"

import { useReset } from "@/routes/create/hooks/use-reset"

export function useResetCoAgent() {
  const { confirmReset, setShowResetDialog, showResetDialog } = useReset()

  useCopilotAction({
    name: "reset",
    description:
      "Reset the customizer to the preset matching the current base + style. If `confirm` is false (default), opens the confirmation dialog so the user can approve; if true, resets immediately.",
    parameters: [
      {
        name: "confirm",
        type: "boolean",
        required: false,
        description:
          "Pass true only if the user has already explicitly confirmed they want to reset.",
      },
    ],
    handler: ({ confirm }) => {
      if (confirm === true) {
        confirmReset()
        return "Reset applied."
      }
      if (!showResetDialog) setShowResetDialog(true)
      return "Opened the reset confirmation dialog."
    },
  })
}
