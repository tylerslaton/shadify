import { s } from "@hashbrownai/core";
import { exposeComponent, useUiKit } from "@hashbrownai/react";
import { Paragraph } from "./paragraph";
import { ListItem } from "./list-item";
import { OrderedList } from "./ordered-list";
import { UnorderedList } from "./unordered-list";
import { WeatherCard } from "../weather";

export function useChatKit() {
  return useUiKit({
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
        props: {
          location: s.string("The location to get the weather for"),
          themeColor: s.string("The theme to use for the weather card"),
        },
      }),
    ],
  });
}
