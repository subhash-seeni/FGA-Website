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

  const sectionRef = useRef<HTMLElement>(null);
  const inspectorCardRef = useRef<HTMLDivElement>(null);
  const isManualRef = useRef<boolean>(false);
  const manualTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const step = processStepsData[activeStep] || processStepsData[0];

  // GSAP: Initial entrance + Continuous Scroll Scrubbing
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion && sectionRef.current) {
      // 1. Staggered reveal for section entrance
      const entranceCtx = gsap.context(() => {
        gsap.fromTo(
          ".velocity-entrance-node",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }, sectionRef);

      // 2. Interactive Scroll Scrubbing: syncs active step with natural scroll
      const scrubTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 65%",
        end: "bottom 35%",
        scrub: 0.5,
        onUpdate: (self) => {
          if (!isManualRef.current) {
            const p = self.progress;
            const calculatedStep = Math.min(
              processStepsData.length - 1,
              Math.floor(p * processStepsData.length)
            );
            setActiveStep((prev) => {
              if (prev !== calculatedStep) {
                return calculatedStep;
              }
              return prev;
            });
          }
        },
      });

      ScrollTrigger.refresh();

      return () => {
        entranceCtx.revert();
        scrubTrigger.kill();
      };
    }
  }, []);

  // GSAP: Micro-reveal transition when active step changes (only touches transform & opacity)
  useEffect(() => {
    if (typeof window === "undefined" || !inspectorCardRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      inspectorCardRef.current.querySelectorAll(".inspector-anim-item"),
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: "power2.out", clearProps: "transform,opacity" }
    );
  }, [activeStep]);

  // Handle manual tab click with smooth override lock
  const handleStepClick = (idx: number) => {
    isManualRef.current = true;
    setActiveStep(idx);

    if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
    manualTimeoutRef.current = setTimeout(() => {
      isManualRef.current = false;
    }, 2500);
  };

  return (
    <section
      ref={sectionRef}
      id="velocity-line"
      className="velocity-section"
    >
      <div className="cinematic-container">
        {/* Section Header */}
        <div className="velocity-header velocity-entrance-node">
          <div className="mono-tag" style={{ marginBottom: "14px" }}>
            03 / ONBOARDING SPEED
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2.6rem, 5vw, 4.6rem)",
              color: "var(--color-obsidian)",
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              marginBottom: "16px",
            }}
          >
            The Velocity Line
          </h2>
          <p
            style={{
              fontSize: "1.06rem",
              color: "var(--color-ink-muted)",
              lineHeight: 1.65,
              fontWeight: 500,
            }}
          >
            A frictionless digital pipeline taking your enterprise from requirement submission to
            asset mobilization within 48 to 72 hours.
          </p>
        </div>

        {/* 5-Step Connected Interactive Horizontal Pipeline Grid */}
        <div
          role="tablist"
          aria-label="Lease Application Velocity Steps"
          className="velocity-tabs-grid velocity-entrance-node"
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

                <div>
                  {/* Header row: Step number and SLA Timeline pill */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "12px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-technical)",
                        fontSize: "1.15rem",
                        fontWeight: 800,
                        color: isActive ? "var(--color-copper)" : "var(--color-ink-muted)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {s.number}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-technical)",
                        fontSize: "0.68rem",
                        padding: "3px 9px",
                        borderRadius: "9999px",
                        backgroundColor: isActive
                          ? "rgba(245, 130, 32, 0.22)"
                          : "rgba(0, 0, 0, 0.05)",
                        color: isActive ? "var(--color-copper)" : "var(--color-ink-muted)",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      {s.timeline}
                    </span>
                  </div>

                  {/* Title */}
                  <div
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      letterSpacing: "-0.01em",
                      lineHeight: 1.25,
                      color: isActive ? "#ffffff" : "var(--color-ink-primary)",
                      marginBottom: "8px",
                    }}
                  >
                    {s.title}
                  </div>
                </div>

                {/* Micro summary */}
                <div
                  style={{
                    fontSize: "0.76rem",
                    color: isActive ? "rgba(255, 255, 255, 0.72)" : "var(--color-ink-muted)",
                    lineHeight: 1.4,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {s.summary}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Scrubbed Progress Horizon Bar (Smoothly synced with active step) */}
        <div className="velocity-progress-track velocity-entrance-node">
          <div
            className="velocity-progress-fill"
            style={{
              width: `${((activeStep + 1) / processStepsData.length) * 100}%`,
            }}
          />
        </div>

        {/* Active Milestone Inspector Dossier Card */}
        <div
          ref={inspectorCardRef}
          id={`velocity-panel-${step.number}`}
          role="tabpanel"
          aria-labelledby={`velocity-tab-${step.number}`}
          className="velocity-inspector-card velocity-entrance-node"
        >
          {/* Left Column: Operational Dossier */}
          <div className="velocity-left-column">
            <div>
              <div
                className="inspector-anim-item"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  fontFamily: "var(--font-technical)",
                  fontSize: "0.74rem",
                  letterSpacing: "0.14em",
                  color: "var(--color-copper)",
                  fontWeight: 700,
                  marginBottom: "14px",
                  textTransform: "uppercase",
                }}
              >
                <span>MILESTONE {step.number} OF 05</span>
                <span style={{ opacity: 0.4 }}>•</span>
                <span>ESTIMATED SLA: {step.timeline}</span>
              </div>

              <h3
                className="font-display inspector-anim-item"
                style={{
                  fontSize: "clamp(2rem, 3.2vw, 2.75rem)",
                  color: "var(--color-obsidian)",
                  marginBottom: "14px",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.12,
                }}
              >
                {step.title}
              </h3>

              <p
                className="inspector-anim-item"
                style={{
                  fontSize: "1.02rem",
                  color: "var(--color-ink-muted)",
                  lineHeight: 1.65,
                  marginBottom: "22px",
                  maxWidth: "580px",
                }}
              >
                {step.detail}
              </p>

              {/* Enterprise SLA Guarantee Badge */}
              <div className="velocity-sla-badge inspector-anim-item">
                <Sparkles size={18} style={{ color: "var(--color-copper)", flexShrink: 0, marginTop: "2px" }} />
                <span
                  style={{
                    fontSize: "0.86rem",
                    color: "var(--color-ink-primary)",
                    fontWeight: 600,
                    lineHeight: 1.5,
                  }}
                >
                  {stepGuarantees[activeStep]}
                </span>
              </div>
            </div>

            {/* Actions: Primary CTA and Step Navigators */}
            <div className="velocity-actions-row inspector-anim-item">
              <button
                onClick={onOpenEnquiry}
                className="btn-pill-primary"
                id="velocity-apply-step-cta"
              >
                <span>Initiate Step {step.number}</span>
                <ArrowRight size={16} />
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
                  <ChevronLeft size={16} />
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
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Pre-requisites & Statutory Compliance */}
          <div className="velocity-right-column">
            <div>
              <div
                className="inspector-anim-item"
                style={{
                  fontFamily: "var(--font-technical)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.14em",
                  color: "var(--color-ink-primary)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  marginBottom: "22px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-copper)",
                    boxShadow: "0 0 8px rgba(245, 130, 32, 0.6)",
                  }}
                />
                <span>DIGITAL PRE-REQUISITES & VERIFICATION</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {step.requirements.map((req) => (
                  <div
                    key={req}
                    className="inspector-anim-item"
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      fontSize: "0.9rem",
                      color: "var(--color-ink-primary)",
                      fontWeight: 600,
                      lineHeight: 1.45,
                    }}
                  >
                    <CheckCircle2
                      size={18}
                      style={{ color: "var(--color-copper)", flexShrink: 0, marginTop: "2px" }}
                    />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="inspector-anim-item"
              style={{
                marginTop: "32px",
                paddingTop: "20px",
                borderTop: "1px solid rgba(0, 0, 0, 0.08)",
                fontSize: "0.78rem",
                color: "var(--color-ink-muted)",
                fontFamily: "var(--font-technical)",
                lineHeight: 1.55,
              }}
            >
              Instant DigiLocker e-KYC integration eliminates physical paperwork and branch
              visits. Underwritten under Indian Banking Statutory Framework.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .velocity-section {
          scroll-margin-top: 140px;
          padding: 110px 0;
          background-color: var(--color-titanium);
          position: relative;
        }

        .velocity-header {
          max-width: 820px;
          margin-bottom: 48px;
        }

        /* 5-Step Grid & Uniform Cards */
        .velocity-tabs-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 14px;
          width: 100%;
          align-items: stretch;
        }

        .velocity-tab-node {
          position: relative;
          width: 100%;
          height: 100%;
          align-self: stretch;
          padding: 22px 20px 20px;
          background-color: #ffffff;
          color: var(--color-ink-primary);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 18px;
          text-align: left;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justifyContent: space-between;
          min-height: 160px;
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
          border-radius: 18px 18px 0 0;
          box-shadow: 0 0 10px rgba(245, 130, 32, 0.7);
        }

        /* Progress Horizon Bar */
        .velocity-progress-track {
          position: relative;
          height: 4px;
          background-color: rgba(0, 0, 0, 0.08);
          border-radius: 9999px;
          overflow: hidden;
          margin: 24px 0 36px 0;
          width: 100%;
        }

        .velocity-progress-fill {
          height: 100%;
          background-color: var(--color-copper);
          border-radius: 9999px;
          box-shadow: 0 0 12px rgba(245, 130, 32, 0.8);
          transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Dossier Inspector Card */
        .velocity-inspector-card {
          background-color: #ffffff;
          border-radius: 24px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          padding: clamp(32px, 4.5vw, 48px);
          box-shadow: 0 20px 48px -12px rgba(0, 0, 0, 0.08);
          display: grid;
          grid-template-columns: 1.25fr 0.9fr;
          gap: 48px;
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
          gap: 12px;
          padding: 14px 18px;
          background-color: rgba(245, 130, 32, 0.07);
          border: 1px solid rgba(245, 130, 32, 0.22);
          border-radius: 14px;
          margin-bottom: 32px;
          max-width: 580px;
          box-sizing: border-box;
        }

        .velocity-actions-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: auto;
          padding-top: 8px;
        }

        .velocity-nav-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 12px 18px;
          background-color: transparent;
          border: 1px solid rgba(0, 0, 0, 0.12);
          border-radius: 9999px;
          font-size: 0.84rem;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .velocity-right-column {
          background-color: #F6F4F0;
          border-radius: 20px;
          padding: 32px 28px;
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
            gap: 12px;
          }
        }
        @media (max-width: 900px) {
          .velocity-inspector-card {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }
        @media (max-width: 640px) {
          .velocity-tabs-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
        }
      `}</style>
    </section>
  );
}
