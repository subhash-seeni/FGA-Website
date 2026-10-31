"use client";

import React from "react";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { footerData, conversionData } from "@/lib/data/homepageContent";

interface EditorialConversionProps {
  onOpenEnquiry: () => void;
}

export default function EditorialConversion({ onOpenEnquiry }: EditorialConversionProps) {
  return (
    <section
      id="enquiry"
      style={{
        padding: "80px 0",
        position: "relative",
      }}
    >
      <div className="editorial-container">
        <div
          style={{
            backgroundColor: "var(--color-obsidian-surface)",
            border: "1px solid var(--color-obsidian-border)",
            borderRadius: "var(--radius-sm)",
            padding: "clamp(48px, 6vw, 72px) clamp(24px, 4vw, 56px)",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 24px 64px -16px rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* Ambient Copper Lighting Glow */}
          <div
            style={{
              position: "absolute",
              top: "-120px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "500px",
              height: "300px",
              background: "radial-gradient(circle, rgba(245, 130, 32, 0.18) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
            <h2
              style={{
                fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.035em",
                color: "#ffffff",
                marginBottom: "16px",
              }}
            >
              {conversionData.headline}
            </h2>

            <p
              style={{
                fontSize: "1.05rem",
                color: "var(--color-obsidian-muted)",
                lineHeight: 1.65,
                maxWidth: "560px",
                margin: "0 auto 36px auto",
              }}
            >
              {conversionData.subtext}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "14px",
                flexWrap: "wrap",
                marginBottom: "36px",
              }}
            >
              <button
                onClick={onOpenEnquiry}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "14px 32px",
                  backgroundColor: "var(--color-brand-orange)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(245, 130, 32, 0.35)",
                  transition: "transform 0.15s ease, background-color 0.15s ease",
                }}
                id="conversion-structure-lease-cta"
              >
                <span>{conversionData.ctaPrimary}</span>
                <ArrowRight size={16} />
              </button>

              <a
                href={`mailto:${footerData.email}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "14px 28px",
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  color: "#ffffff",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "var(--radius-sm)",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  transition: "background-color 0.15s ease",
                }}
                id="conversion-direct-email-link"
              >
                <Mail size={16} style={{ color: "var(--color-brand-orange)" }} />
                <span>{footerData.email}</span>
              </a>
            </div>

            {/* Location & Coverage Stamp */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "var(--radius-xs)",
                fontFamily: "var(--font-mono-system)",
                fontSize: "0.72rem",
                color: "var(--color-obsidian-muted)",
              }}
            >
              <MapPin size={13} style={{ color: "var(--color-brand-orange)" }} />
              <span>{conversionData.locationStamp}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
