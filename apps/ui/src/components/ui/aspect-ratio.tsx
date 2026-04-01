import { useStyle } from "@/lib/style-context";
import { AspectRatio as DefaultAspectRatio } from "../ui-default/aspect-ratio";
import { AspectRatio as LumaAspectRatio } from "../ui-luma/aspect-ratio";

function AspectRatio(props: React.ComponentProps<typeof DefaultAspectRatio>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaAspectRatio {...props} /> : <DefaultAspectRatio {...props} />;
}

export { AspectRatio };
