import { useStyle } from "@/lib/style-context";
import {
  ToggleGroup as DefaultToggleGroup,
  ToggleGroupItem as DefaultToggleGroupItem,
} from "../ui-default/toggle-group";
import {
  ToggleGroup as LumaToggleGroup,
  ToggleGroupItem as LumaToggleGroupItem,
} from "../ui-luma/toggle-group";

function ToggleGroup(props: React.ComponentProps<typeof DefaultToggleGroup>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaToggleGroup {...props} /> : <DefaultToggleGroup {...props} />;
}

function ToggleGroupItem(props: React.ComponentProps<typeof DefaultToggleGroupItem>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaToggleGroupItem {...props} />
  ) : (
    <DefaultToggleGroupItem {...props} />
  );
}

export { ToggleGroup, ToggleGroupItem };
