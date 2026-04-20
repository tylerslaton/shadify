import * as React from "react";

import { PreviewSwitcher } from "@/routes/create/components/preview-switcher";
import { InlinePreview } from "@/routes/create/preview/inline-preview";

export function Preview() {
  // Local dark-mode toggle for the preview — scoped to the DesignSystemProvider
  // wrapper, independent of the app's global next-themes setting.
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "d" || event.key === "D") {
        const target = event.target as HTMLElement | null;
        if (target?.matches("input, textarea, [contenteditable='true']")) return;
        setIsDark((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="relative flex flex-1 flex-col justify-center overflow-hidden rounded-2xl ring ring-foreground/10 md:ring-muted dark:ring-foreground/10">
      <div className="relative z-0 mx-auto flex w-full flex-1 flex-col overflow-hidden">
        <div className="absolute inset-0 bg-muted dark:bg-muted/30" />
        <div className="relative z-10 flex size-full flex-1 overflow-hidden">
          <InlinePreview isDark={isDark} />
        </div>
      </div>
      <PreviewSwitcher />
    </div>
  );
}

// Legacy export for components that still reference the old iframe message
// constant; they no longer dispatch. Safe to delete in Phase I polish.
export const CMD_K_FORWARD_TYPE = "cmd-k-forward" as const;
