import { useStyle } from "@/lib/style-context";
import {
  Combobox as DefaultCombobox,
  ComboboxInput as DefaultComboboxInput,
  ComboboxContent as DefaultComboboxContent,
  ComboboxList as DefaultComboboxList,
  ComboboxItem as DefaultComboboxItem,
  ComboboxGroup as DefaultComboboxGroup,
  ComboboxLabel as DefaultComboboxLabel,
  ComboboxCollection as DefaultComboboxCollection,
  ComboboxEmpty as DefaultComboboxEmpty,
  ComboboxSeparator as DefaultComboboxSeparator,
  ComboboxChips as DefaultComboboxChips,
  ComboboxChip as DefaultComboboxChip,
  ComboboxChipsInput as DefaultComboboxChipsInput,
  ComboboxTrigger as DefaultComboboxTrigger,
  ComboboxValue as DefaultComboboxValue,
  useComboboxAnchor as defaultuseComboboxAnchor,
} from "../ui-default/combobox";
import {
  Combobox as LumaCombobox,
  ComboboxInput as LumaComboboxInput,
  ComboboxContent as LumaComboboxContent,
  ComboboxList as LumaComboboxList,
  ComboboxItem as LumaComboboxItem,
  ComboboxGroup as LumaComboboxGroup,
  ComboboxLabel as LumaComboboxLabel,
  ComboboxCollection as LumaComboboxCollection,
  ComboboxEmpty as LumaComboboxEmpty,
  ComboboxSeparator as LumaComboboxSeparator,
  ComboboxChips as LumaComboboxChips,
  ComboboxChip as LumaComboboxChip,
  ComboboxChipsInput as LumaComboboxChipsInput,
  ComboboxTrigger as LumaComboboxTrigger,
  ComboboxValue as LumaComboboxValue,
} from "../ui-luma/combobox";

function Combobox(props: React.ComponentProps<typeof DefaultCombobox>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaCombobox {...props} /> : <DefaultCombobox {...props} />;
}

function ComboboxInput(props: React.ComponentProps<typeof DefaultComboboxInput>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaComboboxInput {...props} /> : <DefaultComboboxInput {...props} />;
}

function ComboboxContent(props: React.ComponentProps<typeof DefaultComboboxContent>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaComboboxContent {...props} />
  ) : (
    <DefaultComboboxContent {...props} />
  );
}

function ComboboxList(props: React.ComponentProps<typeof DefaultComboboxList>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaComboboxList {...props} /> : <DefaultComboboxList {...props} />;
}

function ComboboxItem(props: React.ComponentProps<typeof DefaultComboboxItem>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaComboboxItem {...props} /> : <DefaultComboboxItem {...props} />;
}

function ComboboxGroup(props: React.ComponentProps<typeof DefaultComboboxGroup>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaComboboxGroup {...props} /> : <DefaultComboboxGroup {...props} />;
}

function ComboboxLabel(props: React.ComponentProps<typeof DefaultComboboxLabel>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaComboboxLabel {...props} /> : <DefaultComboboxLabel {...props} />;
}

function ComboboxCollection(props: React.ComponentProps<typeof DefaultComboboxCollection>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaComboboxCollection {...props} />
  ) : (
    <DefaultComboboxCollection {...props} />
  );
}

function ComboboxEmpty(props: React.ComponentProps<typeof DefaultComboboxEmpty>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaComboboxEmpty {...props} /> : <DefaultComboboxEmpty {...props} />;
}

function ComboboxSeparator(props: React.ComponentProps<typeof DefaultComboboxSeparator>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaComboboxSeparator {...props} />
  ) : (
    <DefaultComboboxSeparator {...props} />
  );
}

function ComboboxChips(props: React.ComponentProps<typeof DefaultComboboxChips>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaComboboxChips {...props} /> : <DefaultComboboxChips {...props} />;
}

function ComboboxChip(props: React.ComponentProps<typeof DefaultComboboxChip>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaComboboxChip {...props} /> : <DefaultComboboxChip {...props} />;
}

function ComboboxChipsInput(props: React.ComponentProps<typeof DefaultComboboxChipsInput>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaComboboxChipsInput {...props} />
  ) : (
    <DefaultComboboxChipsInput {...props} />
  );
}

function ComboboxTrigger(props: React.ComponentProps<typeof DefaultComboboxTrigger>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaComboboxTrigger {...props} />
  ) : (
    <DefaultComboboxTrigger {...props} />
  );
}

function ComboboxValue(props: React.ComponentProps<typeof DefaultComboboxValue>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaComboboxValue {...props} /> : <DefaultComboboxValue {...props} />;
}

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
  defaultuseComboboxAnchor as useComboboxAnchor,
};
