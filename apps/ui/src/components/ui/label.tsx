import { useStyle } from "@/lib/style-context";
import { Label as DefaultLabel } from "../ui-default/label";
import { Label as LumaLabel } from "../ui-luma/label";

function Label(props: React.ComponentProps<typeof DefaultLabel>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaLabel {...props} /> : <DefaultLabel {...props} />;
}

export { Label };
