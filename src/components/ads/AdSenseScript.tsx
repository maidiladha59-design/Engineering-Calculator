"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, readConsent } from "@/lib/consent";

export const ADS_READY_EVENT = "ec-ads-ready";

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, never>>;
    __ecAdsReady?: boolean;
  }
}

export function AdSenseScript({ client }: { client: string }) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sync = () => setAllowed(readConsent() === "accepted");
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener(CONSENT_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  if (!client || !allowed) {
    return null;
  }

  return (
    <Script
      id="adsense-loader"
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      onLoad={() => {
        window.__ecAdsReady = true;
        window.dispatchEvent(new Event(ADS_READY_EVENT));
      }}
    />
  );
}
