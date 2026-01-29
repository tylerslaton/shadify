"use client";

import { CustomMessageRenderer } from "@/components/custom-message-renderer";
import { useCopilotReadable } from "@copilotkit/react-core";
import { CopilotKitCSSProperties, CopilotChat } from "@copilotkit/react-ui";
import { useState } from "react";
import { useChatKit } from "@/components/chat/chat-kit";
import { s } from "@hashbrownai/core";

export default function CopilotKitPage() {
  const chatKit = useChatKit();
  const [themeColor] = useState("#6366f1");
  useCopilotReadable({
    description: "output_schema",
    value: s.toJsonSchema(chatKit.schema),
  });

  return (
    <main
      style={
        { "--copilot-kit-primary-color": themeColor } as CopilotKitCSSProperties
      }
    >
      <CopilotChat
        disableSystemMessage={true}
        RenderMessage={CustomMessageRenderer}
        labels={{
          title: "Popup Assistant",
        }}
      ></CopilotChat>
    </main>
  );
}
