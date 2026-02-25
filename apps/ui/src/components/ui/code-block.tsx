import { Highlight, themes } from "prism-react-renderer";

function CodeBlock({
  code,
  language = "tsx",
}: {
  code: string;
  language?: string;
}) {
  return (
    <Highlight theme={themes.github} code={code.trim()} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} overflow-x-auto rounded-lg border border-[var(--border)] p-4 text-sm leading-relaxed`}
          style={{ ...style, backgroundColor: "rgba(255,255,255,0.6)" }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              <span className="mr-4 inline-block w-8 select-none text-right text-[var(--gray-light)]">
                {i + 1}
              </span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

export { CodeBlock };
