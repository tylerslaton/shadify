import { Suspense, useEffect, useState } from "react";
import { CopilotChat } from "@copilotkit/react-core/v2";
import { MessageCircleIcon, SparklesIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";

import { createChatTheme } from "@/routes/create/agent-bridge/chat-theme";
import { CreateLayout } from "@/routes/create/layout";
import { Customizer } from "@/routes/create/components/customizer";
import { PresetHandler } from "@/routes/create/components/preset-handler";
import { Preview } from "@/routes/create/components/preview";
import { WelcomeDialog } from "@/routes/create/components/welcome-dialog";
import { useDesignSystemCoAgent } from "@/routes/create/agent-bridge/use-design-system-coagent";
import { CustomComponentProvider } from "@/routes/create/hooks/use-custom-component";
import { getAllItems } from "@/routes/create/lib/api";

type ItemsByBase = Awaited<ReturnType<typeof getAllItems>>;

export function CreateRoute() {
  return (
    <CreateLayout>
      <CustomComponentProvider>
        <CreatePage />
      </CustomComponentProvider>
    </CreateLayout>
  );
}

function ChatPanelHeader({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-foreground/10 px-5">
      <div className="flex items-center gap-2.5">
        <span className="flex size-7 items-center justify-center rounded-md bg-foreground/5 text-foreground/80">
          <SparklesIcon className="size-3.5" />
        </span>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-medium">Theme Assistant</span>
          <span className="text-[11px] text-muted-foreground">
            Ask to tweak tokens, fonts, or layout
          </span>
        </div>
      </div>
      {onClose ? (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onClose}
          aria-label="Close chat"
        >
          <XIcon className="size-4" />
        </Button>
      ) : null}
    </div>
  );
}

function ChatBody() {
  return (
    <div
      data-sidebar-chat
      className="chat-page min-h-0 flex-1 overflow-hidden"
    >
      <CopilotChat {...createChatTheme} />
    </div>
  );
}

function CreatePage() {
  useDesignSystemCoAgent();
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="relative z-10 flex h-dvh min-h-0 w-full overflow-hidden section-soft [--customizer-width:--spacing(48)] [--chat-panel-width:--spacing(96)] [--gap:--spacing(3)] md:[--gap:--spacing(6)] 2xl:[--customizer-width:--spacing(56)]">
      <aside
        data-slot="chat-panel"
        className="hidden h-full min-h-0 shrink-0 flex-col border-r border-foreground/10 bg-background/60 backdrop-blur-xl lg:flex lg:w-(--chat-panel-width)"
      >
        <ChatPanelHeader />
        <ChatBody />
      </aside>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div
          data-slot="designer"
          className="flex min-h-0 flex-1 flex-col gap-(--gap) p-(--gap) pt-[calc(var(--gap)*0.25)] md:flex-row"
        >
          <Preview />
          <Suspense
            fallback={
              <Skeleton className="isolate min-h-[151px] w-full self-start rounded-2xl md:h-full md:max-h-full md:min-h-0 md:w-(--customizer-width)" />
            }
          >
            <CustomizerLoader />
          </Suspense>
        </div>
        <PresetHandler />
        <WelcomeDialog />
      </div>

      {/* Mobile/tablet chat: floating trigger + Sheet */}
      <Sheet open={chatOpen} onOpenChange={setChatOpen}>
        <SheetTrigger asChild>
          <Button
            size="icon-lg"
            aria-label="Open theme assistant"
            className="fixed bottom-4 left-4 z-30 size-12 rounded-full shadow-xl backdrop-blur-sm lg:hidden"
          >
            <MessageCircleIcon className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          showCloseButton={false}
          className="flex w-full max-w-[420px] flex-col gap-0 p-0 sm:max-w-[420px]"
        >
          <SheetTitle className="sr-only">Theme Assistant</SheetTitle>
          <ChatPanelHeader onClose={() => setChatOpen(false)} />
          <ChatBody />
        </SheetContent>
      </Sheet>
    </div>
  );
}

function CustomizerLoader() {
  const [itemsByBase, setItemsByBase] = useState<ItemsByBase | null>(null);

  useEffect(() => {
    let cancelled = false;
    getAllItems().then((items) => {
      if (!cancelled) setItemsByBase(items);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!itemsByBase) {
    return (
      <Skeleton className="isolate min-h-[151px] w-full self-start rounded-2xl md:h-full md:max-h-full md:min-h-0 md:w-(--customizer-width)" />
    );
  }

  return <Customizer itemsByBase={itemsByBase} />;
}
