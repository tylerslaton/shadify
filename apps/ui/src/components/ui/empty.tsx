import { useStyle } from "@/lib/style-context";
import {
  Empty as DefaultEmpty,
  EmptyHeader as DefaultEmptyHeader,
  EmptyTitle as DefaultEmptyTitle,
  EmptyDescription as DefaultEmptyDescription,
  EmptyContent as DefaultEmptyContent,
  EmptyMedia as DefaultEmptyMedia,
} from "../ui-default/empty";
import {
  Empty as LumaEmpty,
  EmptyHeader as LumaEmptyHeader,
  EmptyTitle as LumaEmptyTitle,
  EmptyDescription as LumaEmptyDescription,
  EmptyContent as LumaEmptyContent,
  EmptyMedia as LumaEmptyMedia,
} from "../ui-luma/empty";

function Empty(props: React.ComponentProps<typeof DefaultEmpty>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaEmpty {...props} /> : <DefaultEmpty {...props} />;
}

function EmptyHeader(props: React.ComponentProps<typeof DefaultEmptyHeader>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaEmptyHeader {...props} /> : <DefaultEmptyHeader {...props} />;
}

function EmptyTitle(props: React.ComponentProps<typeof DefaultEmptyTitle>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaEmptyTitle {...props} /> : <DefaultEmptyTitle {...props} />;
}

function EmptyDescription(props: React.ComponentProps<typeof DefaultEmptyDescription>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaEmptyDescription {...props} />
  ) : (
    <DefaultEmptyDescription {...props} />
  );
}

function EmptyContent(props: React.ComponentProps<typeof DefaultEmptyContent>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaEmptyContent {...props} /> : <DefaultEmptyContent {...props} />;
}

function EmptyMedia(props: React.ComponentProps<typeof DefaultEmptyMedia>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaEmptyMedia {...props} /> : <DefaultEmptyMedia {...props} />;
}

export { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia };
