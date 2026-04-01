import { useStyle } from "@/lib/style-context";
import {
  RadioGroup as DefaultRadioGroup,
  RadioGroupItem as DefaultRadioGroupItem,
} from "../ui-default/radio-group";
import {
  RadioGroup as LumaRadioGroup,
  RadioGroupItem as LumaRadioGroupItem,
} from "../ui-luma/radio-group";

function RadioGroup(props: React.ComponentProps<typeof DefaultRadioGroup>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaRadioGroup {...props} /> : <DefaultRadioGroup {...props} />;
}

function RadioGroupItem(props: React.ComponentProps<typeof DefaultRadioGroupItem>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaRadioGroupItem {...props} />
  ) : (
    <DefaultRadioGroupItem {...props} />
  );
}

export { RadioGroup, RadioGroupItem };
