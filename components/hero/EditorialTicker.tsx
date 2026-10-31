"use client";

import React from "react";
import { heroData } from "@/lib/data/homepageContent";

export default function EditorialTicker() {
  return (
    <div
      style={{
        borderTop: "1px solid var(--color-hairline-dark)",
        borderBottom: "1px solid var(--color-hairline-dark)",
        backgroundColor: "var(--color-obsidian-surface)",
        padding: "16px 0",
        overflow: "hidden",
        position: "relative",
      }}
      id="live-inventory-ribbon"
    >
      <div style={{ display: "flex", overflow: "hidden" }}>
        <div className="editorial-ticker-track">
          {[...heroData.liveTicker, ...heroData.liveTicker].map((item, idx) => (
            <div
              key={`${item}-${idx}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                padding: "0 28px",
                fontSize: "0.82rem",
                fontFamily: "var(--font-mono-system)",
                color: "var(--color-obsidian-text)",
                letterSpacing: "0.04em",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ color: "var(--color-brand-orange)", fontWeight: 700, textShadow: "0 0 8px rgba(245, 130, 32, 0.4)" }}>·</span>
              <span style={{ fontWeight: 500, color: "#e4e4e7" }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
