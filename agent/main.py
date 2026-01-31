"""
This is the main entry point for the agent.
It defines the workflow graph, state, tools, nodes and edges.
"""

import json
import urllib.parse
import urllib.request
from collections.abc import Mapping
from typing import Any, List, TypedDict

from langchain.agents import create_agent
from langchain.agents.structured_output import ProviderStrategy
from langchain.agents.middleware import wrap_model_call, before_model
from langchain.tools import tool
from copilotkit import CopilotKitMiddleware, CopilotKitState

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

@tool
def get_weather(location: str):
    """
    Get the current weather for a given location.

    Preferred input format: "City, State, Country" (e.g., "Huntsville, Alabama, USA").
    US shorthand is allowed: "City, ST" (e.g., "Huntsville, AL"). The tool will
    expand state abbreviations and bias geocoding to the US when a state is detected.
    """
    if not location or not location.strip():
        return {
            "status": "error",
            "message": "Please provide a location in the format \"City, State, Country\".",
            "suggestedQueries": [],
        }

    us_state_map = {
        "AL": "Alabama",
        "AK": "Alaska",
        "AZ": "Arizona",
        "AR": "Arkansas",
        "CA": "California",
        "CO": "Colorado",
        "CT": "Connecticut",
        "DE": "Delaware",
        "FL": "Florida",
        "GA": "Georgia",
        "HI": "Hawaii",
        "ID": "Idaho",
        "IL": "Illinois",
        "IN": "Indiana",
        "IA": "Iowa",
        "KS": "Kansas",
        "KY": "Kentucky",
        "LA": "Louisiana",
        "ME": "Maine",
        "MD": "Maryland",
        "MA": "Massachusetts",
        "MI": "Michigan",
        "MN": "Minnesota",
        "MS": "Mississippi",
        "MO": "Missouri",
        "MT": "Montana",
        "NE": "Nebraska",
        "NV": "Nevada",
        "NH": "New Hampshire",
        "NJ": "New Jersey",
        "NM": "New Mexico",
        "NY": "New York",
        "NC": "North Carolina",
        "ND": "North Dakota",
        "OH": "Ohio",
        "OK": "Oklahoma",
        "OR": "Oregon",
        "PA": "Pennsylvania",
        "RI": "Rhode Island",
        "SC": "South Carolina",
        "SD": "South Dakota",
        "TN": "Tennessee",
        "TX": "Texas",
        "UT": "Utah",
        "VT": "Vermont",
        "VA": "Virginia",
        "WA": "Washington",
        "WV": "West Virginia",
        "WI": "Wisconsin",
        "WY": "Wyoming",
        "DC": "District of Columbia",
    }

    raw_location = location.strip()
    suggested_queries: list[str] = []
    country_bias: str | None = None

    normalized_location = raw_location
    city_only: str | None = None
    state_full: str | None = None
    parts = [part.strip() for part in raw_location.split(",") if part.strip()]
    if len(parts) == 2:
        state = parts[1].upper()
        if state in us_state_map:
            city_only = parts[0]
            state_full = us_state_map[state]
            normalized_location = f"{parts[0]}, {us_state_map[state]}"
            suggested_queries.append(f"{parts[0]}, {us_state_map[state]}, USA")
            country_bias = "US"
    if len(parts) >= 3:
        tail = parts[-1].lower()
        if tail in {"usa", "us", "united states", "united states of america"}:
            country_bias = "US"
            normalized_location = ", ".join(parts[:-1])
            suggested_queries.append(f"{normalized_location}, USA")
            if len(parts) >= 2:
                state_full = parts[-2].strip()
                city_only = ", ".join(parts[:-2]).strip()

    if raw_location not in suggested_queries:
        suggested_queries.append(raw_location)
    if normalized_location not in suggested_queries:
        suggested_queries.append(normalized_location)

    def geocode(name: str, country_code: str | None):
        query = urllib.parse.urlencode(
            {
                "name": name,
                "count": 5,
                "language": "en",
                "format": "json",
                **({"countryCode": country_code} if country_code else {}),
            }
        )
        geo_url = f"https://geocoding-api.open-meteo.com/v1/search?{query}"
        with urllib.request.urlopen(geo_url, timeout=10) as response:
            return json.loads(response.read().decode("utf-8"))

    match = None
    last_error: Exception | None = None
    candidates = [
        (normalized_location, country_bias),
        (raw_location, country_bias),
        (normalized_location, None),
        (raw_location, None),
    ]
    if city_only:
        candidates.insert(0, (city_only, country_bias))
        candidates.append((city_only, None))
    for candidate, bias in candidates:
        try:
            cleaned = candidate
            if bias and "," in cleaned:
                tail = cleaned.split(",")[-1].strip().lower()
                if tail in {"usa", "us", "united states", "united states of america"}:
                    cleaned = ", ".join(part.strip() for part in cleaned.split(",")[:-1])
            geo_data = geocode(cleaned, bias)
            results = geo_data.get("results") or []
            if results:
                if state_full:
                    filtered = [
                        result
                        for result in results
                        if (result.get("admin1") or "").lower()
                        == state_full.lower()
                    ]
                    if filtered:
                        results = filtered
                match = results[0]
                for result in results:
                    name = result.get("name")
                    admin1 = result.get("admin1")
                    country = result.get("country")
                    formatted = ", ".join(
                        part for part in [name, admin1, country] if part
                    )
                    if formatted and formatted not in suggested_queries:
                        suggested_queries.append(formatted)
                break
        except Exception as exc:
            last_error = exc

    if match is None:
        if last_error:
            return {
                "status": "error",
                "message": f"Sorry, I couldn't look up the location \"{raw_location}\" right now.",
                "suggestedQueries": suggested_queries,
            }
        return {
            "status": "not_found",
            "message": f"Sorry, I couldn't find a location match for \"{raw_location}\".",
            "suggestedQueries": suggested_queries,
        }

    latitude = match.get("latitude")
    longitude = match.get("longitude")
    name = match.get("name") or raw_location
    admin1 = match.get("admin1")
    country = match.get("country")
    place = ", ".join(part for part in [name, admin1, country] if part)

    forecast_params = urllib.parse.urlencode(
        {
            "latitude": latitude,
            "longitude": longitude,
            "current": "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code",
            "temperature_unit": "fahrenheit",
            "windspeed_unit": "mph",
        }
    )
    forecast_url = f"https://api.open-meteo.com/v1/forecast?{forecast_params}"

    try:
        with urllib.request.urlopen(forecast_url, timeout=10) as response:
            forecast = json.loads(response.read().decode("utf-8"))
    except Exception:
        return {
            "status": "error",
            "message": f"Sorry, I couldn't fetch the weather for {place} right now.",
            "suggestedQueries": suggested_queries,
        }

    current = forecast.get("current") or {}
    temperature = current.get("temperature_2m")
    feels_like = current.get("apparent_temperature")
    humidity = current.get("relative_humidity_2m")
    windspeed = current.get("wind_speed_10m")
    weather_code = current.get("weather_code")

    if temperature is None:
        return {
            "status": "error",
            "message": f"Sorry, I couldn't read the current weather for {place}.",
            "suggestedQueries": suggested_queries,
        }

    details = []
    if feels_like is not None:
        details.append(f"feels like {feels_like}°F")
    if humidity is not None:
        details.append(f"humidity {humidity}%")
    if windspeed is not None:
        details.append(f"wind {windspeed} mph")
    if weather_code is not None:
        details.append(f"code {weather_code}")
    extra = f" ({', '.join(details)})" if details else ""

    return {
        "status": "ok",
        "location": place,
        "temperatureF": temperature,
        "feelsLikeF": feels_like,
        "humidityPercent": humidity,
        "summary": f"The weather for {place} is {temperature}°F{extra}.",
        "suggestedQueries": suggested_queries,
    }

class AgentState(CopilotKitState):
    proverbs: List[str]


class AgentContext(TypedDict, total=False):
    output_schema: dict[str, Any]



agent = create_agent(
    model="openai:gpt-5.2",
    tools=[get_weather],
    middleware=[CopilotKitMiddleware(), apply_structured_output_schema],
    context_schema=AgentContext,
    state_schema=AgentState,
    system_prompt=(
        "You are a weather reporter. The user will ask questions about the weather.\n"
        "Use the get_weather tool for specific locations, then create a full report.\n"
        "Call the tool with a specific place in the format: City, State, Country.\n"
        "If the user gives a broad region (e.g., 'North Alabama'), choose 2-4\n"
        "representative cities in that region and fetch each via get_weather.\n"
        "Present a multi-city report."
    ),
)

graph = agent
