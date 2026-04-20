import * as React from "react"
import {
  CheckIcon,
  Dice5Icon,
  LayoutTemplateIcon,
  LockIcon,
  LockOpenIcon,
  PaletteIcon,
  RedoIcon,
  RotateCcwIcon,
  SparklesIcon,
  SunMoonIcon,
  UndoIcon,
  WandSparklesIcon,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

type Status = "inProgress" | "executing" | "complete"

type ToolMeta = {
  label: string
  verbRunning: string
  verbDone: string
  Icon: LucideIcon
}

const TOOLS: Record<string, ToolMeta> = {
  updateDesignSystem: {
    label: "Update design system",
    verbRunning: "Updating customizer",
    verbDone: "Customizer updated",
    Icon: PaletteIcon,
  },
  toggleLock: {
    label: "Toggle lock",
    verbRunning: "Toggling lock",
    verbDone: "Lock toggled",
    Icon: LockIcon,
  },
  setLocks: {
    label: "Set locks",
    verbRunning: "Updating locks",
    verbDone: "Locks updated",
    Icon: LockIcon,
  },
  clearLocks: {
    label: "Clear locks",
    verbRunning: "Clearing locks",
    verbDone: "Locks cleared",
    Icon: LockOpenIcon,
  },
  randomize: {
    label: "Randomize",
    verbRunning: "Randomizing",
    verbDone: "Randomized",
    Icon: Dice5Icon,
  },
  reset: {
    label: "Reset",
    verbRunning: "Resetting",
    verbDone: "Reset",
    Icon: RotateCcwIcon,
  },
  setColorMode: {
    label: "Color mode",
    verbRunning: "Switching color mode",
    verbDone: "Color mode set",
    Icon: SunMoonIcon,
  },
  applyPreset: {
    label: "Apply preset",
    verbRunning: "Applying preset",
    verbDone: "Preset applied",
    Icon: WandSparklesIcon,
  },
  setPreviewItem: {
    label: "Preview item",
    verbRunning: "Switching preview",
    verbDone: "Preview switched",
    Icon: SparklesIcon,
  },
  createCustomComponent: {
    label: "Custom component",
    verbRunning: "Building component",
    verbDone: "Component built",
    Icon: LayoutTemplateIcon,
  },
  undo: {
    label: "Undo",
    verbRunning: "Stepping back",
    verbDone: "Stepped back",
    Icon: UndoIcon,
  },
  redo: {
    label: "Redo",
    verbRunning: "Stepping forward",
    verbDone: "Stepped forward",
    Icon: RedoIcon,
  },
}

const DEFAULT_META: ToolMeta = {
  label: "Tool",
  verbRunning: "Working",
  verbDone: "Done",
  Icon: SparklesIcon,
}

function getMeta(name: string): ToolMeta {
  return TOOLS[name] ?? { ...DEFAULT_META, label: name }
}

function formatArg(value: unknown): string {
  if (value == null || value === "") return ""
  if (Array.isArray(value)) return value.join(", ")
  if (typeof value === "object") {
    try {
      const json = JSON.stringify(value)
      return json.length > 60 ? `${json.slice(0, 48)}…` : json
    } catch {
      return String(value)
    }
  }
  return String(value)
}

function argChips(args: unknown): string[] {
  if (!args || typeof args !== "object") return []
  const chips: string[] = []
  for (const [key, val] of Object.entries(args as Record<string, unknown>)) {
    const formatted = formatArg(val)
    if (!formatted) continue
    chips.push(`${key}: ${formatted}`)
  }
  return chips
}

export type ToolCallCardProps = {
  name: string
  status: Status
  parameters?: unknown
  result?: string
}

export function ToolCallCard({
  name,
  status,
  parameters,
  result,
}: ToolCallCardProps) {
  const meta = getMeta(name)
  const isDone = status === "complete"
  const running = status === "inProgress" || status === "executing"
  const chips = React.useMemo(() => argChips(parameters), [parameters])
  const trimmedResult = typeof result === "string" ? result.trim() : ""

  return (
    <div
      data-status={status}
      className={cn(
        "group/tool mt-2 flex w-full max-w-[52ch] items-start gap-3 rounded-2xl border border-foreground/10 bg-foreground/[0.03] px-3 py-2.5",
        "transition-all duration-300",
        running && "animate-tool-pulse",
        isDone && "border-foreground/15"
      )}
    >
      <div
        className={cn(
          "relative mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full",
          running
            ? "bg-foreground/5 text-foreground/70"
            : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        )}
      >
        {running && (
          <span
            aria-hidden
            className="absolute inset-0 rounded-full border-2 border-foreground/10 border-t-foreground/60 motion-safe:animate-spin"
            style={{ animationDuration: "900ms" }}
          />
        )}
        {isDone ? (
          <CheckIcon className="size-3.5" />
        ) : (
          <meta.Icon className="size-3.5" />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex items-center gap-2 text-[13px] font-medium leading-5 text-foreground/90">
          <span className="truncate">
            {isDone ? meta.verbDone : meta.verbRunning}
          </span>
          {running && (
            <span aria-hidden className="flex items-center gap-0.5">
              <span className="size-1 rounded-full bg-foreground/30 motion-safe:animate-tool-dot [animation-delay:0ms]" />
              <span className="size-1 rounded-full bg-foreground/30 motion-safe:animate-tool-dot [animation-delay:150ms]" />
              <span className="size-1 rounded-full bg-foreground/30 motion-safe:animate-tool-dot [animation-delay:300ms]" />
            </span>
          )}
        </div>

        {chips.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {chips.map((chip, i) => (
              <span
                key={i}
                className="inline-flex max-w-full items-center truncate rounded-md bg-foreground/5 px-1.5 py-0.5 font-mono text-[11px] leading-4 text-foreground/70"
              >
                {chip}
              </span>
            ))}
          </div>
        )}

        {isDone && trimmedResult && (
          <div className="mt-0.5 text-[12px] leading-5 text-foreground/60 motion-safe:animate-tool-fade-in">
            {trimmedResult}
          </div>
        )}
      </div>
    </div>
  )
}
