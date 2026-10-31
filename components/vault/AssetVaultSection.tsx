"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { categoryCardsData } from "@/lib/data/homepageContent";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface AssetVaultSectionProps {
  onOpenEnquiry: (categoryId: string) => void;
}

export default function AssetVaultSection({ onOpenEnquiry }: AssetVaultSectionProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!prefersReducedMotion && sectionRef.current) {
        const ctx = gsap.context(() => {
          // Staggered card rise with explicit fromTo and clearProps
          gsap.fromTo(
            ".vault-card-item",
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              stagger: 0.15,
              ease: "power2.out",
              clearProps: "transform,opacity",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );

          // Parallax depth on images inside cards
          gsap.utils.toArray<HTMLElement>(".vault-card-image").forEach((img) => {
            gsap.to(img, {
              yPercent: -10,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            });
          });
        }, sectionRef);

        // Ensure triggers are properly measured
        ScrollTrigger.refresh();

        return () => ctx.revert();
      }
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="asset-vault"
      style={{
        scrollMarginTop: "clamp(90px, 11vw, 130px)",
        padding: "110px 0",
        backgroundColor: "var(--color-titanium)",
        position: "relative",
      }}
    >
      <div className="cinematic-container">
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
            marginBottom: "56px",
          }}
        >
          <div>
            <div className="mono-tag" style={{ marginBottom: "14px" }}>
              01 / THREE SPECIALIZED DIVISIONS
            </div>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)",
                color: "var(--color-obsidian)",
              }}
            >
              The Asset Vault
            </h2>
          </div>

          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--color-ink-muted)",
              maxWidth: "460px",
              lineHeight: 1.6,
              fontWeight: 500,
            }}
          >
            Structures financing executive corporate mobility, heavy project infrastructure, and
            enterprise compute across India with zero capital lock-in.
          </p>
        </div>

        {/* 3 Interactive Cards Grid with Category Distinctiveness (Koto / Pentagram) */}
        <div
          ref={cardsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "28px",
          }}
          className="vault-cards-grid"
        >
          {categoryCardsData.map((cat) => {
            const isHovered = hoveredCard === cat.id;

            // Division-specific signature colors
            const divisionAccent =
              cat.id === "luxury-fleet"
                ? "var(--color-fleet)"
                : cat.id === "construction-warehouse"
                ? "var(--color-construction)"
                : "var(--color-it)";

            const divisionTrait =
              cat.id === "luxury-fleet"
                ? "Executive Mobility"
                : cat.id === "construction-warehouse"
                ? "Heavy Infrastructure"
                : "Compute Infrastructure";

            return (
              <div
                key={cat.id}
                className="vault-card-item"
                onMouseEnter={() => setHoveredCard(cat.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  position: "relative",
                  borderRadius: "24px",
                  overflow: "hidden",
                  backgroundColor: "var(--color-obsidian)",
                  border: isHovered
                    ? `1px solid ${divisionAccent}`
                    : "1px solid rgba(0, 0, 0, 0.12)",
                  boxShadow: isHovered
                    ? `0 24px 56px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px ${divisionAccent}`
                    : "0 12px 30px -8px rgba(0, 0, 0, 0.1)",
                  transition: "border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
                  transform: isHovered ? "translateY(-6px)" : undefined,
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "560px",
                }}
              >
                {/* Division Color Top Bar Indicator */}
                <div
                  style={{
                    height: "3px",
                    width: "100%",
                    backgroundColor: divisionAccent,
                    opacity: isHovered ? 1 : 0.4,
                    transition: "opacity 0.25s ease",
                  }}
                />

                {/* Background Photograph Framing */}
                <div style={{ position: "relative", width: "100%", height: "260px", overflow: "hidden" }}>
                  <div
                    className="vault-card-image"
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "120%",
                      top: 0,
                    }}
                  >
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      sizes="(max-width: 900px) 100vw, 33vw"
                      style={{
                        objectFit: "cover",
                        filter: isHovered ? "brightness(0.95) saturate(1.05)" : "brightness(0.72) saturate(0.9)",
                        transform: isHovered ? "scale(1.04)" : "scale(1)",
                        transition: "filter 0.4s ease, transform 0.6s var(--ease-editorial)",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, var(--color-obsidian) 0%, rgba(8, 9, 11, 0.2) 60%, transparent 100%)",
                    }}
                  />

                  {/* Top Category Badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      left: "16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        padding: "4px 12px",
                        borderRadius: "9999px",
                        backgroundColor: "rgba(10, 11, 14, 0.82)",
                        backdropFilter: "blur(10px)",
                        border: `1px solid rgba(255, 255, 255, 0.15)`,
                        fontFamily: "var(--font-technical)",
                        fontSize: "0.68rem",
                        color: divisionAccent,
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                      }}
                    >
                      {cat.num}
                    </div>

                    <div
                      style={{
                        padding: "4px 10px",
                        borderRadius: "9999px",
                        backgroundColor: "rgba(10, 11, 14, 0.6)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        fontFamily: "var(--font-technical)",
                        fontSize: "0.64rem",
                        color: "rgba(255, 255, 255, 0.7)",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      {divisionTrait}
                    </div>
                  </div>
                </div>

                {/* Content Body */}
                <div
                  style={{
                    padding: "24px 28px 28px 28px",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-technical)",
                        fontSize: "0.7rem",
                        color: divisionAccent,
                        letterSpacing: "0.14em",
                        fontWeight: 700,
                        marginBottom: "6px",
                      }}
                    >
                      {cat.badge}
                    </div>

                    <h3
                      className="font-display"
                      style={{
                        fontSize: "1.75rem",
                        color: "#ffffff",
                        marginBottom: "12px",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {cat.title}
                    </h3>

                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--color-text-dim)",
                        lineHeight: 1.6,
                        marginBottom: "20px",
                      }}
                    >
                      {cat.description}
                    </p>

                    {/* Curated Asset Pill List */}
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px",
                        marginBottom: "24px",
                      }}
                    >
                      {cat.assets.slice(0, 3).map((asset) => (
                        <span
                          key={asset}
                          style={{
                            padding: "4px 10px",
                            backgroundColor: "rgba(255, 255, 255, 0.06)",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            borderRadius: "6px",
                            fontSize: "0.75rem",
                            color: "#d4d4d8",
                            fontFamily: "var(--font-technical)",
                          }}
                        >
                          {asset}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Bar & Action */}
                  <div
                    style={{
                      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                      paddingTop: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "0.68rem",
                          fontFamily: "var(--font-technical)",
                          color: "rgba(255, 255, 255, 0.5)",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        INDICATIVE RATE
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-technical)",
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          color: divisionAccent,
                        }}
                      >
                        {cat.startingRate}
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenEnquiry(cat.id)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "10px 18px",
                        backgroundColor: isHovered ? divisionAccent : "rgba(255, 255, 255, 0.08)",
                        color: "#ffffff",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        borderRadius: "9999px",
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      id={`vault-enquire-btn-${cat.id}`}
                    >
                      <span>Propose Lease</span>
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 960px) {
          :global(.vault-cards-grid) {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
