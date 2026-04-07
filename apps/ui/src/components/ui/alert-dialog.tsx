import { useStyle } from "@/lib/style-context";
import {
  AlertDialog as DefaultAlertDialog,
  AlertDialogAction as DefaultAlertDialogAction,
  AlertDialogCancel as DefaultAlertDialogCancel,
  AlertDialogContent as DefaultAlertDialogContent,
  AlertDialogDescription as DefaultAlertDialogDescription,
  AlertDialogFooter as DefaultAlertDialogFooter,
  AlertDialogHeader as DefaultAlertDialogHeader,
  AlertDialogMedia as DefaultAlertDialogMedia,
  AlertDialogOverlay as DefaultAlertDialogOverlay,
  AlertDialogPortal as DefaultAlertDialogPortal,
  AlertDialogTitle as DefaultAlertDialogTitle,
  AlertDialogTrigger as DefaultAlertDialogTrigger,
} from "../ui-default/alert-dialog";
import {
  AlertDialog as LumaAlertDialog,
  AlertDialogAction as LumaAlertDialogAction,
  AlertDialogCancel as LumaAlertDialogCancel,
  AlertDialogContent as LumaAlertDialogContent,
  AlertDialogDescription as LumaAlertDialogDescription,
  AlertDialogFooter as LumaAlertDialogFooter,
  AlertDialogHeader as LumaAlertDialogHeader,
  AlertDialogMedia as LumaAlertDialogMedia,
  AlertDialogOverlay as LumaAlertDialogOverlay,
  AlertDialogPortal as LumaAlertDialogPortal,
  AlertDialogTitle as LumaAlertDialogTitle,
  AlertDialogTrigger as LumaAlertDialogTrigger,
} from "../ui-luma/alert-dialog";

function AlertDialog(props: React.ComponentProps<typeof DefaultAlertDialog>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaAlertDialog {...props} /> : <DefaultAlertDialog {...props} />;
}

function AlertDialogAction(props: React.ComponentProps<typeof DefaultAlertDialogAction>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaAlertDialogAction {...props} />
  ) : (
    <DefaultAlertDialogAction {...props} />
  );
}

function AlertDialogCancel(props: React.ComponentProps<typeof DefaultAlertDialogCancel>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaAlertDialogCancel {...props} />
  ) : (
    <DefaultAlertDialogCancel {...props} />
  );
}

function AlertDialogContent(props: React.ComponentProps<typeof DefaultAlertDialogContent>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaAlertDialogContent {...props} />
  ) : (
    <DefaultAlertDialogContent {...props} />
  );
}

function AlertDialogDescription(props: React.ComponentProps<typeof DefaultAlertDialogDescription>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaAlertDialogDescription {...props} />
  ) : (
    <DefaultAlertDialogDescription {...props} />
  );
}

function AlertDialogFooter(props: React.ComponentProps<typeof DefaultAlertDialogFooter>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaAlertDialogFooter {...props} />
  ) : (
    <DefaultAlertDialogFooter {...props} />
  );
}

function AlertDialogHeader(props: React.ComponentProps<typeof DefaultAlertDialogHeader>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaAlertDialogHeader {...props} />
  ) : (
    <DefaultAlertDialogHeader {...props} />
  );
}

function AlertDialogMedia(props: React.ComponentProps<typeof DefaultAlertDialogMedia>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaAlertDialogMedia {...props} />
  ) : (
    <DefaultAlertDialogMedia {...props} />
  );
}

function AlertDialogOverlay(props: React.ComponentProps<typeof DefaultAlertDialogOverlay>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaAlertDialogOverlay {...props} />
  ) : (
    <DefaultAlertDialogOverlay {...props} />
  );
}

function AlertDialogPortal(props: React.ComponentProps<typeof DefaultAlertDialogPortal>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaAlertDialogPortal {...props} />
  ) : (
    <DefaultAlertDialogPortal {...props} />
  );
}

function AlertDialogTitle(props: React.ComponentProps<typeof DefaultAlertDialogTitle>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaAlertDialogTitle {...props} />
  ) : (
    <DefaultAlertDialogTitle {...props} />
  );
}

function AlertDialogTrigger(props: React.ComponentProps<typeof DefaultAlertDialogTrigger>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaAlertDialogTrigger {...props} />
  ) : (
    <DefaultAlertDialogTrigger {...props} />
  );
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};
