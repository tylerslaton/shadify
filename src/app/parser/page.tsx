"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { s } from "@hashbrownai/core";
import type { JsonAstNode, ParserState } from "@hashbrownai/core";
import { useJsonParser } from "@hashbrownai/react";

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

type FlashKind = "create" | "update";

type PositionedNode = {
  id: number;
  type: JsonAstNode["type"];
  label: string;
  value: string;
  closed: boolean;
  x: number;
  y: number;
};

type PositionedEdge = {
  from: number;
  to: number;
  label?: string;
};

function getNodeValueSignature(node: JsonAstNode) {
  switch (node.type) {
    case "string":
    case "number":
      return `${node.buffer}|${node.resolvedValue ?? ""}`;
    case "boolean":
      return String(node.resolvedValue ?? "");
    case "null":
      return node.resolvedValue === null ? "null" : "";
    case "array":
      return `${node.children.join(",")}|${JSON.stringify(
        node.resolvedValue ?? [],
      )}`;
    case "object":
      return `${node.keys.join(",")}|${node.children.join(",")}|${JSON.stringify(
        node.resolvedValue ?? {},
      )}`;
    default:
      return "";
  }
}

function getNodeValueLabel(node: JsonAstNode) {
  switch (node.type) {
    case "string":
    case "number":
      return node.resolvedValue ?? node.buffer ?? "";
    case "boolean":
      return node.resolvedValue === undefined
        ? "…"
        : String(node.resolvedValue);
    case "null":
      return node.resolvedValue === null ? "null" : "…";
    case "array":
      return node.resolvedValue
        ? `${node.resolvedValue.length} items`
        : `${node.children.length} children`;
    case "object":
      return node.resolvedValue
        ? `${Object.keys(node.resolvedValue).length} keys`
        : `${node.keys.length} keys`;
    default:
      return "";
  }
}

function buildLayout(state: ParserState) {
  if (state.rootId === null) {
    return {
      nodes: [] as PositionedNode[],
      edges: [] as PositionedEdge[],
      width: 0,
      height: 0,
    };
  }

  const nodeMap = new Map<number, JsonAstNode>();
  state.nodes.forEach((node) => nodeMap.set(node.id, node));

  const edges: PositionedEdge[] = [];
  const positions = new Map<number, { x: number; y: number }>();
  const levelCount = new Map<number, number>();
  const visited = new Set<number>();

  const walk = (nodeId: number, depth: number) => {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);

    const index = levelCount.get(depth) ?? 0;
    levelCount.set(depth, index + 1);
    positions.set(nodeId, { x: index, y: depth });

    const node = nodeMap.get(nodeId);
    if (!node) return;

    if (node.type === "array") {
      node.children.forEach((childId, idx) => {
        edges.push({ from: nodeId, to: childId, label: `[${idx}]` });
        walk(childId, depth + 1);
      });
    }

    if (node.type === "object") {
      node.children.forEach((childId, idx) => {
        edges.push({
          from: nodeId,
          to: childId,
          label: node.keys[idx] ? `.${node.keys[idx]}` : undefined,
        });
        walk(childId, depth + 1);
      });
    }
  };

  walk(state.rootId, 0);

  const nodes: PositionedNode[] = [];
  state.nodes.forEach((node) => {
    const pos = positions.get(node.id);
    if (!pos) return;
    nodes.push({
      id: node.id,
      type: node.type,
      label: node.type,
      value: String(getNodeValueLabel(node)),
      closed: node.closed,
      x: pos.x,
      y: pos.y,
    });
  });

  let maxX = 0;
  let maxY = 0;
  nodes.forEach((node) => {
    if (node.x > maxX) maxX = node.x;
    if (node.y > maxY) maxY = node.y;
  });

  const spacingX = 200;
  const spacingY = 140;
  const width = (maxX + 1) * spacingX + 120;
  const height = (maxY + 1) * spacingY + 120;

  return { nodes, edges, width, height };
}

