import { useStyle } from "@/lib/style-context";
import {
  Avatar as DefaultAvatar,
  AvatarImage as DefaultAvatarImage,
  AvatarFallback as DefaultAvatarFallback,
  AvatarBadge as DefaultAvatarBadge,
  AvatarGroup as DefaultAvatarGroup,
  AvatarGroupCount as DefaultAvatarGroupCount,
} from "../ui-default/avatar";
import {
  Avatar as LumaAvatar,
  AvatarImage as LumaAvatarImage,
  AvatarFallback as LumaAvatarFallback,
  AvatarBadge as LumaAvatarBadge,
  AvatarGroup as LumaAvatarGroup,
  AvatarGroupCount as LumaAvatarGroupCount,
} from "../ui-luma/avatar";

function Avatar(props: React.ComponentProps<typeof DefaultAvatar>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaAvatar {...props} /> : <DefaultAvatar {...props} />;
}

function AvatarImage(props: React.ComponentProps<typeof DefaultAvatarImage>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaAvatarImage {...props} /> : <DefaultAvatarImage {...props} />;
}

function AvatarFallback(props: React.ComponentProps<typeof DefaultAvatarFallback>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaAvatarFallback {...props} />
  ) : (
    <DefaultAvatarFallback {...props} />
  );
}

function AvatarBadge(props: React.ComponentProps<typeof DefaultAvatarBadge>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaAvatarBadge {...props} /> : <DefaultAvatarBadge {...props} />;
}

function AvatarGroup(props: React.ComponentProps<typeof DefaultAvatarGroup>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaAvatarGroup {...props} /> : <DefaultAvatarGroup {...props} />;
}

function AvatarGroupCount(props: React.ComponentProps<typeof DefaultAvatarGroupCount>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaAvatarGroupCount {...props} />
  ) : (
    <DefaultAvatarGroupCount {...props} />
  );
}

export { Avatar, AvatarImage, AvatarFallback, AvatarBadge, AvatarGroup, AvatarGroupCount };
