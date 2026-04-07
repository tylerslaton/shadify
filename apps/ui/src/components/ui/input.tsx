import { useStyle } from "@/lib/style-context";
import { Input as DefaultInput } from "../ui-default/input";
import { Input as LumaInput } from "../ui-luma/input";

function Input(props: React.ComponentProps<typeof DefaultInput>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaInput {...props} /> : <DefaultInput {...props} />;
}

export { Input };
