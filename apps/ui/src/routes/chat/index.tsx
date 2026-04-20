import { useAgentContext, CopilotChat } from "@copilotkit/react-core/v2";
import { s } from "@hashbrownai/core";

import { AppHeader } from "@/components/app-header";
import { useChatKit } from "@/components/chat/chat-kit";
import { chatTheme } from "@/lib/chat-theme";
import { useInitialSuggestions } from "@/lib/suggestions";

export function ChatRoute() {
  const chatKit = useChatKit();
  useAgentContext({ description: "output_schema", value: s.toJsonSchema(chatKit.schema) });
  useInitialSuggestions();

  return (
    <main className="relative z-10 flex h-dvh w-full flex-col overflow-hidden text-[--foreground]">
      <AppHeader title="Shadify" />
      <div className="w-full h-[calc(100vh-60px)]">
        <CopilotChat {...chatTheme} />
      </div>
    </main>
  );
}
