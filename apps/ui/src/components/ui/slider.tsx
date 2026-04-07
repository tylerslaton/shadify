import { useStyle } from "@/lib/style-context";
import { Slider as DefaultSlider } from "../ui-default/slider";
import { Slider as LumaSlider } from "../ui-luma/slider";

function Slider(props: React.ComponentProps<typeof DefaultSlider>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaSlider {...props} /> : <DefaultSlider {...props} />;
}

export { Slider };
