"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { assetPath } from "@/lib/utils/basePath";

interface FloatingNavProps {
  onOpenEnquiry: () => void;
}

export default function FloatingNav({ onOpenEnquiry }: FloatingNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");
  const headerRef = useRef<HTMLElement>(null);

  const navLinks = [
    { label: "Asset Vault", href: "#asset-vault" },
    { label: "The Equation", href: "#financial-equation" },
    { label: "Velocity", href: "#velocity-line" },
    { label: "Credentials", href: "#closing-monolith" },
  ];

  // Lock body scroll and handle Escape key when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileOpen(false);
      };
      window.addEventListener("keydown", handleKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKey);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!prefersReducedMotion) {
        const sections = [
          { id: "#hero", trigger: "#hero" },
          { id: "#asset-vault", trigger: "#asset-vault" },
          { id: "#financial-equation", trigger: "#financial-equation" },
          { id: "#velocity-line", trigger: "#velocity-line" },
          { id: "#closing-monolith", trigger: "#closing-monolith" },
        ];

        const triggers: ScrollTrigger[] = [];

        sections.forEach(({ id, trigger }) => {
          const el = document.querySelector(trigger);
          if (el) {
            const st = ScrollTrigger.create({
              trigger: el,
              start: "top center",
              end: "bottom center",
              onEnter: () => setActiveSection(id),
              onEnterBack: () => setActiveSection(id),
            });
            triggers.push(st);
          }
        });

        return () => {
          window.removeEventListener("scroll", handleScroll);
          triggers.forEach((st) => st.kill());
        };
      }
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Floating Pill Dock Container */}
      <header
        ref={headerRef}
        style={{
          position: "fixed",
          top: scrolled ? "12px" : "20px",
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          justifyContent: "center",
          padding: "0 clamp(10px, 3vw, 16px)",
          transition: "top 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          pointerEvents: "none",
        }}
        id="floating-nav-header"
      >
        <div
          className="nav-dock-pill"
          style={{
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            backgroundColor: "rgba(10, 11, 14, 0.88)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "9999px",
            boxShadow: "0 20px 48px -10px rgba(0, 0, 0, 0.45)",
            maxWidth: "920px",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          {/* Brand Identity Lockup */}
          <Link
            href="#hero"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              flexShrink: 0,
            }}
            aria-label="Firstgen Assets - Return to top"
          >
            <div className="nav-logo-box" style={{ position: "relative", filter: "brightness(0) invert(1)" }}>
              <Image
                src={assetPath("/firstgen-logo-transparent.png")}
                alt="Firstgen Assets"
                fill
                sizes="(max-width: 440px) 96px, 115px"
                style={{ objectFit: "contain", objectPosition: "left center" }}
                priority
              />
            </div>
          </Link>

          {/* Desktop Center Links with Active Section Indicator */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
            className="desktop-only"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    fontSize: "0.84rem",
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "#ffffff" : "#d1d5db",
                    textDecoration: "none",
                    padding: "8px 14px",
                    borderRadius: "9999px",
                    backgroundColor: isActive ? "rgba(255, 255, 255, 0.12)" : "transparent",
                    transition: "all 0.2s ease",
                    letterSpacing: "-0.01em",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "#d1d5db";
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  {isActive && (
                    <span
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        backgroundColor: "var(--color-copper)",
                        boxShadow: "0 0 6px var(--color-copper)",
                      }}
                    />
                  )}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
            <button
              onClick={onOpenEnquiry}
              className="nav-cta-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                backgroundColor: "var(--color-copper)",
                color: "#ffffff",
                border: "none",
                borderRadius: "9999px",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: "0 4px 16px rgba(245, 130, 32, 0.35)",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-copper-hover)";
                e.currentTarget.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-copper)";
                e.currentTarget.style.transform = "scale(1)";
              }}
              id="nav-begin-lease-pill"
            >
              <span className="nav-btn-text-full">Begin Lease</span>
              <span className="nav-btn-text-short">Lease</span>
              <ArrowUpRight size={14} />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: "none",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#ffffff",
                padding: "8px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              className="mobile-toggle"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99,
            backgroundColor: "rgba(8, 9, 11, 0.96)",
            backdropFilter: "blur(24px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "24px",
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Drawer"
        >
          <button
            onClick={() => setMobileOpen(false)}
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#ffffff",
              padding: "12px",
              borderRadius: "50%",
              cursor: "pointer",
            }}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>

          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "28px",
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2rem",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => {
              setMobileOpen(false);
              onOpenEnquiry();
            }}
            style={{
              padding: "16px 36px",
              backgroundColor: "var(--color-copper)",
              color: "#ffffff",
              border: "none",
              borderRadius: "9999px",
              fontSize: "1rem",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Begin Lease Application
          </button>
        </div>
      )}

      <style jsx>{`
        .nav-dock-pill {
          padding: 8px 10px 8px 20px;
          gap: 28px;
        }
        .nav-logo-box {
          width: 115px;
          height: 30px;
        }
        .nav-cta-btn {
          padding: 9px 18px;
          gap: 8px;
          font-size: 0.84rem;
        }
        .nav-btn-text-short {
          display: none;
        }

        @media (max-width: 768px) {
          :global(.desktop-only) {
            display: none !important;
          }
          :global(.mobile-toggle) {
            display: flex !important;
          }
          .nav-dock-pill {
            padding: 6px 8px 6px 14px;
            gap: 12px;
          }
        }

        @media (max-width: 440px) {
          .nav-dock-pill {
            padding: 6px 8px 6px 12px;
            gap: 8px;
          }
          .nav-logo-box {
            width: 96px;
            height: 25px;
          }
          .nav-cta-btn {
            padding: 7px 12px;
            gap: 5px;
            font-size: 0.78rem;
          }
        }

        @media (max-width: 350px) {
          .nav-btn-text-full {
            display: none;
          }
          .nav-btn-text-short {
            display: inline;
          }
        }
      `}</style>
    </>
  );
}
