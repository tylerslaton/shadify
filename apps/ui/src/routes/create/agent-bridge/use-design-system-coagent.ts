import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";

import { useDesignSystemSearchParams } from "@/routes/create/lib/search-params";

// Exposes the /create page's design-system state to the CopilotKit agent and
// registers an action the agent can call to propose changes. Mount this hook
// anywhere under the /create tree (e.g. inside CreateRoute) so the agent can
// read current params and drive the pickers via natural language.
export function useDesignSystemCoAgent() {
  const [params, setParams] = useDesignSystemSearchParams();

  useCopilotReadable({
    description:
      "Current design system parameters on the /create page. Keys: base, style, baseColor, theme, chartColor, radius, font, fontHeading, iconLibrary, menuAccent, menuColor, item.",
    value: params,
  });

  useCopilotAction({
    name: "updateDesignSystem",
    description:
      "Update one or more design system parameters on the /create customizer. Only include fields you want to change.",
    parameters: [
      { name: "base", type: "string", required: false, description: "Component library: 'radix' or 'base'." },
      { name: "style", type: "string", required: false, description: "Style: vega | nova | maia | lyra | mira | luma | sera." },
      { name: "baseColor", type: "string", required: false, description: "Base color: neutral | gray | zinc | slate | stone | taupe." },
      { name: "theme", type: "string", required: false, description: "Theme palette (usually matches baseColor)." },
      { name: "chartColor", type: "string", required: false, description: "Chart color palette (usually matches baseColor)." },
      { name: "radius", type: "string", required: false, description: "Corner radius: default | none | small | medium | large." },
      { name: "font", type: "string", required: false, description: "Body font id, e.g. inter, geist, figtree, jetbrains-mono." },
      { name: "fontHeading", type: "string", required: false, description: "Heading font id, or 'inherit' to match body." },
      { name: "iconLibrary", type: "string", required: false, description: "Icon library: lucide | tabler | phosphor | hugeicons | remixicon." },
      { name: "menuAccent", type: "string", required: false, description: "Menu accent: subtle | bold." },
      { name: "menuColor", type: "string", required: false, description: "Menu color: default | inverted | default-translucent | inverted-translucent." },
      { name: "item", type: "string", required: false, description: "Registry item to preview (e.g. 'preview-02')." },
    ],
    handler: (args) => {
      const clean: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(args ?? {})) {
        if (v !== undefined && v !== null && v !== "") clean[k] = v;
      }
      if (Object.keys(clean).length === 0) {
        return "No changes proposed.";
      }
      setParams(clean as Partial<typeof params>);
      return `Applied: ${JSON.stringify(clean)}`;
    },
  });
}
