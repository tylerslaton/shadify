import json

from collections.abc import Mapping
from langchain.agents.structured_output import ProviderStrategy
from langchain.agents.middleware import wrap_model_call

@wrap_model_call
async def apply_structured_output_schema(request, handler):
    """
    If the frontend forwards a JSON schema in runtime context, use it as the
    structured output response_format for the model call.
    """
    schema = None
    runtime = getattr(request, "runtime", None)
    runtime_context = getattr(runtime, "context", None)
    if isinstance(runtime_context, Mapping):
        schema = runtime_context.get("output_schema")

    if schema is None:
        copilot_context = None
        if isinstance(getattr(request, "state", None), dict):
            copilot_context = request.state.get("copilotkit", {}).get("context")
        if isinstance(copilot_context, list):
            for item in copilot_context:
                if isinstance(item, dict) and item.get("description") == "output_schema":
                    schema = item.get("value")
                    break

    if isinstance(schema, str):
        try:
            schema = json.loads(schema)
        except json.JSONDecodeError:
            schema = None

    if isinstance(schema, dict):
        if not schema.get("title"):
            schema["title"] = "StructuredOutput"
        if not schema.get("description"):
            schema["description"] = "Structured response schema for the CopilotKit agent."
        request = request.override(
            response_format=ProviderStrategy(schema=schema, strict=True),
        )
    return await handler(request)
