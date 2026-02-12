"use client";

import { useMemo, useState } from "react";
import { MagicTextRenderer } from "@hashbrownai/react";
import { AppHeader } from "@/components/app-header";

const markdownDocument = `# A Short Research Note on the History of Waffle House Hashbrowns

## Abstract

Waffle House hashbrowns became a defining part of the chain's identity by combining a simple diner staple with a memorable ordering system and broad regional visibility.[^1]

[^1]: Waffle House - Our Story https://www.wafflehouse.com/our-story/

## Origins and Early Menu Role

Waffle House opened in 1955 in Avondale Estates, Georgia, positioning itself as a fast, always-open diner concept where short-order consistency mattered.[^2] Hashbrowns fit that model: inexpensive, fast to cook on a flat top, and easy to pair with eggs, toast, and meat plates.[^wh-menu]

[^2]: New Georgia Encyclopedia - Waffle House https://www.georgiaencyclopedia.org/articles/business-economy/waffle-house/

## The "Scattered, Smothered, Covered" Era

By the late 20th century, the chain had transformed hashbrowns from a side item into a signature format through a call-and-response ordering language that kitchen staff could execute quickly under pressure.[^menu-culture] The phrase "scattered, smothered, covered" became both operations shorthand and brand marketing, later expanding into many topping combinations.[^wh-order]

## Why Hashbrowns Became Iconic

Three factors stand out:

1. **Operational speed:** hashbrowns cook quickly and scale well in high-volume overnight service.[^qsr-profile]
2. **Customization:** topping combinations created a repeatable but personalized order ritual.[^wh-order]
3. **Cultural reach:** Waffle House's geographic concentration in the South helped make hashbrowns part of a recognizable regional diner experience.[^southern-foodways]

## Conclusion

The historical arc of Waffle House hashbrowns is less about a single recipe innovation and more about system design: fast execution, memorable language, and repeat customer participation.[^menu-culture]

[^wh-menu]: Waffle House - Menu https://www.wafflehouse.com/menu/
[^menu-culture]: Southern Foodways Alliance - Waffle House and Southern Diner Culture https://www.southernfoodways.org/
[^wh-order]: Waffle House - Hashbrowns https://www.wafflehouse.com/menu/hashbrowns/
[^qsr-profile]: Restaurant Business - Waffle House brand profile https://www.restaurantbusinessonline.com/
[^southern-foodways]: Encyclopedia of Southern Culture (Foodways entries) https://uncpress.org/
`;

export default function MagicTextDemoPage() {
  const [cursor, setCursor] = useState(0);
  const markdownSlice = markdownDocument.slice(0, cursor);
  const ticks = useMemo(
    () => Array.from({ length: markdownDocument.length }),
    [],
  );

  return (
    <main className="flex h-dvh w-full flex-col bg-[var(--background)] text-[var(--foreground)]">
      <AppHeader active="magic-text" title="Magic Text Demo" />

      <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-2">
        <section className="flex min-h-0 flex-col border-b border-[rgba(164,163,161,0.45)] bg-white/55 md:border-b-0 md:border-r">
          <div className="border-b border-[rgba(164,163,161,0.45)] px-6 py-3 text-xs uppercase tracking-[0.3em] text-[var(--gray)]">
            Raw Markdown
          </div>
          <div className="min-h-0 flex-1 overflow-auto px-6 py-4">
            <pre className="whitespace-pre-wrap text-sm font-medium leading-6">
              <span className="text-[var(--sunset-orange)]">
                {markdownDocument.slice(0, cursor)}
              </span>
              <span className="text-[var(--gray)]/45">
                {markdownDocument.slice(cursor)}
              </span>
            </pre>
          </div>
        </section>

        <section className="flex min-h-0 flex-col bg-[var(--background)]">
          <div className="border-b border-[rgba(164,163,161,0.45)] px-6 py-3 text-xs uppercase tracking-[0.3em] text-[var(--gray)]">
            Magic Text Output
          </div>
          <div className="magic-text-output min-h-0 flex-1 overflow-auto px-6 py-4">
            {markdownSlice.length === 0 ? (
              <div className="text-sm text-[var(--gray)]">
                Start scrubbing to stream markdown.
              </div>
            ) : (
              <MagicTextRenderer
                isComplete={cursor === markdownDocument.length}
              >
                {markdownSlice}
              </MagicTextRenderer>
            )}
          </div>
        </section>
      </div>

      <div className="border-t border-[rgba(164,163,161,0.45)] bg-[var(--background)] px-6 py-4">
        <input
          type="range"
          min={0}
          max={markdownDocument.length}
          value={cursor}
          onChange={(event) => setCursor(Number(event.target.value))}
          className="scrub-slider"
          style={{
            background: `linear-gradient(to right, var(--sunshine-yellow) 0%, var(--sunshine-yellow) ${(cursor / markdownDocument.length) * 100}%, rgba(164,163,161,0.2) ${(cursor / markdownDocument.length) * 100}%, rgba(164,163,161,0.2) 100%)`,
          }}
        />
        <div
          className="mt-3 grid h-3 w-full items-end gap-[1px]"
          style={{
            gridTemplateColumns: `repeat(${ticks.length}, minmax(0, 1fr))`,
          }}
        >
          {ticks.map((_, index) => (
            <span
              key={index}
              className={`h-full rounded-sm ${
                index < cursor
                  ? "bg-[var(--sunset-orange)]"
                  : "bg-[var(--gray-light)]/60"
              }`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
