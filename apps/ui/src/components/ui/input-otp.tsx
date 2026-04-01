import { useStyle } from "@/lib/style-context";
import {
  InputOTP as DefaultInputOTP,
  InputOTPGroup as DefaultInputOTPGroup,
  InputOTPSlot as DefaultInputOTPSlot,
  InputOTPSeparator as DefaultInputOTPSeparator,
} from "../ui-default/input-otp";
import {
  InputOTP as LumaInputOTP,
  InputOTPGroup as LumaInputOTPGroup,
  InputOTPSlot as LumaInputOTPSlot,
  InputOTPSeparator as LumaInputOTPSeparator,
} from "../ui-luma/input-otp";

function InputOTP(props: React.ComponentProps<typeof DefaultInputOTP>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaInputOTP {...props} /> : <DefaultInputOTP {...props} />;
}

function InputOTPGroup(props: React.ComponentProps<typeof DefaultInputOTPGroup>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaInputOTPGroup {...props} /> : <DefaultInputOTPGroup {...props} />;
}

function InputOTPSlot(props: React.ComponentProps<typeof DefaultInputOTPSlot>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaInputOTPSlot {...props} /> : <DefaultInputOTPSlot {...props} />;
}

function InputOTPSeparator(props: React.ComponentProps<typeof DefaultInputOTPSeparator>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaInputOTPSeparator {...props} />
  ) : (
    <DefaultInputOTPSeparator {...props} />
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
