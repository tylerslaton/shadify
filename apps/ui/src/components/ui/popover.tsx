import { useStyle } from "@/lib/style-context";
import {
  Popover as DefaultPopover,
  PopoverTrigger as DefaultPopoverTrigger,
  PopoverContent as DefaultPopoverContent,
  PopoverAnchor as DefaultPopoverAnchor,
  PopoverHeader as DefaultPopoverHeader,
  PopoverTitle as DefaultPopoverTitle,
  PopoverDescription as DefaultPopoverDescription,
} from "../ui-default/popover";
import {
  Popover as LumaPopover,
  PopoverTrigger as LumaPopoverTrigger,
  PopoverContent as LumaPopoverContent,
  PopoverAnchor as LumaPopoverAnchor,
  PopoverHeader as LumaPopoverHeader,
  PopoverTitle as LumaPopoverTitle,
  PopoverDescription as LumaPopoverDescription,
} from "../ui-luma/popover";

function Popover(props: React.ComponentProps<typeof DefaultPopover>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaPopover {...props} /> : <DefaultPopover {...props} />;
}

function PopoverTrigger(props: React.ComponentProps<typeof DefaultPopoverTrigger>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaPopoverTrigger {...props} />
  ) : (
    <DefaultPopoverTrigger {...props} />
  );
}

function PopoverContent(props: React.ComponentProps<typeof DefaultPopoverContent>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaPopoverContent {...props} />
  ) : (
    <DefaultPopoverContent {...props} />
  );
}

function PopoverAnchor(props: React.ComponentProps<typeof DefaultPopoverAnchor>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaPopoverAnchor {...props} /> : <DefaultPopoverAnchor {...props} />;
}

function PopoverHeader(props: React.ComponentProps<typeof DefaultPopoverHeader>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaPopoverHeader {...props} /> : <DefaultPopoverHeader {...props} />;
}

function PopoverTitle(props: React.ComponentProps<typeof DefaultPopoverTitle>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaPopoverTitle {...props} /> : <DefaultPopoverTitle {...props} />;
}

function PopoverDescription(props: React.ComponentProps<typeof DefaultPopoverDescription>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaPopoverDescription {...props} />
  ) : (
    <DefaultPopoverDescription {...props} />
  );
}

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
};
