"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { categoryCardsData } from "@/lib/data/homepageContent";
import { gsap, useGSAP } from "@/lib/animations/gsap";

interface EditorialCategoriesProps {
  onOpenEnquiry: (categoryId: string) => void;
}

export default function EditorialCategories({ onOpenEnquiry }: EditorialCategoriesProps) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const stageImageRef = useRef<HTMLDivElement>(null);
  const stageContentRef = useRef<HTMLDivElement>(null);

  const activeCategory = categoryCardsData[activeCategoryIndex];

  // Coordinated transition when active category switches
  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Photographic stage subtle scale settle and clip reveal
      if (stageImageRef.current) {
        tl.fromTo(
          stageImageRef.current,
          { opacity: 0.4, scale: 1.04 },
          { opacity: 1, scale: 1.0, duration: 0.65, ease: "power2.out" },
          0
        );
      }

      // 2. Coordinated content ledger slide & fade
      if (stageContentRef.current) {
        tl.fromTo(
          stageContentRef.current.querySelectorAll(".stage-anim-item"),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: "power3.out" },
          0.1
        );
      }
    },
    { dependencies: [activeCategoryIndex], scope: containerRef }
  );

  return (
    <section
      id="asset-portfolio"
      ref={containerRef}
      style={{
        padding: "96px 0",
        borderBottom: "1px solid var(--color-hairline)",
        position: "relative",
      }}
    >
      <div className="editorial-container">
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
            marginBottom: "40px",
            paddingBottom: "20px",
            borderBottom: "1px solid var(--color-hairline)",
          }}
        >
          <div style={{ maxWidth: "780px" }}>
            <div className="mono-meta" style={{ marginBottom: "12px" }}>
              03 / THREE CORE ASSET CATEGORIES
            </div>
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
              Operating Lease Portfolio
            </h2>
            <p
              style={{
                fontSize: "1.05rem",
                color: "var(--color-slate)",
                lineHeight: 1.6,
              }}
            >
              Three specialized commercial divisions financing corporate mobility, industrial
              infrastructure, and mission-critical compute across India.
            </p>
          </div>

          <div
            style={{
              fontFamily: "var(--font-mono-system)",
              fontSize: "0.75rem",
              color: "var(--color-slate)",
              textAlign: "right",
            }}
            className="portfolio-stats-stamp"
          >
            <div>SAME-DAY AI DUE DILIGENCE</div>
            <div style={{ color: "var(--color-brand-orange)", fontWeight: 700, marginTop: "4px" }}>
              48-HOUR MOBILIZATION
            </div>
          </div>
        </div>

        {/* Category Index Tabs (Architectural Photographic Selectors) */}
        <div
          role="tablist"
          aria-label="Operating Lease Asset Categories"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            marginBottom: "32px",
          }}
          className="category-selector-grid"
        >
          {categoryCardsData.map((cat, idx) => {
            const isSelected = activeCategoryIndex === idx;
            return (
              <button
                key={cat.id}
                role="tab"
                id={`tab-${cat.id}`}
                aria-selected={isSelected}
                aria-controls={`panel-${cat.id}`}
                onClick={() => setActiveCategoryIndex(idx)}
                style={{
                  padding: "14px 18px",
                  textAlign: "left",
                  border: isSelected
                    ? "1px solid var(--color-ink-black)"
                    : "1px solid var(--color-hairline)",
                  backgroundColor: isSelected ? "var(--color-white)" : "var(--color-warm-surface)",
                  boxShadow: isSelected ? "0 4px 16px rgba(0, 0, 0, 0.06)" : "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Active Brand Accent Indicator */}
                {isSelected && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      bottom: 0,
                      width: "4px",
                      backgroundColor: "var(--color-brand-orange)",
                    }}
                  />
                )}

                {/* Photographic Thumbnail */}
                <div
                  style={{
                    position: "relative",
                    width: "56px",
                    height: "56px",
                    flexShrink: 0,
                    overflow: "hidden",
                    borderRadius: "var(--radius-xs)",
                    border: "1px solid var(--color-hairline)",
                  }}
                >
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="56px"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono-system)",
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      color: isSelected ? "var(--color-brand-orange)" : "var(--color-slate)",
                      letterSpacing: "0.08em",
                      marginBottom: "2px",
                    }}
                  >
                    {cat.num}
                  </div>
                  <div
                    style={{
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "var(--color-ink-black)",
                      letterSpacing: "-0.015em",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {cat.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono-system)",
                      fontSize: "0.74rem",
                      color: "var(--color-slate)",
                      fontWeight: 500,
                      marginTop: "2px",
                    }}
                  >
                    {cat.startingRate}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* EXPANSIVE EDITORIAL STAGE (Cohesive Photographic & Specification Transition) */}
        <div
          role="tabpanel"
          id={`panel-${activeCategory.id}`}
          aria-labelledby={`tab-${activeCategory.id}`}
          style={{
            backgroundColor: "var(--color-white)",
            border: "1px solid var(--color-hairline)",
            display: "grid",
            gridTemplateColumns: "1.25fr 1fr",
            overflow: "hidden",
          }}
          className="category-stage-grid"
        >
          {/* Left Column: High-Resolution Photographic Frame */}
          <div
            style={{
              position: "relative",
              minHeight: "440px",
              borderRight: "1px solid var(--color-hairline)",
              overflow: "hidden",
              backgroundColor: "var(--color-warm-neutral)",
            }}
          >
            <div
              ref={stageImageRef}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                willChange: "transform, opacity",
              }}
            >
              <Image
                src={activeCategory.image}
                alt={`${activeCategory.title}: ${activeCategory.subtitle} offered under Firstgen Assets operating lease`}
                fill
                sizes="(max-width: 900px) 100vw, 60vw"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>

            {/* Corner Badge */}
            <div
              style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                backgroundColor: "var(--color-white)",
                border: "1px solid var(--color-hairline)",
                padding: "6px 14px",
                fontFamily: "var(--font-mono-system)",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "var(--color-ink-black)",
                zIndex: 2,
              }}
            >
              {activeCategory.badge}
            </div>
          </div>

          {/* Right Column: Specification & Commercial Terms Ledger */}
          <div
            ref={stageContentRef}
            style={{
              padding: "40px 36px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="stage-anim-item">
              <div
                style={{
                  fontFamily: "var(--font-mono-system)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.14em",
                  color: "var(--color-brand-orange)",
                  fontWeight: 700,
                  marginBottom: "8px",
                }}
              >
                {activeCategory.subtitle}
              </div>

              <h3
                style={{
                  fontSize: "1.85rem",
                  fontWeight: 700,
                  color: "var(--color-ink-black)",
                  letterSpacing: "-0.03em",
                  marginBottom: "14px",
                }}
              >
                {activeCategory.title}
              </h3>

              <p
                style={{
                  fontSize: "0.95rem",
                  color: "var(--color-slate)",
                  lineHeight: 1.65,
                  marginBottom: "24px",
                }}
              >
                {activeCategory.description}
              </p>
            </div>

            {/* Commercial Rate & Tenure Strip */}
            <div
              className="stage-anim-item"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                backgroundColor: "var(--color-warm-surface)",
                border: "1px solid var(--color-hairline)",
                marginBottom: "24px",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono-system)",
                    fontSize: "0.68rem",
                    color: "var(--color-slate)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Indicative Monthly Rate
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono-system)",
                    fontSize: "1.18rem",
                    fontWeight: 700,
                    color: "var(--color-ink-black)",
                  }}
                >
                  {activeCategory.startingRate}
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontFamily: "var(--font-mono-system)",
                    fontSize: "0.68rem",
                    color: "var(--color-slate)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Standard Tenure
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono-system)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "var(--color-slate)",
                  }}
                >
                  {activeCategory.typicalTenure}
                </div>
              </div>
            </div>

            {/* Featured Fleet Assets Chips */}
            <div className="stage-anim-item" style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {activeCategory.assets.map((asset) => (
                  <span
                    key={asset}
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 500,
                      padding: "5px 12px",
                      backgroundColor: "var(--color-warm-neutral)",
                      border: "1px solid var(--color-hairline)",
                      color: "var(--color-ink-black)",
                    }}
                  >
                    {asset}
                  </span>
                ))}
              </div>
            </div>

            {/* Inclusions Checklist */}
            <div
              className="stage-anim-item"
              style={{
                marginTop: "auto",
                paddingTop: "16px",
                borderTop: "1px solid var(--color-hairline)",
                marginBottom: "24px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {activeCategory.inclusions.map((inc) => (
                  <div
                    key={inc}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      fontSize: "0.84rem",
                      color: "var(--color-slate)",
                    }}
                  >
                    <Check
                      size={14}
                      style={{
                        color: "var(--color-brand-orange)",
                        flexShrink: 0,
                        marginTop: "3px",
                      }}
                    />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA Button */}
            <div className="stage-anim-item">
              <button
                onClick={() => onOpenEnquiry(activeCategory.id)}
                className="btn-editorial-primary"
                style={{
                  width: "100%",
                  justifyContent: "space-between",
                  padding: "14px 22px",
                }}
              >
                <span style={{ fontWeight: 600 }}>Request {activeCategory.title} Proposal</span>
                <ArrowUpRight size={16} className="btn-arrow-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          :global(.category-stage-grid) {
            grid-template-columns: 1fr !important;
          }
          :global(.category-selector-grid) {
            grid-template-columns: 1fr !important;
          }
          :global(.portfolio-stats-stamp) {
            display: none !important;
          }
          :global(.cat-tab-rate) {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
