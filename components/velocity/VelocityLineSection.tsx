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
  const [isManual, setIsManual] = useState(false);

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
            clearProps: "all",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }, sectionRef);

      // 2. Interactive Scroll Scrubbing: syncs progress bar and active step with natural scroll
      const scrubTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 65%",
        end: "bottom 35%",
        scrub: 0.5,
        onUpdate: (self) => {
          if (!isManualRef.current) {
            const p = self.progress;
            setScrollProgress(p);
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

  // GSAP: Micro-reveal transition when active step changes
  useEffect(() => {
    if (typeof window === "undefined" || !inspectorCardRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      inspectorCardRef.current.querySelectorAll(".inspector-anim-item"),
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: "power2.out", clearProps: "all" }
    );
  }, [activeStep]);

  // Handle manual tab click with smooth override lock
  const handleStepClick = (idx: number) => {
    isManualRef.current = true;
    setIsManual(true);
    setActiveStep(idx);
    setScrollProgress((idx + 0.5) / processStepsData.length);

    if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
    manualTimeoutRef.current = setTimeout(() => {
      isManualRef.current = false;
      setIsManual(false);
    }, 2500);
  };

  return (
    <section
      ref={sectionRef}
      id="velocity-line"
      style={{
        padding: "clamp(130px, 15vw, 180px) 0 clamp(100px, 11vw, 140px) 0",
        backgroundColor: "var(--color-titanium)",
        position: "relative",
      }}
    >
      <div className="cinematic-container">
        {/* Section Header: Unified editorial block with disciplined spacing */}
        <div
          className="velocity-entrance-node"
          style={{ maxWidth: "820px", marginBottom: "48px" }}
        >
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
          style={{ marginBottom: "20px" }}
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
                style={{
                  position: "relative",
                  padding: "20px 20px 18px",
                  backgroundColor: isActive ? "var(--color-obsidian)" : "#ffffff",
                  color: isActive ? "#ffffff" : "var(--color-ink-primary)",
                  border: isActive
                    ? "1px solid var(--color-obsidian)"
                    : "1px solid rgba(0, 0, 0, 0.08)",
                  borderRadius: "18px",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  boxShadow: isActive
                    ? "0 18px 36px -8px rgba(8, 9, 11, 0.28)"
                    : "0 4px 12px rgba(0, 0, 0, 0.02)",
                  transform: isActive ? "translateY(-3px)" : "none",
                }}
              >
                {/* Active Top Accent Indicator Bar */}
                {isActive && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "20px",
                      right: "20px",
                      height: "3px",
                      backgroundColor: "var(--color-copper)",
                      borderRadius: "0 0 4px 4px",
                      boxShadow: "0 0 10px rgba(245, 130, 32, 0.7)",
                    }}
                  />
                )}

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
                  }}
                >
                  {s.title}
                </div>

                {/* Micro summary */}
                <div
                  style={{
                    fontSize: "0.76rem",
                    color: isActive ? "rgba(255, 255, 255, 0.65)" : "var(--color-ink-muted)",
                    lineHeight: 1.35,
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

        {/* Dynamic Scrubbed Progress Horizon Bar (Scrubbed with scroll & clicks) */}
        <div
          className="velocity-entrance-node"
          style={{
            position: "relative",
            height: "4px",
            backgroundColor: "rgba(0, 0, 0, 0.08)",
            borderRadius: "9999px",
            overflow: "hidden",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${Math.max(10, Math.min(100, scrollProgress * 100))}%`,
              backgroundColor: "var(--color-copper)",
              borderRadius: "9999px",
              boxShadow: "0 0 14px rgba(245, 130, 32, 0.85)",
              transition: isManual ? "width 0.35s cubic-bezier(0.16, 1, 0.3, 1)" : "none",
            }}
          />
        </div>

        {/* Active Milestone Inspector Dossier Card */}
        <div
          ref={inspectorCardRef}
          id={`velocity-panel-${step.number}`}
          role="tabpanel"
          aria-labelledby={`velocity-tab-${step.number}`}
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "24px",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            padding: "clamp(36px, 5vw, 56px)",
            boxShadow: "0 24px 60px -15px rgba(0, 0, 0, 0.08)",
          }}
          className="velocity-inspector-grid velocity-entrance-node"
        >
          {/* Left Column: Operational Dossier */}
          <div
            style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
          >
            <div>
              <div
                className="inspector-anim-item"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
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
                <span>·</span>
                <span>ESTIMATED SLA {step.timeline}</span>
              </div>

              <h3
                className="font-display inspector-anim-item"
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                  color: "var(--color-obsidian)",
                  marginBottom: "16px",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.12,
                }}
              >
                {step.title}
              </h3>

              <p
                className="inspector-anim-item"
                style={{
                  fontSize: "1.05rem",
                  color: "var(--color-ink-muted)",
                  lineHeight: 1.65,
                  marginBottom: "20px",
                  maxWidth: "580px",
                }}
              >
                {step.detail}
              </p>

              {/* Enterprise SLA Guarantee Badge */}
              <div
                className="inspector-anim-item"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 16px",
                  backgroundColor: "rgba(245, 130, 32, 0.08)",
                  border: "1px solid rgba(245, 130, 32, 0.2)",
                  borderRadius: "12px",
                  marginBottom: "32px",
                  maxWidth: "580px",
                }}
              >
                <Sparkles size={16} style={{ color: "var(--color-copper)", flexShrink: 0 }} />
                <span
                  style={{
                    fontSize: "0.84rem",
                    color: "var(--color-ink-primary)",
                    fontWeight: 600,
                    lineHeight: 1.4,
                  }}
                >
                  {stepGuarantees[activeStep]}
                </span>
              </div>
            </div>

            {/* Actions: Primary CTA and Step Navigators */}
            <div
              className="inspector-anim-item"
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "14px",
              }}
            >
              <button
                onClick={onOpenEnquiry}
                className="btn-pill-primary"
                id="velocity-apply-step-cta"
              >
                <span>Initiate Step {step.number}</span>
                <ArrowRight size={16} />
              </button>

              {/* Sequential Step Switcher */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <button
                  onClick={() => handleStepClick(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  aria-label="Previous Phase"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "12px 18px",
                    backgroundColor: "transparent",
                    color: activeStep === 0 ? "rgba(0, 0, 0, 0.25)" : "var(--color-ink-primary)",
                    border: "1px solid rgba(0, 0, 0, 0.12)",
                    borderRadius: "9999px",
                    fontSize: "0.84rem",
                    fontWeight: 600,
                    cursor: activeStep === 0 ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
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
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "12px 18px",
                    backgroundColor: "transparent",
                    color:
                      activeStep === processStepsData.length - 1
                        ? "rgba(0, 0, 0, 0.25)"
                        : "var(--color-ink-primary)",
                    border: "1px solid rgba(0, 0, 0, 0.12)",
                    borderRadius: "9999px",
                    fontSize: "0.84rem",
                    fontWeight: 600,
                    cursor:
                      activeStep === processStepsData.length - 1 ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span>Next Phase</span>
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Pre-requisites & Statutory Compliance */}
          <div
            style={{
              backgroundColor: "#F4F2EE",
              borderRadius: "20px",
              padding: "32px",
              border: "1px solid rgba(0, 0, 0, 0.06)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
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
                  marginBottom: "20px",
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
                      lineHeight: 1.4,
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
                marginTop: "28px",
                paddingTop: "18px",
                borderTop: "1px solid rgba(0, 0, 0, 0.08)",
                fontSize: "0.76rem",
                color: "var(--color-ink-muted)",
                fontFamily: "var(--font-technical)",
                lineHeight: 1.5,
              }}
            >
              Instant DigiLocker e-KYC integration eliminates physical paperwork and branch
              visits. Underwritten under Indian Banking Statutory Framework.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .velocity-tabs-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 14px;
          width: 100%;
        }
        .velocity-inspector-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 48px;
          align-items: stretch;
        }
        @media (max-width: 1024px) {
          .velocity-tabs-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 12px;
          }
        }
        @media (max-width: 900px) {
          .velocity-inspector-grid {
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
        .velocity-tab-node:hover {
          border-color: rgba(0, 0, 0, 0.22) !important;
          transform: translateY(-2px);
        }
        .velocity-tab-node.active:hover {
          border-color: var(--color-obsidian) !important;
          transform: translateY(-3px);
        }
      `}</style>
    </section>
  );
}
