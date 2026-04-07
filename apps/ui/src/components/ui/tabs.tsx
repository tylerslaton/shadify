import { useStyle } from "@/lib/style-context";
import {
  Tabs as DefaultTabs,
  TabsList as DefaultTabsList,
  TabsTrigger as DefaultTabsTrigger,
  TabsContent as DefaultTabsContent,
  tabsListVariants as defaulttabsListVariants,
} from "../ui-default/tabs";
import {
  Tabs as LumaTabs,
  TabsList as LumaTabsList,
  TabsTrigger as LumaTabsTrigger,
  TabsContent as LumaTabsContent,
} from "../ui-luma/tabs";

function Tabs(props: React.ComponentProps<typeof DefaultTabs>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaTabs {...props} /> : <DefaultTabs {...props} />;
}

function TabsList(props: React.ComponentProps<typeof DefaultTabsList>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaTabsList {...props} /> : <DefaultTabsList {...props} />;
}

function TabsTrigger(props: React.ComponentProps<typeof DefaultTabsTrigger>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaTabsTrigger {...props} /> : <DefaultTabsTrigger {...props} />;
}

function TabsContent(props: React.ComponentProps<typeof DefaultTabsContent>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaTabsContent {...props} /> : <DefaultTabsContent {...props} />;
}

export { Tabs, TabsList, TabsTrigger, TabsContent, defaulttabsListVariants as tabsListVariants };
