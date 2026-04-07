import { useStyle } from "@/lib/style-context";
import {
  ButtonGroup as DefaultButtonGroup,
  ButtonGroupSeparator as DefaultButtonGroupSeparator,
  ButtonGroupText as DefaultButtonGroupText,
  buttonGroupVariants as defaultbuttonGroupVariants,
} from "../ui-default/button-group";
import {
  ButtonGroup as LumaButtonGroup,
  ButtonGroupSeparator as LumaButtonGroupSeparator,
  ButtonGroupText as LumaButtonGroupText,
} from "../ui-luma/button-group";

function ButtonGroup(props: React.ComponentProps<typeof DefaultButtonGroup>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaButtonGroup {...props} /> : <DefaultButtonGroup {...props} />;
}

function ButtonGroupSeparator(props: React.ComponentProps<typeof DefaultButtonGroupSeparator>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaButtonGroupSeparator {...props} />
  ) : (
    <DefaultButtonGroupSeparator {...props} />
  );
}

function ButtonGroupText(props: React.ComponentProps<typeof DefaultButtonGroupText>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaButtonGroupText {...props} />
  ) : (
    <DefaultButtonGroupText {...props} />
  );
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  defaultbuttonGroupVariants as buttonGroupVariants,
};
