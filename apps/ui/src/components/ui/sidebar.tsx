import { useStyle } from "@/lib/style-context";
import {
  Sidebar as DefaultSidebar,
  SidebarContent as DefaultSidebarContent,
  SidebarFooter as DefaultSidebarFooter,
  SidebarGroup as DefaultSidebarGroup,
  SidebarGroupAction as DefaultSidebarGroupAction,
  SidebarGroupContent as DefaultSidebarGroupContent,
  SidebarGroupLabel as DefaultSidebarGroupLabel,
  SidebarHeader as DefaultSidebarHeader,
  SidebarInput as DefaultSidebarInput,
  SidebarInset as DefaultSidebarInset,
  SidebarMenu as DefaultSidebarMenu,
  SidebarMenuAction as DefaultSidebarMenuAction,
  SidebarMenuBadge as DefaultSidebarMenuBadge,
  SidebarMenuButton as DefaultSidebarMenuButton,
  SidebarMenuItem as DefaultSidebarMenuItem,
  SidebarMenuSkeleton as DefaultSidebarMenuSkeleton,
  SidebarMenuSub as DefaultSidebarMenuSub,
  SidebarMenuSubButton as DefaultSidebarMenuSubButton,
  SidebarMenuSubItem as DefaultSidebarMenuSubItem,
  SidebarProvider as DefaultSidebarProvider,
  SidebarRail as DefaultSidebarRail,
  SidebarSeparator as DefaultSidebarSeparator,
  SidebarTrigger as DefaultSidebarTrigger,
  useSidebar as defaultuseSidebar,
} from "../ui-default/sidebar";
import {
  Sidebar as LumaSidebar,
  SidebarContent as LumaSidebarContent,
  SidebarFooter as LumaSidebarFooter,
  SidebarGroup as LumaSidebarGroup,
  SidebarGroupAction as LumaSidebarGroupAction,
  SidebarGroupContent as LumaSidebarGroupContent,
  SidebarGroupLabel as LumaSidebarGroupLabel,
  SidebarHeader as LumaSidebarHeader,
  SidebarInput as LumaSidebarInput,
  SidebarInset as LumaSidebarInset,
  SidebarMenu as LumaSidebarMenu,
  SidebarMenuAction as LumaSidebarMenuAction,
  SidebarMenuBadge as LumaSidebarMenuBadge,
  SidebarMenuButton as LumaSidebarMenuButton,
  SidebarMenuItem as LumaSidebarMenuItem,
  SidebarMenuSkeleton as LumaSidebarMenuSkeleton,
  SidebarMenuSub as LumaSidebarMenuSub,
  SidebarMenuSubButton as LumaSidebarMenuSubButton,
  SidebarMenuSubItem as LumaSidebarMenuSubItem,
  SidebarProvider as LumaSidebarProvider,
  SidebarRail as LumaSidebarRail,
  SidebarSeparator as LumaSidebarSeparator,
  SidebarTrigger as LumaSidebarTrigger,
} from "../ui-luma/sidebar";

function Sidebar(props: React.ComponentProps<typeof DefaultSidebar>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaSidebar {...props} /> : <DefaultSidebar {...props} />;
}

function SidebarContent(props: React.ComponentProps<typeof DefaultSidebarContent>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaSidebarContent {...props} />
  ) : (
    <DefaultSidebarContent {...props} />
  );
}

function SidebarFooter(props: React.ComponentProps<typeof DefaultSidebarFooter>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaSidebarFooter {...props} /> : <DefaultSidebarFooter {...props} />;
}

function SidebarGroup(props: React.ComponentProps<typeof DefaultSidebarGroup>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaSidebarGroup {...props} /> : <DefaultSidebarGroup {...props} />;
}

function SidebarGroupAction(props: React.ComponentProps<typeof DefaultSidebarGroupAction>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaSidebarGroupAction {...props} />
  ) : (
    <DefaultSidebarGroupAction {...props} />
  );
}

