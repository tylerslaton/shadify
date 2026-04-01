import { useStyle } from "@/lib/style-context";
import { Switch as DefaultSwitch } from "../ui-default/switch";
import { Switch as LumaSwitch } from "../ui-luma/switch";

function Switch(props: React.ComponentProps<typeof DefaultSwitch>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaSwitch {...props} /> : <DefaultSwitch {...props} />;
}

export { Switch };
