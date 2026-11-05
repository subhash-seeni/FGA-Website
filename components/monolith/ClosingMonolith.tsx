"use client";

import React, { useEffect, useRef } from "react";
import { ArrowUpRight, Mail, Zap } from "lucide-react";
import { conversionData, footerData } from "@/lib/data/homepageContent";
import InstitutionalInfrastructure from "@/components/infrastructure/InstitutionalInfrastructure";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ClosingMonolithProps {
  onOpenEnquiry: (category?: string) => void;
}

export default function ClosingMonolith({ onOpenEnquiry }: ClosingMonolithProps) {
  const monolithRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!prefersReducedMotion && monolithRef.current && glowRef.current) {
        const ctx = gsap.context(() => {
          // Radial glow expansion
          gsap.fromTo(
            glowRef.current,
            { scale: 0.75, opacity: 0.3 },
            {
              scale: 1.25,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: monolithRef.current,
                start: "top 80%",
                end: "center center",
                scrub: 1,
              },
            }
          );
        }, monolithRef);

        ScrollTrigger.refresh();

        return () => ctx.revert();
      }
    }
  }, []);

  return (
    <>
      {/* 1. Redesigned Institutional Infrastructure Section */}
      <InstitutionalInfrastructure id="institutional-infrastructure" />

      {/* 2. Closing Monolith Conversion Stage */}
      <section
        ref={monolithRef}
        id="closing-monolith"
        style={{
          scrollMarginTop: "clamp(90px, 11vw, 130px)",
          padding: "clamp(80px, 10vw, 140px) 0",
          position: "relative",
          backgroundColor: "var(--color-obsidian)",
          overflow: "hidden",
        }}
      >
        {/* Ambient Copper Lighting Cone */}
        <div
          ref={glowRef}
          style={{
            position: "absolute",
            top: "-160px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(900px, 100vw)",
            height: "480px",
            background:
              "radial-gradient(ellipse at 50% 20%, rgba(245, 130, 32, 0.22) 0%, rgba(8, 9, 11, 0) 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div className="editorial-container" style={{ position: "relative", zIndex: 1 }}>
          {/* Main Monolith Stage */}
          <div
            style={{
              backgroundColor: "rgba(14, 16, 22, 0.75)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "24px",
              padding: "clamp(48px, 6vw, 84px) clamp(24px, 5vw, 64px)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              textAlign: "center",
              boxShadow:
                "0 32px 80px -20px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              position: "relative",
            }}
          >
            {/* Tag Pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                borderRadius: "9999px",
                backgroundColor: "rgba(245, 130, 32, 0.12)",
                border: "1px solid rgba(245, 130, 32, 0.3)",
                color: "var(--color-copper)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.76rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "28px",
              }}
            >
              <Zap size={13} style={{ fill: "currentColor" }} />
              <span>Commercial Deployment Horizon</span>
            </div>

            {/* Confident Editorial Display Title */}
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(2.5rem, 6.2vw, 5.2rem)",
                fontWeight: 800,
                lineHeight: 0.98,
                letterSpacing: "-0.04em",
                color: "#ffffff",
                textTransform: "uppercase",
                maxWidth: "1000px",
                margin: "0 auto 24px auto",
              }}
            >
              DEPLOY ASSETS. <br />
              <span style={{ color: "var(--color-copper)" }}>ZERO CAPITAL LOCK-IN.</span>
            </h2>

            {/* Editorial Subtext */}
            <p
              style={{
                fontSize: "clamp(1rem, 1.3vw, 1.2rem)",
                color: "rgba(255, 255, 255, 0.68)",
                lineHeight: 1.6,
                maxWidth: "680px",
                margin: "0 auto 44px auto",
              }}
            >
              {conversionData.subtext}
            </p>

            {/* Dual Magnetic Action Buttons */}
            <div
              className="monolith-actions-row"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => onOpenEnquiry("luxury-fleet")}
                className="magnetic-btn monolith-primary-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  backgroundColor: "var(--color-copper)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "9999px",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  fontSize: "0.92rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  boxShadow:
                    "0 0 32px rgba(245, 130, 32, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.25)",
                }}
                id="monolith-structure-lease-cta"
              >
                <span>{conversionData.ctaPrimary}</span>
                <ArrowUpRight size={18} />
              </button>

              <a
                href={`mailto:${footerData.email}`}
                className="magnetic-btn monolith-secondary-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  color: "#ffffff",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "9999px",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  fontSize: "0.92rem",
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                }}
                id="monolith-email-channel"
              >
                <Mail size={16} style={{ color: "var(--color-copper)" }} />
                <span>{footerData.email}</span>
              </a>
            </div>
          </div>
        </div>

        <style jsx>{`
          .monolith-primary-btn {
            padding: 18px 38px;
          }
          .monolith-secondary-btn {
            padding: 18px 32px;
          }

          @media (max-width: 640px) {
            .monolith-primary-btn,
            .monolith-secondary-btn {
              padding: 14px 24px !important;
              font-size: 0.85rem !important;
              width: 100%;
              max-width: 320px;
              justify-content: center;
            }
          }
        `}</style>
      </section>
    </>
  );
}
