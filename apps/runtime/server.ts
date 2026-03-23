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

// Prevent crash when agent closes the socket mid-stream
process.on("unhandledRejection", (err: unknown) => {
  const msg = err instanceof Error ? err.message : String(err);
  if (msg === "terminated" || msg.includes("other side closed")) {
    console.warn("Agent connection closed mid-stream, ignoring:", msg);
    return;
  }
  console.error("Unhandled rejection:", err);
});

const port = Number(process.env.PORT || 4000);
serve({ fetch: app.fetch, port });
console.log(`Runtime server listening at http://localhost:${port}/api/copilotkit`);
console.log(`Realtime session endpoint at http://localhost:${port}/realtime/session`);
