import { useStyle } from "@/lib/style-context";
import {
  Sheet as DefaultSheet,
  SheetTrigger as DefaultSheetTrigger,
  SheetClose as DefaultSheetClose,
  SheetContent as DefaultSheetContent,
  SheetHeader as DefaultSheetHeader,
  SheetFooter as DefaultSheetFooter,
  SheetTitle as DefaultSheetTitle,
  SheetDescription as DefaultSheetDescription,
} from "../ui-default/sheet";
import {
  Sheet as LumaSheet,
  SheetTrigger as LumaSheetTrigger,
  SheetClose as LumaSheetClose,
  SheetContent as LumaSheetContent,
  SheetHeader as LumaSheetHeader,
  SheetFooter as LumaSheetFooter,
  SheetTitle as LumaSheetTitle,
  SheetDescription as LumaSheetDescription,
} from "../ui-luma/sheet";

function Sheet(props: React.ComponentProps<typeof DefaultSheet>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaSheet {...props} /> : <DefaultSheet {...props} />;
}

function SheetTrigger(props: React.ComponentProps<typeof DefaultSheetTrigger>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaSheetTrigger {...props} /> : <DefaultSheetTrigger {...props} />;
}

function SheetClose(props: React.ComponentProps<typeof DefaultSheetClose>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaSheetClose {...props} /> : <DefaultSheetClose {...props} />;
}

function SheetContent(props: React.ComponentProps<typeof DefaultSheetContent>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaSheetContent {...props} /> : <DefaultSheetContent {...props} />;
}

function SheetHeader(props: React.ComponentProps<typeof DefaultSheetHeader>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaSheetHeader {...props} /> : <DefaultSheetHeader {...props} />;
}

function SheetFooter(props: React.ComponentProps<typeof DefaultSheetFooter>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaSheetFooter {...props} /> : <DefaultSheetFooter {...props} />;
}

function SheetTitle(props: React.ComponentProps<typeof DefaultSheetTitle>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaSheetTitle {...props} /> : <DefaultSheetTitle {...props} />;
}

function SheetDescription(props: React.ComponentProps<typeof DefaultSheetDescription>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaSheetDescription {...props} />
  ) : (
    <DefaultSheetDescription {...props} />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
