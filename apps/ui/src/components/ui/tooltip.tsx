import { useStyle } from "@/lib/style-context";
import {
  Tooltip as DefaultTooltip,
  TooltipTrigger as DefaultTooltipTrigger,
  TooltipContent as DefaultTooltipContent,
  TooltipProvider as DefaultTooltipProvider,
} from "../ui-default/tooltip";
import {
  Tooltip as LumaTooltip,
  TooltipTrigger as LumaTooltipTrigger,
  TooltipContent as LumaTooltipContent,
  TooltipProvider as LumaTooltipProvider,
} from "../ui-luma/tooltip";

function Tooltip(props: React.ComponentProps<typeof DefaultTooltip>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaTooltip {...props} /> : <DefaultTooltip {...props} />;
}

function TooltipTrigger(props: React.ComponentProps<typeof DefaultTooltipTrigger>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaTooltipTrigger {...props} />
  ) : (
    <DefaultTooltipTrigger {...props} />
  );
}

function TooltipContent(props: React.ComponentProps<typeof DefaultTooltipContent>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaTooltipContent {...props} />
  ) : (
    <DefaultTooltipContent {...props} />
  );
}

function TooltipProvider(props: React.ComponentProps<typeof DefaultTooltipProvider>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaTooltipProvider {...props} />
  ) : (
    <DefaultTooltipProvider {...props} />
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
