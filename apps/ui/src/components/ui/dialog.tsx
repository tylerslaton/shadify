import { useStyle } from "@/lib/style-context";
import {
  Dialog as DefaultDialog,
  DialogClose as DefaultDialogClose,
  DialogContent as DefaultDialogContent,
  DialogDescription as DefaultDialogDescription,
  DialogFooter as DefaultDialogFooter,
  DialogHeader as DefaultDialogHeader,
  DialogOverlay as DefaultDialogOverlay,
  DialogPortal as DefaultDialogPortal,
  DialogTitle as DefaultDialogTitle,
  DialogTrigger as DefaultDialogTrigger,
} from "../ui-default/dialog";
import {
  Dialog as LumaDialog,
  DialogClose as LumaDialogClose,
  DialogContent as LumaDialogContent,
  DialogDescription as LumaDialogDescription,
  DialogFooter as LumaDialogFooter,
  DialogHeader as LumaDialogHeader,
  DialogOverlay as LumaDialogOverlay,
  DialogPortal as LumaDialogPortal,
  DialogTitle as LumaDialogTitle,
  DialogTrigger as LumaDialogTrigger,
} from "../ui-luma/dialog";

function Dialog(props: React.ComponentProps<typeof DefaultDialog>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaDialog {...props} /> : <DefaultDialog {...props} />;
}

function DialogClose(props: React.ComponentProps<typeof DefaultDialogClose>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaDialogClose {...props} /> : <DefaultDialogClose {...props} />;
}

function DialogContent(props: React.ComponentProps<typeof DefaultDialogContent>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaDialogContent {...props} /> : <DefaultDialogContent {...props} />;
}

function DialogDescription(props: React.ComponentProps<typeof DefaultDialogDescription>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaDialogDescription {...props} />
  ) : (
    <DefaultDialogDescription {...props} />
  );
}

function DialogFooter(props: React.ComponentProps<typeof DefaultDialogFooter>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaDialogFooter {...props} /> : <DefaultDialogFooter {...props} />;
}

function DialogHeader(props: React.ComponentProps<typeof DefaultDialogHeader>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaDialogHeader {...props} /> : <DefaultDialogHeader {...props} />;
}

function DialogOverlay(props: React.ComponentProps<typeof DefaultDialogOverlay>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaDialogOverlay {...props} /> : <DefaultDialogOverlay {...props} />;
}

function DialogPortal(props: React.ComponentProps<typeof DefaultDialogPortal>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaDialogPortal {...props} /> : <DefaultDialogPortal {...props} />;
}

function DialogTitle(props: React.ComponentProps<typeof DefaultDialogTitle>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaDialogTitle {...props} /> : <DefaultDialogTitle {...props} />;
}

function DialogTrigger(props: React.ComponentProps<typeof DefaultDialogTrigger>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaDialogTrigger {...props} /> : <DefaultDialogTrigger {...props} />;
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
