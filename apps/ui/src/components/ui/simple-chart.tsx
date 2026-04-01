import { useStyle } from "@/lib/style-context";
import {
  SimpleChart as DefaultSimpleChart,
  type ChartType as DefaultChartType,
} from "../ui-default/simple-chart";
import { SimpleChart as LumaSimpleChart } from "../ui-luma/simple-chart";

function SimpleChart(props: React.ComponentProps<typeof DefaultSimpleChart>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaSimpleChart {...props} /> : <DefaultSimpleChart {...props} />;
}

export { SimpleChart };
export { type DefaultChartType as ChartType };
