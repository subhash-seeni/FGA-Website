"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { businessValueData } from "@/lib/data/homepageContent";
import { Check, X } from "lucide-react";
import { gsap, useGSAP } from "@/lib/animations/gsap";
import { assetPath } from "@/lib/utils/basePath";

export default function LeasingValueSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const ledgerTableRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      // Only run scroll-driven progression on desktop (width > 900px)
      const mm = gsap.matchMedia();

      mm.add("(min-width: 901px)", () => {
        // Sequenced scroll-driven reveal of the 5 comparative financial dimensions
        const rows = gsap.utils.toArray<HTMLElement>(".comparison-ledger-row");

        rows.forEach((row) => {
          gsap.fromTo(
            row,
            { opacity: 0.35, y: 14 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: row,
                start: "top 80%",
                end: "top 55%",
                scrub: 0.5,
              },
            }
          );

          // Highlight the Firstgen advantage cell as row enters focal zone
          const advantageCell = row.querySelector(".advantage-cell");
          if (advantageCell) {
            gsap.fromTo(
              advantageCell,
              { backgroundColor: "transparent" },
              {
                backgroundColor: "rgba(245, 130, 32, 0.04)",
                duration: 0.4,
                scrollTrigger: {
                  trigger: row,
                  start: "top 75%",
                  end: "top 60%",
                  toggleActions: "play reverse play reverse",
                },
              }
            );
          }
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      id="business-value"
      ref={containerRef}
      style={{
        padding: "96px 0",
        backgroundColor: "var(--color-warm-surface)",
        borderBottom: "1px solid var(--color-hairline)",
        position: "relative",
      }}
    >
      <div className="editorial-container">
        {/* Section Header */}
        <div style={{ maxWidth: "780px", marginBottom: "48px" }}>
          <div className="mono-meta" style={{ marginBottom: "12px" }}>
            {businessValueData.sectionNum}
          </div>
          <h2
            style={{
              fontSize: "clamp(2.2rem, 4.2vw, 3.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.035em",
              color: "var(--color-ink-black)",
              lineHeight: 1.1,
              marginBottom: "14px",
            }}
          >
            {businessValueData.title}
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--color-slate)",
              lineHeight: 1.6,
            }}
          >
            {businessValueData.subtitle}
          </p>
        </div>

        {/* Two-Column Grid: Founder's Conviction & Comparative Ledger */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: "48px",
            alignItems: "start",
          }}
        >
          {/* Left Column (5 Cols): Sticky Founder's Conviction & Asset Visual */}
          <div
            ref={leftColRef}
            style={{
              gridColumn: "span 5",
              position: "sticky",
              top: "100px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
            className="value-left-col"
          >
            {/* Founder's Principle Card */}
            <div
              style={{
                backgroundColor: "var(--color-white)",
                border: "1px solid var(--color-hairline)",
                borderLeft: "3px solid var(--color-brand-orange)",
                padding: "36px 30px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono-system)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-brand-orange)",
                  fontWeight: 700,
                  marginBottom: "16px",
                }}
              >
                OPERATING CONVICTION
              </div>

              <p
                style={{
                  fontSize: "1.05rem",
                  fontStyle: "italic",
                  color: "var(--color-ink-black)",
                  lineHeight: 1.65,
                  marginBottom: "20px",
                }}
              >
                &ldquo;{businessValueData.founderQuote.quote}&rdquo;
              </p>

              <div
                style={{
                  fontFamily: "var(--font-mono-system)",
                  fontSize: "0.78rem",
                  color: "var(--color-brand-orange)",
                  letterSpacing: "0.04em",
                  fontWeight: 700,
                }}
              >
                {businessValueData.founderQuote.author} · {businessValueData.founderQuote.title}
              </div>
              <div
                style={{
                  fontSize: "0.74rem",
                  color: "var(--color-slate-light)",
                  marginTop: "4px",
                }}
              >
                {businessValueData.founderQuote.location}
              </div>
            </div>

            {/* Editorial Asset Photography Card */}
            <div
              style={{
                backgroundColor: "var(--color-white)",
                border: "1px solid var(--color-hairline)",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "relative", width: "100%", height: "160px" }}>
                <Image
                  src={assetPath("/images/construction-warehouse.jpg")}
                  alt="Industrial Infrastructure and Warehouse Fleet Mobilization"
                  fill
                  sizes="(max-width: 900px) 100vw, 40vw"
                  style={{ objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(17, 17, 17, 0.7) 0%, transparent 60%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    left: "16px",
                    right: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono-system)",
                      fontSize: "0.68rem",
                      color: "#ffffff",
                      letterSpacing: "0.1em",
                      fontWeight: 600,
                      textTransform: "uppercase",
                    }}
                  >
                    INFRASTRUCTURE MOBILIZATION
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono-system)",
                      fontSize: "0.68rem",
                      color: "var(--color-brand-orange)",
                      fontWeight: 700,
                    }}
                  >
                    PAN-INDIA
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): Scroll-Progressive Comparison Ledger */}
          <div
            ref={ledgerTableRef}
            style={{
              gridColumn: "span 7",
              backgroundColor: "var(--color-white)",
              border: "1px solid var(--color-hairline)",
            }}
            className="value-right-col"
          >
            {/* Table Header */}
            <div
              className="comparison-ledger-header"
              style={{
                display: "grid",
                gridTemplateColumns: "1.4fr 1.8fr 2fr",
                padding: "20px 24px",
                backgroundColor: "var(--color-warm-surface)",
                borderBottom: "1px solid var(--color-hairline)",
                fontFamily: "var(--font-mono-system)",
                fontSize: "0.72rem",
                letterSpacing: "0.14em",
                color: "var(--color-ink-black)",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              <div>Financial Dimension</div>
              <div>Traditional Ownership</div>
              <div style={{ color: "var(--color-brand-orange)" }}>Firstgen Operating Lease</div>
            </div>

            {/* Table Rows with Scroll-Progressive Activation */}
            {businessValueData.comparisonLedger.map((row, i) => (
              <div
                key={row.dimension}
                className="comparison-ledger-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.4fr 1.8fr 2fr",
                  gap: "16px",
                  padding: "22px 24px",
                  borderBottom:
                    i === businessValueData.comparisonLedger.length - 1
                      ? "none"
                      : "1px solid var(--color-hairline)",
                  alignItems: "center",
                  transition: "background-color 0.25s ease",
                }}
              >
                <div
                  style={{
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    color: "var(--color-ink-black)",
                  }}
                >
                  {row.dimension}
                </div>

                <div
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--color-slate)",
                    lineHeight: 1.45,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                  }}
                >
                  <X size={14} style={{ color: "#ef4444", flexShrink: 0, marginTop: "2px" }} />
                  <span>{row.traditional}</span>
                </div>

                <div
                  className="advantage-cell"
                  style={{
                    fontSize: "0.84rem",
                    fontWeight: 500,
                    color: "var(--color-ink-black)",
                    lineHeight: 1.45,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                    padding: "8px 10px",
                    borderRadius: "var(--radius-xs)",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  <Check
                    size={14}
                    style={{ color: "var(--color-brand-orange)", flexShrink: 0, marginTop: "2px" }}
                  />
                  <span>{row.operatingLease}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          :global(.value-left-col) {
            grid-column: span 12 !important;
            position: static !important;
          }
          :global(.value-right-col) {
            grid-column: span 12 !important;
          }
        }
        @media (max-width: 768px) {
          :global(.comparison-ledger-header) {
            display: none !important;
          }
          :global(.comparison-ledger-row) {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
            padding: 18px 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
