"use client";

import { CustomMessageRenderer } from "@/components/custom-message-renderer";
import { AppHeader } from "@/components/app-header";
import { useAgentContext } from "@copilotkit/react-core/v2";
import { CopilotKitCSSProperties, CopilotChat } from "@copilotkit/react-ui";
import { useChatKit } from "@/components/chat/chat-kit";
import { s } from "@hashbrownai/core";

export default function CopilotKitPage() {
  const chatKit = useChatKit();

  useAgentContext({
    description: "output_schema",
    value: s.toJsonSchema(chatKit.schema),
  });

  return (
    <main
      className="flex h-dvh w-full flex-col overflow-hidden bg-[var(--background)] text-[var(--foreground)]"
      style={
        {
          "--copilot-kit-primary-color": "var(--sunset-orange)",
          "--copilot-kit-contrast-color": "var(--gray-dark)",
          "--copilot-kit-background-color": "var(--vanilla-ivory)",
          "--copilot-kit-input-background-color": "white",
          "--copilot-kit-secondary-color": "var(--sky-blue-light)",
          "--copilot-kit-secondary-contrast-color": "var(--gray-dark)",
          "--copilot-kit-separator-color": "rgba(164,163,161,0.28)",
          "--copilot-kit-muted-color": "var(--gray)",
          "--copilot-kit-shadow-md":
            "0 16px 32px -20px rgba(119, 70, 37, 0.32)",
        } as CopilotKitCSSProperties
      }
    >
      <AppHeader active="chat" title="Weather Assistant" />
      <div className="mx-auto flex min-h-0 h-full w-full max-w-[900px] flex-col">
        <CopilotChat
          disableSystemMessage={true}
          RenderMessage={CustomMessageRenderer}
          className="chat-page min-h-0 h-full w-full flex-1 overflow-hidden"
          labels={{
            title: "Popup Assistant",
          }}
        />
      </div>
    </main>
  );
}
