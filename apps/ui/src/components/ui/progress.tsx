import { useStyle } from "@/lib/style-context";
import { Progress as DefaultProgress } from "../ui-default/progress";
import { Progress as LumaProgress } from "../ui-luma/progress";

function Progress(props: React.ComponentProps<typeof DefaultProgress>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaProgress {...props} /> : <DefaultProgress {...props} />;
}

export { Progress };
