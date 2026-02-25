import * as React from "react"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

type ChartType = "bar" | "line" | "area"

function SimpleChart({
  type = "bar",
  data,
  dataKey,
  categoryKey,
  color,
}: {
  type?: ChartType
  data: Record<string, unknown>[]
  dataKey: string
  categoryKey: string
  color?: string
}) {
  const chartColor = color || "var(--sunshine-yellow)"

  const config: ChartConfig = {
    [dataKey]: {
      label: dataKey,
      color: chartColor,
    },
  }

  const sharedProps = {
    data,
    margin: { top: 8, right: 8, bottom: 0, left: 0 },
  }

  return (
    <ChartContainer config={config} className="min-h-[200px] w-full">
      {type === "bar" ? (
        <BarChart {...sharedProps}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey={categoryKey} tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey={dataKey} fill={`var(--color-${dataKey})`} radius={4} />
        </BarChart>
      ) : type === "line" ? (
        <LineChart {...sharedProps}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey={categoryKey} tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey={dataKey} stroke={`var(--color-${dataKey})`} strokeWidth={2} dot={false} />
        </LineChart>
      ) : (
        <AreaChart {...sharedProps}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey={categoryKey} tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area type="monotone" dataKey={dataKey} fill={`var(--color-${dataKey})`} fillOpacity={0.3} stroke={`var(--color-${dataKey})`} strokeWidth={2} />
        </AreaChart>
      )}
    </ChartContainer>
  )
}

export { SimpleChart }
export type { ChartType }
