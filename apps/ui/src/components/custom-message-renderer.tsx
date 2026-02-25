import type { RenderMessageProps } from "@copilotkit/react-ui";
import type { AssistantMessage } from "@ag-ui/core";
import { useChatKit } from "./chat/chat-kit";
import { useJsonParser } from "@hashbrownai/react";
import { memo } from "react";
import { Squircle } from "./squircle";

function normalizeContent(content: unknown) {
  if (typeof content === "string") return content;
  try {
    return JSON.stringify(content, null, 2);
  } catch {
    return String(content);
  }
}

function toObject(value: unknown): Record<string, unknown> | null {
  if (!value) return null;
  if (typeof value === "object") return value as Record<string, unknown>;
  if (typeof value !== "string") return null;
  try {
    const parsed = JSON.parse(value);
    return typeof parsed === "object" && parsed
      ? (parsed as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

function getLocation(value: unknown): string | null {
  if (!value) return null;
  if (typeof value === "string" && value.trim().length > 0) {
    return value.split(",")[0]?.trim() ?? null;
  }
  if (typeof value !== "object") return null;
  const input = value as Record<string, unknown>;
  const direct =
    getLocation(input.location) ??
    getLocation(input.city) ??
    getLocation(input.place) ??
    getLocation(input.query);
  if (direct) return direct;
  return (
    getLocation(input.args) ??
    getLocation(input.input) ??
    getLocation(input.props)
  );
}

function humanizeToolName(name: string): string {
  return name
    .replace(/[_-]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .trim()
    .toLowerCase();
}

function getToolStatusText(message: RenderMessageProps["message"]): string {
  const toolName = (message as { toolName?: string }).toolName;
  const payload = toObject(message.content);
  const location = getLocation(payload);

  if (toolName?.toLowerCase().includes("weather")) {
    return location ? `Checking weather for ${location}` : "Checking weather";
  }
  if (toolName) {
    return `Running ${humanizeToolName(toolName)}`;
  }
  if (location) {
    return `Checking weather for ${location}`;
  }
  return "Running tool";
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
    <div className="mt-2 flex w-full justify-start">
      <div className="magic-text-output w-full px-1 py-1">
        {kit.render(value)}
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
      <div className="mb-2 flex w-full justify-start">
        <div className="tool-call-enter max-w-[72ch] text-[13px] leading-5 text-[var(--gray)]">
          {getToolStatusText(message)}
          {message.error ? (
            <span className="ml-2 text-[var(--indian-red-dark)]">
              ({message.error})
            </span>
          ) : null}
        </div>
      </div>
    );
  }
  return (
    <div className="flex w-full justify-end">
      <Squircle
        squircle="22"
        borderWidth={0}
        className="w-full max-w-[64ch] bg-[var(--sky-blue-light)] px-4 py-3 text-sm text-[var(--gray-dark)] shadow-[0_12px_26px_-20px_rgba(100,175,181,0.52)]"
      >
        <pre className="whitespace-pre-wrap text-[15px] leading-6 text-[var(--gray-dark)]">
          {normalizeContent(message.content)}
        </pre>
      </Squircle>
    </div>
  );
}
