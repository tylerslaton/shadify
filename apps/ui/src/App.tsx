import { CopilotKit } from "@copilotkit/react-core";
import { useAgentContext, CopilotChat } from "@copilotkit/react-core/v2";
import { CustomMessageRenderer } from "@/components/custom-message-renderer";
import { AppHeader } from "@/components/app-header";
import { useChatKit } from "@/components/chat/chat-kit";
import { s } from "@hashbrownai/core";

function Chat() {
  const chatKit = useChatKit();

  useAgentContext({
    description: "output_schema",
    value: s.toJsonSchema(chatKit.schema),
  });

  return (
    <main className="flex h-dvh w-full flex-col overflow-hidden bg-[--background] text-[--foreground]">
      <AppHeader title="Weather Assistant" />
      <div className="mx-auto flex min-h-0 h-full w-full max-w-225 flex-col">
        <CopilotChat
          messageView={{
            assistantMessage: CustomMessageRenderer as any,
          }}
        />
      </div>
    </main>
  );
}

export function App() {
  return (
    <CopilotKit
      runtimeUrl={import.meta.env.VITE_RUNTIME_URL || "/api/copilotkit"}
      agent="sample_agent"
      showDevConsole={false}
    >
      <Chat />
    </CopilotKit>
  );
}
