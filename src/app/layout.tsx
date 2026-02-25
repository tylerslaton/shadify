import type { Metadata } from "next";

import { CopilotKit } from "@copilotkit/react-core";
import "./globals.css";
import "@copilotkit/react-ui/v2/styles.css";

export const metadata: Metadata = {
  title: "Hashbrown with CopilotKit",
  description: "Light theme demo with squircle UI surfaces",
  icons: {
    icon: "/hashbrown.svg",
    shortcut: "/hashbrown.svg",
    apple: "/hashbrown.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://cdn.fonts.net" />
        <script
          type="text/javascript"
          src="https://cdn.fonts.net/kit/b29934de-5479-4373-aeff-bf0861be360f/b29934de-5479-4373-aeff-bf0861be360f_enhanced.js"
          async
        ></script>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.fonts.net/kit/b29934de-5479-4373-aeff-bf0861be360f/b29934de-5479-4373-aeff-bf0861be360f_enhanced.css"
        />
      </head>
      <body className="antialiased" style={{ fontFamily: "var(--font-body)" }}>
        <CopilotKit
          runtimeUrl="/api/copilotkit"
          agent="sample_agent"
          showDevConsole={false}
        >
          {children}
        </CopilotKit>
      </body>
    </html>
  );
}
