"use client";

import React, { useState, useEffect, useRef } from "react";
import { businessValueData } from "@/lib/data/homepageContent";
import { Check, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FinancialEquationSection() {
  const [mode, setMode] = useState<"lease" | "purchase">("lease");
  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!prefersReducedMotion && sectionRef.current && leftPanelRef.current && rightPanelRef.current) {
        const ctx = gsap.context(() => {
          // Left comparison panel slides from left
          gsap.fromTo(
            leftPanelRef.current,
            { x: -30, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power2.out",
              clearProps: "transform,opacity",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
              },
            }
          );

          // Right founder card slides from right
          gsap.fromTo(
            rightPanelRef.current,
            { x: 30, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power2.out",
              clearProps: "transform,opacity",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
              },
            }
          );

          // Number metric punch
          gsap.fromTo(
            ".equation-metric-num",
            { scale: 0.85, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              stagger: 0.12,
              ease: "back.out(1.4)",
              clearProps: "transform,opacity",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
              },
            }
          );
        }, sectionRef);

        ScrollTrigger.refresh();

        return () => ctx.revert();
      }
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="financial-equation"
      style={{
        scrollMarginTop: "clamp(90px, 11vw, 130px)",
        padding: "110px 0",
        backgroundColor: "var(--color-obsidian)",
        color: "#ffffff",
        position: "relative",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <div className="cinematic-container">
        {/* Section Header */}
        <div style={{ maxWidth: "760px", marginBottom: "64px" }}>
          <div className="mono-tag" style={{ marginBottom: "14px" }}>
            02 / CAPITAL ALLOCATION LOGIC
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2.8rem, 6vw, 5.2rem)",
              color: "#ffffff",
              marginBottom: "16px",
            }}
          >
            The Equation
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--color-text-dim)",
              lineHeight: 1.6,
            }}
          >
            Why India&apos;s high-growth enterprises convert capital expenditure into a fixed,
            predictable monthly operational expense.
          </p>
        </div>

        {/* 2-Column Split: Big Kinetic Numbers vs Founder's Quote */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "56px",
            alignItems: "center",
            marginBottom: "72px",
          }}
          className="equation-grid"
        >
          {/* Left: Interactive Economic Comparison HUD */}
          <div
            ref={leftPanelRef}
            className="equation-panel-left"
            style={{
              backgroundColor: "var(--color-obsidian-surface)",
              border: "1px solid var(--color-obsidian-border)",
              borderRadius: "24px",
            }}
          >
            {/* Interactive Mode Toggle */}
            <div
              className="equation-mode-toggle"
              style={{
                display: "inline-flex",
                padding: "4px",
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                borderRadius: "9999px",
                marginBottom: "36px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                maxWidth: "100%",
                boxSizing: "border-box",
              }}
            >
              <button
                onClick={() => setMode("lease")}
                className="equation-toggle-btn"
                style={{
                  padding: "8px 20px",
                  borderRadius: "9999px",
                  border: "none",
                  backgroundColor: mode === "lease" ? "var(--color-copper)" : "transparent",
                  color: "#ffffff",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
              >
                Firstgen Operating Lease
              </button>
              <button
                onClick={() => setMode("purchase")}
                className="equation-toggle-btn"
                style={{
                  padding: "8px 20px",
                  borderRadius: "9999px",
                  border: "none",
                  backgroundColor: mode === "purchase" ? "var(--color-copper)" : "transparent",
                  color: "#ffffff",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
              >
                Traditional Outright Purchase
              </button>
            </div>

            {/* Kinetic Typography Numbers */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "28px",
                marginBottom: "36px",
              }}
              className="equation-numbers-grid"
            >
              <div>
                <div
                  className="font-display equation-metric-num"
                  style={{
                    fontSize: "clamp(3.2rem, 5.5vw, 4.8rem)",
                    color: mode === "lease" ? "var(--color-copper)" : "#ef4444",
                    lineHeight: 1,
                    marginBottom: "8px",
                  }}
                >
                  {mode === "lease" ? "0%" : "25-30%"}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-technical)",
                    fontSize: "0.8rem",
                    color: "rgba(255, 255, 255, 0.6)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {mode === "lease" ? "Upfront Capital Locked" : "Cash Down Payment"}
                </div>
              </div>

              <div>
                <div
                  className="font-display equation-metric-num"
                  style={{
                    fontSize: "clamp(3.2rem, 5.5vw, 4.8rem)",
                    color: mode === "lease" ? "#ffffff" : "var(--color-text-dim)",
                    lineHeight: 1,
                    marginBottom: "8px",
                  }}
                >
                  {mode === "lease" ? "100%" : "3-5 Yrs"}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-technical)",
                    fontSize: "0.8rem",
                    color: "rgba(255, 255, 255, 0.6)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {mode === "lease" ? "Tax-Deductible OpEx" : "Depreciation Horizon"}
                </div>
              </div>
            </div>

            {/* Structured Metric Ledger */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                {
                  label: "Working Capital Impact",
                  lease: "Preserved completely for core inventory, hires, and expansion",
                  purchase: "Immediate balance sheet depletion on non-core equipment",
                },
                {
                  label: "Asset Disposal & Resale Risk",
                  lease: "Zero risk; return or refresh at completion of agreed tenure",
                  purchase: "Full salvage risk, secondary broker fees, and market volatility",
                },
                {
                  label: "Deployment Speed",
                  lease: "48-hour delivery from Aadhaar digital signature",
                  purchase: "3 to 6 weeks of loan processing and bank asset valuation",
                },
              ].map((row) => (
                <div
                  key={row.label}
                  style={{
                    padding: "14px 18px",
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor: mode === "lease" ? "rgba(245, 130, 32, 0.15)" : "rgba(239, 68, 68, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {mode === "lease" ? (
                      <Check size={14} style={{ color: "var(--color-copper)" }} />
                    ) : (
                      <X size={14} style={{ color: "#ef4444" }} />
                    )}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-technical)",
                        fontSize: "0.75rem",
                        color: "rgba(255, 255, 255, 0.5)",
                        marginBottom: "2px",
                      }}
                    >
                      {row.label}
                    </div>
                    <div style={{ fontSize: "0.88rem", color: "#ffffff", fontWeight: 500 }}>
                      {mode === "lease" ? row.lease : row.purchase}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Solitary Founder's Conviction Card */}
          <div
            ref={rightPanelRef}
            className="equation-panel-right"
            style={{
              borderRadius: "24px",
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              position: "relative",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-technical)",
                fontSize: "0.72rem",
                letterSpacing: "0.16em",
                color: "var(--color-copper)",
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: "24px",
              }}
            >
              FOUNDER&apos;S CONVICTION
            </div>

            <blockquote
              className="font-display"
              style={{
                fontSize: "clamp(1.35rem, 2.2vw, 1.85rem)",
                lineHeight: 1.45,
                color: "#ffffff",
                marginBottom: "32px",
                letterSpacing: "-0.02em",
                fontWeight: 600,
              }}
            >
              &ldquo;{businessValueData.founderQuote.quote}&rdquo;
            </blockquote>

            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-copper)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-technical)",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  color: "#ffffff",
                }}
              >
                K
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#ffffff" }}>
                  {businessValueData.founderQuote.author}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-technical)",
                    fontSize: "0.74rem",
                    color: "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  {businessValueData.founderQuote.title} · {businessValueData.founderQuote.location}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .equation-panel-left {
          padding: clamp(28px, 4vw, 44px);
        }

        .equation-panel-right {
          padding: clamp(36px, 5vw, 56px);
        }

        @media (max-width: 900px) {
          :global(.equation-grid) {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          :global(.equation-numbers-grid) {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .equation-panel-left {
            padding: 24px 20px !important;
          }
          .equation-panel-right {
            padding: 28px 20px !important;
          }
        }

        @media (max-width: 540px) {
          .equation-mode-toggle {
            width: 100% !important;
            border-radius: 16px !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 4px;
            margin-bottom: 24px !important;
          }
          .equation-toggle-btn {
            width: 100% !important;
            text-align: center !important;
            padding: 10px 14px !important;
            border-radius: 12px !important;
            font-size: 0.8rem !important;
            white-space: normal !important;
          }
        }
      `}</style>
    </section>
  );
}