function SidebarGroupContent(props: React.ComponentProps<typeof DefaultSidebarGroupContent>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaSidebarGroupContent {...props} />
  ) : (
    <DefaultSidebarGroupContent {...props} />
  );
}

function SidebarGroupLabel(props: React.ComponentProps<typeof DefaultSidebarGroupLabel>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaSidebarGroupLabel {...props} />
  ) : (
    <DefaultSidebarGroupLabel {...props} />
  );
}

function SidebarHeader(props: React.ComponentProps<typeof DefaultSidebarHeader>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaSidebarHeader {...props} /> : <DefaultSidebarHeader {...props} />;
}

function SidebarInput(props: React.ComponentProps<typeof DefaultSidebarInput>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaSidebarInput {...props} /> : <DefaultSidebarInput {...props} />;
}

function SidebarInset(props: React.ComponentProps<typeof DefaultSidebarInset>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaSidebarInset {...props} /> : <DefaultSidebarInset {...props} />;
}

function SidebarMenu(props: React.ComponentProps<typeof DefaultSidebarMenu>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaSidebarMenu {...props} /> : <DefaultSidebarMenu {...props} />;
}

function SidebarMenuAction(props: React.ComponentProps<typeof DefaultSidebarMenuAction>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaSidebarMenuAction {...props} />
  ) : (
    <DefaultSidebarMenuAction {...props} />
  );
}

function SidebarMenuBadge(props: React.ComponentProps<typeof DefaultSidebarMenuBadge>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaSidebarMenuBadge {...props} />
  ) : (
    <DefaultSidebarMenuBadge {...props} />
  );
}

function SidebarMenuButton(props: React.ComponentProps<typeof DefaultSidebarMenuButton>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaSidebarMenuButton {...props} />
  ) : (
    <DefaultSidebarMenuButton {...props} />
  );
}

function SidebarMenuItem(props: React.ComponentProps<typeof DefaultSidebarMenuItem>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaSidebarMenuItem {...props} />
  ) : (
    <DefaultSidebarMenuItem {...props} />
  );
}

function SidebarMenuSkeleton(props: React.ComponentProps<typeof DefaultSidebarMenuSkeleton>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaSidebarMenuSkeleton {...props} />
  ) : (
    <DefaultSidebarMenuSkeleton {...props} />
  );
}

function SidebarMenuSub(props: React.ComponentProps<typeof DefaultSidebarMenuSub>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaSidebarMenuSub {...props} />
  ) : (
    <DefaultSidebarMenuSub {...props} />
  );
}

function SidebarMenuSubButton(props: React.ComponentProps<typeof DefaultSidebarMenuSubButton>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaSidebarMenuSubButton {...props} />
  ) : (
    <DefaultSidebarMenuSubButton {...props} />
  );
}

function SidebarMenuSubItem(props: React.ComponentProps<typeof DefaultSidebarMenuSubItem>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaSidebarMenuSubItem {...props} />
  ) : (
    <DefaultSidebarMenuSubItem {...props} />
  );
}

function SidebarProvider(props: React.ComponentProps<typeof DefaultSidebarProvider>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaSidebarProvider {...props} />
  ) : (
    <DefaultSidebarProvider {...props} />
  );
}

function SidebarRail(props: React.ComponentProps<typeof DefaultSidebarRail>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaSidebarRail {...props} /> : <DefaultSidebarRail {...props} />;
}

function SidebarSeparator(props: React.ComponentProps<typeof DefaultSidebarSeparator>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaSidebarSeparator {...props} />
  ) : (
    <DefaultSidebarSeparator {...props} />
  );
}

function SidebarTrigger(props: React.ComponentProps<typeof DefaultSidebarTrigger>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaSidebarTrigger {...props} />
  ) : (
    <DefaultSidebarTrigger {...props} />
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  defaultuseSidebar as useSidebar,
};
