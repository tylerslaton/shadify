import { useStyle } from "@/lib/style-context";
import {
  Alert as DefaultAlert,
  AlertTitle as DefaultAlertTitle,
  AlertDescription as DefaultAlertDescription,
} from "../ui-default/alert";
import {
  Alert as LumaAlert,
  AlertTitle as LumaAlertTitle,
  AlertDescription as LumaAlertDescription,
} from "../ui-luma/alert";

function Alert(props: React.ComponentProps<typeof DefaultAlert>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaAlert {...props} /> : <DefaultAlert {...props} />;
}

function AlertTitle(props: React.ComponentProps<typeof DefaultAlertTitle>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaAlertTitle {...props} /> : <DefaultAlertTitle {...props} />;
}

function AlertDescription(props: React.ComponentProps<typeof DefaultAlertDescription>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaAlertDescription {...props} />
  ) : (
    <DefaultAlertDescription {...props} />
  );
}

export { Alert, AlertTitle, AlertDescription };
