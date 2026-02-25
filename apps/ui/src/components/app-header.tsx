export function AppHeader({ title }: { title: string }) {
  return (
    <header className="flex items-center justify-between border-b border-[rgba(164,163,161,0.45)] px-6 py-4">
      <h1
        className="flex items-center gap-2 text-2xl font-semibold text-[var(--foreground)]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        <img
          src="/hashbrown.svg"
          alt="Hashbrown"
          width={24}
          height={24}
          className="h-6 w-6"
        />
        <img
          src="/copilotkit.svg"
          alt="CopilotKit"
          width={24}
          height={24}
          className="h-6 w-6"
        />
        <span
          aria-hidden="true"
          className="mx-1 inline-block h-6 w-px"
          style={{ backgroundColor: "rgba(0,0,0,0.12)" }}
        />
        {title}
      </h1>
    </header>
  );
}
