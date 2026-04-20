import { useEffect, useRef } from "react"
import { useCopilotAction, useCopilotChat } from "@copilotkit/react-core"

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
  const { isLoading } = useCopilotChat()

  // True once randomize has fired during the current agent run. Reset when the
  // run ends (isLoading -> false). This blocks the model from looping the tool
  // within a single turn without penalizing genuine user follow-ups, which
  // only fire after a run has finished.
  const calledThisTurnRef = useRef<boolean>(false)
  const wasLoadingRef = useRef<boolean>(false)

  useEffect(() => {
    if (wasLoadingRef.current && !isLoading) {
      calledThisTurnRef.current = false
    }
    wasLoadingRef.current = isLoading
  }, [isLoading])

  useCopilotAction({
    name: "randomize",
    description:
      "Randomize the customizer ONCE per user request. If `only` is provided, randomize just those params; anything else stays fixed. Locked params are always preserved — after a call, DO NOT call randomize again in the same turn, even to retry a locked param: explain the result to the user instead.",
    parameters: [
      {
        name: "only",
        type: "string[]",
        required: false,
        description: `Subset of params to randomize. Any of: ${LOCKABLE_PARAMS.join(", ")}. Omit to randomize everything unlocked.`,
      },
    ],
    handler: ({ only }) => {
      if (calledThisTurnRef.current) {
        return "Already randomized for this request — the previous tool result is final. Reply to the user now with a brief summary and do NOT call any more tools."
      }

      try {
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
        calledThisTurnRef.current = true
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
      } catch (err) {
        calledThisTurnRef.current = true
        const message = err instanceof Error ? err.message : String(err)
        return `Randomize failed: ${message}. Do not retry this turn; tell the user the error and wait.`
      }
    },
  })
}
