"use client";

import { ProverbsCard } from "@/components/proverbs";
import { WeatherCard } from "@/components/weather";
import { CustomMessageRenderer } from "@/components/custom-message-renderer";
import {
  useCoAgent,
  useCopilotReadable,
  useDefaultTool,
  useRenderToolCall,
} from "@copilotkit/react-core";
import { CopilotKitCSSProperties, CopilotChat } from "@copilotkit/react-ui";
import { useMemo, useState } from "react";
import { useChatKit } from "@/components/chat/chat-kit";
import { s } from "@hashbrownai/core";

export default function CopilotKitPage() {
  const chatKit = useChatKit();
  const [themeColor, setThemeColor] = useState("#6366f1");
  const schema = useMemo(
    () =>
      s.toJsonSchema(
        s.object("Result", {
          ui: s.streaming.array("UI Elements", chatKit.schema),
        }),
      ),
    [chatKit.schema],
  );
  useCopilotReadable({ description: "output_schema", value: schema });

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

function YourMainContent({ themeColor }: { themeColor: string }) {
  // 🪁 Shared State: https://docs.copilotkit.ai/pydantic-ai/shared-state
  const { state, setState } = useCoAgent({
    name: "sample_agent",
  });

  //🪁 Generative UI: https://docs.copilotkit.ai/pydantic-ai/generative-ui
  useRenderToolCall(
    {
      name: "get_weather",
      description: "Get the weather for a given location.",
      parameters: [{ name: "location", type: "string", required: true }],
      render: ({ args }) => {
        return <WeatherCard location={args.location} themeColor={themeColor} />;
      },
    },
    [themeColor],
  );

  useDefaultTool({
    render: ({ name, status }) => {
      const textStyles = "text-gray-500 text-sm mt-2";
      if (status !== "complete") {
        return <p className={textStyles}>Calling {name}...</p>;
      }
      return <p className={textStyles}>Called {name}!</p>;
    },
  });

  return (
    <div
      style={{ backgroundColor: themeColor }}
      className="h-screen flex justify-center items-center flex-col transition-colors duration-300"
    >
      <ProverbsCard state={state} setState={setState} />
    </div>
  );
}
