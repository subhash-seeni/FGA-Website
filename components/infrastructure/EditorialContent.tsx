"use client";

import React, { forwardRef } from "react";
import { Shield, MapPin } from "lucide-react";

export interface EditorialContentProps {
  eyebrowRef?: React.RefObject<HTMLDivElement | null>;
  headlineRef?: React.RefObject<HTMLHeadingElement | null>;
  descRef?: React.RefObject<HTMLParagraphElement | null>;
  accentRef?: React.RefObject<HTMLDivElement | null>;
  locationRef?: React.RefObject<HTMLDivElement | null>;
}

export const EditorialContent = forwardRef<HTMLDivElement, EditorialContentProps>(
  function EditorialContent(
    { eyebrowRef, headlineRef, descRef, accentRef, locationRef },
    ref
  ) {
    return (
      <div ref={ref} className="infra-editorial-content">
        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          className="infra-eyebrow"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "9px",
            fontFamily: "var(--font-mono)",
            fontSize: "0.76rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            color: "var(--color-copper)",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "24px",
              height: "24px",
              borderRadius: "6px",
              backgroundColor: "rgba(245, 130, 32, 0.12)",
              border: "1px solid rgba(245, 130, 32, 0.28)",
            }}
          >
            <Shield size={13} style={{ color: "var(--color-copper)" }} />
          </div>
          <span>INSTITUTIONAL INFRASTRUCTURE</span>
        </div>

        {/* Main Headline */}
        <h2
          ref={headlineRef}
          className="infra-headline font-display"
          style={{
            fontSize: "clamp(2.4rem, 4.2vw, 3.8rem)",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.035em",
            color: "#FFFFFF",
            marginBottom: "24px",
          }}
        >
          Built on a trusted
          <br />
          <span style={{ color: "var(--color-copper)" }}>financial ecosystem.</span>
        </h2>

        {/* Supporting Editorial Paragraph */}
        <p
          ref={descRef}
          className="infra-description"
          style={{
            fontSize: "clamp(1rem, 1.25vw, 1.125rem)",
            color: "rgba(255, 255, 255, 0.65)",
            lineHeight: 1.65,
            maxWidth: "500px",
            marginBottom: "0",
            fontFamily: "var(--font-sans)",
            fontWeight: 400,
          }}
        >
          Structured across premier corporate credit lines, authenticated via Government
          of India DigiLocker e-KYC, and governed by national statutory frameworks.
        </p>

        {/* Short Orange Horizontal Accent Line */}
        <div
          ref={accentRef}
          className="infra-accent-line"
          style={{
            width: "52px",
            height: "2px",
            backgroundColor: "var(--color-copper)",
            borderRadius: "2px",
            margin: "28px 0 24px 0",
            boxShadow: "0 0 12px rgba(245, 130, 32, 0.4)",
          }}
        />

        {/* Location Indicator */}
        <div
          ref={locationRef}
          className="infra-location"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "var(--font-mono)",
            fontSize: "0.78rem",
            color: "rgba(255, 255, 255, 0.45)",
            letterSpacing: "0.06em",
          }}
        >
          <MapPin size={14} style={{ color: "var(--color-copper)", flexShrink: 0 }} />
          <span>Ahmedabad Headquarters · Pan-India Delivery</span>
        </div>
      </div>
    );
  }
);

export default EditorialContent;

