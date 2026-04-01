import { useStyle } from "@/lib/style-context";
import {
  ContextMenu as DefaultContextMenu,
  ContextMenuTrigger as DefaultContextMenuTrigger,
  ContextMenuContent as DefaultContextMenuContent,
  ContextMenuItem as DefaultContextMenuItem,
  ContextMenuCheckboxItem as DefaultContextMenuCheckboxItem,
  ContextMenuRadioItem as DefaultContextMenuRadioItem,
  ContextMenuLabel as DefaultContextMenuLabel,
  ContextMenuSeparator as DefaultContextMenuSeparator,
  ContextMenuShortcut as DefaultContextMenuShortcut,
  ContextMenuGroup as DefaultContextMenuGroup,
  ContextMenuPortal as DefaultContextMenuPortal,
  ContextMenuSub as DefaultContextMenuSub,
  ContextMenuSubContent as DefaultContextMenuSubContent,
  ContextMenuSubTrigger as DefaultContextMenuSubTrigger,
  ContextMenuRadioGroup as DefaultContextMenuRadioGroup,
} from "../ui-default/context-menu";
import {
  ContextMenu as LumaContextMenu,
  ContextMenuTrigger as LumaContextMenuTrigger,
  ContextMenuContent as LumaContextMenuContent,
  ContextMenuItem as LumaContextMenuItem,
  ContextMenuCheckboxItem as LumaContextMenuCheckboxItem,
  ContextMenuRadioItem as LumaContextMenuRadioItem,
  ContextMenuLabel as LumaContextMenuLabel,
  ContextMenuSeparator as LumaContextMenuSeparator,
  ContextMenuShortcut as LumaContextMenuShortcut,
  ContextMenuGroup as LumaContextMenuGroup,
  ContextMenuPortal as LumaContextMenuPortal,
  ContextMenuSub as LumaContextMenuSub,
  ContextMenuSubContent as LumaContextMenuSubContent,
  ContextMenuSubTrigger as LumaContextMenuSubTrigger,
  ContextMenuRadioGroup as LumaContextMenuRadioGroup,
} from "../ui-luma/context-menu";

function ContextMenu(props: React.ComponentProps<typeof DefaultContextMenu>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaContextMenu {...props} /> : <DefaultContextMenu {...props} />;
}

function ContextMenuTrigger(props: React.ComponentProps<typeof DefaultContextMenuTrigger>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaContextMenuTrigger {...props} />
  ) : (
    <DefaultContextMenuTrigger {...props} />
  );
}

function ContextMenuContent(props: React.ComponentProps<typeof DefaultContextMenuContent>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaContextMenuContent {...props} />
  ) : (
    <DefaultContextMenuContent {...props} />
  );
}

function ContextMenuItem(props: React.ComponentProps<typeof DefaultContextMenuItem>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaContextMenuItem {...props} />
  ) : (
    <DefaultContextMenuItem {...props} />
  );
}

function ContextMenuCheckboxItem(
  props: React.ComponentProps<typeof DefaultContextMenuCheckboxItem>,
) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaContextMenuCheckboxItem {...props} />
  ) : (
    <DefaultContextMenuCheckboxItem {...props} />
  );
}

function ContextMenuRadioItem(props: React.ComponentProps<typeof DefaultContextMenuRadioItem>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaContextMenuRadioItem {...props} />
  ) : (
    <DefaultContextMenuRadioItem {...props} />
  );
}

function ContextMenuLabel(props: React.ComponentProps<typeof DefaultContextMenuLabel>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaContextMenuLabel {...props} />
  ) : (
    <DefaultContextMenuLabel {...props} />
  );
}

function ContextMenuSeparator(props: React.ComponentProps<typeof DefaultContextMenuSeparator>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaContextMenuSeparator {...props} />
  ) : (
    <DefaultContextMenuSeparator {...props} />
  );
}

function ContextMenuShortcut(props: React.ComponentProps<typeof DefaultContextMenuShortcut>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaContextMenuShortcut {...props} />
  ) : (
    <DefaultContextMenuShortcut {...props} />
  );
}

function ContextMenuGroup(props: React.ComponentProps<typeof DefaultContextMenuGroup>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaContextMenuGroup {...props} />
  ) : (
    <DefaultContextMenuGroup {...props} />
  );
}

function ContextMenuPortal(props: React.ComponentProps<typeof DefaultContextMenuPortal>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaContextMenuPortal {...props} />
  ) : (
    <DefaultContextMenuPortal {...props} />
  );
}

function ContextMenuSub(props: React.ComponentProps<typeof DefaultContextMenuSub>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaContextMenuSub {...props} />
  ) : (
    <DefaultContextMenuSub {...props} />
  );
}

function ContextMenuSubContent(props: React.ComponentProps<typeof DefaultContextMenuSubContent>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaContextMenuSubContent {...props} />
  ) : (
    <DefaultContextMenuSubContent {...props} />
  );
}

function ContextMenuSubTrigger(props: React.ComponentProps<typeof DefaultContextMenuSubTrigger>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaContextMenuSubTrigger {...props} />
  ) : (
    <DefaultContextMenuSubTrigger {...props} />
  );
}

function ContextMenuRadioGroup(props: React.ComponentProps<typeof DefaultContextMenuRadioGroup>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaContextMenuRadioGroup {...props} />
  ) : (
    <DefaultContextMenuRadioGroup {...props} />
  );
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};
