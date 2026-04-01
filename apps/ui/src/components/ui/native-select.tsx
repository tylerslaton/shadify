import { useStyle } from "@/lib/style-context";
import {
  NativeSelect as DefaultNativeSelect,
  NativeSelectOptGroup as DefaultNativeSelectOptGroup,
  NativeSelectOption as DefaultNativeSelectOption,
} from "../ui-default/native-select";
import {
  NativeSelect as LumaNativeSelect,
  NativeSelectOptGroup as LumaNativeSelectOptGroup,
  NativeSelectOption as LumaNativeSelectOption,
} from "../ui-luma/native-select";

function NativeSelect(props: React.ComponentProps<typeof DefaultNativeSelect>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaNativeSelect {...props} /> : <DefaultNativeSelect {...props} />;
}

function NativeSelectOptGroup(props: React.ComponentProps<typeof DefaultNativeSelectOptGroup>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaNativeSelectOptGroup {...props} />
  ) : (
    <DefaultNativeSelectOptGroup {...props} />
  );
}

function NativeSelectOption(props: React.ComponentProps<typeof DefaultNativeSelectOption>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaNativeSelectOption {...props} />
  ) : (
    <DefaultNativeSelectOption {...props} />
  );
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption };
