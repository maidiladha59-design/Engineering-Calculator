import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AdSenseScript } from "@/components/ads/AdSenseScript";
import { CookieConsent } from "@/components/ads/CookieConsent";
import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { themeInitScript } from "@/lib/theme";

const inter = Inter({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-inter",
  adjustFontFallback: true,
});

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Engineering Calculator — Kalkulator Teknik Online Gratis",
    template: "%s | Engineering Calculator",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "kalkulator teknik",
    "kalkulator online",
    "kalkulator matematika",
    "kalkulator fisika",
    "kalkulator teknik sipil",
    "kalkulator teknik elektro",
    "konversi satuan",
  ],
  applicationName: SITE_NAME,
  category: "education",
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: SITE_NAME,
    url: "/",
    title: "Engineering Calculator — Kalkulator Teknik Online Gratis",
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Calculator — Kalkulator Teknik Online Gratis",
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#070d19" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${inter.variable} flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900 antialiased`}
      >
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <a
          href="#konten-utama"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-indigo-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Lewati ke konten utama
        </a>
        <Navbar />
        <main
          id="konten-utama"
          className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10"
        >
          {children}
        </main>
        <Footer />
        {ADSENSE_CLIENT ? (
          <AdSenseScript client={ADSENSE_CLIENT} />
        ) : null}
        {ADSENSE_CLIENT ? <CookieConsent /> : null}
      </body>
    </html>
  );
}
