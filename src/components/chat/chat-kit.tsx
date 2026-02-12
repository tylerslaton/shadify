import { s, prompt } from "@hashbrownai/core";
import { exposeComponent, exposeMarkdown, useUiKit } from "@hashbrownai/react";
import { Paragraph } from "./paragraph";
import { ListItem } from "./list-item";
import { OrderedList } from "./ordered-list";
import { UnorderedList } from "./unordered-list";
import { WeatherCard } from "../weather";
import { Squircle } from "../squircle";

function WeatherCardFallback() {
  return (
    <Squircle
      squircle="30"
      className="mb-4 mt-6 w-full max-w-md bg-[var(--sky-blue)]/35 shadow-[0_16px_35px_-20px_rgba(94,92,90,0.35)]"
      borderWidth={2}
      borderColor="rgba(255, 255, 255, 0.55)"
    >
      <div className="weather-card-fallback relative h-full w-full overflow-hidden bg-white/28 p-5">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="weather-card-fallback-block h-7 w-40 rounded bg-white/45" />
            <div className="weather-card-fallback-block h-5 w-28 rounded bg-white/35" />
          </div>
          <div className="weather-card-fallback-block h-14 w-14 rounded-full bg-white/35" />
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div className="weather-card-fallback-block h-10 w-16 rounded bg-white/45" />
          <div className="weather-card-fallback-block h-5 w-20 rounded bg-white/35" />
        </div>

        <div className="mt-4 border-t border-white/50 pt-4">
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-2">
              <div className="weather-card-fallback-block mx-auto h-3 w-12 rounded bg-white/30" />
              <div className="weather-card-fallback-block mx-auto h-5 w-10 rounded bg-white/45" />
            </div>
            <div className="space-y-2">
              <div className="weather-card-fallback-block mx-auto h-3 w-10 rounded bg-white/30" />
              <div className="weather-card-fallback-block mx-auto h-5 w-10 rounded bg-white/45" />
            </div>
            <div className="space-y-2">
              <div className="weather-card-fallback-block mx-auto h-3 w-12 rounded bg-white/30" />
              <div className="weather-card-fallback-block mx-auto h-5 w-10 rounded bg-white/45" />
            </div>
          </div>
        </div>
      </div>
    </Squircle>
  );
}

export function useChatKit() {
  return useUiKit({
    examples: prompt`
      # Mixing Weather Cards and Markdown:
      <ui>
        <Markdown children="Here's the weather in Huntsville..."/>
        <weather themeColor="blue" location="Huntsville, Al" temperature="0" humidity="0" windSpeed="0" feelsLike="0" />
        <Markdown children="Here's the weather in Chicago..."/>
        <weather themeColor="blue" location="Chicago, IL" temperature="0" humidity="0" windSpeed="0" feelsLike="0" />
      </ui>
    `,
    components: [
      exposeMarkdown(),
      exposeComponent(WeatherCard, {
        name: "weather",
        description: "Shows the weather for a given location",
        fallback: () => <WeatherCardFallback />,
        props: {
          themeColor: s.string("The theme to use for the weather card"),
          location: s.streaming.string("The location to get the weather for"),
          temperature: s.number("The temperature in Fahrenheit"),
          humidity: s.number("The humidity in percentage"),
          windSpeed: s.number("The wind speed in miles per hour"),
          feelsLike: s.number("The feels like temperature in Fahrenheit"),
        },
      }),
    ],
  });
}
