import { useStyle } from "@/lib/style-context";
import {
  Button as DefaultButton,
  buttonVariants as defaultbuttonVariants,
} from "../ui-default/button";
import { Button as LumaButton } from "../ui-luma/button";

function Button(props: React.ComponentProps<typeof DefaultButton>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaButton {...props} /> : <DefaultButton {...props} />;
}

export { Button, defaultbuttonVariants as buttonVariants };
