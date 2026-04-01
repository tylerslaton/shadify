import { useStyle } from "@/lib/style-context";

export function AppHeader({ title }: { title: string }) {
  const { style, setStyle } = useStyle();

  return (
    <header className="relative flex items-center justify-between px-6 py-4">
      <h1
        className="flex items-center gap-2.5 text-xl font-semibold tracking-tight text-[var(--chocolate-brown)]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        <img src="/hashbrown.svg" alt="Hashbrown" width={22} height={22} className="h-5.5 w-5.5" />
        <img
          src="/copilotkit.svg"
          alt="CopilotKit"
          width={22}
          height={22}
          className="h-5.5 w-5.5"
        />
        <span aria-hidden="true" className="mx-0.5 inline-block h-5 w-px bg-[var(--input)]" />
        {title}
      </h1>
      <button
        type="button"
        onClick={() => setStyle(style === "default" ? "luma" : "default")}
        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--muted)]"
      >
        <span
          className="inline-block size-2 rounded-full"
          style={{
            backgroundColor: style === "luma" ? "var(--sunshine-yellow)" : "var(--sky-blue)",
          }}
        />
        {style === "luma" ? "Luma" : "Default"}
      </button>
      <div
        className="absolute bottom-0 left-6 right-6 h-px"
        style={{
          background:
            "linear-gradient(90deg, var(--sunshine-yellow) 0%, var(--sky-blue) 50%, transparent 100%)",
          opacity: 0.35,
        }}
      />
    </header>
  );
}
