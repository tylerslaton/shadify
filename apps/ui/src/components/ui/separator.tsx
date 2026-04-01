import { useStyle } from "@/lib/style-context";
import { Separator as DefaultSeparator } from "../ui-default/separator";
import { Separator as LumaSeparator } from "../ui-luma/separator";

function Separator(props: React.ComponentProps<typeof DefaultSeparator>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaSeparator {...props} /> : <DefaultSeparator {...props} />;
}

export { Separator };