function useNodeFlashes(parserState: ParserState) {
  const [flashes, setFlashes] = useState<Record<number, FlashKind>>({});
  const prevSignatures = useRef<Map<number, string>>(new Map());
  const timeouts = useRef<Map<number, number>>(new Map());
  const parserKey = `${parserState.index}-${parserState.nextId}-${parserState.rootId}-${parserState.nodes.length}`;

  useEffect(() => {
    const nextSignatures = new Map<number, string>();
    const updates: Record<number, FlashKind> = {};
    const liveIds = new Set<number>();

    parserState.nodes.forEach((node) => {
      liveIds.add(node.id);
      const signature = getNodeValueSignature(node);
      nextSignatures.set(node.id, signature);

      if (!prevSignatures.current.has(node.id)) {
        updates[node.id] = "create";
        return;
      }

      if (prevSignatures.current.get(node.id) !== signature) {
        updates[node.id] = "update";
      }
    });

    prevSignatures.current = nextSignatures;

    setFlashes((current) => {
      const next: Record<number, FlashKind> = {};
      Object.entries(current).forEach(([id, kind]) => {
        if (liveIds.has(Number(id))) next[Number(id)] = kind;
      });
      return { ...next, ...updates };
    });

    Object.entries(updates).forEach(([id]) => {
      const numericId = Number(id);
      const existing = timeouts.current.get(numericId);
      if (existing) window.clearTimeout(existing);
      const timeout = window.setTimeout(() => {
        setFlashes((current) => {
          if (!current[numericId]) return current;
          const next = { ...current };
          delete next[numericId];
          return next;
        });
      }, 650);
      timeouts.current.set(numericId, timeout);
    });
  }, [parserKey]);

  useEffect(() => {
    return () => {
      timeouts.current.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, []);

  return flashes;
}

function AstVisualizer({ parserState }: { parserState: ParserState }) {
  const layout = useMemo(() => buildLayout(parserState), [parserState]);
  const flashes = useNodeFlashes(parserState);

  if (parserState.rootId === null) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-slate-400">
        Start scrubbing to build the AST.
      </div>
    );
  }

  const nodeWidth = 160;
  const nodeHeight = 78;
  const spacingX = 200;
  const spacingY = 140;

  return (
    <div
      className="relative"
      style={{ width: layout.width, height: layout.height }}
    >
      <svg
        className="absolute inset-0"
        width={layout.width}
        height={layout.height}
      >
        {layout.edges.map((edge) => {
          const from = layout.nodes.find((node) => node.id === edge.from);
          const to = layout.nodes.find((node) => node.id === edge.to);
          if (!from || !to) return null;

          const fromX = from.x * spacingX + nodeWidth / 2 + 60;
          const fromY = from.y * spacingY + nodeHeight + 20;
          const toX = to.x * spacingX + nodeWidth / 2 + 60;
          const toY = to.y * spacingY + 20;
          const midY = (fromY + toY) / 2;

          return (
            <g key={`${edge.from}-${edge.to}`}>
              <path
                d={`M ${fromX} ${fromY} C ${fromX} ${midY} ${toX} ${midY} ${toX} ${toY}`}
                fill="none"
                stroke="#334155"
                strokeWidth="1.5"
              />
              {edge.label ? (
                <text
                  x={(fromX + toX) / 2}
                  y={midY - 6}
                  textAnchor="middle"
                  className="fill-slate-400 text-[10px]"
                >
                  {edge.label}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>

      {layout.nodes.map((node) => {
        const flash = flashes[node.id];
        return (
          <div
            key={node.id}
            className={`absolute rounded-2xl border border-slate-700 bg-slate-900/80 p-3 shadow-lg backdrop-blur ${
              flash === "create" ? "flash-create" : ""
            }`}
            style={{
              width: nodeWidth,
              height: nodeHeight,
              left: node.x * spacingX + 60,
              top: node.y * spacingY + 20,
            }}
          >
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-slate-400">
              <span>{node.type}</span>
              <span className="text-[9px] text-slate-500">
                {node.closed ? "closed" : "open"}
              </span>
            </div>
            <div
              className={`mt-2 truncate text-sm font-semibold text-slate-100 ${
                flash === "update" ? "flash-update" : ""
              }`}
              title={node.value}
            >
              {node.value || "…"}
            </div>
            <div className="mt-1 text-[10px] text-slate-500">id {node.id}</div>
          </div>
        );
      })}
    </div>
  );
}

export default function ParserVisualizerPage() {
  const [cursor, setCursor] = useState(jsonDocument.length);
  const jsonSlice = jsonDocument.slice(0, cursor);
  const { parserState, value } = useJsonParser(jsonSlice, schema);

  const ticks = useMemo(() => Array.from({ length: jsonDocument.length }), []);

  return (
    <main className="flex h-screen w-screen flex-col bg-slate-950 text-slate-100">
      <header className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
        <div>
          <div className="text-xs uppercase tracking-[0.35em] text-slate-400">
            Streaming JSON Parser
          </div>
          <h1 className="text-2xl font-semibold text-slate-100">
            AST Visualizer Playground
          </h1>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <a
            href="/"
            className="rounded-full border border-slate-800 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-300 transition hover:border-slate-600 hover:text-white"
          >
            Chat Demo
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
            AST Visualizer
          </div>
          <div className="min-h-0 flex-1 overflow-auto px-6 py-4">
            <AstVisualizer parserState={parserState} />
            {parserState.error ? (
              <div className="mt-4 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-xs text-rose-200">
                {parserState.error.message} (line {parserState.error.line}, col{" "}
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
