import {
  CopilotRuntime,
  ExperimentalEmptyAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import { LangGraphAgent } from "@copilotkit/runtime/langgraph";
import { NextRequest } from "next/server";
import { RunAgentInputSchema } from "@ag-ui/client";

// 1. You can use any service adapter here for multi-agent support. We use
//    the empty adapter since we're only using one agent.
const serviceAdapter = new ExperimentalEmptyAdapter();

// 2. Create the CopilotRuntime instance and utilize the LangGraph AG-UI
//    integration to setup the connection.
const runtime = new CopilotRuntime({
  agents: {
    sample_agent: new LangGraphAgent({
      deploymentUrl:
        process.env.LANGGRAPH_DEPLOYMENT_URL || "http://localhost:8123",
      graphId: "sample_agent",
      langsmithApiKey: process.env.LANGSMITH_API_KEY || "",
    }),
  },
});

// 3. Build a Next.js API route that handles the CopilotKit runtime requests.
export const POST = async (req: NextRequest) => {
  console.log("[copilotkit] request received");
  const deploymentUrl =
    process.env.LANGGRAPH_DEPLOYMENT_URL || "http://localhost:8123";
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1000);
    const infoResponse = await fetch(`${deploymentUrl}/info`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);
    console.log(
      "[copilotkit] langgraph /info status",
      infoResponse.status,
    );
  } catch (error) {
    console.log("[copilotkit] langgraph /info error", error);
  }
  try {
    console.log("[copilotkit] headers accept", req.headers.get("accept"));
    console.log("[copilotkit] headers content-type", req.headers.get("content-type"));
    const body = await req.clone().json();
    console.log("[copilotkit] body keys", Object.keys(body || {}));
    console.log("[copilotkit] method", JSON.stringify(body?.method ?? null));
    console.log("[copilotkit] params", JSON.stringify(body?.params ?? null));
    const innerBody = body?.body ?? null;
    console.log("[copilotkit] agentId", body?.params?.agentId ?? null);
    if (innerBody) {
      console.log("[copilotkit] inner body keys", Object.keys(innerBody));
      console.log(
        "[copilotkit] inner messages",
        Array.isArray(innerBody?.messages) ? innerBody.messages.length : null,
      );
      console.log(
        "[copilotkit] inner context",
        Array.isArray(innerBody?.context) ? innerBody.context.length : null,
      );
      if (Array.isArray(innerBody?.context) && innerBody.context.length > 0) {
        console.log("[copilotkit] first context", JSON.stringify(innerBody.context[0]));
      }
      if (Array.isArray(innerBody?.messages) && innerBody.messages.length > 0) {
        console.log("[copilotkit] first message", JSON.stringify(innerBody.messages[0]));
      }
      const parsed = RunAgentInputSchema.safeParse(innerBody);
      if (!parsed.success) {
        console.log("[copilotkit] RunAgentInputSchema error", parsed.error.errors);
      } else {
        console.log("[copilotkit] RunAgentInputSchema ok");
      }
      console.log("[copilotkit] inner agentSession", innerBody?.agentSession ?? null);
      console.log(
        "[copilotkit] inner forwardedProps keys",
        innerBody?.forwardedProps ? Object.keys(innerBody.forwardedProps) : null,
      );
      if (innerBody?.forwardedProps) {
        console.log(
          "[copilotkit] forwardedProps",
          JSON.stringify(innerBody.forwardedProps),
        );
        if (innerBody.forwardedProps?.config) {
          console.log(
            "[copilotkit] forwardedProps.config keys",
            Object.keys(innerBody.forwardedProps.config),
          );
        }
        if (innerBody.forwardedProps?.config?.configurable) {
          console.log(
            "[copilotkit] forwardedProps.config.configurable keys",
            Object.keys(innerBody.forwardedProps.config.configurable),
          );
        }
      }
    } else {
      console.log("[copilotkit] messages", Array.isArray(body?.messages) ? body.messages.length : null);
      console.log("[copilotkit] agentSession", body?.agentSession ?? null);
      console.log(
        "[copilotkit] forwardedProps keys",
        body?.forwardedProps ? Object.keys(body.forwardedProps) : null,
      );
    }
  } catch (error) {
    console.log("[copilotkit] failed to parse body", error);
  }
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter,
    endpoint: "/api/copilotkit",
  });

  const response = await handleRequest(req);
  console.log("[copilotkit] response status", response.status);
  return response;
};
