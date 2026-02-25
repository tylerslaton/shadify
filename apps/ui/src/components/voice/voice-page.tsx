import { FrenchfryProvider, VoiceAgent } from "@frenchfryai/react";
import { useTool } from "@hashbrownai/react";
import { s } from "@hashbrownai/core";
import { AppHeader } from "@/components/app-header";
import { CopilotChat, useAgent, useCopilotKit } from "@copilotkit/react-core/v2";
import { CustomMessageRenderer } from "../custom-message-renderer";

const SESSION_ENDPOINT = "http://localhost:4000/realtime/session";

function VoiceAgentWithTools() {
  const { agent } = useAgent({
    agentId: "sample_agent"
  })

  const { copilotkit } = useCopilotKit();

  const generateUi = useTool({
    name: "generate_ui",
    description:
      "Send a message to the UI generation agent to create or modify the user interface. Use this tool whenever the user asks you to build, design, or change something visual.",
    schema: s.object("Input for the UI generation tool", {
      message: s.string(
        "The instruction for what UI to generate or modify",
      ),
    }),
    handler: async (input) => {
      // TODO: Wire this up to CopilotKit
      agent.addMessage({
        role: "user",
        id: crypto.randomUUID(),
        content: input.message,
      })
      await copilotkit.runAgent({ agent })

      console.log("[generate_ui] called with:", input.message);
      return { success: true, message: input.message };
    },
    deps: [],
  });

  return (
    <VoiceAgent
      sessionEndpoint={SESSION_ENDPOINT}
      session={{ model: "gpt-4o-realtime-preview", type: "realtime" }}
      tools={[generateUi]}
    >
      {(agent) => {
        const active = agent.isRunning || agent.status === "connecting";
        const loading = agent.status === "connecting" || agent.status === "stopping";

        return (
          <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center">
            <button
              onClick={active ? agent.stop : agent.start}
              disabled={loading}
              className="pointer-events-auto flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-sm font-medium shadow-lg backdrop-blur-sm transition-all duration-200 ease-out disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer hover:scale-105 hover:shadow-xl active:scale-95"
              style={{
                backgroundColor: active
                  ? "var(--indian-red)"
                  : "var(--vanilla-ivory)",
                color: active ? "white" : "var(--chocolate-brown)",
                borderColor: active
                  ? "var(--indian-red-dark)"
                  : "var(--chocolate-brown-light)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = active
                  ? "var(--indian-red-dark)"
                  : "var(--sunshine-yellow-light)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = active
                  ? "var(--indian-red)"
                  : "var(--vanilla-ivory)";
              }}
            >
              {active ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="1" width="12" height="12" rx="2" fill="currentColor" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 1.5v11l9.5-5.5L3 1.5z" fill="currentColor" />
                </svg>
              )}
              {agent.status === "connecting" && "Connecting..."}
              {agent.status === "stopping" && "Stopping..."}
              {agent.status === "running" && "Listening"}
              {agent.status === "idle" && "Start voice"}
              {agent.status === "error" && "Retry"}
            </button>
          </div>
        );
      }}
    </VoiceAgent>
  );
}

export function VoicePage() {
  return (
    <FrenchfryProvider>
      <main className="relative z-10 flex h-dvh w-full flex-col overflow-hidden text-[--foreground]">
        <AppHeader title="Shadify Voice" />
        <div className="mx-auto flex min-h-0 h-full w-full max-w-3xl flex-col px-4">
          <VoiceAgentWithTools />
          <CopilotChat
            messageView={{
              userMessage: () => <></>,
              assistantMessage: CustomMessageRenderer as any,
            }}
            input={() => <></>}
            welcomeScreen={() => <></>}
          />
        </div>
      </main>
    </FrenchfryProvider>
  );
}
