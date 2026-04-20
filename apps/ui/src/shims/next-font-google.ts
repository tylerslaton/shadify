type FontOptions = {
  weight?: string | string[];
  style?: string | string[];
  subsets?: string[];
  display?: string;
  preload?: boolean;
  variable?: string;
  adjustFontFallback?: boolean | string;
};

export type NextFontResult = {
  className: string;
  style: { fontFamily: string; fontWeight?: string; fontStyle?: string };
  variable: string;
};

function makeFont(family: string): (opts?: FontOptions) => NextFontResult {
  return (opts?: FontOptions) => ({
    className: "",
    style: { fontFamily: family },
    variable: opts?.variable ?? `--font-${family.toLowerCase().replace(/\s+/g, "-")}`,
  });
}

// Export every Google font used in the registry/create tree. Add more as needed.
export const Geist = makeFont("Geist");
export const Geist_Mono = makeFont("Geist Mono");
export const Inter = makeFont("Inter");
export const Noto_Sans = makeFont("Noto Sans");
export const Noto_Sans_Mono = makeFont("Noto Sans Mono");
export const Playfair_Display = makeFont("Playfair Display");
export const JetBrains_Mono = makeFont("JetBrains Mono");
export const Figtree = makeFont("Figtree");
export const Vazirmatn = makeFont("Vazirmatn");
export const Roboto = makeFont("Roboto");
export const Roboto_Mono = makeFont("Roboto Mono");
export const Open_Sans = makeFont("Open Sans");
export const Lato = makeFont("Lato");
export const Montserrat = makeFont("Montserrat");
export const Poppins = makeFont("Poppins");
export const Source_Sans_3 = makeFont("Source Sans 3");
export const Raleway = makeFont("Raleway");
export const Nunito = makeFont("Nunito");
export const Nunito_Sans = makeFont("Nunito Sans");
export const Merriweather = makeFont("Merriweather");
export const Lora = makeFont("Lora");
export const DM_Sans = makeFont("DM Sans");
export const DM_Mono = makeFont("DM Mono");
export const Space_Grotesk = makeFont("Space Grotesk");
export const Space_Mono = makeFont("Space Mono");
export const Fira_Code = makeFont("Fira Code");
export const Fira_Sans = makeFont("Fira Sans");
export const IBM_Plex_Sans = makeFont("IBM Plex Sans");
export const IBM_Plex_Mono = makeFont("IBM Plex Mono");
export const IBM_Plex_Serif = makeFont("IBM Plex Serif");
export const Work_Sans = makeFont("Work Sans");
export const Manrope = makeFont("Manrope");
export const Outfit = makeFont("Outfit");
export const Urbanist = makeFont("Urbanist");
export const EB_Garamond = makeFont("EB Garamond");
export const Instrument_Sans = makeFont("Instrument Sans");
export const Instrument_Serif = makeFont("Instrument Serif");
export const Noto_Serif = makeFont("Noto Serif");
export const Oxanium = makeFont("Oxanium");
export const Public_Sans = makeFont("Public Sans");
export const Roboto_Slab = makeFont("Roboto Slab");
