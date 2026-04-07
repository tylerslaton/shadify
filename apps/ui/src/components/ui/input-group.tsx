import { useStyle } from "@/lib/style-context";
import {
  InputGroup as DefaultInputGroup,
  InputGroupAddon as DefaultInputGroupAddon,
  InputGroupButton as DefaultInputGroupButton,
  InputGroupText as DefaultInputGroupText,
  InputGroupInput as DefaultInputGroupInput,
  InputGroupTextarea as DefaultInputGroupTextarea,
} from "../ui-default/input-group";
import {
  InputGroup as LumaInputGroup,
  InputGroupAddon as LumaInputGroupAddon,
  InputGroupButton as LumaInputGroupButton,
  InputGroupText as LumaInputGroupText,
  InputGroupInput as LumaInputGroupInput,
  InputGroupTextarea as LumaInputGroupTextarea,
} from "../ui-luma/input-group";

function InputGroup(props: React.ComponentProps<typeof DefaultInputGroup>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaInputGroup {...props} /> : <DefaultInputGroup {...props} />;
}

function InputGroupAddon(props: React.ComponentProps<typeof DefaultInputGroupAddon>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaInputGroupAddon {...props} />
  ) : (
    <DefaultInputGroupAddon {...props} />
  );
}

function InputGroupButton(props: React.ComponentProps<typeof DefaultInputGroupButton>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaInputGroupButton {...props} />
  ) : (
    <DefaultInputGroupButton {...props} />
  );
}

function InputGroupText(props: React.ComponentProps<typeof DefaultInputGroupText>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaInputGroupText {...props} />
  ) : (
    <DefaultInputGroupText {...props} />
  );
}

function InputGroupInput(props: React.ComponentProps<typeof DefaultInputGroupInput>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaInputGroupInput {...props} />
  ) : (
    <DefaultInputGroupInput {...props} />
  );
}

function InputGroupTextarea(props: React.ComponentProps<typeof DefaultInputGroupTextarea>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaInputGroupTextarea {...props} />
  ) : (
    <DefaultInputGroupTextarea {...props} />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
};
