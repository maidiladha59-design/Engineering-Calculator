export const SITE_NAME = "Engineering Calculator";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

export const SITE_DESCRIPTION =
  "Kalkulator teknik online gratis untuk matematika, fisika, mekanika, elektro, sipil, biner, dan konversi satuan. Lengkap dengan rumus, langkah perhitungan, dan penjelasan variabel.";

export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";

export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Engineering Calculator — kalkulator teknik online gratis",
};

export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
