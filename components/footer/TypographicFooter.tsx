"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Mail, MapPin } from "lucide-react";
import { footerData } from "@/lib/data/homepageContent";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { assetPath } from "@/lib/utils/basePath";

export default function TypographicFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!prefersReducedMotion && footerRef.current && watermarkRef.current) {
        const ctx = gsap.context(() => {
          gsap.fromTo(
            watermarkRef.current,
            { xPercent: -5 },
            {
              xPercent: 5,
              ease: "none",
              scrollTrigger: {
                trigger: footerRef.current,
                start: "top bottom",
                end: "bottom bottom",
                scrub: 1.5,
              },
            }
          );
        }, footerRef);

        return () => ctx.revert();
      }
    }
  }, []);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      ref={footerRef}
      id="corporate-footer"
      style={{
        backgroundColor: "#050608",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        paddingTop: "clamp(60px, 8vw, 100px)",
        paddingBottom: "40px",
        position: "relative",
        overflow: "hidden",
        color: "#ffffff",
      }}
    >
      <div className="editorial-container">
        {/* Main 4-Column Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1.2fr",
            gap: "clamp(32px, 5vw, 64px)",
            paddingBottom: "clamp(48px, 6vw, 72px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            position: "relative",
            zIndex: 1,
          }}
          className="footer-grid-responsive"
        >
          {/* Column 1: Brand & Positioning */}
          <div>
            <div
              style={{
                position: "relative",
                width: "154px",
                height: "46px",
                marginBottom: "20px",
                filter: "brightness(0) invert(1)",
              }}
            >
              <Image
                src={assetPath("/firstgen-logo-transparent.png")}
                alt="Firstgen Assets Corporate Identity"
                fill
                sizes="154px"
                style={{ objectFit: "contain", objectPosition: "left center" }}
              />
            </div>

            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                color: "var(--color-copper)",
                fontWeight: 700,
                marginBottom: "16px",
                textTransform: "uppercase",
              }}
            >
              {footerData.tagline}
            </div>

            <p
              style={{
                fontSize: "0.88rem",
                color: "rgba(255, 255, 255, 0.55)",
                lineHeight: 1.65,
                maxWidth: "340px",
                marginBottom: "28px",
              }}
            >
              {footerData.descriptor}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <a
                href={`mailto:${footerData.email}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "0.85rem",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontFamily: "var(--font-mono)",
                }}
              >
                <Mail size={14} style={{ color: "var(--color-copper)" }} />
                <span>{footerData.email}</span>
              </a>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "0.82rem",
                  color: "rgba(255, 255, 255, 0.5)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                <MapPin size={14} style={{ color: "var(--color-copper)" }} />
                <span>{footerData.location}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Commercial Asset Vault */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.74rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#ffffff",
                fontWeight: 700,
                marginBottom: "22px",
              }}
            >
              Asset Classes
            </h4>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { label: "Executive Luxury Fleet", href: "#asset-vault" },
                { label: "Heavy Machinery & Warehousing", href: "#asset-vault" },
                { label: "Enterprise IT & AI Compute", href: "#asset-vault" },
                { label: "Specialized Equipment", href: "#asset-vault" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    style={{
                      fontSize: "0.88rem",
                      color: "rgba(255, 255, 255, 0.55)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-copper)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.55)")}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Navigation Architecture */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.74rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#ffffff",
                fontWeight: 700,
                marginBottom: "22px",
              }}
            >
              Architecture
            </h4>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { label: "The Asset Vault", href: "#asset-vault" },
                { label: "The Financial Equation", href: "#financial-equation" },
                { label: "48-Hour Velocity Line", href: "#velocity-line" },
                { label: "Structure a Lease", href: "#closing-monolith" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    style={{
                      fontSize: "0.88rem",
                      color: "rgba(255, 255, 255, 0.55)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-copper)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.55)")}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Institutional Framework */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.74rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#ffffff",
                fontWeight: 700,
                marginBottom: "22px",
              }}
            >
              Statutory Governance
            </h4>

            <p
              style={{
                fontSize: "0.82rem",
                color: "rgba(255, 255, 255, 0.5)",
                lineHeight: 1.6,
                marginBottom: "20px",
              }}
            >
              Underwritten in direct collaboration with leading Indian banking syndicates. All commercial contracts comply with SARFAESI Act, eNACH mandate registries, and statutory GST credit pass-through guidelines.
            </p>

            <button
              onClick={scrollToTop}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "9999px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#ffffff",
                fontFamily: "var(--font-mono)",
                fontSize: "0.76rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-copper)";
                e.currentTarget.style.color = "var(--color-copper)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                e.currentTarget.style.color = "#ffffff";
              }}
            >
              <span>Back to Zenith</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>

        {/* Screen-Spanning Hollow Watermark Typography with Parallax Drift */}
        <div
          aria-hidden="true"
          style={{
            userSelect: "none",
            pointerEvents: "none",
            textAlign: "center",
            padding: "40px 0 20px 0",
            overflow: "hidden",
          }}
        >
          <div
            ref={watermarkRef}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.5rem, 14vw, 12rem)",
              fontWeight: 800,
              letterSpacing: "0.08em",
              lineHeight: 0.85,
              textTransform: "uppercase",
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.08)",
              color: "transparent",
              whiteSpace: "nowrap",
              willChange: "transform",
            }}
          >
            FIRSTGEN
          </div>
        </div>

        {/* Legal & Jurisdiction Strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.74rem",
            color: "rgba(255, 255, 255, 0.4)",
          }}
        >
          <div>{footerData.legalLine}</div>
          <div style={{ color: "var(--color-copper)" }}>
            {footerData.jurisdictionLine}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 960px) {
          :global(.footer-grid-responsive) {
            grid-template-columns: 1fr 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 600px) {
          :global(.footer-grid-responsive) {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </footer>
  );
}
