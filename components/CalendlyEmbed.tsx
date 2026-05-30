"use client";

import { useEffect, useState } from "react";

interface CalendlyEmbedProps {
  url: string;
}

export function CalendlyEmbed({ url }: CalendlyEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Inject Calendly CSS
    const existingLink = document.querySelector(
      'link[href*="calendly.com/assets/external/widget.css"]'
    );
    if (!existingLink) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }

    // Inject Calendly JS
    const existingScript = document.querySelector(
      'script[src*="calendly.com/assets/external/widget.js"]'
    );
    if (existingScript) {
      setLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => setLoaded(true);
    document.head.appendChild(script);

    return () => {
      // intentionally do not remove: Calendly script should persist across navigations
    };
  }, []);

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-border">
      {/* Loading skeleton */}
      {!loaded && (
        <div
          className="animate-pulse bg-surface-2 flex flex-col gap-4 p-8"
          style={{ minWidth: "320px", height: "700px" }}
          aria-label="Loading booking calendar..."
        >
          <div className="h-6 bg-border rounded-lg w-1/2" />
          <div className="h-4 bg-border rounded w-3/4" />
          <div className="flex gap-2 mt-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex-1 h-10 bg-border rounded-lg" />
            ))}
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-2">
              {Array.from({ length: 7 }).map((_, j) => (
                <div key={j} className="flex-1 h-10 bg-border rounded-lg opacity-60" />
              ))}
            </div>
          ))}
          <div className="mt-auto h-12 bg-border rounded-lg" />
        </div>
      )}

      {/* Calendly embed widget */}
      <div
        className="calendly-inline-widget"
        data-url={url}
        style={{
          minWidth: "320px",
          height: "700px",
          display: loaded ? "block" : "none",
        }}
      />
    </div>
  );
}
