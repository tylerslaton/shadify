import { useStyle } from "@/lib/style-context";
import {
  DropdownMenu as DefaultDropdownMenu,
  DropdownMenuPortal as DefaultDropdownMenuPortal,
  DropdownMenuTrigger as DefaultDropdownMenuTrigger,
  DropdownMenuContent as DefaultDropdownMenuContent,
  DropdownMenuGroup as DefaultDropdownMenuGroup,
  DropdownMenuLabel as DefaultDropdownMenuLabel,
  DropdownMenuItem as DefaultDropdownMenuItem,
  DropdownMenuCheckboxItem as DefaultDropdownMenuCheckboxItem,
  DropdownMenuRadioGroup as DefaultDropdownMenuRadioGroup,
  DropdownMenuRadioItem as DefaultDropdownMenuRadioItem,
  DropdownMenuSeparator as DefaultDropdownMenuSeparator,
  DropdownMenuShortcut as DefaultDropdownMenuShortcut,
  DropdownMenuSub as DefaultDropdownMenuSub,
  DropdownMenuSubTrigger as DefaultDropdownMenuSubTrigger,
  DropdownMenuSubContent as DefaultDropdownMenuSubContent,
} from "../ui-default/dropdown-menu";
import {
  DropdownMenu as LumaDropdownMenu,
  DropdownMenuPortal as LumaDropdownMenuPortal,
  DropdownMenuTrigger as LumaDropdownMenuTrigger,
  DropdownMenuContent as LumaDropdownMenuContent,
  DropdownMenuGroup as LumaDropdownMenuGroup,
  DropdownMenuLabel as LumaDropdownMenuLabel,
  DropdownMenuItem as LumaDropdownMenuItem,
  DropdownMenuCheckboxItem as LumaDropdownMenuCheckboxItem,
  DropdownMenuRadioGroup as LumaDropdownMenuRadioGroup,
  DropdownMenuRadioItem as LumaDropdownMenuRadioItem,
  DropdownMenuSeparator as LumaDropdownMenuSeparator,
  DropdownMenuShortcut as LumaDropdownMenuShortcut,
  DropdownMenuSub as LumaDropdownMenuSub,
  DropdownMenuSubTrigger as LumaDropdownMenuSubTrigger,
  DropdownMenuSubContent as LumaDropdownMenuSubContent,
} from "../ui-luma/dropdown-menu";

function DropdownMenu(props: React.ComponentProps<typeof DefaultDropdownMenu>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaDropdownMenu {...props} /> : <DefaultDropdownMenu {...props} />;
}

function DropdownMenuPortal(props: React.ComponentProps<typeof DefaultDropdownMenuPortal>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaDropdownMenuPortal {...props} />
  ) : (
    <DefaultDropdownMenuPortal {...props} />
  );
}

function DropdownMenuTrigger(props: React.ComponentProps<typeof DefaultDropdownMenuTrigger>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaDropdownMenuTrigger {...props} />
  ) : (
    <DefaultDropdownMenuTrigger {...props} />
  );
}

function DropdownMenuContent(props: React.ComponentProps<typeof DefaultDropdownMenuContent>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaDropdownMenuContent {...props} />
  ) : (
    <DefaultDropdownMenuContent {...props} />
  );
}

function DropdownMenuGroup(props: React.ComponentProps<typeof DefaultDropdownMenuGroup>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaDropdownMenuGroup {...props} />
  ) : (
    <DefaultDropdownMenuGroup {...props} />
  );
}

function DropdownMenuLabel(props: React.ComponentProps<typeof DefaultDropdownMenuLabel>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaDropdownMenuLabel {...props} />
  ) : (
    <DefaultDropdownMenuLabel {...props} />
  );
}

function DropdownMenuItem(props: React.ComponentProps<typeof DefaultDropdownMenuItem>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaDropdownMenuItem {...props} />
  ) : (
    <DefaultDropdownMenuItem {...props} />
  );
}

function DropdownMenuCheckboxItem(
  props: React.ComponentProps<typeof DefaultDropdownMenuCheckboxItem>,
) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaDropdownMenuCheckboxItem {...props} />
  ) : (
    <DefaultDropdownMenuCheckboxItem {...props} />
  );
}

function DropdownMenuRadioGroup(props: React.ComponentProps<typeof DefaultDropdownMenuRadioGroup>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaDropdownMenuRadioGroup {...props} />
  ) : (
    <DefaultDropdownMenuRadioGroup {...props} />
  );
}

function DropdownMenuRadioItem(props: React.ComponentProps<typeof DefaultDropdownMenuRadioItem>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaDropdownMenuRadioItem {...props} />
  ) : (
    <DefaultDropdownMenuRadioItem {...props} />
  );
}

function DropdownMenuSeparator(props: React.ComponentProps<typeof DefaultDropdownMenuSeparator>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaDropdownMenuSeparator {...props} />
  ) : (
    <DefaultDropdownMenuSeparator {...props} />
  );
}

function DropdownMenuShortcut(props: React.ComponentProps<typeof DefaultDropdownMenuShortcut>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaDropdownMenuShortcut {...props} />
  ) : (
    <DefaultDropdownMenuShortcut {...props} />
  );
}

function DropdownMenuSub(props: React.ComponentProps<typeof DefaultDropdownMenuSub>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaDropdownMenuSub {...props} />
  ) : (
    <DefaultDropdownMenuSub {...props} />
  );
}

function DropdownMenuSubTrigger(props: React.ComponentProps<typeof DefaultDropdownMenuSubTrigger>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaDropdownMenuSubTrigger {...props} />
  ) : (
    <DefaultDropdownMenuSubTrigger {...props} />
  );
}

function DropdownMenuSubContent(props: React.ComponentProps<typeof DefaultDropdownMenuSubContent>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaDropdownMenuSubContent {...props} />
  ) : (
    <DefaultDropdownMenuSubContent {...props} />
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
