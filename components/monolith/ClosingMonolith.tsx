"use client";

import React, { useEffect, useRef } from "react";
import { ArrowUpRight, Mail, MapPin, ShieldCheck, Zap } from "lucide-react";
import { conversionData, footerData } from "@/lib/data/homepageContent";
import { bankingPartners, regulatoryPartners } from "./PartnerLogos";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ClosingMonolithProps {
  onOpenEnquiry: (category?: string) => void;
}

export default function ClosingMonolith({ onOpenEnquiry }: ClosingMonolithProps) {
  const monolithRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!prefersReducedMotion && monolithRef.current && glowRef.current && badgesRef.current) {
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

          // Badges staggered reveal
          gsap.fromTo(
            ".monolith-badge-pill",
            { y: 16, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.05,
              ease: "power2.out",
              clearProps: "all",
              scrollTrigger: {
                trigger: monolithRef.current,
                start: "top 80%",
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

          {/* Confident Editorial Display Title (Pentagram / Ragged Edge) */}
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
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              flexWrap: "wrap",
              marginBottom: "64px",
            }}
          >
            <button
              onClick={() => onOpenEnquiry("luxury-fleet")}
              className="magnetic-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "18px 38px",
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
              className="magnetic-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "18px 32px",
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

          {/* Institutional Banking & Regulatory Trust Strip */}
          <div
            style={{
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              paddingTop: "clamp(44px, 5.5vw, 64px)",
              textAlign: "left",
            }}
          >
            {/* Header Lockup */}
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.78rem",
                  letterSpacing: "0.16em",
                  color: "var(--color-copper)",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  marginBottom: "12px",
                }}
              >
                <ShieldCheck size={16} style={{ color: "var(--color-copper)" }} />
                <span>Underwritten by Institutional Banking and Statutory Frameworks</span>
              </div>
              <p
                style={{
                  fontSize: "clamp(0.92rem, 1.1vw, 1.05rem)",
                  color: "rgba(255, 255, 255, 0.65)",
                  maxWidth: "720px",
                  margin: "0 auto",
                  lineHeight: 1.6,
                }}
              >
                Structured across premier corporate credit lines, authenticated via Government of
                India DigiLocker e-KYC, and governed by national statutory frameworks.
              </p>
            </div>

            {/* Container for the 2 Tiers */}
            <div ref={badgesRef} style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              {/* Tier 1: Banking & Liquidity Lines */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    letterSpacing: "0.14em",
                    color: "rgba(255, 255, 255, 0.45)",
                    textTransform: "uppercase",
                    marginBottom: "12px",
                    padding: "0 6px",
                  }}
                >
                  <span>Tier-1 Institutional Banking and Liquidity Syndication</span>
                  <span>Escrow and Credit Lines</span>
                </div>

                <div className="monolith-banking-grid">
                  {bankingPartners.map((partner) => (
                    <div
                      key={partner.id}
                      className="monolith-badge-pill"
                      style={{
                        padding: "24px 28px",
                        borderRadius: "18px",
                        backgroundColor: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.09)",
                        backdropFilter: "blur(14px)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "12px",
                        transition:
                          "border-color 0.25s ease, background-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
                        cursor: "default",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "rgba(245, 130, 32, 0.08)";
                        e.currentTarget.style.borderColor = "rgba(245, 130, 32, 0.45)";
                        e.currentTarget.style.transform = "translateY(-4px)";
                        e.currentTarget.style.boxShadow =
                          "0 14px 32px -6px rgba(245, 130, 32, 0.22)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.03)";
                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.09)";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "36px",
                          width: "100%",
                        }}
                      >
                        {partner.logo}
                      </div>

                      <div
                        style={{
                          fontSize: "0.74rem",
                          fontFamily: "var(--font-mono)",
                          color: "rgba(255, 255, 255, 0.65)",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          fontWeight: 600,
                        }}
                      >
                        {partner.role}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tier 2: Statutory & Digital Frameworks */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    letterSpacing: "0.14em",
                    color: "rgba(255, 255, 255, 0.45)",
                    textTransform: "uppercase",
                    marginBottom: "12px",
                    padding: "0 6px",
                  }}
                >
                  <span>Statutory Underwriting, Verification and Recourse</span>
                  <span>NPCI and Statutory Frameworks</span>
                </div>

                <div className="monolith-regulatory-grid">
                  {regulatoryPartners.map((partner) => (
                    <div
                      key={partner.id}
                      className="monolith-badge-pill"
                      style={{
                        padding: "22px 20px",
                        borderRadius: "18px",
                        backgroundColor: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.09)",
                        backdropFilter: "blur(14px)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "12px",
                        transition:
                          "border-color 0.25s ease, background-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
                        cursor: "default",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "rgba(245, 130, 32, 0.08)";
                        e.currentTarget.style.borderColor = "rgba(245, 130, 32, 0.45)";
                        e.currentTarget.style.transform = "translateY(-4px)";
                        e.currentTarget.style.boxShadow =
                          "0 14px 32px -6px rgba(245, 130, 32, 0.22)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.03)";
                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.09)";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "36px",
                          width: "100%",
                        }}
                      >
                        {partner.logo}
                      </div>

                      <div
                        style={{
                          fontSize: "0.72rem",
                          fontFamily: "var(--font-mono)",
                          color: "rgba(255, 255, 255, 0.65)",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          fontWeight: 600,
                        }}
                      >
                        {partner.role}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Geographical Base */}
            <div
              style={{
                marginTop: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                fontSize: "0.78rem",
                color: "rgba(255, 255, 255, 0.55)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.04em",
              }}
            >
              <MapPin size={14} style={{ color: "var(--color-copper)" }} />
              <span>{conversionData.locationStamp}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .monolith-banking-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
          width: 100%;
        }
        .monolith-regulatory-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
          width: 100%;
        }
        @media (max-width: 1024px) {
          .monolith-regulatory-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 768px) {
          .monolith-banking-grid {
            grid-template-columns: 1fr;
          }
          .monolith-regulatory-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
