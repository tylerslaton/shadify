import { useStyle } from "@/lib/style-context";
import { Checkbox as DefaultCheckbox } from "../ui-default/checkbox";
import { Checkbox as LumaCheckbox } from "../ui-luma/checkbox";

function Checkbox(props: React.ComponentProps<typeof DefaultCheckbox>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaCheckbox {...props} /> : <DefaultCheckbox {...props} />;
}

export { Checkbox };
