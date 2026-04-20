import * as React from "react";

import {
  buildRegistryTheme,
  DEFAULT_CONFIG,
  type DesignSystemConfig,
} from "@/registry/config";
import { FONTS } from "@/routes/create/lib/fonts";
import { useDesignSystemSearchParams } from "@/routes/create/lib/search-params";

const ROOT_SELECTOR = "[data-design-system-root]";
const STYLE_ELEMENT_ID = "design-system-theme-vars";
const MANAGED_WRAPPER_CLASS_PREFIXES = ["style-", "base-color-"] as const;

type RegistryThemeCssVars = NonNullable<
  ReturnType<typeof buildRegistryTheme>["cssVars"]
>;

function removeManagedWrapperClasses(el: Element) {
  for (const className of Array.from(el.classList)) {
    if (MANAGED_WRAPPER_CLASS_PREFIXES.some((p) => className.startsWith(p))) {
      el.classList.remove(className);
    }
  }
}

function buildCssRule(selector: string, cssVars?: Record<string, string>) {
  const declarations = Object.entries(cssVars ?? {})
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => `  --${key}: ${value};`)
    .join("\n");

  if (!declarations) return `${selector} {}\n`;
  return `${selector} {\n${declarations}\n}\n`;
}

function buildScopedThemeCssText(cssVars: RegistryThemeCssVars) {
  return [
    buildCssRule(ROOT_SELECTOR, {
      ...(cssVars.theme ?? {}),
      ...(cssVars.light ?? {}),
    }),
    buildCssRule(`${ROOT_SELECTOR}.dark`, cssVars.dark),
  ].join("\n");
}

type DesignSystemProviderProps = {
  children: React.ReactNode;
  isDark?: boolean;
  className?: string;
};

export function DesignSystemProvider({ children, isDark = false, className }: DesignSystemProviderProps) {
  const [searchParams] = useDesignSystemSearchParams({
    shallow: true,
    history: "replace",
  });
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const {
    style,
    theme,
    font,
    fontHeading,
    baseColor,
    chartColor,
    menuAccent,
    menuColor,
    radius,
  } = searchParams;
  const effectiveRadius = style === "lyra" ? "none" : radius;

  const selectedFont = React.useMemo(
    () => FONTS.find((f) => f.value === font),
    [font],
  );
  const selectedHeadingFont = React.useMemo(() => {
    if (fontHeading === "inherit" || fontHeading === font) return selectedFont;
    return FONTS.find((f) => f.value === fontHeading);
  }, [font, fontHeading, selectedFont]);

  React.useEffect(() => {
    return () => {
      document.getElementById(STYLE_ELEMENT_ID)?.remove();
    };
  }, []);

  React.useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || !style || !theme || !font || !baseColor) return;

    removeManagedWrapperClasses(wrapper);
    wrapper.classList.add(`style-${style}`, `base-color-${baseColor}`);

    if (selectedFont) {
      wrapper.style.setProperty("--font-sans", selectedFont.font.style.fontFamily);
    } else {
      wrapper.style.removeProperty("--font-sans");
    }
    if (selectedHeadingFont) {
      wrapper.style.setProperty("--font-heading", selectedHeadingFont.font.style.fontFamily);
    } else {
      wrapper.style.removeProperty("--font-heading");
    }
  }, [style, theme, font, fontHeading, baseColor, selectedFont, selectedHeadingFont]);

  const registryTheme = React.useMemo(() => {
    if (!baseColor || !theme || !menuAccent || !effectiveRadius) return null;
    const config: DesignSystemConfig = {
      ...DEFAULT_CONFIG,
      baseColor,
      theme,
      chartColor,
      menuAccent,
      radius: effectiveRadius,
    };
    return buildRegistryTheme(config);
  }, [baseColor, theme, chartColor, menuAccent, effectiveRadius]);

  React.useLayoutEffect(() => {
    if (!registryTheme?.cssVars) return;
    let styleEl = document.getElementById(STYLE_ELEMENT_ID) as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = STYLE_ELEMENT_ID;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = buildScopedThemeCssText(registryTheme.cssVars);
  }, [registryTheme]);

  React.useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || !menuColor) return;

    const isInverted = menuColor === "inverted" || menuColor === "inverted-translucent";
    const isTranslucent = menuColor === "default-translucent" || menuColor === "inverted-translucent";

    const updateMenuElements = () => {
      const elements = wrapper.querySelectorAll<HTMLElement>(
        ".cn-menu-target, [data-menu-translucent]",
      );
      elements.forEach((el) => {
        el.style.transition = "none";
      });
      elements.forEach((el) => {
        if (el.classList.contains("cn-menu-target")) {
          el.classList.toggle("dark", isInverted);
        }
        if (isTranslucent) {
          el.classList.add("cn-menu-translucent");
          el.removeAttribute("data-menu-translucent");
        } else if (el.classList.contains("cn-menu-translucent")) {
          el.classList.remove("cn-menu-translucent");
          el.setAttribute("data-menu-translucent", "");
        }
      });
      void wrapper.offsetHeight;
      elements.forEach((el) => {
        el.style.transition = "";
      });
    };

    updateMenuElements();
    const observer = new MutationObserver(() => updateMenuElements());
    observer.observe(wrapper, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [menuColor]);

  return (
    <div
      ref={wrapperRef}
      data-design-system-root=""
      className={[isDark ? "dark" : "", "bg-background text-foreground", className ?? ""]
        .filter(Boolean)
        .join(" ")}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {children}
    </div>
  );
}
