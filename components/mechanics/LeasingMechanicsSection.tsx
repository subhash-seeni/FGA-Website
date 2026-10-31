"use client";

import React from "react";
import { leasingMechanicsData } from "@/lib/data/homepageContent";

export default function LeasingMechanicsSection() {
  return (
    <section
      id="leasing-model"
      style={{
        padding: "72px 0",
        borderTop: "1px solid var(--color-hairline-dark)",
        borderBottom: "1px solid var(--color-hairline-dark)",
        backgroundColor: "var(--color-obsidian-ground)",
      }}
    >
      <div className="editorial-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            border: "1px solid var(--color-obsidian-border)",
            backgroundColor: "var(--color-obsidian-surface)",
          }}
          className="mechanics-metrics-grid"
        >
          {leasingMechanicsData.metrics.map((m, idx) => (
            <div
              key={m.label}
              style={{
                padding: "36px 32px",
                borderRight:
                  idx === leasingMechanicsData.metrics.length - 1
                    ? "none"
                    : "1px solid var(--color-obsidian-border)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              className="mechanics-metric-col"
            >
              <div
                style={{
                  fontFamily: "var(--font-mono-system)",
                  fontSize: "clamp(2.2rem, 3.8vw, 3.2rem)",
                  fontWeight: 800,
                  color: "var(--color-brand-orange)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  marginBottom: "16px",
                  textShadow: "0 0 20px rgba(245, 130, 32, 0.25)",
                }}
              >
                {m.value}
              </div>

              <div>
                <div
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "-0.01em",
                    marginBottom: "6px",
                  }}
                >
                  {m.label}
                </div>
                <div
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--color-obsidian-muted)",
                    lineHeight: 1.45,
                  }}
                >
                  {m.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          :global(.mechanics-metrics-grid) {
            grid-template-columns: 1fr 1fr !important;
          }
          :global(.mechanics-metric-col:nth-child(2)) {
            border-right: none !important;
          }
          :global(.mechanics-metric-col:nth-child(1)),
          :global(.mechanics-metric-col:nth-child(2)) {
            border-bottom: 1px solid var(--color-obsidian-border) !important;
          }
        }
        @media (max-width: 600px) {
          :global(.mechanics-metrics-grid) {
            grid-template-columns: 1fr !important;
          }
          :global(.mechanics-metric-col) {
            border-right: none !important;
            border-bottom: 1px solid var(--color-obsidian-border) !important;
            padding: 24px 20px !important;
          }
          :global(.mechanics-metric-col:last-child) {
            border-bottom: none !important;
          }
        }
      `}</style>
    </section>
  );
}
