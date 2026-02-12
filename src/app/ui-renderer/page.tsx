"use client";

import { useMemo, useState } from "react";
import { useJsonParser } from "@hashbrownai/react";
import { useChatKit } from "@/components/chat/chat-kit";
import { AppHeader } from "@/components/app-header";

const weatherMarkdown = `### Huntsville, Alabama - Current Weather
- **Temperature:** 56.6°F (**feels like** 49.7°F)
- **Humidity:** 21%
- **Wind:** 6.9 mph

**On-air take:** Cool and dry in Huntsville, with a noticeable chill from the breeze - grab a light jacket if you're heading out.`;

const jsonDocument = JSON.stringify(
  {
    ui: [
      {
        weather: {
          props: {
            themeColor: "#3B82F6",
            temperature: 56.6,
            humidity: 21,
            windSpeed: 6.9,
            feelsLike: 49.7,
            location: "Huntsville, Alabama, United States",
          },
        },
      },
      {
        Markdown: {
          props: {
            children: weatherMarkdown,
          },
        },
      },
    ],
  },
  null,
  2,
);

export default function UiRendererPage() {
  const [cursor, setCursor] = useState(0);
  const [isResolvedExpanded, setIsResolvedExpanded] = useState(false);
  const jsonSlice = jsonDocument.slice(0, cursor);
  const kit = useChatKit();
  const { parserState, value } = useJsonParser(jsonSlice, kit.schema);

  const ticks = useMemo(() => Array.from({ length: jsonDocument.length }), []);

  return (
    <main className="flex h-dvh w-full flex-col bg-[var(--background)] text-[var(--foreground)]">
      <AppHeader active="ui-renderer" title="UI Renderer Playground" />

      <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-[minmax(0,1fr)_720px]">
        <section className="flex min-h-0 flex-col border-b border-[rgba(164,163,161,0.45)] bg-white/55 md:border-b-0 md:border-r">
          <div className="flex min-h-0 flex-1 flex-col">
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
          </div>
          <div
            className={`flex flex-col border-t border-[rgba(164,163,161,0.45)] ${
              isResolvedExpanded ? "min-h-0 flex-[0.6]" : ""
            }`}
          >
            <button
              type="button"
              onClick={() => setIsResolvedExpanded((expanded) => !expanded)}
              className="flex items-center justify-between border-b border-[rgba(164,163,161,0.45)] px-6 py-3 text-left text-xs uppercase tracking-[0.3em] text-[var(--gray)]"
              aria-expanded={isResolvedExpanded}
            >
              <span>Resolved Value</span>
              <span>{isResolvedExpanded ? "Hide" : "Show"}</span>
            </button>
            <div
              className={`px-6 transition-[max-height,padding] ${
                isResolvedExpanded
                  ? "max-h-[40vh] overflow-y-auto py-4"
                  : "max-h-0 overflow-hidden py-0"
              }`}
            >
              <pre className="whitespace-pre-wrap text-sm leading-6 text-[var(--gray-dark)]">
                {value ? JSON.stringify(value, null, 2) : "—"}
              </pre>
            </div>
          </div>
        </section>

        <section className="flex min-h-0 flex-col bg-[var(--background)]">
          <div className="border-b border-[rgba(164,163,161,0.45)] px-6 py-3 text-xs uppercase tracking-[0.3em] text-[var(--gray)]">
            UI Renderer
          </div>
          <div className="min-h-0 flex-1 overflow-auto px-6 py-6">
            {value ? (
              <div className="magic-text-output space-y-3 text-[15px] leading-6 text-[var(--gray-dark)] [&_*]:text-[var(--gray-dark)]">
                {kit.render(value)}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-[var(--gray)]">
                Start scrubbing to build the UI.
              </div>
            )}
            {parserState.error ? (
              <div className="mt-4 rounded-xl border border-[rgba(184,96,96,0.45)] bg-[var(--indian-red-light)]/20 px-4 py-3 text-xs text-[var(--indian-red-dark)]">
                {parserState.error.message} (line {parserState.error.line}, col
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
