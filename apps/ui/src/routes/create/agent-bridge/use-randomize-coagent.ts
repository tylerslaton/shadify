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
      "Randomize the customizer once. If `only` is provided, randomize just those params (anything else stays fixed). Locked params are always preserved — do NOT call this tool again to try to change a locked param; instead tell the user it is locked. Call this tool exactly once per user request.",
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
      const changed: string[] = []
      for (const key of Object.keys(next) as (keyof typeof next)[]) {
        if (next[key] !== params[key]) changed.push(key)
      }
      setParams(next)
      const lockedList = [...locks]
      const lockedNote =
        lockedList.length > 0
          ? ` Preserved locked params (do not retry to change these): ${lockedList.join(", ")}.`
          : ""
      const changedNote =
        changed.length > 0
          ? `Randomized ${changed.length} param(s): ${changed.join(", ")}.`
          : "No unlocked params changed (everything was locked or outside `only`)."
      return `${changedNote}${lockedNote} Done — do not call randomize again for this request.`
    },
  })
}
