import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { CopilotRuntime, createCopilotEndpointSingleRoute } from "@copilotkit/runtime/v2";
import { LangGraphHttpAgent } from "@copilotkit/runtime/langgraph";
import { registerRealtimeSessionRoute } from "@frenchfryai/runtime";

const agentHost = process.env.LANGGRAPH_DEPLOYMENT_URL || "http://localhost:8123";
const agentUrl = agentHost.startsWith("http") ? agentHost : `http://${agentHost}`;

const runtime = new CopilotRuntime({
  agents: {
    default: new LangGraphHttpAgent({
      url: agentUrl,
    }),
  },
});

const copilotApp = createCopilotEndpointSingleRoute({
  runtime,
  basePath: "/api/copilotkit",
});

const app = new Hono();
app.use("/*", cors());

app.route("/", copilotApp as any);

registerRealtimeSessionRoute(app, {
  path: "/realtime/session",
  openai: {
    apiKey: process.env.OPENAI_API_KEY ?? "",
  },
});

// --- Error resilience: prevent crashes from network/stream errors ---

const IGNORABLE_ERRORS = [
  "terminated",
  "other side closed",
  "ECONNRESET",
  "ECONNREFUSED",
  "EPIPE",
  "network error",
  "aborted",
  "AbortError",
  "socket hang up",
  "UND_ERR_SOCKET",
];

function isIgnorable(err: unknown): boolean {
  const msg =
    err instanceof Error ? `${err.name}: ${err.message}` : String(err);
  if (IGNORABLE_ERRORS.some((token) => msg.includes(token))) return true;
  // Check cause chain (Node.js fetch wraps network errors)
  if (err instanceof Error && err.cause) {
    return isIgnorable(err.cause);
  }
  return false;
}

process.on("unhandledRejection", (err: unknown) => {
  if (isIgnorable(err)) {
    console.warn(
      "[unhandledRejection] Suppressed:",
      err instanceof Error ? err.message : String(err),
    );
    return;
  }
  console.error("[unhandledRejection]", err);
});

process.on("uncaughtException", (err: Error) => {
  if (isIgnorable(err)) {
    console.error("[uncaughtException] Ignorable but fatal (unsafe to continue):", err.message);
  } else {
    console.error("[uncaughtException] Fatal:", err);
  }
  process.exit(1);
});

// --- Memory monitoring ---

const MEMORY_LOG_INTERVAL_MS = 60_000;
const MEMORY_WARN_THRESHOLD_MB = 200;

setInterval(() => {
  const mem = process.memoryUsage();
  const rssMb = Math.round(mem.rss / 1024 / 1024);
  const heapMb = Math.round(mem.heapUsed / 1024 / 1024);
  if (rssMb > MEMORY_WARN_THRESHOLD_MB) {
    console.warn(
      `[memory] WARNING RSS=${rssMb}MB heap=${heapMb}MB — approaching limit`,
    );
    if (global.gc) {
      console.warn("[memory] Forcing garbage collection");
      global.gc();
    }
  }
}, MEMORY_LOG_INTERVAL_MS).unref();

const port = Number(process.env.PORT || 4000);
serve({ fetch: app.fetch, port });
console.log(`Runtime server listening at http://localhost:${port}/api/copilotkit`);
console.log(`Realtime session endpoint at http://localhost:${port}/realtime/session`);
