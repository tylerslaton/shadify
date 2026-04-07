import { useStyle } from "@/lib/style-context";
import { Badge as DefaultBadge, badgeVariants as defaultbadgeVariants } from "../ui-default/badge";
import { Badge as LumaBadge } from "../ui-luma/badge";

function Badge(props: React.ComponentProps<typeof DefaultBadge>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaBadge {...props} /> : <DefaultBadge {...props} />;
}

export { Badge, defaultbadgeVariants as badgeVariants };
