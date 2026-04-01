import { useStyle } from "@/lib/style-context";
import { CodeBlock as DefaultCodeBlock } from "../ui-default/code-block";
import { CodeBlock as LumaCodeBlock } from "../ui-luma/code-block";

function CodeBlock(props: React.ComponentProps<typeof DefaultCodeBlock>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaCodeBlock {...props} /> : <DefaultCodeBlock {...props} />;
}

export { CodeBlock };
