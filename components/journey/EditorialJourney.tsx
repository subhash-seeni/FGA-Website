"use client";

import React, { useState, useRef } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { processStepsData } from "@/lib/data/homepageContent";
import { gsap, useGSAP } from "@/lib/animations/gsap";

interface EditorialJourneyProps {
  onOpenEnquiry: () => void;
}

export default function EditorialJourney({ onOpenEnquiry }: EditorialJourneyProps) {
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const detailCardRef = useRef<HTMLDivElement>(null);

  const activeStep = processStepsData[selectedStepIndex];

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      if (detailCardRef.current) {
        gsap.fromTo(
          detailCardRef.current.querySelectorAll(".journey-anim-node"),
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }
        );
      }
    },
    { dependencies: [selectedStepIndex], scope: containerRef }
  );

  return (
    <section
      id="leasing-journey"
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
        <div style={{ maxWidth: "800px", marginBottom: "44px" }}>
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
            The 5-Step Leasing Journey
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--color-slate)",
              lineHeight: 1.6,
            }}
          >
            From requirement submission to asset mobilization at your premises within 48 hours.
          </p>
        </div>

        {/* 5-Step Horizontal Navigation Ledger */}
        <div
          role="tablist"
          aria-label="5-Step Leasing Journey Milestones"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            border: "1px solid var(--color-hairline)",
            backgroundColor: "var(--color-white)",
            marginBottom: "36px",
          }}
          className="journey-tabs-grid"
        >
          {processStepsData.map((step, idx) => {
            const isSelected = selectedStepIndex === idx;
            return (
              <button
                key={step.number}
                role="tab"
                id={`step-tab-${step.number}`}
                aria-selected={isSelected}
                aria-controls={`step-panel-${step.number}`}
                onClick={() => setSelectedStepIndex(idx)}
                style={{
                  padding: "24px 20px",
                  textAlign: "left",
                  border: "none",
                  borderRight:
                    idx === processStepsData.length - 1 ? "none" : "1px solid var(--color-hairline)",
                  backgroundColor: isSelected ? "var(--color-warm-surface)" : "var(--color-white)",
                  borderBottom: isSelected
                    ? "3px solid var(--color-brand-orange)"
                    : "3px solid transparent",
                  cursor: "pointer",
                  transition: "background-color var(--transition-fast)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono-system)",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: isSelected ? "var(--color-brand-orange)" : "var(--color-slate-light)",
                    }}
                  >
                    {step.number}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono-system)",
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      color: isSelected ? "var(--color-brand-orange)" : "var(--color-slate)",
                      backgroundColor: isSelected
                        ? "var(--color-brand-orange-subtle)"
                        : "var(--color-warm-neutral)",
                      padding: "3px 8px",
                      borderRadius: "var(--radius-xs)",
                    }}
                  >
                    {step.timeline}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: isSelected ? 700 : 600,
                    color: "var(--color-ink-black)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Step Detailed Inspector (Broadsheet Display) */}
        <div
          ref={detailCardRef}
          role="tabpanel"
          id={`step-panel-${activeStep.number}`}
          aria-labelledby={`step-tab-${activeStep.number}`}
          style={{
            backgroundColor: "var(--color-white)",
            border: "1px solid var(--color-hairline)",
            padding: "44px 38px",
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: "48px",
            alignItems: "center",
          }}
          className="journey-detail-grid"
        >
          {/* Left Column: Narrative & Process Explanation */}
          <div>
            <div
              className="journey-anim-node"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "var(--font-mono-system)",
                fontSize: "0.72rem",
                color: "var(--color-brand-orange)",
                fontWeight: 600,
                letterSpacing: "0.14em",
                marginBottom: "12px",
              }}
            >
              <span>MILESTONE {activeStep.number}</span>
              <span>·</span>
              <span>ESTIMATED TURNAROUND: {activeStep.timeline}</span>
            </div>

            <h3
              className="journey-anim-node"
              style={{
                fontSize: "1.8rem",
                fontWeight: 700,
                color: "var(--color-ink-black)",
                letterSpacing: "-0.025em",
                marginBottom: "16px",
              }}
            >
              {activeStep.title}
            </h3>

            <p
              className="journey-anim-node"
              style={{
                fontSize: "1rem",
                color: "var(--color-slate)",
                lineHeight: 1.7,
                marginBottom: "32px",
              }}
            >
              {activeStep.detail}
            </p>

            <div className="journey-anim-node">
              <button
                onClick={onOpenEnquiry}
                className="btn-editorial-primary"
                style={{ padding: "13px 26px" }}
              >
                <span>Initiate Step 01 Online</span>
                <ArrowRight size={15} className="btn-arrow-icon" />
              </button>
            </div>
          </div>

          {/* Right Column: Required Institutional Documentation Box */}
          <div
            className="journey-anim-node"
            style={{
              backgroundColor: "var(--color-warm-surface)",
              border: "1px solid var(--color-hairline)",
              padding: "32px 28px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono-system)",
                fontSize: "0.72rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--color-slate)",
                fontWeight: 600,
                paddingBottom: "14px",
                borderBottom: "1px solid var(--color-hairline)",
                marginBottom: "18px",
              }}
            >
              Document Requirements
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {activeStep.requirements.map((req) => (
                <div
                  key={req}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "0.88rem",
                    color: "var(--color-ink-black)",
                    fontWeight: 500,
                  }}
                >
                  <CheckCircle2
                    size={16}
                    style={{ color: "var(--color-brand-orange)", flexShrink: 0 }}
                  />
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          :global(.journey-tabs-grid) {
            grid-template-columns: 1fr !important;
          }
          :global(.journey-detail-grid) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
