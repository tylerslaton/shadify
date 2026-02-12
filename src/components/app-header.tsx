import Image from "next/image";
import Link from "next/link";
import { Squircle } from "./squircle";

type HeaderTab = "chat" | "parser" | "ast" | "ui-renderer" | "magic-text";

function NavLink({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  return (
    <Squircle
      squircle="20"
      borderWidth={1}
      borderColor={
        isActive ? "rgba(100, 175, 181, 0.5)" : "rgba(164, 163, 161, 0.5)"
      }
      className="overflow-hidden"
    >
      <Link
        href={href}
        className={`block px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] transition ${
          isActive
            ? "bg-[var(--sky-blue-light)] text-[var(--sky-blue-dark)]"
            : "bg-white/80 text-[var(--gray)] hover:bg-[var(--sunshine-yellow-light)] hover:text-[var(--chocolate-brown)]"
        }`}
      >
        {label}
      </Link>
    </Squircle>
  );
}

export function AppHeader({
  active,
  title,
  rightSlot,
}: {
  active: HeaderTab;
  title: string;
  rightSlot?: React.ReactNode;
}) {
  return (
    <header className="flex items-center justify-between border-b border-[rgba(164,163,161,0.45)] px-6 py-4">
      <div>
        <h1
          className="flex items-center gap-2 text-2xl font-semibold text-[var(--foreground)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <Image
            src="/hashbrown.svg"
            alt="Hashbrown"
            width={24}
            height={24}
            className="h-6 w-6"
          />
          <Image
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
      </div>

      <div className="flex items-center gap-3 text-xs text-[var(--gray)]">
        <NavLink href="/" label="Chat" isActive={active === "chat"} />
        <NavLink
          href="/parser"
          label="JSON Parser"
          isActive={active === "parser"}
        />
        <NavLink
          href="/magic-text"
          label="Magic Text"
          isActive={active === "magic-text"}
        />
        <NavLink
          href="/ui-renderer"
          label="UI Renderer"
          isActive={active === "ui-renderer"}
        />
        <NavLink href="/ast" label="JSON AST" isActive={active === "ast"} />

        {rightSlot ? <span>{rightSlot}</span> : null}
      </div>
    </header>
  );
}
