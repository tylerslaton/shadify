import { useStyle } from "@/lib/style-context";
import {
  Toggle as DefaultToggle,
  toggleVariants as defaulttoggleVariants,
} from "../ui-default/toggle";
import { Toggle as LumaToggle } from "../ui-luma/toggle";

function Toggle(props: React.ComponentProps<typeof DefaultToggle>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaToggle {...props} /> : <DefaultToggle {...props} />;
}

export { Toggle, defaulttoggleVariants as toggleVariants };
