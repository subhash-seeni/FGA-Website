"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { heroData } from "@/lib/data/homepageContent";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface CinematicHeroProps {
  onOpenEnquiry: () => void;
}

export default function CinematicHero({ onOpenEnquiry }: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const assetStageRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Calculate subtle 3D tilt
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!prefersReducedMotion && containerRef.current) {
        const ctx = gsap.context(() => {
          // 1. Headline stagger reveal
          gsap.fromTo(
            ".hero-headline-line",
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
              clearProps: "all",
            }
          );

          // 2. Parallax scroll on 3D asset stage window
          if (assetStageRef.current) {
            gsap.to(assetStageRef.current, {
              yPercent: -18,
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1,
              },
            });
          }

          // 3. Subtle exit fade
          gsap.to(".hero-grid", {
            opacity: 0.35,
            scale: 0.97,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "center top",
              end: "bottom top",
              scrub: 1,
            },
          });
        }, containerRef);

        return () => ctx.revert();
      }
    }
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        paddingTop: "130px",
        paddingBottom: "80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="cinematic-container">
        {/* Top Minimal Coordinates */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "16px",
            borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
            marginBottom: "40px",
          }}
        >
          <div className="mono-tag">{heroData.locationTag}</div>
          <div
            style={{
              fontFamily: "var(--font-technical)",
              fontSize: "0.72rem",
              letterSpacing: "0.14em",
              color: "var(--color-ink-muted)",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            OPERATING LEASE INFRASTRUCTURE
          </div>
        </div>

        {/* Asymmetrical Cinematic Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.9fr",
            gap: "56px",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left Column: Exaggerated Display Typography */}
          <div>
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(3.6rem, 8.2vw, 7.8rem)",
                color: "var(--color-obsidian)",
                marginBottom: "28px",
                lineHeight: 0.94,
                letterSpacing: "-0.04em",
              }}
            >
              <span className="hero-headline-line" style={{ display: "inline-block" }}>Assets</span>{" "}
              <span
                className="hero-headline-line"
                style={{ display: "inline-block", color: "var(--color-copper)" }}
              >
                Work.
              </span>
              <br />
              <span className="hero-headline-line" style={{ display: "inline-block" }}>Capital</span>{" "}
              <span
                className="hero-headline-line"
                style={{
                  display: "inline-block",
                  color: "var(--color-obsidian)",
                }}
              >
                Stays.
              </span>
            </h1>

            <p
              style={{
                fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)",
                color: "var(--color-ink-muted)",
                lineHeight: 1.6,
                maxWidth: "520px",
                marginBottom: "36px",
                fontWeight: 500,
              }}
            >
              {heroData.bodyCopy}
            </p>

            {/* Playful Pill CTAs */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
              <button
                onClick={onOpenEnquiry}
                className="btn-pill-primary"
                id="hero-apply-btn"
              >
                <span>Structure Your Lease</span>
                <ArrowRight size={16} />
              </button>

              <Link
                href="#asset-vault"
                className="btn-pill-secondary"
                id="hero-explore-btn"
              >
                <span>The Asset Vault</span>
                <ChevronDown size={15} />
              </Link>
            </div>
          </div>

          {/* Right Column: 3D Interactive Floating Asset Window */}
          <div
            ref={assetStageRef}
            className="tilt-card-wrapper"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
              transition: "transform 0.15s ease-out",
            }}
          >
            <div
              style={{
                position: "relative",
                borderRadius: "24px",
                overflow: "hidden",
                border: "1px solid rgba(0, 0, 0, 0.12)",
                backgroundColor: "var(--color-obsidian)",
                boxShadow: "0 28px 64px -16px rgba(0, 0, 0, 0.35)",
              }}
            >
              {/* Asset Photograph */}
              <div style={{ position: "relative", width: "100%", height: "460px" }}>
                <Image
                  src="/images/luxury-fleet.jpg"
                  alt="Luxury Fleet and Commercial Mobility"
                  fill
                  sizes="(max-width: 900px) 100vw, 45vw"
                  style={{ objectFit: "cover" }}
                  priority
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(8, 9, 11, 0.95) 0%, rgba(8, 9, 11, 0.2) 50%, rgba(8, 9, 11, 0.6) 100%)",
                  }}
                />

                {/* Floating Top Badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "20px",
                    left: "20px",
                    right: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "6px 14px",
                      backgroundColor: "rgba(10, 12, 16, 0.75)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "9999px",
                      fontFamily: "var(--font-technical)",
                      fontSize: "0.72rem",
                      color: "#ffffff",
                      fontWeight: 600,
                    }}
                  >
                    <Sparkles size={13} style={{ color: "var(--color-copper)" }} />
                    <span>ACTIVE VAULT · EXECUTIVE FLEET</span>
                  </div>

                  <span
                    style={{
                      fontFamily: "var(--font-technical)",
                      fontSize: "0.75rem",
                      color: "var(--color-copper)",
                      fontWeight: 700,
                    }}
                  >
                    INDEX 2026
                  </span>
                </div>

                {/* Bottom Floating Parameter HUD */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "20px",
                    right: "20px",
                    padding: "18px 22px",
                    backgroundColor: "rgba(16, 18, 22, 0.82)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255, 255, 255, 0.14)",
                    borderRadius: "16px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                      paddingBottom: "12px",
                      marginBottom: "12px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "0.7rem",
                          fontFamily: "var(--font-technical)",
                          color: "rgba(255, 255, 255, 0.6)",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        FLAGSHIP ASSET
                      </div>
                      <div
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          color: "#ffffff",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        Rolls-Royce Ghost & Mercedes S-Class
                      </div>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontSize: "0.7rem",
                          fontFamily: "var(--font-technical)",
                          color: "var(--color-copper)",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          fontWeight: 600,
                        }}
                      >
                        STRUCTURE
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-technical)",
                          fontSize: "0.95rem",
                          fontWeight: 700,
                          color: "#ffffff",
                        }}
                      >
                        OPEX LEASE
                      </div>
                    </div>
                  </div>

                  {/* Micro Metric Ledger */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "12px",
                      fontSize: "0.76rem",
                      color: "rgba(255, 255, 255, 0.7)",
                      fontFamily: "var(--font-technical)",
                    }}
                  >
                    <div>
                      <span style={{ color: "var(--color-copper)", fontWeight: 700 }}>₹0</span> DOWN PAYMENT
                    </div>
                    <div>
                      <span style={{ color: "#ffffff", fontWeight: 700 }}>48H</span> DELIVERY SLA
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          :global(.hero-grid) {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
