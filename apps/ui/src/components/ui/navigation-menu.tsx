import { useStyle } from "@/lib/style-context";
import {
  NavigationMenu as DefaultNavigationMenu,
  NavigationMenuList as DefaultNavigationMenuList,
  NavigationMenuItem as DefaultNavigationMenuItem,
  NavigationMenuContent as DefaultNavigationMenuContent,
  NavigationMenuTrigger as DefaultNavigationMenuTrigger,
  NavigationMenuLink as DefaultNavigationMenuLink,
  NavigationMenuIndicator as DefaultNavigationMenuIndicator,
  NavigationMenuViewport as DefaultNavigationMenuViewport,
  navigationMenuTriggerStyle as defaultnavigationMenuTriggerStyle,
} from "../ui-default/navigation-menu";
import {
  NavigationMenu as LumaNavigationMenu,
  NavigationMenuList as LumaNavigationMenuList,
  NavigationMenuItem as LumaNavigationMenuItem,
  NavigationMenuContent as LumaNavigationMenuContent,
  NavigationMenuTrigger as LumaNavigationMenuTrigger,
  NavigationMenuLink as LumaNavigationMenuLink,
  NavigationMenuIndicator as LumaNavigationMenuIndicator,
  NavigationMenuViewport as LumaNavigationMenuViewport,
} from "../ui-luma/navigation-menu";

function NavigationMenu(props: React.ComponentProps<typeof DefaultNavigationMenu>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaNavigationMenu {...props} />
  ) : (
    <DefaultNavigationMenu {...props} />
  );
}

function NavigationMenuList(props: React.ComponentProps<typeof DefaultNavigationMenuList>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaNavigationMenuList {...props} />
  ) : (
    <DefaultNavigationMenuList {...props} />
  );
}

function NavigationMenuItem(props: React.ComponentProps<typeof DefaultNavigationMenuItem>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaNavigationMenuItem {...props} />
  ) : (
    <DefaultNavigationMenuItem {...props} />
  );
}

function NavigationMenuContent(props: React.ComponentProps<typeof DefaultNavigationMenuContent>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaNavigationMenuContent {...props} />
  ) : (
    <DefaultNavigationMenuContent {...props} />
  );
}

function NavigationMenuTrigger(props: React.ComponentProps<typeof DefaultNavigationMenuTrigger>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaNavigationMenuTrigger {...props} />
  ) : (
    <DefaultNavigationMenuTrigger {...props} />
  );
}

function NavigationMenuLink(props: React.ComponentProps<typeof DefaultNavigationMenuLink>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaNavigationMenuLink {...props} />
  ) : (
    <DefaultNavigationMenuLink {...props} />
  );
}

function NavigationMenuIndicator(
  props: React.ComponentProps<typeof DefaultNavigationMenuIndicator>,
) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaNavigationMenuIndicator {...props} />
  ) : (
    <DefaultNavigationMenuIndicator {...props} />
  );
}

function NavigationMenuViewport(props: React.ComponentProps<typeof DefaultNavigationMenuViewport>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaNavigationMenuViewport {...props} />
  ) : (
    <DefaultNavigationMenuViewport {...props} />
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  defaultnavigationMenuTriggerStyle as navigationMenuTriggerStyle,
};
