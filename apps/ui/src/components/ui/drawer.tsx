import { useStyle } from "@/lib/style-context";
import {
  Drawer as DefaultDrawer,
  DrawerPortal as DefaultDrawerPortal,
  DrawerOverlay as DefaultDrawerOverlay,
  DrawerTrigger as DefaultDrawerTrigger,
  DrawerClose as DefaultDrawerClose,
  DrawerContent as DefaultDrawerContent,
  DrawerHeader as DefaultDrawerHeader,
  DrawerFooter as DefaultDrawerFooter,
  DrawerTitle as DefaultDrawerTitle,
  DrawerDescription as DefaultDrawerDescription,
} from "../ui-default/drawer";
import {
  Drawer as LumaDrawer,
  DrawerPortal as LumaDrawerPortal,
  DrawerOverlay as LumaDrawerOverlay,
  DrawerTrigger as LumaDrawerTrigger,
  DrawerClose as LumaDrawerClose,
  DrawerContent as LumaDrawerContent,
  DrawerHeader as LumaDrawerHeader,
  DrawerFooter as LumaDrawerFooter,
  DrawerTitle as LumaDrawerTitle,
  DrawerDescription as LumaDrawerDescription,
} from "../ui-luma/drawer";

function Drawer(props: React.ComponentProps<typeof DefaultDrawer>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaDrawer {...props} /> : <DefaultDrawer {...props} />;
}

function DrawerPortal(props: React.ComponentProps<typeof DefaultDrawerPortal>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaDrawerPortal {...props} /> : <DefaultDrawerPortal {...props} />;
}

function DrawerOverlay(props: React.ComponentProps<typeof DefaultDrawerOverlay>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaDrawerOverlay {...props} /> : <DefaultDrawerOverlay {...props} />;
}

function DrawerTrigger(props: React.ComponentProps<typeof DefaultDrawerTrigger>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaDrawerTrigger {...props} /> : <DefaultDrawerTrigger {...props} />;
}

function DrawerClose(props: React.ComponentProps<typeof DefaultDrawerClose>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaDrawerClose {...props} /> : <DefaultDrawerClose {...props} />;
}

function DrawerContent(props: React.ComponentProps<typeof DefaultDrawerContent>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaDrawerContent {...props} /> : <DefaultDrawerContent {...props} />;
}

function DrawerHeader(props: React.ComponentProps<typeof DefaultDrawerHeader>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaDrawerHeader {...props} /> : <DefaultDrawerHeader {...props} />;
}

function DrawerFooter(props: React.ComponentProps<typeof DefaultDrawerFooter>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaDrawerFooter {...props} /> : <DefaultDrawerFooter {...props} />;
}

function DrawerTitle(props: React.ComponentProps<typeof DefaultDrawerTitle>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaDrawerTitle {...props} /> : <DefaultDrawerTitle {...props} />;
}

function DrawerDescription(props: React.ComponentProps<typeof DefaultDrawerDescription>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaDrawerDescription {...props} />
  ) : (
    <DefaultDrawerDescription {...props} />
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
