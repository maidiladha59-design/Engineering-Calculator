"use client";

import { useEffect, useRef, useState } from "react";
import { ADS_READY_EVENT } from "@/components/ads/AdSenseScript";
import { CONSENT_EVENT, readConsent } from "@/lib/consent";

export function AdSlot({
  slot,
  className = "",
}: {
  slot?: string;
  className?: string;
}) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const [allowed, setAllowed] = useState(false);
  const [ready, setReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    const syncConsent = () => setAllowed(readConsent() === "accepted");
    const syncReady = () => setReady(window.__ecAdsReady === true);

    syncConsent();
    syncReady();
    window.addEventListener(CONSENT_EVENT, syncConsent);
    window.addEventListener(ADS_READY_EVENT, syncReady);

    return () => {
      window.removeEventListener(CONSENT_EVENT, syncConsent);
      window.removeEventListener(ADS_READY_EVENT, syncReady);
    };
  }, []);

  useEffect(() => {
    if (!client || !slot || !allowed || !ready || pushedRef.current) {
      return;
    }

    const element = containerRef.current?.querySelector("ins");
    if (!element || element.getAttribute("data-adsbygoogle-status")) {
      return;
    }

    pushedRef.current = true;
    try {
      window.adsbygoogle = window.adsbygoogle ?? [];
      window.adsbygoogle.push({});
    } catch {
      pushedRef.current = false;
    }
  }, [allowed, client, ready, slot]);

  if (!client || !slot) {
    return null;
  }

  return (
    <aside
      aria-label="Iklan"
      className={`min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm ${className}`}
    >
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
        Iklan
      </p>
      <div ref={containerRef} className="min-h-[90px]">
        {allowed ? (
          <ins
            className="adsbygoogle block"
            style={{ display: "block" }}
            data-ad-client={client}
            data-ad-slot={slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        ) : null}
      </div>
    </aside>
  );
}
