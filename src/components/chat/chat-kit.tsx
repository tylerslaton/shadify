import { s, prompt } from "@hashbrownai/core";
import { exposeComponent, useUiKit } from "@hashbrownai/react";
import { Paragraph } from "./paragraph";
import { ListItem } from "./list-item";
import { OrderedList } from "./ordered-list";
import { UnorderedList } from "./unordered-list";
import { WeatherCard } from "../weather";

function WeatherCardFallback() {
  return (
    <div className="mt-6 mb-4 w-full max-w-md rounded-xl bg-sky-400/30 shadow-xl">
      <div className="relative h-full w-full overflow-hidden rounded-xl bg-white/20 p-4 weather-card-fallback">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-7 w-40 rounded bg-white/40 weather-card-fallback-block" />
            <div className="h-5 w-28 rounded bg-white/30 weather-card-fallback-block" />
          </div>
          <div className="h-14 w-14 rounded-full bg-white/30 weather-card-fallback-block" />
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div className="h-10 w-16 rounded bg-white/40 weather-card-fallback-block" />
          <div className="h-5 w-20 rounded bg-white/30 weather-card-fallback-block" />
        </div>

        <div className="mt-4 border-t border-white/40 pt-4">
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-2">
              <div className="mx-auto h-3 w-12 rounded bg-white/25 weather-card-fallback-block" />
              <div className="mx-auto h-5 w-10 rounded bg-white/40 weather-card-fallback-block" />
            </div>
            <div className="space-y-2">
              <div className="mx-auto h-3 w-10 rounded bg-white/25 weather-card-fallback-block" />
              <div className="mx-auto h-5 w-10 rounded bg-white/40 weather-card-fallback-block" />
            </div>
            <div className="space-y-2">
              <div className="mx-auto h-3 w-12 rounded bg-white/25 weather-card-fallback-block" />
              <div className="mx-auto h-5 w-10 rounded bg-white/40 weather-card-fallback-block" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function useChatKit() {
  return useUiKit({
    examples: prompt`
      <ui>
        <p>with some text</p>
      </ui>
    `,
    components: [
      exposeComponent(Paragraph, {
        name: "p",
        description: "A paragraph of text",
        children: "text",
      }),
      exposeComponent(OrderedList, {
        name: "ol",
        description: "An ordered list",
        children: "any",
      }),
      exposeComponent(UnorderedList, {
        name: "ul",
        description: "An unordered list",
        children: "any",
      }),
      exposeComponent(ListItem, {
        name: "li",
        description: "A list item",
        children: "text",
      }),
      exposeComponent(WeatherCard, {
        name: "weather",
        description: "Shows the weather for a given location",
        fallback: () => <WeatherCardFallback />,
        // fallback: (...args: any[]) => (
        //   <pre>{JSON.stringify(args, null, 2)}</pre>
        // ),
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
