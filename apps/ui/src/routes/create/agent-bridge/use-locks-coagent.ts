import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core"

import {
  useLocks,
  type LockableParam,
} from "@/routes/create/hooks/use-locks"
import {
  LOCKABLE_PARAMS,
  validateEnum,
} from "@/routes/create/agent-bridge/validation"

export function useLocksCoAgent() {
  const { locks, toggleLock } = useLocks()

  useCopilotReadable({
    description:
      "Locked design-system params on the /create customizer. Locked params are preserved during randomize.",
    value: Array.from(locks),
  })

  useCopilotAction({
    name: "toggleLock",
    description:
      "Toggle the lock on a single design-system param. Locked params are preserved across randomize.",
    parameters: [
      {
        name: "param",
        type: "string",
        required: true,
        description: `One of: ${LOCKABLE_PARAMS.join(", ")}.`,
      },
    ],
    handler: ({ param }) => {
      const err = validateEnum("lockable", param)
      if (err) return err
      toggleLock(param as LockableParam)
      const next = new Set(locks)
      if (next.has(param as LockableParam)) next.delete(param as LockableParam)
      else next.add(param as LockableParam)
      return next.has(param as LockableParam)
        ? `Locked ${param}.`
        : `Unlocked ${param}.`
    },
  })

  useCopilotAction({
    name: "setLocks",
    description:
      "Set locks in bulk. Pass param names under `locked` to lock and under `unlocked` to unlock. Leaves unlisted params unchanged.",
    parameters: [
      {
        name: "locked",
        type: "string[]",
        required: false,
        description: `Params to lock. Any of: ${LOCKABLE_PARAMS.join(", ")}.`,
      },
      {
        name: "unlocked",
        type: "string[]",
        required: false,
        description: `Params to unlock. Any of: ${LOCKABLE_PARAMS.join(", ")}.`,
      },
    ],
    handler: ({ locked, unlocked }) => {
      const lockList = Array.isArray(locked) ? locked : []
      const unlockList = Array.isArray(unlocked) ? unlocked : []
      for (const p of [...lockList, ...unlockList]) {
        const err = validateEnum("lockable", p)
        if (err) return err
      }
      for (const p of lockList) {
        if (!locks.has(p as LockableParam)) toggleLock(p as LockableParam)
      }
      for (const p of unlockList) {
        if (locks.has(p as LockableParam)) toggleLock(p as LockableParam)
      }
      return `Locked: [${lockList.join(", ")}]. Unlocked: [${unlockList.join(", ")}].`
    },
  })

  useCopilotAction({
    name: "clearLocks",
    description: "Remove all locks.",
    parameters: [],
    handler: () => {
      for (const p of Array.from(locks)) {
        toggleLock(p)
      }
      return "Cleared all locks."
    },
  })
}
