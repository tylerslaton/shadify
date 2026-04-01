import { useStyle } from "@/lib/style-context";
import {
  Field as DefaultField,
  FieldLabel as DefaultFieldLabel,
  FieldDescription as DefaultFieldDescription,
  FieldError as DefaultFieldError,
  FieldGroup as DefaultFieldGroup,
  FieldLegend as DefaultFieldLegend,
  FieldSeparator as DefaultFieldSeparator,
  FieldSet as DefaultFieldSet,
  FieldContent as DefaultFieldContent,
  FieldTitle as DefaultFieldTitle,
} from "../ui-default/field";
import {
  Field as LumaField,
  FieldLabel as LumaFieldLabel,
  FieldDescription as LumaFieldDescription,
  FieldError as LumaFieldError,
  FieldGroup as LumaFieldGroup,
  FieldLegend as LumaFieldLegend,
  FieldSeparator as LumaFieldSeparator,
  FieldSet as LumaFieldSet,
  FieldContent as LumaFieldContent,
  FieldTitle as LumaFieldTitle,
} from "../ui-luma/field";

function Field(props: React.ComponentProps<typeof DefaultField>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaField {...props} /> : <DefaultField {...props} />;
}

function FieldLabel(props: React.ComponentProps<typeof DefaultFieldLabel>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaFieldLabel {...props} /> : <DefaultFieldLabel {...props} />;
}

function FieldDescription(props: React.ComponentProps<typeof DefaultFieldDescription>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaFieldDescription {...props} />
  ) : (
    <DefaultFieldDescription {...props} />
  );
}

function FieldError(props: React.ComponentProps<typeof DefaultFieldError>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaFieldError {...props} /> : <DefaultFieldError {...props} />;
}

function FieldGroup(props: React.ComponentProps<typeof DefaultFieldGroup>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaFieldGroup {...props} /> : <DefaultFieldGroup {...props} />;
}

function FieldLegend(props: React.ComponentProps<typeof DefaultFieldLegend>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaFieldLegend {...props} /> : <DefaultFieldLegend {...props} />;
}

function FieldSeparator(props: React.ComponentProps<typeof DefaultFieldSeparator>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaFieldSeparator {...props} />
  ) : (
    <DefaultFieldSeparator {...props} />
  );
}

function FieldSet(props: React.ComponentProps<typeof DefaultFieldSet>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaFieldSet {...props} /> : <DefaultFieldSet {...props} />;
}

function FieldContent(props: React.ComponentProps<typeof DefaultFieldContent>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaFieldContent {...props} /> : <DefaultFieldContent {...props} />;
}

function FieldTitle(props: React.ComponentProps<typeof DefaultFieldTitle>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaFieldTitle {...props} /> : <DefaultFieldTitle {...props} />;
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
};
