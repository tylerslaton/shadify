import { useCopilotAction } from "@copilotkit/react-core"

import {
  useLocks,
  type LockableParam,
} from "@/routes/create/hooks/use-locks"
import {
  LOCKABLE_PARAMS,
  validateEnum,
} from "@/routes/create/agent-bridge/validation"
import { computeRandomParams } from "@/routes/create/lib/randomize"
import { useDesignSystemSearchParams } from "@/routes/create/lib/search-params"

export function useRandomizeCoAgent() {
  const { locks } = useLocks()
  const [params, setParams] = useDesignSystemSearchParams()

  useCopilotAction({
    name: "randomize",
    description:
      "Randomize the customizer. If `only` is provided, randomize just those params (anything else stays fixed). Locked params are always preserved.",
    parameters: [
      {
        name: "only",
        type: "string[]",
        required: false,
        description: `Subset of params to randomize. Any of: ${LOCKABLE_PARAMS.join(", ")}. Omit to randomize everything unlocked.`,
      },
    ],
    handler: ({ only }) => {
      let subset: LockableParam[] | undefined
      if (Array.isArray(only) && only.length > 0) {
        for (const p of only) {
          const err = validateEnum("lockable", p)
          if (err) return err
        }
        subset = only as LockableParam[]
      }
      const next = computeRandomParams(params, locks, { only: subset })
      setParams(next)
      return subset
        ? `Randomized: ${subset.join(", ")}.`
        : "Randomized all unlocked params."
    },
  })
}
