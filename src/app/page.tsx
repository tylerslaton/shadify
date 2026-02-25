"use client";

import { CustomMessageRenderer } from "@/components/custom-message-renderer";
import { AppHeader } from "@/components/app-header";
import { useAgentContext, CopilotChat } from "@copilotkit/react-core/v2";
import { useChatKit } from "@/components/chat/chat-kit";
import { s } from "@hashbrownai/core";

export default function CopilotKitPage() {
  const chatKit = useChatKit();

  useAgentContext({
    description: "output_schema",
    value: s.toJsonSchema(chatKit.schema),
  });

  return (
    <main className="flex h-dvh w-full flex-col overflow-hidden bg-[--background] text-[--foreground]">
      <AppHeader active="chat" title="Weather Assistant" />
      <div className="mx-auto flex min-h-0 h-full w-full max-w-225 flex-col">
        <CopilotChat
          messageView={{
            assistantMessage: (props) => <CustomMessageRenderer {...props} />
          }}
        />
      </div>
    </main>
  );
}
