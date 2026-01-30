"use client";

import { CustomMessageRenderer } from "@/components/custom-message-renderer";
import { useCopilotReadable } from "@copilotkit/react-core";
import { CopilotKitCSSProperties, CopilotChat } from "@copilotkit/react-ui";
import { useState } from "react";
import { useChatKit } from "@/components/chat/chat-kit";
import { s } from "@hashbrownai/core";

export default function CopilotKitPage() {
  const chatKit = useChatKit();
  const [themeColor] = useState("#60a5fa");
  useCopilotReadable({
    description: "output_schema",
    value: s.toJsonSchema(chatKit.schema),
  });

  return (
    <main
      className="relative min-h-screen w-screen bg-slate-950 text-slate-100"
      style={
        {
          "--copilot-kit-primary-color": themeColor,
          "--copilot-kit-contrast-color": "#0b1120",
          "--copilot-kit-background-color": "#0b1120",
          "--copilot-kit-input-background-color": "#111827",
          "--copilot-kit-secondary-color": "#1f2937",
          "--copilot-kit-secondary-contrast-color": "#e2e8f0",
          "--copilot-kit-separator-color": "#1f2937",
          "--copilot-kit-muted-color": "#94a3b8",
          "--copilot-kit-shadow-md": "0 12px 24px -12px rgba(0,0,0,0.6)",
        } as CopilotKitCSSProperties
      }
    >
      <a
        href="/parser"
        className="absolute right-6 top-6 z-10 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-200 transition hover:border-slate-600 hover:text-white"
      >
        Parser Demo
      </a>
      <CopilotChat
        disableSystemMessage={true}
        RenderMessage={CustomMessageRenderer}
        className="h-screen w-screen"
        labels={{
          title: "Popup Assistant",
        }}
      ></CopilotChat>
    </main>
  );
}
