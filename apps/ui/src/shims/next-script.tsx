import * as React from "react";

type NextScriptProps = {
  id?: string;
  src?: string;
  strategy?: "beforeInteractive" | "afterInteractive" | "lazyOnload" | "worker";
  onLoad?: () => void;
  onReady?: () => void;
  onError?: (err: unknown) => void;
  children?: React.ReactNode;
} & React.ScriptHTMLAttributes<HTMLScriptElement>;

const NextScript = React.forwardRef<HTMLScriptElement, NextScriptProps>(function NextScript(
  { id, strategy, onReady, children, dangerouslySetInnerHTML, ...rest },
  ref,
) {
  React.useEffect(() => {
    if (typeof children === "string" && !document.getElementById(id ?? "")) {
      const script = document.createElement("script");
      if (id) script.id = id;
      script.textContent = children;
      document.body.appendChild(script);
      onReady?.();
      return () => {
        script.remove();
      };
    }
  }, [children, id, onReady]);

  if (dangerouslySetInnerHTML) {
    return <script ref={ref} id={id} dangerouslySetInnerHTML={dangerouslySetInnerHTML} {...rest} />;
  }
  return null;
});

export default NextScript;
