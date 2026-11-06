"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readConsent, saveConsent } from "@/lib/consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (readConsent() !== null) {
      setVisible(false);
    }
  }, []);

  if (!visible) {
    return null;
  }

  function decide(value: "accepted" | "rejected") {
    saveConsent(value);
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-label="Pemberitahuan cookie"
      aria-live="polite"
      className="ec-cookie-banner fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-4 shadow-lg sm:inset-x-4 sm:bottom-4 sm:p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-slate-700">
          Situs ini memakai penyimpanan lokal untuk tema dan, jika Anda setuju,
          cookie iklan Google AdSense. Perhitungan tetap berjalan di browser
          tanpa iklan yang dipersonalisasi bila Anda menolak. Baca{" "}
          <Link
            href="/kebijakan-privasi"
            className="font-semibold text-indigo-600 underline-offset-2 hover:underline"
          >
            kebijakan privasi
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => decide("rejected")}
            className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Tolak
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="inline-flex h-10 items-center justify-center rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Setuju
          </button>
        </div>
      </div>
    </div>
  );
}
