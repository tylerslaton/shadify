import { useStyle } from "@/lib/style-context";
import { Spinner as DefaultSpinner } from "../ui-default/spinner";
import { Spinner as LumaSpinner } from "../ui-luma/spinner";

function Spinner(props: React.ComponentProps<typeof DefaultSpinner>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaSpinner {...props} /> : <DefaultSpinner {...props} />;
}

export { Spinner };
