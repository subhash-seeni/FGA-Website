"use client";

import React, { forwardRef } from "react";
import { AxisBankLogo, HdfcBankLogo } from "@/components/monolith/PartnerLogos";

export interface BankingPanelProps {
  className?: string;
  style?: React.CSSProperties;
}

export const BankingPanel = forwardRef<HTMLDivElement, BankingPanelProps>(
  function BankingPanel({ className = "", style = {} }, ref) {
    return (
      <div
        ref={ref}
        className={`infra-panel infra-panel-banking ${className}`}
        style={{
          position: "relative",
          backgroundColor: "rgba(16, 18, 24, 0.72)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "16px",
          padding: "clamp(20px, 2.4vw, 28px) clamp(22px, 3vw, 36px)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow:
            "inset 1px 0 14px -2px rgba(245, 130, 32, 0.16), 0 20px 44px -16px rgba(0, 0, 0, 0.55)",
          transition:
            "border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          ...style,
        }}
      >
        {/* Panel Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}
        >
          <span style={{ color: "var(--color-copper)" }}>01 /</span>
          <span style={{ color: "rgba(255, 255, 255, 0.88)" }}>BANKING & LIQUIDITY</span>
        </div>

        {/* Panel Body Content */}
        <div className="infra-panel-content-row">
          {/* Supporting Text on Left */}
          <div className="infra-panel-text-col">
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(0.88rem, 1.05vw, 0.96rem)",
                color: "rgba(255, 255, 255, 0.7)",
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              Tier-1 institutional banking and liquidity syndication
            </p>
          </div>

          {/* Fine Vertical Divider */}
          <div className="infra-panel-divider" aria-hidden="true" />

          {/* Two Institutional Logos on Right */}
          <div className="infra-panel-logos-col infra-logos-row">
            <div className="infra-logo-wrapper" title="Axis Bank official liquidity syndication partner">
              <AxisBankLogo className="infra-logo" />
            </div>
            <div className="infra-logo-wrapper" title="HDFC Bank escrow banking partner">
              <HdfcBankLogo className="infra-logo" />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default BankingPanel;

