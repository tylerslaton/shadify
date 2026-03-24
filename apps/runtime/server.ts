import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { CopilotRuntime, createCopilotEndpointSingleRoute } from "@copilotkit/runtime/v2";
import { LangGraphHttpAgent } from "@copilotkit/runtime/langgraph";

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

// Error resilience and memory monitoring — see resilience.ts for details
import "./resilience.js";

const port = Number(process.env.PORT || 4000);
serve({ fetch: app.fetch, port });
console.log(`Runtime server listening at http://localhost:${port}/api/copilotkit`);
