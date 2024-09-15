import type { Metadata } from "next";
import { siteConfig } from "~/config/site";
import { geistMono, geistSans } from "~/font";
import { cn } from "~/lib/utils";
import "~/styles/globals.css";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  robots: siteConfig.robots,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          geistSans.variable,
          geistMono.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
