import type { Metadata } from "next";
import { Manrope, Outfit } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StickyPhone } from "@/components/StickyPhone";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessSchema, site } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope"
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading"
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Home Fix Solution | Garage Door, Air Duct & Chimney Services",
    template: "%s | Home Fix Solution"
  },
  description: site.description,
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/logo-icon.png"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${outfit.variable}`} suppressHydrationWarning>
        <JsonLd data={localBusinessSchema()} />
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyPhone />
      </body>
    </html>
  );
}
