import { useStyle } from "@/lib/style-context";
import { SimpleSelect as DefaultSimpleSelect } from "../ui-default/simple-select";
import { SimpleSelect as LumaSimpleSelect } from "../ui-luma/simple-select";

function SimpleSelect(props: React.ComponentProps<typeof DefaultSimpleSelect>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaSimpleSelect {...props} /> : <DefaultSimpleSelect {...props} />;
}

export { SimpleSelect };
