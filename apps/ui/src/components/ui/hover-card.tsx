import { useStyle } from "@/lib/style-context";
import {
  HoverCard as DefaultHoverCard,
  HoverCardTrigger as DefaultHoverCardTrigger,
  HoverCardContent as DefaultHoverCardContent,
} from "../ui-default/hover-card";
import {
  HoverCard as LumaHoverCard,
  HoverCardTrigger as LumaHoverCardTrigger,
  HoverCardContent as LumaHoverCardContent,
} from "../ui-luma/hover-card";

function HoverCard(props: React.ComponentProps<typeof DefaultHoverCard>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaHoverCard {...props} /> : <DefaultHoverCard {...props} />;
}

function HoverCardTrigger(props: React.ComponentProps<typeof DefaultHoverCardTrigger>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaHoverCardTrigger {...props} />
  ) : (
    <DefaultHoverCardTrigger {...props} />
  );
}

function HoverCardContent(props: React.ComponentProps<typeof DefaultHoverCardContent>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaHoverCardContent {...props} />
  ) : (
    <DefaultHoverCardContent {...props} />
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
