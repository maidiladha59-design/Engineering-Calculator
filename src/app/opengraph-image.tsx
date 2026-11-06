import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Engineering Calculator — kalkulator teknik online gratis";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e1b4b 55%, #312e81 100%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "#4f46e5",
              fontSize: 40,
              fontWeight: 700,
            }}
          >
            EC
          </div>
          <div style={{ fontSize: 30, letterSpacing: 4, color: "#c7d2fe" }}>
            ENGINEERING CALCULATOR
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>
            Kalkulator teknik online, gratis dan transparan.
          </div>
          <div style={{ fontSize: 30, color: "#cbd5e1", lineHeight: 1.35 }}>
            Rumus, langkah perhitungan, konversi satuan, dan penjelasan variabel
            untuk matematika, fisika, mekanika, elektro, dan sipil.
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 24, color: "#e0e7ff" }}>
          <span>53 kalkulator aktif</span>
          <span>•</span>
          <span>Tanpa login</span>
          <span>•</span>
          <span>Semua dihitung di browser</span>
        </div>
      </div>
    ),
    size,
  );
}
