import { useStyle } from "@/lib/style-context";
import {
  ResizableHandle as DefaultResizableHandle,
  ResizablePanel as DefaultResizablePanel,
  ResizablePanelGroup as DefaultResizablePanelGroup,
} from "../ui-default/resizable";
import {
  ResizableHandle as LumaResizableHandle,
  ResizablePanel as LumaResizablePanel,
  ResizablePanelGroup as LumaResizablePanelGroup,
} from "../ui-luma/resizable";

function ResizableHandle(props: React.ComponentProps<typeof DefaultResizableHandle>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaResizableHandle {...props} />
  ) : (
    <DefaultResizableHandle {...props} />
  );
}

function ResizablePanel(props: React.ComponentProps<typeof DefaultResizablePanel>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaResizablePanel {...props} />
  ) : (
    <DefaultResizablePanel {...props} />
  );
}

function ResizablePanelGroup(props: React.ComponentProps<typeof DefaultResizablePanelGroup>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaResizablePanelGroup {...props} />
  ) : (
    <DefaultResizablePanelGroup {...props} />
  );
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
