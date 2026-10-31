"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigationData } from "@/lib/data/homepageContent";
import { assetPath } from "@/lib/utils/basePath";

interface EditorialNavbarProps {
  onOpenEnquiry: () => void;
}

export default function EditorialNavbar({ onOpenEnquiry }: EditorialNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Accessibility: Skip to Content Link */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          backgroundColor: "var(--color-warm-neutral)",
          borderBottom: "1px solid var(--color-hairline)",
          height: "76px",
        }}
        id="main-masthead"
      >
        <div
          className="editorial-container"
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Brand Identity: Official Logo in Native Proportions */}
          <Link
            href="#hero"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              textDecoration: "none",
              color: "inherit",
            }}
            id="editorial-brand-logo"
            aria-label="Firstgen Assets - Return to top"
          >
            <div style={{ position: "relative", width: "142px", height: "42px" }}>
              <Image
                src={assetPath("/firstgen-logo-transparent.png")}
                alt="Firstgen Assets Private Limited Official Logo"
                fill
                sizes="142px"
                style={{ objectFit: "contain", objectPosition: "left center" }}
                priority
                loading="eager"
              />
            </div>

            <div
              style={{
                borderLeft: "1px solid var(--color-hairline)",
                paddingLeft: "14px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono-system)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.22em",
                  color: "var(--color-brand-orange)",
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                {navigationData.tagline}
              </span>
              <span
                style={{
                  fontSize: "0.64rem",
                  letterSpacing: "0.06em",
                  color: "var(--color-slate)",
                  textTransform: "uppercase",
                }}
              >
                {navigationData.subdescriptor}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "28px",
            }}
            className="desktop-editorial-nav"
            aria-label="Primary Navigation"
          >
            {navigationData.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="editorial-nav-link"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action Button & Mobile Toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={onOpenEnquiry}
              className="btn-editorial-primary"
              style={{ padding: "10px 20px", fontSize: "0.85rem" }}
              id="nav-begin-lease-button"
            >
              <span>{navigationData.primaryCta.label}</span>
              <ArrowUpRight size={14} className="btn-arrow-icon" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: "none",
                backgroundColor: "var(--color-white)",
                border: "1px solid var(--color-hairline)",
                padding: "8px",
                cursor: "pointer",
                borderRadius: "var(--radius-xs)",
              }}
              className="mobile-nav-toggle"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              id="mobile-nav-hamburger"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <nav
            id="mobile-navigation-drawer"
            aria-label="Mobile Navigation Drawer"
            style={{
              backgroundColor: "var(--color-white)",
              borderBottom: "1px solid var(--color-hairline)",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {navigationData.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  color: "var(--color-ink-black)",
                  textDecoration: "none",
                  padding: "10px 0",
                  borderBottom: "1px solid var(--color-hairline)",
                }}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="btn-editorial-primary"
              style={{ width: "100%", justifyContent: "center", marginTop: "12px", padding: "14px" }}
            >
              <span>{navigationData.primaryCta.label}</span>
              <ArrowUpRight size={15} />
            </button>
          </nav>
        )}

        <style jsx>{`
          @media (max-width: 980px) {
            :global(.desktop-editorial-nav) {
              display: none !important;
            }
            :global(.mobile-nav-toggle) {
              display: flex !important;
            }
          }
        `}</style>
      </header>
    </>
  );
}
