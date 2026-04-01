import { useStyle } from "@/lib/style-context";
import {
  ScrollArea as DefaultScrollArea,
  ScrollBar as DefaultScrollBar,
} from "../ui-default/scroll-area";
import { ScrollArea as LumaScrollArea, ScrollBar as LumaScrollBar } from "../ui-luma/scroll-area";

function ScrollArea(props: React.ComponentProps<typeof DefaultScrollArea>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaScrollArea {...props} /> : <DefaultScrollArea {...props} />;
}

function ScrollBar(props: React.ComponentProps<typeof DefaultScrollBar>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaScrollBar {...props} /> : <DefaultScrollBar {...props} />;
}

export { ScrollArea, ScrollBar };
