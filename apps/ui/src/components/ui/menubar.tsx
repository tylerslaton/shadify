import { useStyle } from "@/lib/style-context";
import {
  Menubar as DefaultMenubar,
  MenubarPortal as DefaultMenubarPortal,
  MenubarMenu as DefaultMenubarMenu,
  MenubarTrigger as DefaultMenubarTrigger,
  MenubarContent as DefaultMenubarContent,
  MenubarGroup as DefaultMenubarGroup,
  MenubarSeparator as DefaultMenubarSeparator,
  MenubarLabel as DefaultMenubarLabel,
  MenubarItem as DefaultMenubarItem,
  MenubarShortcut as DefaultMenubarShortcut,
  MenubarCheckboxItem as DefaultMenubarCheckboxItem,
  MenubarRadioGroup as DefaultMenubarRadioGroup,
  MenubarRadioItem as DefaultMenubarRadioItem,
  MenubarSub as DefaultMenubarSub,
  MenubarSubTrigger as DefaultMenubarSubTrigger,
  MenubarSubContent as DefaultMenubarSubContent,
} from "../ui-default/menubar";
import {
  Menubar as LumaMenubar,
  MenubarPortal as LumaMenubarPortal,
  MenubarMenu as LumaMenubarMenu,
  MenubarTrigger as LumaMenubarTrigger,
  MenubarContent as LumaMenubarContent,
  MenubarGroup as LumaMenubarGroup,
  MenubarSeparator as LumaMenubarSeparator,
  MenubarLabel as LumaMenubarLabel,
  MenubarItem as LumaMenubarItem,
  MenubarShortcut as LumaMenubarShortcut,
  MenubarCheckboxItem as LumaMenubarCheckboxItem,
  MenubarRadioGroup as LumaMenubarRadioGroup,
  MenubarRadioItem as LumaMenubarRadioItem,
  MenubarSub as LumaMenubarSub,
  MenubarSubTrigger as LumaMenubarSubTrigger,
  MenubarSubContent as LumaMenubarSubContent,
} from "../ui-luma/menubar";

function Menubar(props: React.ComponentProps<typeof DefaultMenubar>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaMenubar {...props} /> : <DefaultMenubar {...props} />;
}

function MenubarPortal(props: React.ComponentProps<typeof DefaultMenubarPortal>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaMenubarPortal {...props} /> : <DefaultMenubarPortal {...props} />;
}

function MenubarMenu(props: React.ComponentProps<typeof DefaultMenubarMenu>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaMenubarMenu {...props} /> : <DefaultMenubarMenu {...props} />;
}

function MenubarTrigger(props: React.ComponentProps<typeof DefaultMenubarTrigger>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaMenubarTrigger {...props} />
  ) : (
    <DefaultMenubarTrigger {...props} />
  );
}

function MenubarContent(props: React.ComponentProps<typeof DefaultMenubarContent>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaMenubarContent {...props} />
  ) : (
    <DefaultMenubarContent {...props} />
  );
}

function MenubarGroup(props: React.ComponentProps<typeof DefaultMenubarGroup>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaMenubarGroup {...props} /> : <DefaultMenubarGroup {...props} />;
}

function MenubarSeparator(props: React.ComponentProps<typeof DefaultMenubarSeparator>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaMenubarSeparator {...props} />
  ) : (
    <DefaultMenubarSeparator {...props} />
  );
}

function MenubarLabel(props: React.ComponentProps<typeof DefaultMenubarLabel>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaMenubarLabel {...props} /> : <DefaultMenubarLabel {...props} />;
}

function MenubarItem(props: React.ComponentProps<typeof DefaultMenubarItem>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaMenubarItem {...props} /> : <DefaultMenubarItem {...props} />;
}

function MenubarShortcut(props: React.ComponentProps<typeof DefaultMenubarShortcut>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaMenubarShortcut {...props} />
  ) : (
    <DefaultMenubarShortcut {...props} />
  );
}

function MenubarCheckboxItem(props: React.ComponentProps<typeof DefaultMenubarCheckboxItem>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaMenubarCheckboxItem {...props} />
  ) : (
    <DefaultMenubarCheckboxItem {...props} />
  );
}

function MenubarRadioGroup(props: React.ComponentProps<typeof DefaultMenubarRadioGroup>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaMenubarRadioGroup {...props} />
  ) : (
    <DefaultMenubarRadioGroup {...props} />
  );
}

function MenubarRadioItem(props: React.ComponentProps<typeof DefaultMenubarRadioItem>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaMenubarRadioItem {...props} />
  ) : (
    <DefaultMenubarRadioItem {...props} />
  );
}

function MenubarSub(props: React.ComponentProps<typeof DefaultMenubarSub>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaMenubarSub {...props} /> : <DefaultMenubarSub {...props} />;
}

function MenubarSubTrigger(props: React.ComponentProps<typeof DefaultMenubarSubTrigger>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaMenubarSubTrigger {...props} />
  ) : (
    <DefaultMenubarSubTrigger {...props} />
  );
}

function MenubarSubContent(props: React.ComponentProps<typeof DefaultMenubarSubContent>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaMenubarSubContent {...props} />
  ) : (
    <DefaultMenubarSubContent {...props} />
  );
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
};
