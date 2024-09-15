import localFont from "next/font/local";
import { Karla, Spectral } from "next/font/google";

export const geistSans = localFont({
  src: "./assets/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const geistMono = localFont({
  src: "./assets/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const spectral = Spectral({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const karla = Karla({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  adjustFontFallback: false,
});
