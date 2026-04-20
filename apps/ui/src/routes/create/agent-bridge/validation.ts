import {
  BASE_COLORS,
  BASES,
  MENU_ACCENTS,
  MENU_COLORS,
  PRESETS,
  RADII,
  STYLES,
  THEMES,
  iconLibraries,
} from "@/registry/config"
import type { LockableParam } from "@/routes/create/hooks/use-locks"
import { FONTS } from "@/routes/create/lib/fonts"

// Registry types resolve to `unknown` in isolation due to upstream Zod/dnd-kit
// type gaps, but the runtime shape is stable — cast through an any-shaped view.
type Named = { name: string }
type Valued = { value: string }

export const LOCKABLE_PARAMS = [
  "style",
  "baseColor",
  "theme",
  "chartColor",
  "iconLibrary",
  "font",
  "fontHeading",
  "menuAccent",
  "menuColor",
  "radius",
] as const satisfies readonly LockableParam[]

export const PREVIEW_ITEMS = ["preview", "preview-02", "custom"] as const
export type PreviewItem = (typeof PREVIEW_ITEMS)[number]

export const COLOR_MODES = ["light", "dark", "system", "toggle"] as const
export type ColorMode = (typeof COLOR_MODES)[number]

export const ENUMS = {
  base: (BASES as readonly Named[]).map((b) => b.name),
  style: (STYLES as readonly Named[]).map((s) => s.name),
  baseColor: (BASE_COLORS as readonly Named[]).map((b) => b.name),
  theme: (THEMES as readonly Named[]).map((t) => t.name),
  chartColor: (THEMES as readonly Named[]).map((t) => t.name),
  font: (FONTS as readonly Valued[]).map((f) => f.value),
  fontHeading: [
    "inherit",
    ...(FONTS as readonly Valued[]).map((f) => f.value),
  ],
  iconLibrary: (Object.values(iconLibraries) as Named[]).map((i) => i.name),
  menuAccent: (MENU_ACCENTS as readonly Valued[]).map((a) => a.value),
  menuColor: (MENU_COLORS as readonly Valued[]).map((m) => m.value),
  radius: (RADII as readonly Named[]).map((r) => r.name),
  lockable: LOCKABLE_PARAMS,
  previewItem: PREVIEW_ITEMS,
  colorMode: COLOR_MODES,
  presetName: (PRESETS as readonly Named[]).map((p) => p.name),
} as const

export type EnumKey = keyof typeof ENUMS

export function isValidEnumValue(key: EnumKey, value: unknown): boolean {
  if (typeof value !== "string") return false
  return (ENUMS[key] as readonly string[]).includes(value)
}

export function validateEnum(key: EnumKey, value: unknown): string | null {
  if (isValidEnumValue(key, value)) return null
  const allowed = (ENUMS[key] as readonly string[]).join(", ")
  return `Invalid ${key}: ${JSON.stringify(value)}. Allowed: ${allowed}.`
}

export function findPresetByName(name: string) {
  return PRESETS.find((p) => p.name === name) ?? null
}
