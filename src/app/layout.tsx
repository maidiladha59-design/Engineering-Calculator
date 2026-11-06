import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "katex/dist/katex.min.css";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { themeInitScript } from "@/lib/theme";

export const metadata: Metadata = {
  title: {
    default: "Engineering Calculator — Kalkulator Teknik Online Gratis",
    template: "%s | Engineering Calculator",
  },
  description:
    "Kalkulator teknik online gratis untuk matematika, fisika, mekanika, elektro, sipil, biner, dan konversi satuan. Lengkap dengan rumus, langkah perhitungan, dan penjelasan variabel.",
  keywords: [
    "kalkulator teknik",
    "kalkulator online",
    "kalkulator matematika",
    "kalkulator fisika",
    "kalkulator teknik sipil",
    "kalkulator teknik elektro",
    "konversi satuan",
  ],
  applicationName: "Engineering Calculator",
  category: "education",
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
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased">
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
      </body>
    </html>
  );
}
