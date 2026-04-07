import { useStyle } from "@/lib/style-context";
import {
  Item as DefaultItem,
  ItemMedia as DefaultItemMedia,
  ItemContent as DefaultItemContent,
  ItemActions as DefaultItemActions,
  ItemGroup as DefaultItemGroup,
  ItemSeparator as DefaultItemSeparator,
  ItemTitle as DefaultItemTitle,
  ItemDescription as DefaultItemDescription,
  ItemHeader as DefaultItemHeader,
  ItemFooter as DefaultItemFooter,
} from "../ui-default/item";
import {
  Item as LumaItem,
  ItemMedia as LumaItemMedia,
  ItemContent as LumaItemContent,
  ItemActions as LumaItemActions,
  ItemGroup as LumaItemGroup,
  ItemSeparator as LumaItemSeparator,
  ItemTitle as LumaItemTitle,
  ItemDescription as LumaItemDescription,
  ItemHeader as LumaItemHeader,
  ItemFooter as LumaItemFooter,
} from "../ui-luma/item";

function Item(props: React.ComponentProps<typeof DefaultItem>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaItem {...props} /> : <DefaultItem {...props} />;
}

function ItemMedia(props: React.ComponentProps<typeof DefaultItemMedia>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaItemMedia {...props} /> : <DefaultItemMedia {...props} />;
}

function ItemContent(props: React.ComponentProps<typeof DefaultItemContent>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaItemContent {...props} /> : <DefaultItemContent {...props} />;
}

function ItemActions(props: React.ComponentProps<typeof DefaultItemActions>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaItemActions {...props} /> : <DefaultItemActions {...props} />;
}

function ItemGroup(props: React.ComponentProps<typeof DefaultItemGroup>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaItemGroup {...props} /> : <DefaultItemGroup {...props} />;
}

function ItemSeparator(props: React.ComponentProps<typeof DefaultItemSeparator>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaItemSeparator {...props} /> : <DefaultItemSeparator {...props} />;
}

function ItemTitle(props: React.ComponentProps<typeof DefaultItemTitle>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaItemTitle {...props} /> : <DefaultItemTitle {...props} />;
}

function ItemDescription(props: React.ComponentProps<typeof DefaultItemDescription>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaItemDescription {...props} />
  ) : (
    <DefaultItemDescription {...props} />
  );
}

function ItemHeader(props: React.ComponentProps<typeof DefaultItemHeader>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaItemHeader {...props} /> : <DefaultItemHeader {...props} />;
}

function ItemFooter(props: React.ComponentProps<typeof DefaultItemFooter>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaItemFooter {...props} /> : <DefaultItemFooter {...props} />;
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
};
