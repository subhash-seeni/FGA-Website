"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { footerData } from "@/lib/data/homepageContent";
import { assetPath } from "@/lib/utils/basePath";

export default function EditorialFooter() {
  return (
    <footer
      style={{
        backgroundColor: "var(--color-obsidian-ground)",
        borderTop: "1px solid var(--color-hairline-dark)",
        paddingTop: "80px",
        paddingBottom: "48px",
        position: "relative",
        color: "#ffffff",
      }}
      id="corporate-footer"
    >
      <div className="editorial-container">
        {/* Main 4-Column Ledger */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
            gap: "56px",
            paddingBottom: "64px",
            borderBottom: "1px solid var(--color-obsidian-border)",
          }}
          className="footer-grid-container"
        >
          {/* Column 1: Brand & Headquarters Identity */}
          <div>
            <div style={{ position: "relative", width: "142px", height: "42px", marginBottom: "16px", filter: "brightness(0) invert(1)" }}>
              <Image
                src={assetPath("/firstgen-logo-transparent.png")}
                alt="Firstgen Assets Private Limited Corporate Identity"
                fill
                sizes="142px"
                style={{ objectFit: "contain", objectPosition: "left center" }}
              />
            </div>

            <div
              style={{
                fontFamily: "var(--font-mono-system)",
                fontSize: "0.68rem",
                letterSpacing: "0.22em",
                color: "var(--color-brand-orange)",
                fontWeight: 700,
                marginBottom: "16px",
              }}
            >
              {footerData.tagline}
            </div>

            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--color-obsidian-muted)",
                lineHeight: 1.65,
                maxWidth: "320px",
                marginBottom: "24px",
              }}
            >
              {footerData.descriptor}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <a
                href={`mailto:${footerData.email}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "0.88rem",
                  color: "#e4e4e7",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                <Mail size={15} style={{ color: "var(--color-brand-orange)" }} />
                <span>{footerData.email}</span>
              </a>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "0.85rem",
                  color: "var(--color-obsidian-muted)",
                }}
              >
                <MapPin size={15} style={{ color: "var(--color-brand-orange)" }} />
                <span>{footerData.location}</span>
              </div>
            </div>
          </div>

          {/* Columns 2, 3, 4: Categorized Sitemap */}
          {footerData.columns.map((col) => (
            <div key={col.title}>
              <h4
                style={{
                  fontFamily: "var(--font-mono-system)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#ffffff",
                  fontWeight: 700,
                  marginBottom: "20px",
                }}
              >
                {col.title}
              </h4>

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: "0.88rem",
                        color: "var(--color-obsidian-muted)",
                        textDecoration: "none",
                        transition: "color var(--transition-fast)",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-brand-orange)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-obsidian-muted)")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Legal Copyright & Ahmedabad Jurisdiction Line */}
        <div
          style={{
            paddingTop: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            fontSize: "0.78rem",
            color: "var(--color-obsidian-muted)",
            fontFamily: "var(--font-mono-system)",
          }}
        >
          <div>{footerData.legalLine}</div>
          <div style={{ color: "var(--color-brand-orange)" }}>
            {footerData.jurisdictionLine}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          :global(.footer-grid-container) {
            grid-template-columns: 1fr 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 600px) {
          :global(.footer-grid-container) {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </footer>
  );
}
