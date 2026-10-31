"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";
import { trustData } from "@/lib/data/homepageContent";

export default function EditorialTrustSection() {
  return (
    <section
      id="institutional-trust"
      style={{
        padding: "80px 0",
        borderBottom: "1px solid var(--color-hairline)",
        position: "relative",
      }}
    >
      <div className="editorial-container">
        {/* Section Header */}
        <div style={{ maxWidth: "780px", marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "clamp(2rem, 3.8vw, 3.2rem)",
              fontWeight: 700,
              letterSpacing: "-0.035em",
              color: "var(--color-ink-black)",
              lineHeight: 1.15,
              marginBottom: "12px",
            }}
          >
            {trustData.title}
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--color-slate)",
              lineHeight: 1.6,
            }}
          >
            {trustData.subtitle}
          </p>
        </div>

        {/* Institutional Credential Badge Pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "48px",
          }}
        >
          {trustData.badges.map((badge) => (
            <div
              key={badge}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 18px",
                backgroundColor: "var(--color-warm-surface)",
                border: "1px solid var(--color-hairline-contrast)",
                borderRadius: "var(--radius-xs)",
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "var(--color-ink-black)",
              }}
            >
              <ShieldCheck size={15} style={{ color: "var(--color-brand-orange)", flexShrink: 0 }} />
              <span>{badge}</span>
            </div>
          ))}
        </div>

        {/* Continuous Institutional Ticker Ribbon */}
        <div
          style={{
            borderTop: "1px solid var(--color-hairline-dark)",
            borderBottom: "1px solid var(--color-hairline-dark)",
            backgroundColor: "var(--color-obsidian-surface)",
            padding: "16px 0",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", overflow: "hidden" }}>
            <div className="editorial-ticker-track">
              {[...trustData.tickerItems, ...trustData.tickerItems].map((item, idx) => (
                <div
                  key={`${item}-${idx}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "0 28px",
                    fontSize: "0.82rem",
                    fontFamily: "var(--font-mono-system)",
                    color: "var(--color-obsidian-text)",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    whiteSpace: "nowrap",
                  }}
                >
                  <ShieldCheck size={14} style={{ color: "var(--color-brand-orange)" }} />
                  <span style={{ color: "#e4e4e7" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
