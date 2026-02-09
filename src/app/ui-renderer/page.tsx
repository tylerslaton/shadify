/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useMemo, useState } from "react";
import { useJsonParser } from "@hashbrownai/react";
import { useChatKit } from "@/components/chat/chat-kit";

const jsonDocument = `{
  "ui": [
    {
      "weather": {
        "props":{
          "themeColor": "blue",
          "temperature": 29.7,
          "humidity": 70,
          "windSpeed": 12.7,
          "feelsLike": 19.2,
          "location": "Huntsville, Alabama, United States"
        }
      }
    },
    {
      "p": {
        "props": {},
        "children": "Huntsville, AL is cold right now: 29.7°F, feeling closer to 19.2°F with a brisk 12.7 mph wind. Humidity is 70%, so the air may feel a bit damp on top of the chill."}},{"p":{"props":{},"children":"If you're heading out, plan on a warm coat, gloves, and something to block the wind."
      }
    }
  ]
}`;

export default function UiRendererPage() {
  const [cursor, setCursor] = useState(jsonDocument.length);
  const jsonSlice = jsonDocument.slice(0, cursor);
  const kit = useChatKit();
  const { parserState, value } = useJsonParser(jsonSlice, kit.schema);

  const ticks = useMemo(() => Array.from({ length: jsonDocument.length }), []);

  return (
    <main className="flex h-screen w-screen flex-col bg-slate-950 text-slate-100">
      <header className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
        <div>
          <div className="text-xs uppercase tracking-[0.35em] text-slate-400">
            Streaming JSON Renderer
          </div>
          <h1 className="text-2xl font-semibold text-slate-100">
            UI Renderer Playground
          </h1>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <a
            href="/"
            className="rounded-full border border-slate-800 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-300 transition hover:border-slate-600 hover:text-white"
          >
            Chat Demo
          </a>
          <a
            href="/parser"
            className="rounded-full border border-slate-800 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-300 transition hover:border-slate-600 hover:text-white"
          >
            Parser Demo
          </a>
          <span>Characters: {cursor}</span>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-[minmax(0,1fr)_720px]">
        <section className="flex min-h-0 flex-col border-b border-slate-800 bg-slate-900/40 md:border-b-0 md:border-r">
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="border-b border-slate-800 px-6 py-3 text-xs uppercase tracking-[0.3em] text-slate-400">
              JSON Document
            </div>
            <div className="min-h-0 flex-1 overflow-auto px-6 py-4">
              <pre className="whitespace-pre-wrap text-sm leading-6">
                <span className="text-emerald-200">
                  {jsonDocument.slice(0, cursor)}
                </span>
                <span className="text-slate-600">
                  {jsonDocument.slice(cursor)}
                </span>
              </pre>
            </div>
          </div>
          <div className="flex min-h-0 flex-[0.6] flex-col border-t border-slate-800">
            <div className="border-b border-slate-800 px-6 py-3 text-xs uppercase tracking-[0.3em] text-slate-400">
              Resolved Value
            </div>
            <div className="min-h-0 flex-1 overflow-auto px-6 py-4">
              <pre className="whitespace-pre-wrap text-sm leading-6 text-slate-200">
                {value ? JSON.stringify(value, null, 2) : "—"}
              </pre>
            </div>
          </div>
        </section>

        <section className="flex min-h-0 flex-col bg-slate-950">
          <div className="border-b border-slate-800 px-6 py-3 text-xs uppercase tracking-[0.3em] text-slate-400">
            UI Renderer
          </div>
          <div className="min-h-0 flex-1 overflow-auto px-6 py-6">
            {value ? (
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-emerald-50 shadow-lg shadow-emerald-500/10">
                <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald-200/80">
                  Rendered UI
                </div>
                <div className="mt-3 space-y-3 text-[15px] leading-6 text-white [&_*]:text-white">
                  {kit.render(value)}
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-slate-400">
                Start scrubbing to build the UI.
              </div>
            )}
            {parserState.error ? (
              <div className="mt-4 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-xs text-rose-200">
                {parserState.error.message} (line {parserState.error.line}, col
                {parserState.error.column})
              </div>
            ) : null}
          </div>
        </section>
      </div>

      <div className="border-t border-slate-800 bg-slate-950 px-6 py-4">
        <div className="mb-3 text-xs uppercase tracking-[0.3em] text-slate-400">
          Slider
        </div>
        <input
          type="range"
          min={0}
          max={jsonDocument.length}
          value={cursor}
          onChange={(event) => setCursor(Number(event.target.value))}
          className="h-2 w-full cursor-pointer accent-emerald-400"
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
                index < cursor ? "bg-emerald-500/80" : "bg-slate-700/60"
              }`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
