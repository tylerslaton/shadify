import type { CopilotChatProps } from "@copilotkit/react-core/v2"

const assistantMessageClass = [
  // container
  "w-full max-w-full px-4 py-2 text-[14px] leading-6 text-foreground/90",
  // paragraph spacing
  "[&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0",
  // lists
  "[&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1",
  "[&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1",
  "[&_li]:marker:text-foreground/40",
  "[&_li_p]:my-0",
  // headings
  "[&_h1]:mt-3 [&_h1]:mb-1.5 [&_h1]:text-[15px] [&_h1]:font-semibold [&_h1]:text-foreground",
  "[&_h2]:mt-3 [&_h2]:mb-1.5 [&_h2]:text-[15px] [&_h2]:font-semibold [&_h2]:text-foreground",
  "[&_h3]:mt-2.5 [&_h3]:mb-1 [&_h3]:text-[14px] [&_h3]:font-semibold [&_h3]:text-foreground",
  "[&_strong]:font-semibold [&_strong]:text-foreground",
  "[&_em]:italic",
  // inline code
  "[&_code]:rounded [&_code]:bg-foreground/10 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[12px] [&_code]:text-foreground",
  // code blocks
  "[&_pre]:my-2 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-foreground/10 [&_pre]:bg-foreground/5 [&_pre]:p-3 [&_pre]:text-[12px]",
  "[&_pre_code]:bg-transparent [&_pre_code]:p-0",
  // links
  "[&_a]:text-foreground [&_a]:underline [&_a]:decoration-foreground/30 [&_a]:underline-offset-2 hover:[&_a]:decoration-foreground/60",
  // blockquote
  "[&_blockquote]:my-2 [&_blockquote]:border-l-2 [&_blockquote]:border-foreground/20 [&_blockquote]:pl-3 [&_blockquote]:text-foreground/70",
  // horizontal rule
  "[&_hr]:my-3 [&_hr]:border-foreground/10",
  // tables
  "[&_table]:my-2 [&_table]:w-full [&_table]:border-collapse [&_table]:text-[13px]",
  "[&_th]:border [&_th]:border-foreground/10 [&_th]:bg-foreground/5 [&_th]:px-2 [&_th]:py-1 [&_th]:text-left [&_th]:font-semibold",
  "[&_td]:border [&_td]:border-foreground/10 [&_td]:px-2 [&_td]:py-1",
].join(" ")

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
    assistantMessage: {
      className: assistantMessageClass,
    },
  },
  className: "bg-transparent",
  input: {
    className: "bg-transparent",
  },
  suggestionView: "bg-transparent",
}
