import { useStyle } from "@/lib/style-context";
import {
  DirectionProvider as DefaultDirectionProvider,
  useDirection as defaultuseDirection,
} from "../ui-default/direction";
import { DirectionProvider as LumaDirectionProvider } from "../ui-luma/direction";

function DirectionProvider(props: React.ComponentProps<typeof DefaultDirectionProvider>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaDirectionProvider {...props} />
  ) : (
    <DefaultDirectionProvider {...props} />
  );
}

export { DirectionProvider, defaultuseDirection as useDirection };
