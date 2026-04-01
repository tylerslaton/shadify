// Chart components are identical between default and luma styles (recharts wrappers).
// Direct re-export avoids complex recharts ref type issues with the proxy pattern.
export {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
} from "../ui-default/chart";
