import { useStyle } from "@/lib/style-context";
import { Kbd as DefaultKbd, KbdGroup as DefaultKbdGroup } from "../ui-default/kbd";
import { Kbd as LumaKbd, KbdGroup as LumaKbdGroup } from "../ui-luma/kbd";

function Kbd(props: React.ComponentProps<typeof DefaultKbd>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaKbd {...props} /> : <DefaultKbd {...props} />;
}

function KbdGroup(props: React.ComponentProps<typeof DefaultKbdGroup>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaKbdGroup {...props} /> : <DefaultKbdGroup {...props} />;
}

export { Kbd, KbdGroup };
