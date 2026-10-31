"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { heroData } from "@/lib/data/homepageContent";
import { gsap, useGSAP } from "@/lib/animations/gsap";
import { assetPath } from "@/lib/utils/basePath";

interface EditorialHeroProps {
  onOpenEnquiry: () => void;
}

export default function EditorialHero({ onOpenEnquiry }: EditorialHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const topRuleRef = useRef<HTMLDivElement>(null);
  const ledgerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Respect prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 1. Draw top architectural hairline
      if (topRuleRef.current) {
        tl.fromTo(
          topRuleRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.9, ease: "power3.inOut" }
        );
      }

      // 2. Masked vertical text reveal for headline lines
      tl.fromTo(
        ".hero-headline-mask",
        { yPercent: 115 },
        { yPercent: 0, duration: 1.1, stagger: 0.16 },
        "-=0.5"
      );

      // 3. Narrative paragraph gentle settle
      tl.fromTo(
        ".hero-narrative-text",
        { opacity: 0, y: 18 },
        { opacity: 1, duration: 0.75, ease: "power3.out" },
        "-=0.6"
      );

      // 4. Primary and secondary action buttons
      tl.fromTo(
        ".hero-action-group",
        { opacity: 0, y: 14 },
        { opacity: 1, duration: 0.65, ease: "power3.out" },
        "-=0.45"
      );

      // 5. Operational ledger reveal with metric rows
      if (ledgerRef.current) {
        tl.fromTo(
          ledgerRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" },
          "-=0.7"
        );

        tl.fromTo(
          ".ledger-metric-row",
          { opacity: 0, x: 12 },
          { opacity: 1, x: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" },
          "-=0.5"
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        paddingTop: "64px",
        paddingBottom: "64px",
        position: "relative",
      }}
    >
      <div className="editorial-container">
        {/* Top Coordinate Header with Hairline Rule */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "16px",
            position: "relative",
            marginBottom: "44px",
          }}
        >
          <span className="mono-meta" id="hero-location-stamp">
            {heroData.locationTag}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono-system)",
              fontSize: "0.72rem",
              letterSpacing: "0.14em",
              color: "var(--color-slate-light)",
              textTransform: "uppercase",
            }}
          >
            {heroData.subTag}
          </span>

          {/* Animated Hairline Rule */}
          <div
            ref={topRuleRef}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "1px",
              backgroundColor: "var(--color-hairline)",
            }}
          />
        </div>

        {/* Asymmetric 7-col / 5-col Composition */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: "48px",
            alignItems: "start",
          }}
        >
          {/* Left Column (7 Columns): Expressive Display Typography with Masking */}
          <div style={{ gridColumn: "span 7" }} className="hero-editorial-left">
            <h1
              style={{
                fontSize: "clamp(2.25rem, 6.5vw, 5.25rem)",
                fontWeight: 800,
                lineHeight: 1.02,
                letterSpacing: "-0.04em",
                color: "var(--color-ink-black)",
                marginBottom: "28px",
                wordBreak: "break-word",
              }}
              id="hero-editorial-headline"
            >
              <span className="editorial-mask-wrap">
                <span className="editorial-mask-line hero-headline-mask">
                  {heroData.headlineLine1}
                </span>
              </span>
              <span className="editorial-mask-wrap">
                <span className="editorial-mask-line hero-headline-mask">
                  {heroData.headlineLine2}
                </span>
              </span>
            </h1>

            <p
              className="hero-narrative-text"
              style={{
                fontSize: "clamp(1rem, 1.35vw, 1.22rem)",
                color: "var(--color-slate)",
                lineHeight: 1.65,
                maxWidth: "580px",
                marginBottom: "40px",
                fontWeight: 400,
              }}
            >
              {heroData.bodyCopy}
            </p>

            {/* Direct Dual CTAs with Micro-Interactions */}
            <div
              className="hero-action-group"
              style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}
            >
              <button
                onClick={onOpenEnquiry}
                className="btn-editorial-primary"
                id="hero-apply-button"
                style={{ padding: "14px 28px", fontSize: "0.92rem" }}
              >
                <span>{heroData.primaryCta.label}</span>
                <ArrowRight size={16} className="btn-arrow-icon" />
              </button>

              <Link
                href={heroData.secondaryCta.href}
                className="btn-editorial-secondary"
                id="hero-explore-link"
                style={{ padding: "14px 26px", fontSize: "0.92rem" }}
              >
                <span>{heroData.secondaryCta.label}</span>
                <ChevronDown size={15} />
              </Link>
            </div>
          </div>

          {/* Right Column (5 Columns): Editorial Photographic Asset Showcase & Ledger */}
          <div
            ref={ledgerRef}
            style={{
              gridColumn: "span 5",
              backgroundColor: "var(--color-white)",
              border: "1px solid var(--color-hairline)",
              overflow: "hidden",
            }}
            className="hero-editorial-right"
            id="hero-operational-ledger"
          >
            {/* Hero Asset Photographic Window */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "220px",
                overflow: "hidden",
                backgroundColor: "var(--color-obsidian-surface)",
              }}
            >
              <Image
                src={assetPath("/images/luxury-fleet.jpg")}
                alt="Firstgen Assets Luxury Executive Fleet"
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                style={{ objectFit: "cover" }}
                priority
              />
              <div
                style={{
                  position: "absolute",
                  top: "14px",
                  left: "14px",
                  backgroundColor: "rgba(9, 10, 12, 0.88)",
                  backdropFilter: "blur(6px)",
                  border: "1px solid rgba(255, 255, 255, 0.14)",
                  padding: "4px 10px",
                  fontFamily: "var(--font-mono-system)",
                  fontSize: "0.68rem",
                  color: "#ffffff",
                  letterSpacing: "0.1em",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-brand-orange)",
                    display: "inline-block",
                  }}
                />
                <span>FEATURED ASSET · LUXURY FLEET</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "36px",
                  background: "linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent)",
                }}
              />
            </div>

            {/* Metrics Ledger Beneath */}
            <div style={{ padding: "20px 24px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: "12px",
                  borderBottom: "1px solid var(--color-hairline)",
                  marginBottom: "4px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono-system)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.16em",
                    color: "var(--color-slate)",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  OPERATIONAL COMMITMENT
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono-system)",
                    fontSize: "0.68rem",
                    color: "var(--color-brand-orange)",
                    fontWeight: 700,
                  }}
                >
                  48-HR SLA
                </span>
              </div>

              {heroData.stats.map((stat, i) => (
                <div
                  key={stat.number}
                  className="ledger-metric-row"
                  style={{
                    padding: "12px 0",
                    borderBottom:
                      i === heroData.stats.length - 1 ? "none" : "1px solid var(--color-hairline)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono-system)",
                        fontSize: "0.72rem",
                        color: "var(--color-brand-orange)",
                        fontWeight: 700,
                      }}
                    >
                      {stat.number}
                    </span>
                    <span
                      style={{
                        fontSize: "0.86rem",
                        color: "var(--color-slate)",
                        fontWeight: 500,
                      }}
                    >
                      {stat.label}
                    </span>
                  </div>

                  <span
                    style={{
                      fontFamily: "var(--font-mono-system)",
                      fontSize: "1.08rem",
                      fontWeight: 700,
                      color: "var(--color-ink-black)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          :global(.hero-editorial-left) {
            grid-column: span 12 !important;
          }
          :global(.hero-editorial-right) {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </section>
  );
}
