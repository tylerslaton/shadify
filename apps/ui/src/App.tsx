import { useState, useEffect } from "react";
import { CopilotKit } from "@copilotkit/react-core";
import { useAgentContext, CopilotChat } from "@copilotkit/react-core/v2";
import { CustomMessageRenderer } from "@/components/custom-message-renderer";
import { AppHeader } from "@/components/app-header";
import { useChatKit } from "@/components/chat/chat-kit";
import { VoicePage } from "@/components/voice/voice-page";
import { s } from "@hashbrownai/core";

function Chat() {
  return (
    <main className="relative z-10 flex h-dvh w-full flex-col overflow-hidden text-[--foreground]">
      <AppHeader title="Shadify" />
      <div className="mx-auto flex min-h-0 h-full w-full max-w-3xl flex-col px-4">
        <CopilotChat
          messageView={{
            assistantMessage: CustomMessageRenderer as any,
          }}
        />
      </div>
    </main>
  );
}

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return hash;
}

export function App() {
  return (
    <CopilotKit
      runtimeUrl={import.meta.env.VITE_RUNTIME_URL || "/api/copilotkit"}
      agent="sample_agent"
      showDevConsole={false}
    >
      <Page />
    </CopilotKit>
  );
}

export function Page() {
  const hash = useHashRoute();
  const chatKit = useChatKit();

  useAgentContext({
    description: "output_schema",
    value: s.toJsonSchema(chatKit.schema),
  });

  return hash === "#/voice" ? <VoicePage /> : <Chat />
}
