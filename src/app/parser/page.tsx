"use client";

import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { s } from "@hashbrownai/core";
import { useJsonParser } from "@hashbrownai/react";
import { AppHeader } from "@/components/app-header";

const jsonDocument = `{
  "title": "Hashbrown Streaming Demo",
  "version": 3,
  "status": "beta",
  "features": ["streaming", "stable identities", "reactive UI"],
  "theme": {
    "primary": "#6366f1",
    "secondary": "#14b8a6",
    "accent": null
  },
  "stats": {
    "nodes": 12,
    "latencyMs": 18.4,
    "stable": true
  },
  "contributors": [
    { "name": "Mina", "role": "Parser", "active": true },
    { "name": "Jules", "role": "Renderer", "active": false }
  ]
}`;

const schema = s.streaming.object("demo-json", {
  title: s.streaming.string("Title"),
  version: s.number("Version"),
  status: s.string("Status"),
  features: s.streaming.array("Features", s.streaming.string("Feature")),
  theme: s.object("Theme", {
    primary: s.string("Primary color"),
    secondary: s.string("Secondary color"),
    accent: s.anyOf([s.string("Accent"), s.nullish()]),
  }),
  stats: s.object("Stats", {
    nodes: s.number("Nodes"),
    latencyMs: s.number("Latency"),
    stable: s.boolean("Stable"),
  }),
  contributors: s.array(
    "Contributors",
    s.streaming.object("Contributor", {
      name: s.streaming.string("Name"),
      role: s.streaming.string("Role"),
      active: s.boolean("Active"),
    }),
  ),
});

export default function ParserDemoPage() {
  const [cursor, setCursor] = useState(0);
  const jsonSlice = jsonDocument.slice(0, cursor);
  const { parserState, value } = useJsonParser(jsonSlice, schema);

  const ticks = useMemo(() => Array.from({ length: jsonDocument.length }), []);

  return (
    <main className="flex h-dvh w-full flex-col bg-[var(--background)] text-[var(--foreground)]">
      <AppHeader active="parser" title="Parser Demo" />

      <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-2">
        <section className="flex min-h-0 flex-col border-b border-[rgba(164,163,161,0.45)] bg-white/55 md:border-b-0 md:border-r">
          <div className="border-b border-[rgba(164,163,161,0.45)] px-6 py-3 text-xs uppercase tracking-[0.3em] text-[var(--gray)]">
            JSON Document
          </div>
          <div className="min-h-0 flex-1 overflow-auto px-6 py-4">
            <pre className="whitespace-pre-wrap text-sm font-medium leading-6">
              <span className="text-[var(--sunset-orange)]">
                {jsonDocument.slice(0, cursor)}
              </span>
              <span className="text-[var(--gray)]/45">
                {jsonDocument.slice(cursor)}
              </span>
            </pre>
          </div>
        </section>

        <section className="flex min-h-0 flex-col bg-[var(--background)]">
          <div className="border-b border-[rgba(164,163,161,0.45)] px-6 py-3 text-xs uppercase tracking-[0.3em] text-[var(--gray)]">
            Resolved Value
          </div>
          <div className="min-h-0 flex-1 overflow-auto px-6 py-4">
            <pre className="whitespace-pre-wrap text-sm leading-6 text-[var(--gray-dark)]">
              {renderHighlightedJson(value)}
            </pre>
            {parserState.error ? (
              <div className="mt-4 rounded-xl border border-[rgba(184,96,96,0.45)] bg-[var(--indian-red-light)]/20 px-4 py-3 text-xs text-[var(--indian-red-dark)]">
                {parserState.error.message} (line {parserState.error.line}, col{" "}
                {parserState.error.column})
              </div>
            ) : null}
          </div>
        </section>
      </div>

      <div className="border-t border-[rgba(164,163,161,0.45)] bg-[var(--background)] px-6 py-4">
        <input
          type="range"
          min={0}
          max={jsonDocument.length}
          value={cursor}
          onChange={(event) => setCursor(Number(event.target.value))}
          className="scrub-slider"
          style={{
            background: `linear-gradient(to right, var(--sunshine-yellow) 0%, var(--sunshine-yellow) ${(cursor / jsonDocument.length) * 100}%, rgba(164,163,161,0.2) ${(cursor / jsonDocument.length) * 100}%, rgba(164,163,161,0.2) 100%)`,
          }}
        />
        <div
          className="mt-3 grid h-3 w-full items-end gap-[1px]"
          style={{
            gridTemplateColumns: `repeat(${ticks.length}, minmax(0, 1fr))`,
          }}
        >
          {ticks.map((_, index) => (
            <span
              key={index}
              className={`h-full rounded-sm ${
                index < cursor
                  ? "bg-[var(--sunset-orange)]"
                  : "bg-[var(--gray-light)]/60"
              }`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

const JSON_TOKEN_REGEX =
  /("(?:\\u[a-fA-F\d]{4}|\\[^u]|[^\\"])*"(?:\s*:)?|\btrue\b|\bfalse\b|\bnull\b|-?\d+(?:\.\d+)?(?:[eE][+\-]?\d+)?)/g;

function tokenClassName(token: string) {
  if (token.endsWith(":")) return "text-[var(--sky-blue-dark)]";
  if (token.startsWith('"')) return "text-[var(--olive-green)]";
  if (token === "true" || token === "false")
    return "text-[var(--sunset-orange)]";
  if (token === "null") return "text-[var(--gray)]";
  return "text-[var(--indian-red-dark)]";
}

function renderHighlightedJson(value: unknown): ReactNode {
  if (value === undefined || value === null) return "—";

  const json = JSON.stringify(value, null, 2);
  if (!json) return "—";

  const tokens: ReactNode[] = [];
  let lastIndex = 0;
  const regex = new RegExp(JSON_TOKEN_REGEX);
  let match: RegExpExecArray | null = regex.exec(json);

  while (match) {
    const token = match[0];
    const start = match.index;
    if (start > lastIndex) {
      tokens.push(json.slice(lastIndex, start));
    }
    tokens.push(
      <span key={`${start}-${token.length}`} className={tokenClassName(token)}>
        {token}
      </span>,
    );
    lastIndex = start + token.length;
    match = regex.exec(json);
  }

  if (lastIndex < json.length) {
    tokens.push(json.slice(lastIndex));
  }

  return tokens;
}
