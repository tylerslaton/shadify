import { useStyle } from "@/lib/style-context";
import { Toaster as DefaultToaster } from "../ui-default/sonner";
import { Toaster as LumaToaster } from "../ui-luma/sonner";

function Toaster(props: React.ComponentProps<typeof DefaultToaster>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaToaster {...props} /> : <DefaultToaster {...props} />;
}

export { Toaster };
