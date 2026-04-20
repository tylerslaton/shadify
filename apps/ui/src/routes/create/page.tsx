import { Suspense, useEffect, useState } from "react";
import { CopilotSidebar } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

import { Skeleton } from "@/components/ui/skeleton";

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
    <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden section-soft [--customizer-width:--spacing(48)] [--gap:--spacing(4)] md:[--gap:--spacing(6)] 2xl:[--customizer-width:--spacing(56)]">
      <div
        data-slot="designer"
        className="flex min-h-0 flex-1 flex-col gap-(--gap) p-(--gap) pt-[calc(var(--gap)*0.25)] md:flex-row-reverse"
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
      <CopilotSidebar
        defaultOpen={false}
        labels={{
          title: "Theme Assistant",
          initial:
            "Hi! I can tune this design system for you. Try: \"make it pink with a serif body font\" or \"use the radix base with hugeicons and a bold menu accent\".",
        }}
      />
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
