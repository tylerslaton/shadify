import { Suspense, useEffect, useState } from "react";
import { CopilotChat } from "@copilotkit/react-core/v2";

import { Skeleton } from "@/components/ui/skeleton";

import { createChatTheme } from "@/routes/create/agent-bridge/chat-theme";
import { CreateLayout } from "@/routes/create/layout";
import { Customizer } from "@/routes/create/components/customizer";
import { PresetHandler } from "@/routes/create/components/preset-handler";
import { Preview } from "@/routes/create/components/preview";
import { WelcomeDialog } from "@/routes/create/components/welcome-dialog";
import { useDesignSystemCoAgent } from "@/routes/create/agent-bridge/use-design-system-coagent";
import { getAllItems } from "@/routes/create/lib/api";

type ItemsByBase = Awaited<ReturnType<typeof getAllItems>>;

export function CreateRoute() {
  return (
    <CreateLayout>
      <CreatePage />
    </CreateLayout>
  );
}

function CreatePage() {
  useDesignSystemCoAgent();

  return (
    <div className="relative z-10 flex h-dvh min-h-0 w-full overflow-hidden section-soft [--customizer-width:--spacing(48)] [--chat-panel-width:--spacing(96)] [--gap:--spacing(4)] md:[--gap:--spacing(6)] 2xl:[--customizer-width:--spacing(56)]">
      <aside
        data-slot="chat-panel"
        className="hidden h-full min-h-0 shrink-0 flex-col border-r border-foreground/10 bg-background/60 backdrop-blur-xl md:flex md:w-(--chat-panel-width)"
      >
        <div className="flex h-12 shrink-0 items-center border-b border-foreground/10 px-4 text-sm font-medium">
          Theme Assistant
        </div>
        <div className="min-h-0 flex-1 overflow-hidden chat-page">
          <CopilotChat {...createChatTheme} />
        </div>
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
