import { useStyle } from "@/lib/style-context";
import {
  Collapsible as DefaultCollapsible,
  CollapsibleTrigger as DefaultCollapsibleTrigger,
  CollapsibleContent as DefaultCollapsibleContent,
} from "../ui-default/collapsible";
import {
  Collapsible as LumaCollapsible,
  CollapsibleTrigger as LumaCollapsibleTrigger,
  CollapsibleContent as LumaCollapsibleContent,
} from "../ui-luma/collapsible";

function Collapsible(props: React.ComponentProps<typeof DefaultCollapsible>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaCollapsible {...props} /> : <DefaultCollapsible {...props} />;
}

function CollapsibleTrigger(props: React.ComponentProps<typeof DefaultCollapsibleTrigger>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaCollapsibleTrigger {...props} />
  ) : (
    <DefaultCollapsibleTrigger {...props} />
  );
}

function CollapsibleContent(props: React.ComponentProps<typeof DefaultCollapsibleContent>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaCollapsibleContent {...props} />
  ) : (
    <DefaultCollapsibleContent {...props} />
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
