import { useStyle } from "@/lib/style-context";
import { Textarea as DefaultTextarea } from "../ui-default/textarea";
import { Textarea as LumaTextarea } from "../ui-luma/textarea";

function Textarea(props: React.ComponentProps<typeof DefaultTextarea>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaTextarea {...props} /> : <DefaultTextarea {...props} />;
}

export { Textarea };
