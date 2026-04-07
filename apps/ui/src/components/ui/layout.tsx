import { useStyle } from "@/lib/style-context";
import { Row as DefaultRow, Column as DefaultColumn } from "../ui-default/layout";
import { Row as LumaRow, Column as LumaColumn } from "../ui-luma/layout";

function Row(props: React.ComponentProps<typeof DefaultRow>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaRow {...props} /> : <DefaultRow {...props} />;
}

function Column(props: React.ComponentProps<typeof DefaultColumn>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaColumn {...props} /> : <DefaultColumn {...props} />;
}

export { Row, Column };
