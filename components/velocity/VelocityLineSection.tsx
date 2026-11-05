"use client";

import React, { useState, useEffect, useRef } from "react";
import { processStepsData } from "@/lib/data/homepageContent";
import { ArrowRight, CheckCircle2, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface VelocityLineSectionProps {
  onOpenEnquiry: () => void;
}

const stepGuarantees: Record<number, string> = {
  0: "Zero upfront commitment. Digital requirement lodging in under 3 minutes.",
  1: "Automated underwriting algorithm processes multi-account banking statements within 4 hours.",
  2: "Fixed, transparent monthly rentals with 100% tax-deductible operating expenses.",
  3: "Legally enforceable digital execution under Indian IT Act 2000 and NPCI eNACH standards.",
  4: "Direct OEM dealership delivery with comprehensive commercial transit insurance.",
};

export default function VelocityLineSection({ onOpenEnquiry }: VelocityLineSectionProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0.2);

  const sectionRef = useRef<HTMLElement>(null);
  const inspectorCardRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  const step = processStepsData[activeStep] || processStepsData[0];

  // GSAP: Section Pinning + Interactive Scrubbing
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Pinned desktop & laptop presentation (> 900px)
      mm.add("(min-width: 901px)", () => {
        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2400", // Locks page in place across 2400px of scroll distance
          pin: true,
          pinSpacing: true,
          scrub: 0.35,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            setScrollProgress(p);
            const totalSteps = processStepsData.length;
            const calculatedStep = Math.min(totalSteps - 1, Math.floor(p * totalSteps));
            setActiveStep((prev) => (prev !== calculatedStep ? calculatedStep : prev));
          },
        });

        triggerRef.current = st;
      });

      // Mobile / tablet: fluid scrubber without aggressive scroll locking
      mm.add("(max-width: 900px)", () => {
        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 0.5,
          onUpdate: (self) => {
            const p = self.progress;
            setScrollProgress(p);
            const totalSteps = processStepsData.length;
            const calculatedStep = Math.min(totalSteps - 1, Math.floor(p * totalSteps));
            setActiveStep((prev) => (prev !== calculatedStep ? calculatedStep : prev));
          },
        });

        triggerRef.current = st;
      });
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, []);

  // Micro-reveal transition when active milestone updates
  useEffect(() => {
    if (typeof window === "undefined" || !inspectorCardRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      inspectorCardRef.current.querySelectorAll(".velocity-inspector-anim"),
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.28, stagger: 0.03, ease: "power2.out", clearProps: "transform,opacity" }
    );
  }, [activeStep]);

  // Click handler to seamlessly navigate steps and synchronize scroll position
  const handleStepClick = (idx: number) => {
    setActiveStep(idx);
    setScrollProgress((idx + 0.5) / processStepsData.length);

    if (triggerRef.current && window.innerWidth > 900) {
      const start = triggerRef.current.start;
      const end = triggerRef.current.end;
      const targetScroll = start + (idx / (processStepsData.length - 1)) * (end - start);
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="velocity-line"
      className="velocity-pinned-section"
      style={{ scrollMarginTop: "0px" }}
    >
      <div className="cinematic-container velocity-inner-stage">
        {/* Section Header */}
        <div className="velocity-header-block">
          <div className="mono-tag" style={{ marginBottom: "8px" }}>
            03 / ONBOARDING SPEED
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2.1rem, 3.8vw, 3.2rem)",
              color: "var(--color-obsidian)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: "6px",
            }}
          >
            The Velocity Line
          </h2>
          <p
            style={{
              fontSize: "0.95rem",
              color: "var(--color-ink-muted)",
              lineHeight: 1.45,
              fontWeight: 500,
              maxWidth: "760px",
            }}
          >
            A frictionless digital pipeline taking your enterprise from requirement submission to
            asset mobilization within 48 to 72 hours.
          </p>
        </div>

        {/* 5-Step Connected Interactive Horizontal Pipeline Grid (Clean Compact Cards) */}
        <div
          role="tablist"
          aria-label="Lease Application Velocity Steps"
          className="velocity-tabs-grid"
        >
          {processStepsData.map((s, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={s.number}
                role="tab"
                id={`velocity-tab-${s.number}`}
                aria-selected={isActive}
                aria-controls={`velocity-panel-${s.number}`}
                onClick={() => handleStepClick(idx)}
                className={`velocity-tab-node ${isActive ? "active" : ""}`}
              >
                {/* Active Top Accent Indicator Bar */}
                {isActive && <div className="velocity-tab-accent" />}

                {/* Header row: Step number and SLA Timeline pill */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-technical)",
                      fontSize: "1.05rem",
                      fontWeight: 800,
                      color: isActive ? "var(--color-copper)" : "var(--color-ink-muted)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}
                  >
                    {s.number}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-technical)",
                      fontSize: "0.64rem",
                      padding: "2px 7px",
                      borderRadius: "9999px",
                      backgroundColor: isActive
                        ? "rgba(245, 130, 32, 0.22)"
                        : "rgba(0, 0, 0, 0.05)",
                      color: isActive ? "var(--color-copper)" : "var(--color-ink-muted)",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      lineHeight: 1.2,
                    }}
                  >
                    {s.timeline}
                  </span>
                </div>

                {/* Title */}
                <div
                  style={{
                    fontSize: "0.92rem",
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.2,
                    color: isActive ? "#ffffff" : "var(--color-ink-primary)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {s.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Scrubbed Progress Horizon Bar (Scrubbed with scroll progress) */}
        <div className="velocity-progress-track">
          <div
            className="velocity-progress-fill"
            style={{
              width: `${Math.max(4, Math.min(100, scrollProgress * 100))}%`,
            }}
          />
        </div>

        {/* Active Milestone Inspector Dossier Card */}
        <div
          ref={inspectorCardRef}
          id={`velocity-panel-${step.number}`}
          role="tabpanel"
          aria-labelledby={`velocity-tab-${step.number}`}
          className="velocity-inspector-card"
        >
          {/* Left Column: Operational Dossier */}
          <div className="velocity-left-column">
            <div>
              <div
                className="velocity-inspector-anim"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  fontFamily: "var(--font-technical)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.14em",
                  color: "var(--color-copper)",
                  fontWeight: 700,
                  marginBottom: "8px",
                  textTransform: "uppercase",
                }}
              >
                <span>MILESTONE {step.number} OF 05</span>
                <span style={{ opacity: 0.4 }}>•</span>
                <span>ESTIMATED SLA: {step.timeline}</span>
              </div>

              <h3
                className="font-display velocity-inspector-anim"
                style={{
                  fontSize: "clamp(1.7rem, 2.6vw, 2.2rem)",
                  color: "var(--color-obsidian)",
                  marginBottom: "8px",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.15,
                }}
              >
                {step.title}
              </h3>

              <p
                className="velocity-inspector-anim"
                style={{
                  fontSize: "0.94rem",
                  color: "var(--color-ink-muted)",
                  lineHeight: 1.55,
                  marginBottom: "14px",
                  maxWidth: "560px",
                }}
              >
                {step.detail}
              </p>

              {/* Enterprise SLA Guarantee Badge */}
              <div className="velocity-sla-badge velocity-inspector-anim">
                <Sparkles size={16} style={{ color: "var(--color-copper)", flexShrink: 0, marginTop: "2px" }} />
                <span
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--color-ink-primary)",
                    fontWeight: 600,
                    lineHeight: 1.45,
                  }}
                >
                  {stepGuarantees[activeStep]}
                </span>
              </div>
            </div>

            {/* Actions: Primary CTA and Step Navigators */}
            <div className="velocity-actions-row velocity-inspector-anim">
              <button
                onClick={onOpenEnquiry}
                className="btn-pill-primary"
                id="velocity-apply-step-cta"
              >
                <span>Initiate Step {step.number}</span>
                <ArrowRight size={15} />
              </button>

              {/* Sequential Step Switcher */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <button
                  onClick={() => handleStepClick(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  aria-label="Previous Phase"
                  className="velocity-nav-btn"
                  style={{
                    cursor: activeStep === 0 ? "not-allowed" : "pointer",
                    color: activeStep === 0 ? "rgba(0, 0, 0, 0.25)" : "var(--color-ink-primary)",
                  }}
                >
                  <ChevronLeft size={15} />
                  <span>Previous</span>
                </button>

                <button
                  onClick={() =>
                    handleStepClick(Math.min(processStepsData.length - 1, activeStep + 1))
                  }
                  disabled={activeStep === processStepsData.length - 1}
                  aria-label="Next Phase"
                  className="velocity-nav-btn"
                  style={{
                    cursor: activeStep === processStepsData.length - 1 ? "not-allowed" : "pointer",
                    color:
                      activeStep === processStepsData.length - 1
                        ? "rgba(0, 0, 0, 0.25)"
                        : "var(--color-ink-primary)",
                  }}
                >
                  <span>Next Phase</span>
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Pre-requisites & Statutory Compliance */}
          <div className="velocity-right-column">
            <div>
              <div
                className="velocity-inspector-anim"
                style={{
                  fontFamily: "var(--font-technical)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.14em",
                  color: "var(--color-ink-primary)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  marginBottom: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-copper)",
                    boxShadow: "0 0 8px rgba(245, 130, 32, 0.6)",
                  }}
                />
                <span>DIGITAL PRE-REQUISITES & VERIFICATION</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {step.requirements.map((req) => (
                  <div
                    key={req}
                    className="velocity-inspector-anim"
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      fontSize: "0.86rem",
                      color: "var(--color-ink-primary)",
                      fontWeight: 600,
                      lineHeight: 1.35,
                    }}
                  >
                    <CheckCircle2
                      size={16}
                      style={{ color: "var(--color-copper)", flexShrink: 0, marginTop: "2px" }}
                    />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="velocity-inspector-anim"
              style={{
                marginTop: "16px",
                paddingTop: "12px",
                borderTop: "1px solid rgba(0, 0, 0, 0.08)",
                fontSize: "0.74rem",
                color: "var(--color-ink-muted)",
                fontFamily: "var(--font-technical)",
                lineHeight: 1.45,
              }}
            >
              Instant DigiLocker e-KYC integration eliminates physical paperwork and branch
              visits. Underwritten under Indian Banking Statutory Framework.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .velocity-pinned-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          padding: clamp(72px, 9.5vh, 92px) 0 28px 0;
          background-color: var(--color-titanium);
          display: flex;
          flex-direction: column;
          justifyContent: center;
          box-sizing: border-box;
        }

        .velocity-inner-stage {
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        .velocity-header-block {
          margin-bottom: 16px;
        }

        /* 5-Step Grid: Compact 76px Tab Height Without Subtext */
        .velocity-tabs-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 12px;
          width: 100%;
          align-items: stretch;
        }

        .velocity-tab-node {
          position: relative;
          width: 100%;
          height: 76px;
          min-height: 76px;
          max-height: 76px;
          padding: 13px 16px 13px;
          background-color: #ffffff;
          color: var(--color-ink-primary);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 14px;
          text-align: left;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-sizing: border-box;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
          overflow: hidden;
          transition: border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
        }

        .velocity-tab-node:hover {
          border-color: rgba(0, 0, 0, 0.22);
        }

        .velocity-tab-node.active {
          background-color: var(--color-obsidian);
          color: #ffffff;
          border: 1px solid var(--color-obsidian);
          box-shadow: 0 14px 32px -6px rgba(8, 9, 11, 0.28), 0 0 0 1px rgba(245, 130, 32, 0.35);
        }

        .velocity-tab-node.active:hover {
          border-color: var(--color-obsidian);
        }

        .velocity-tab-accent {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background-color: var(--color-copper);
          border-radius: 14px 14px 0 0;
          box-shadow: 0 0 10px rgba(245, 130, 32, 0.7);
        }

        /* Progress Horizon Bar */
        .velocity-progress-track {
          position: relative;
          height: 3px;
          background-color: rgba(0, 0, 0, 0.08);
          border-radius: 9999px;
          overflow: hidden;
          margin: 12px 0 16px 0;
          width: 100%;
        }

        .velocity-progress-fill {
          height: 100%;
          background-color: var(--color-copper);
          border-radius: 9999px;
          box-shadow: 0 0 12px rgba(245, 130, 32, 0.8);
          transition: width 0.15s ease-out;
        }

        /* Dossier Inspector Card */
        .velocity-inspector-card {
          background-color: #ffffff;
          border-radius: 20px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          padding: 24px 28px;
          box-shadow: 0 20px 48px -12px rgba(0, 0, 0, 0.08);
          display: grid;
          grid-template-columns: 1.3fr 0.85fr;
          gap: 32px;
          align-items: stretch;
          box-sizing: border-box;
          width: 100%;
        }

        .velocity-left-column {
          display: flex;
          flex-direction: column;
          justifyContent: space-between;
          height: 100%;
        }

        .velocity-sla-badge {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 9px 14px;
          background-color: rgba(245, 130, 32, 0.07);
          border: 1px solid rgba(245, 130, 32, 0.22);
          border-radius: 10px;
          margin-bottom: 18px;
          max-width: 560px;
          box-sizing: border-box;
        }

        .velocity-actions-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: auto;
        }

        .velocity-nav-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 14px;
          background-color: transparent;
          border: 1px solid rgba(0, 0, 0, 0.12);
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .velocity-right-column {
          background-color: #F6F4F0;
          border-radius: 16px;
          padding: 22px 22px;
          border: 1px solid rgba(0, 0, 0, 0.06);
          display: flex;
          flex-direction: column;
          justifyContent: space-between;
          height: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 1024px) {
          .velocity-tabs-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 10px;
          }
        }
        @media (max-width: 900px) {
          .velocity-pinned-section {
            padding: 70px 0 50px 0;
            min-height: auto;
          }
          .velocity-inspector-card {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 20px 18px;
          }
        }
        @media (max-width: 640px) {
          .velocity-tabs-grid {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory;
            gap: 10px !important;
            padding-bottom: 6px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .velocity-tabs-grid::-webkit-scrollbar {
            display: none;
          }
          .velocity-tab-node {
            flex: 0 0 165px !important;
            scroll-snap-align: start;
            height: 68px !important;
            min-height: 68px !important;
            max-height: 68px !important;
            padding: 10px 12px !important;
          }
          .velocity-actions-row {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          .velocity-actions-row :global(.btn-pill-primary) {
            width: 100%;
            justify-content: center;
          }
        }
        @media (max-width: 440px) {
          .velocity-tab-node {
            flex: 0 0 145px !important;
          }
          .velocity-inspector-card {
            padding: 16px 14px;
            border-radius: 16px;
          }
          .velocity-right-column {
            padding: 16px 14px;
            border-radius: 14px;
          }
        }
      `}</style>
    </section>
  );
}
