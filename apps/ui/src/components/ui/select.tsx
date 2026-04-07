import { useStyle } from "@/lib/style-context";
import {
  Select as DefaultSelect,
  SelectContent as DefaultSelectContent,
  SelectGroup as DefaultSelectGroup,
  SelectItem as DefaultSelectItem,
  SelectLabel as DefaultSelectLabel,
  SelectScrollDownButton as DefaultSelectScrollDownButton,
  SelectScrollUpButton as DefaultSelectScrollUpButton,
  SelectSeparator as DefaultSelectSeparator,
  SelectTrigger as DefaultSelectTrigger,
  SelectValue as DefaultSelectValue,
} from "../ui-default/select";
import {
  Select as LumaSelect,
  SelectContent as LumaSelectContent,
  SelectGroup as LumaSelectGroup,
  SelectItem as LumaSelectItem,
  SelectLabel as LumaSelectLabel,
  SelectScrollDownButton as LumaSelectScrollDownButton,
  SelectScrollUpButton as LumaSelectScrollUpButton,
  SelectSeparator as LumaSelectSeparator,
  SelectTrigger as LumaSelectTrigger,
  SelectValue as LumaSelectValue,
} from "../ui-luma/select";

function Select(props: React.ComponentProps<typeof DefaultSelect>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaSelect {...props} /> : <DefaultSelect {...props} />;
}

function SelectContent(props: React.ComponentProps<typeof DefaultSelectContent>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaSelectContent {...props} /> : <DefaultSelectContent {...props} />;
}

function SelectGroup(props: React.ComponentProps<typeof DefaultSelectGroup>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaSelectGroup {...props} /> : <DefaultSelectGroup {...props} />;
}

function SelectItem(props: React.ComponentProps<typeof DefaultSelectItem>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaSelectItem {...props} /> : <DefaultSelectItem {...props} />;
}

function SelectLabel(props: React.ComponentProps<typeof DefaultSelectLabel>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaSelectLabel {...props} /> : <DefaultSelectLabel {...props} />;
}

function SelectScrollDownButton(props: React.ComponentProps<typeof DefaultSelectScrollDownButton>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaSelectScrollDownButton {...props} />
  ) : (
    <DefaultSelectScrollDownButton {...props} />
  );
}

function SelectScrollUpButton(props: React.ComponentProps<typeof DefaultSelectScrollUpButton>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaSelectScrollUpButton {...props} />
  ) : (
    <DefaultSelectScrollUpButton {...props} />
  );
}

function SelectSeparator(props: React.ComponentProps<typeof DefaultSelectSeparator>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaSelectSeparator {...props} />
  ) : (
    <DefaultSelectSeparator {...props} />
  );
}

function SelectTrigger(props: React.ComponentProps<typeof DefaultSelectTrigger>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaSelectTrigger {...props} /> : <DefaultSelectTrigger {...props} />;
}

function SelectValue(props: React.ComponentProps<typeof DefaultSelectValue>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaSelectValue {...props} /> : <DefaultSelectValue {...props} />;
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
