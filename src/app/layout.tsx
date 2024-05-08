import Sidebar from "@/components/layout/Sidebar";
import { siteConfig } from "@/config/site";
import type { Metadata, Viewport } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const ubuntu = Ubuntu({
  adjustFontFallback: true,
  subsets: ["latin"],
  weight: ["300", "500"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  // icons: {
  //   icon: "/favicon.ico",
  //   shortcut: "/favicon-16x16.png",
  //   apple: "/apple-touch-icon.png",
  // },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  height: "device-height",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={ubuntu.className}>
        <Providers
          themeProps={{
            attribute: "class",
            defaultTheme: "dark",
            children: "",
          }}
        >
          <div className="relative z-0 flex max-h-full h-screen w-full overflow-hidden bg-background">
            <aside className="flex-shrink-0 overflow-x-hidden bg-foreground w-[260px] mr-2 hidden md:block">
              <Sidebar />
            </aside>
            <div className="relative flex h-full max-w-full flex-1 flex-col overflow-hidden">
              <main className="relative h-full w-full flex-1 overflow-auto transition-width">
                {/* <div className="fixed left-0 top-1/2 z-40"></div> */}
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
