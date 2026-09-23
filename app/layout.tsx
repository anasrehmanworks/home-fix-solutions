import type { Metadata } from "next";
import Script from "next/script";
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
    default: "Home Fix Solution | Home Services Across 30+ States",
    template: "%s | Home Fix Solution"
  },
  description: site.description,

  verification: {
    google: "jNysP_bcD8B-qU6X1z-DX8-PtzqpPYZ7D-I7T0Chtls"
  },

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/logo-icon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NC5RDN89');`}
        </Script>
      </head>
      <body
        className={`${manrope.variable} ${outfit.variable}`}
        suppressHydrationWarning
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NC5RDN89"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <JsonLd data={localBusinessSchema()} />

        <Header />

        <main>{children}</main>

        <Footer />

        <StickyPhone />

        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-X33QP2BCGM"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-X33QP2BCGM');
          `}
        </Script>
      </body>
    </html>
  );
}
