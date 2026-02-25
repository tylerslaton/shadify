import * as React from "react"
import { cn } from "@/lib/utils"

function Row({
  className,
  gap = "2",
  align = "center",
  justify = "start",
  ...props
}: React.ComponentProps<"div"> & {
  gap?: string
  align?: string
  justify?: string
}) {
  return (
    <div
      data-slot="row"
      className={cn(
        "flex flex-row",
        `gap-${gap}`,
        `items-${align}`,
        `justify-${justify}`,
        className
      )}
      {...props}
    />
  )
}

function Column({
  className,
  gap = "2",
  align = "stretch",
  justify = "start",
  ...props
}: React.ComponentProps<"div"> & {
  gap?: string
  align?: string
  justify?: string
}) {
  return (
    <div
      data-slot="column"
      className={cn(
        "flex flex-col",
        `gap-${gap}`,
        `items-${align}`,
        `justify-${justify}`,
        className
      )}
      {...props}
    />
  )
}

export { Row, Column }
