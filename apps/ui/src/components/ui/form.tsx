import { useStyle } from "@/lib/style-context";
import {
  Form as DefaultForm,
  FormItem as DefaultFormItem,
  FormLabel as DefaultFormLabel,
  FormControl as DefaultFormControl,
  FormDescription as DefaultFormDescription,
  FormMessage as DefaultFormMessage,
  FormField as DefaultFormField,
  useFormField as defaultuseFormField,
} from "../ui-default/form";
import {
  Form as LumaForm,
  FormItem as LumaFormItem,
  FormLabel as LumaFormLabel,
  FormControl as LumaFormControl,
  FormDescription as LumaFormDescription,
  FormMessage as LumaFormMessage,
  FormField as LumaFormField,
} from "../ui-luma/form";

function Form(props: React.ComponentProps<typeof DefaultForm>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaForm {...props} /> : <DefaultForm {...props} />;
}

function FormItem(props: React.ComponentProps<typeof DefaultFormItem>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaFormItem {...props} /> : <DefaultFormItem {...props} />;
}

function FormLabel(props: React.ComponentProps<typeof DefaultFormLabel>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaFormLabel {...props} /> : <DefaultFormLabel {...props} />;
}

function FormControl(props: React.ComponentProps<typeof DefaultFormControl>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaFormControl {...props} /> : <DefaultFormControl {...props} />;
}

function FormDescription(props: React.ComponentProps<typeof DefaultFormDescription>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaFormDescription {...props} />
  ) : (
    <DefaultFormDescription {...props} />
  );
}

function FormMessage(props: React.ComponentProps<typeof DefaultFormMessage>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaFormMessage {...props} /> : <DefaultFormMessage {...props} />;
}

function FormField(props: React.ComponentProps<typeof DefaultFormField>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaFormField {...props} /> : <DefaultFormField {...props} />;
}

export {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  defaultuseFormField as useFormField,
};
