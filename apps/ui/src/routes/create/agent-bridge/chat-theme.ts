import type { CopilotChatProps } from "@copilotkit/react-core/v2"

// /create-specific chat theme. Unlike the hashbrown-driven chatTheme used on
// /chat, this relies on CopilotKit's default assistant message renderer so
// that tool-call cards registered via useDefaultRenderTool show up inline.
export const createChatTheme: CopilotChatProps = {
  messageView: {
    className:
      "bg-transparent [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']",
    userMessage: {
      className: "bg-transparent",
    },
  },
  className: "bg-transparent",
  input: {
    className: "bg-transparent",
  },
  suggestionView: "bg-transparent",
}
