import type { RenderMessageProps } from "@copilotkit/react-ui";
import type { AssistantMessage } from "@ag-ui/core";
import { useChatKit } from "./chat/chat-kit";
import { useJsonParser } from "@hashbrownai/react";
import { memo, useEffect, useMemo, useRef } from "react";
import { s } from "@hashbrownai/core";

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
  const lastSeenValueRef = useRef<string>("");
  const schema = useMemo(
    () =>
      s.object("Result", {
        ui: s.streaming.array("UI Elements", kit.schema),
      }),
    [kit.schema],
  );
  const { value, parseChunk } = useJsonParser(schema);

  useEffect(() => {
    const content = message.content;
    if (!content) return;

    const chunk = content.slice(lastSeenValueRef.current.length);

    parseChunk(chunk);

    lastSeenValueRef.current = content;
  }, [message.content, parseChunk]);

  return (
    <div className="rounded-md border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-800">
      <div className="text-[11px] uppercase tracking-wide text-slate-500">
        Assistant
      </div>
      <pre className="mt-1 whitespace-pre-wrap">
        {kit.render(value?.ui ?? [])}
      </pre>
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
