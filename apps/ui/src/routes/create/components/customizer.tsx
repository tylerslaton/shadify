
import * as React from "react"
import dynamic from "next/dynamic"
import { type RegistryItem } from "shadcn/schema"

import { useIsMobile } from "@/hooks/use-mobile"
import { getThemesForBaseColor, STYLES } from "@/registry/config"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { FieldGroup, FieldSeparator } from "@/components/ui/field"
import { MenuAccentPicker } from "@/routes/create/components/accent-picker"
import { ActionMenu } from "@/routes/create/components/action-menu"
import { BaseColorPicker } from "@/routes/create/components/base-color-picker"
import { BasePicker } from "@/routes/create/components/base-picker"
import { ChartColorPicker } from "@/routes/create/components/chart-color-picker"
import { CopyPreset } from "@/routes/create/components/copy-preset"
import { FontPicker } from "@/routes/create/components/font-picker"
import { IconLibraryPicker } from "@/routes/create/components/icon-library-picker"
import { MainMenu } from "@/routes/create/components/main-menu"
import { MenuColorPicker } from "@/routes/create/components/menu-picker"
import { OpenPreset } from "@/routes/create/components/open-preset"
import { RadiusPicker } from "@/routes/create/components/radius-picker"
import { RandomButton } from "@/routes/create/components/random-button"
import { ResetDialog } from "@/routes/create/components/reset-button"
import { StylePicker } from "@/routes/create/components/style-picker"
import { ThemePicker } from "@/routes/create/components/theme-picker"
import { FONT_HEADING_OPTIONS, FONTS } from "@/routes/create/lib/fonts"
import { useDesignSystemSearchParams } from "@/routes/create/lib/search-params"

// Only visible when user clicks "Create Project".
const ProjectForm = dynamic(() =>
  import("@/routes/create/components/project-form").then(
    (m) => m.ProjectForm
  )
)

export function Customizer({
  itemsByBase,
}: {
  itemsByBase: Record<string, Pick<RegistryItem, "name" | "title" | "type">[]>
}) {
  const [params] = useDesignSystemSearchParams()
  const isMobile = useIsMobile()
  const anchorRef = React.useRef<HTMLDivElement | null>(null)

  const availableThemes = React.useMemo(
    () => getThemesForBaseColor(params.baseColor),
    [params.baseColor]
  )

  return (
    <Card
      className="dark top-24 right-12 isolate z-10 max-h-full min-h-0 w-full self-start rounded-2xl bg-card/90 shadow-xl backdrop-blur-xl md:w-(--customizer-width)"
      ref={anchorRef}
      size="sm"
    >
      <CardHeader className="hidden items-center justify-between gap-2 border-b group-data-reversed/layout:flex-row-reverse md:flex">
        <MainMenu />
      </CardHeader>
      <CardContent className="no-scrollbar min-h-0 flex-1 overflow-x-auto overflow-y-hidden md:overflow-y-auto">
        <FieldGroup className="flex-row gap-2.5 py-px **:data-[slot=field-separator]:-mx-4 **:data-[slot=field-separator]:w-auto md:flex-col md:gap-3.25">
          <StylePicker
            styles={STYLES}
            isMobile={isMobile}
            anchorRef={anchorRef}
          />
          <FieldSeparator className="hidden md:block" />
          <BaseColorPicker isMobile={isMobile} anchorRef={anchorRef} />
          <ThemePicker
            themes={availableThemes}
            isMobile={isMobile}
            anchorRef={anchorRef}
          />
          <ChartColorPicker isMobile={isMobile} anchorRef={anchorRef} />
          <FieldSeparator className="hidden md:block" />
          <FontPicker
            label="Heading"
            param="fontHeading"
            fonts={FONT_HEADING_OPTIONS}
            isMobile={isMobile}
            anchorRef={anchorRef}
          />
          <FontPicker
            label="Font"
            param="font"
            fonts={FONTS}
            isMobile={isMobile}
            anchorRef={anchorRef}
          />
          <FieldSeparator className="hidden md:block" />
          <IconLibraryPicker isMobile={isMobile} anchorRef={anchorRef} />
          <RadiusPicker isMobile={isMobile} anchorRef={anchorRef} />
          <FieldSeparator className="hidden md:block" />
          <MenuColorPicker isMobile={isMobile} anchorRef={anchorRef} />
          <MenuAccentPicker isMobile={isMobile} anchorRef={anchorRef} />
          {isMobile && <BasePicker isMobile={isMobile} anchorRef={anchorRef} />}
        </FieldGroup>
      </CardContent>
      <CardFooter className="flex min-w-0 gap-2 md:flex-col md:rounded-b-none md:**:[button,a]:w-full">
        <CopyPreset className="min-w-0 flex-1 md:flex-none" />
        <OpenPreset
          className="max-w-20 min-w-0 flex-1 sm:max-w-none md:flex-none"
          label={isMobile ? "Open" : "Open Preset"}
        />
        <RandomButton className="max-w-20 min-w-0 flex-1 sm:max-w-none md:flex-none" />
        <ActionMenu itemsByBase={itemsByBase} />
        <ResetDialog />
      </CardFooter>
      <CardFooter className="-mt-3 hidden min-w-0 gap-2 md:flex md:flex-col md:**:[button,a]:w-full">
        <ProjectForm />
      </CardFooter>
    </Card>
  )
}
