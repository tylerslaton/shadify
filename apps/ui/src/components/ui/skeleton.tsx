import { useStyle } from "@/lib/style-context";
import { Skeleton as DefaultSkeleton } from "../ui-default/skeleton";
import { Skeleton as LumaSkeleton } from "../ui-luma/skeleton";

function Skeleton(props: React.ComponentProps<typeof DefaultSkeleton>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaSkeleton {...props} /> : <DefaultSkeleton {...props} />;
}

export { Skeleton };
