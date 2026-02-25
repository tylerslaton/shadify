import { s } from "@hashbrownai/core";
import { exposeComponent, exposeMarkdown, useUiKit } from "@hashbrownai/react";
import { Card } from "../ui/card";
import { Calendar } from "../ui/calendar";
import { Row, Column } from "../ui/layout";
import { SimpleChart } from "../ui/simple-chart";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "../ui/menubar";

function FallBack() {
  return (
    <div>👨‍🍳 Cooking...</div>
  );
}

// --- Layout ---

const row = exposeComponent(Row, {
  name: "row",
  description: "Horizontal flex row for laying out children side by side.",
  fallback: () => <FallBack />,
  props: {
    gap: s.string("Tailwind gap size, e.g. '2', '4', '6'") as any,
    align: s.string("Tailwind items-* alignment: 'start', 'center', 'end', 'stretch'") as any,
    justify: s.string("Tailwind justify-* alignment: 'start', 'center', 'end', 'between', 'around'") as any,
  },
  children: "any",
});

const column = exposeComponent(Column, {
  name: "column",
  description: "Vertical flex column for stacking children.",
  fallback: () => <FallBack />,
  props: {
    gap: s.string("Tailwind gap size, e.g. '2', '4', '6'") as any,
    align: s.string("Tailwind items-* alignment: 'start', 'center', 'end', 'stretch'") as any,
    justify: s.string("Tailwind justify-* alignment: 'start', 'center', 'end', 'between', 'around'") as any,
  },
  children: "any",
});

// --- Chart ---

const simpleChart = exposeComponent(SimpleChart, {
  name: "chart",
  description: "A chart that visualizes data. Supports bar, line, and area chart types.",
  fallback: () => <FallBack />,
  props: {
    type: s.enumeration("Chart type", ["bar", "line", "area"] as const) as any,
    data: s.array("Array of data objects", s.object("A data point", {})),
    dataKey: s.string("The key in each data object for the y-axis values"),
    categoryKey: s.string("The key in each data object for the x-axis labels"),
    color: s.string("CSS color for the chart, e.g. 'var(--sunshine-yellow)' or '#ff0000'") as any,
  },
  children: false,
});

// --- Menubar ---

const menubarItem = exposeComponent(MenubarItem, {
  name: "menubar_item",
  description: "A single clickable item inside a menu dropdown.",
  fallback: () => <FallBack />,
  children: "text",
});

const menubarContent = exposeComponent(MenubarContent, {
  name: "menubar_content",
  description: "The dropdown content panel of a menu.",
  fallback: () => <FallBack />,
  children: [menubarItem],
});

const menubarTrigger = exposeComponent(MenubarTrigger, {
  name: "menubar_trigger",
  description: "The clickable label that opens a menu dropdown.",
  fallback: () => <FallBack />,
  children: "text",
});

const menubarMenu = exposeComponent(MenubarMenu, {
  name: "menubar_menu",
  description: "A single menu within the menubar, containing a trigger and dropdown content.",
  fallback: () => <FallBack />,
  children: [menubarTrigger, menubarContent],
});

const menubar = exposeComponent(Menubar, {
  name: "menubar",
  description: "A horizontal menu bar with dropdown menus. Contains one or more menus.",
  fallback: () => <FallBack />,
  children: [menubarMenu],
});

// --- Hook ---

export function useChatKit() {
  return useUiKit({
    components: [
      exposeMarkdown(),
      exposeComponent(Card, {
        name: "card",
        description: "Card to wrap content.",
        fallback: () => <FallBack />,
        children: "any",
      }),
      exposeComponent(Calendar, {
        name: "calendar",
        description: "Calendar to display events.",
        fallback: () => <FallBack />,
        children: "any",
      }),
      row,
      column,
      simpleChart,
      menubar,
      menubarMenu,
      menubarTrigger,
      menubarContent,
      menubarItem,
    ],
  });
}
