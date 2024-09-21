import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { authSession } from "~/auth";
import ThemeProvider from "~/components/theme-provider";
import { siteConfig } from "~/config/site";
import { geistMono, geistSans } from "~/font";
import { cn } from "~/lib/utils";
import ReactQueryProvider from "~/utils/react-query";
import { Toaster } from "~/components/ui/sonner";

import "~/styles/globals.css";
import { ToasterProvider } from "~/providers/toast-provider";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await authSession();

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            geistSans.variable,
            geistMono.variable
          )}
        >
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <ToasterProvider />
              {children}
              <Toaster />
            </ThemeProvider>
          </ReactQueryProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
