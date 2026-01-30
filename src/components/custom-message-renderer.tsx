import type { RenderMessageProps } from "@copilotkit/react-ui";
import type { AssistantMessage } from "@ag-ui/core";
import { useChatKit } from "./chat/chat-kit";
import { useJsonParser } from "@hashbrownai/react";
import { memo } from "react";

function normalizeContent(content: unknown) {
  if (typeof content === "string") return content;
  try {
    return JSON.stringify(content, null, 2);
  } catch {
    return String(content);
  }
}

const AssistantMessageRenderer = memo(function AssistantMessageRenderer({
  message,
}: {
  message: AssistantMessage;
}) {
  const kit = useChatKit();
  const { value, parserState } = useJsonParser(
    message.content ?? "",
    kit.schema,
  );

  if (parserState.isComplete) console.log(message.content);

  if (!value) return null;

  return (
    <div className="flex w-full justify-start mt-2">
      <div className="w-full max-w-[72ch] rounded-2xl border border-emerald-300/40 bg-emerald-950/80 px-4 py-3 text-sm text-white shadow-lg shadow-emerald-500/20">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald-100">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-200" />
          Assistant
        </div>
        <div className="mt-2 whitespace-pre-wrap text-[15px] font-medium leading-6 text-white [&_*]:text-white">
          {kit.render(value)}
        </div>
      </div>
    </div>
  );
});

export function CustomMessageRenderer({ message }: RenderMessageProps) {
  if (message.role === "assistant") {
    return <AssistantMessageRenderer message={message} />;
  }
  if (message.role === "tool") {
    return (
      <div className="flex w-full justify-start mb-3">
        <div className="w-full max-w-[72ch] rounded-2xl border border-sky-500/30 bg-sky-500/10 px-4 py-3 text-xs text-sky-50 shadow-lg shadow-sky-500/10 backdrop-blur">
          <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-sky-200/80">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
              Tool Result
            </span>
            <span className="text-[9px] text-sky-300/70">
              call {message.toolCallId}
            </span>
          </div>
          <pre className="mt-2 whitespace-pre-wrap rounded-lg bg-slate-950/60 p-3 text-[12px] leading-5 text-sky-100/90">
            {normalizeContent(message.content)}
          </pre>
          {message.error ? (
            <div className="mt-2 rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-[11px] text-rose-100">
              {message.error}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
  return (
    <div className="flex w-full justify-end">
      <div className="w-full max-w-[64ch] rounded-2xl border border-slate-700/80 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 shadow-lg shadow-slate-950/30 backdrop-blur">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
          User
        </div>
        <pre className="mt-2 whitespace-pre-wrap text-[15px] leading-6 text-slate-100">
          {normalizeContent(message.content)}
        </pre>
      </div>
    </div>
  );
}
