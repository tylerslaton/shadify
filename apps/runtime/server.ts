import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import {
  CopilotRuntime,
  createCopilotEndpointSingleRoute,
} from "@copilotkit/runtime/v2";
import { LangGraphHttpAgent } from "@copilotkit/runtime/langgraph";

const agentHost = process.env.LANGGRAPH_DEPLOYMENT_URL || "http://localhost:8123";
const agentUrl = agentHost.startsWith("http") ? agentHost : `http://${agentHost}`;

const runtime = new CopilotRuntime({
  agents: {
    sample_agent: new LangGraphHttpAgent({
      url: agentUrl,
    }),
  },
});

const app = createCopilotEndpointSingleRoute({
  runtime,
  basePath: "/api/copilotkit",
});

app.use("/*", cors());

const port = Number(process.env.PORT || 4000);
serve({ fetch: app.fetch, port });
console.log(
  `Runtime server listening at http://localhost:${port}/api/copilotkit`,
);
