import {
  BASE_COLORS,
  getThemesForBaseColor,
  iconLibraries,
  MENU_ACCENTS,
  MENU_COLORS,
  RADII,
  STYLES,
  type FontHeadingValue,
} from "@/registry/config"
import type { LockableParam } from "@/routes/create/hooks/use-locks"
import { FONTS } from "@/routes/create/lib/fonts"
import {
  applyBias,
  RANDOMIZE_BIASES,
  type RandomizeContext,
} from "@/routes/create/lib/randomize-biases"
import {
  isTranslucentMenuColor,
  type DesignSystemSearchParams,
} from "@/routes/create/lib/search-params"

function randomItem<T>(array: readonly T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

export type ComputeRandomParamsOptions = {
  // If provided, only these params may be randomized; others stay fixed.
  only?: readonly LockableParam[]
}

export type RandomizedDesignSystemParams = Pick<
  DesignSystemSearchParams,
  | "style"
  | "baseColor"
  | "theme"
  | "chartColor"
  | "iconLibrary"
  | "font"
  | "fontHeading"
  | "menuAccent"
  | "menuColor"
  | "radius"
>

// Computes a fresh set of design system params, honoring locks and the
// optional `only` subset (anything outside `only` is treated as locked).
export function computeRandomParams(
  params: DesignSystemSearchParams,
  locks: Set<LockableParam>,
  options?: ComputeRandomParamsOptions
): RandomizedDesignSystemParams {
  const onlySet = options?.only ? new Set(options.only) : null
  const isFixed = (param: LockableParam) =>
    locks.has(param) || (onlySet !== null && !onlySet.has(param))

  const selectedStyle = isFixed("style") ? params.style : randomItem(STYLES).name

  const context: RandomizeContext = {
    style: selectedStyle,
  }

  const availableBaseColors = applyBias(
    BASE_COLORS,
    context,
    RANDOMIZE_BIASES.baseColors
  )
  const baseColor = isFixed("baseColor")
    ? params.baseColor
    : randomItem(availableBaseColors).name
  context.baseColor = baseColor

  const availableThemes = getThemesForBaseColor(baseColor)
  const availableFonts = applyBias(FONTS, context, RANDOMIZE_BIASES.fonts)
  const availableRadii = applyBias(RADII, context, RANDOMIZE_BIASES.radius)

  const selectedTheme = isFixed("theme")
    ? params.theme
    : randomItem(availableThemes).name
  context.theme = selectedTheme

  const availableChartColors = applyBias(
    getThemesForBaseColor(baseColor),
    context,
    RANDOMIZE_BIASES.chartColors
  )
  const selectedChartColor = isFixed("chartColor")
    ? params.chartColor
    : randomItem(availableChartColors).name
  context.chartColor = selectedChartColor
  const selectedFont = isFixed("font")
    ? params.font
    : randomItem(availableFonts).value
  context.font = selectedFont

  // Pick heading font: ~70% inherit, ~30% distinct with cross-category contrast.
  let selectedFontHeading: FontHeadingValue
  if (isFixed("fontHeading")) {
    selectedFontHeading = params.fontHeading
  } else if (Math.random() < 0.7) {
    selectedFontHeading = "inherit"
  } else {
    const bodyType = availableFonts.find((f) => f.value === selectedFont)?.type
    const contrastFonts = availableFonts.filter(
      (f) => f.type !== bodyType && f.value !== selectedFont
    )
    selectedFontHeading = (
      contrastFonts.length > 0
        ? randomItem(contrastFonts)
        : randomItem(availableFonts)
    ).value as FontHeadingValue
  }

  const selectedRadius = isFixed("radius")
    ? params.radius
    : randomItem(availableRadii).name
  const selectedIconLibrary = isFixed("iconLibrary")
    ? params.iconLibrary
    : randomItem(Object.values(iconLibraries)).name
  const lockedMenuAccent = isFixed("menuAccent") ? params.menuAccent : undefined
  const availableMenuColors =
    !isFixed("menuColor") && lockedMenuAccent === "bold"
      ? MENU_COLORS.filter(
          (menuColor) => !isTranslucentMenuColor(menuColor.value)
        )
      : MENU_COLORS
  const selectedMenuColor = isFixed("menuColor")
    ? params.menuColor
    : randomItem(availableMenuColors).value
  const selectedMenuAccent =
    isFixed("menuAccent") || isTranslucentMenuColor(selectedMenuColor)
      ? params.menuAccent === "bold" && isTranslucentMenuColor(selectedMenuColor)
        ? "subtle"
        : params.menuAccent
      : randomItem(MENU_ACCENTS).value

  return {
    style: selectedStyle,
    baseColor,
    theme: selectedTheme,
    chartColor: selectedChartColor,
    iconLibrary: selectedIconLibrary,
    font: selectedFont,
    fontHeading: selectedFontHeading,
    menuAccent: selectedMenuAccent,
    menuColor: selectedMenuColor,
    radius: selectedRadius,
  }
}
