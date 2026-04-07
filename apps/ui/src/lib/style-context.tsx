import { createContext, useContext, useState } from "react";

export type UIStyle = "default" | "luma";

const StyleContext = createContext<{
  style: UIStyle;
  setStyle: (style: UIStyle) => void;
}>({ style: "default", setStyle: () => {} });

export function StyleProvider({
  children,
  defaultStyle = "default",
}: {
  children: React.ReactNode;
  defaultStyle?: UIStyle;
}) {
  const [style, setStyle] = useState<UIStyle>(defaultStyle);
  return <StyleContext.Provider value={{ style, setStyle }}>{children}</StyleContext.Provider>;
}

export function useStyle() {
  return useContext(StyleContext);
}
