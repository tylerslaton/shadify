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
  const { value } = useJsonParser(message.content ?? "", kit.schema);

  if (!value) return null;

  return (
    <div className="rounded-md border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-800">
      <div className="text-[11px] uppercase tracking-wide text-slate-500">
        Assistant
      </div>
      <pre className="mt-1 whitespace-pre-wrap">{kit.render(value)}</pre>
    </div>
  );
});

export function CustomMessageRenderer({ message }: RenderMessageProps) {
  if (message.role === "assistant") {
    return <AssistantMessageRenderer message={message} />;
  }
  return (
    <div className="rounded-md border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-800">
      <div className="text-[11px] uppercase tracking-wide text-slate-500">
        User
      </div>
      <pre className="mt-1 whitespace-pre-wrap">
        {normalizeContent(message.content)}
      </pre>
    </div>
  );
}
