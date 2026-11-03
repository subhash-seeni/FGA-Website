"use client";

import React, { forwardRef } from "react";
import {
  CibilLogo,
  DigiLockerLogo,
  EnachLogo,
  SarfaesiLogo,
} from "@/components/monolith/PartnerLogos";

export interface CompliancePanelProps {
  className?: string;
  style?: React.CSSProperties;
}

export const CompliancePanel = forwardRef<HTMLDivElement, CompliancePanelProps>(
  function CompliancePanel({ className = "", style = {} }, ref) {
    const complianceItems = [
      {
        id: "cibil",
        logo: <CibilLogo className="infra-logo" />,
        title: "TransUnion CIBIL",
        description: "Real-time underwriting",
      },
      {
        id: "digilocker",
        logo: <DigiLockerLogo className="infra-logo" />,
        title: "DigiLocker",
        description: "Instant e-KYC",
      },
      {
        id: "enach",
        logo: <EnachLogo className="infra-logo" />,
        title: "eNACH",
        description: "Automated repayment",
      },
      {
        id: "sarfaesi",
        logo: <SarfaesiLogo className="infra-logo" />,
        title: "SARFAESI",
        description: "Statutory recourse",
      },
    ];

    return (
      <div
        ref={ref}
        className={`infra-panel infra-panel-compliance ${className}`}
        style={{
          position: "relative",
          backgroundColor: "rgba(16, 18, 24, 0.72)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "16px",
          padding: "clamp(20px, 2.4vw, 28px) clamp(20px, 2.8vw, 32px)",
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
            marginBottom: "20px",
          }}
        >
          <span style={{ color: "var(--color-copper)" }}>03 /</span>
          <span style={{ color: "rgba(255, 255, 255, 0.88)" }}>
            VERIFICATION & STATUTORY FRAMEWORKS
          </span>
        </div>

        {/* Four Statutory Items in Horizontal Row with Thin Dividers */}
        <div className="infra-compliance-grid">
          {complianceItems.map((item) => (
            <div key={item.id} className="infra-compliance-item">
              <div className="infra-logo-wrapper" title={item.title}>
                {item.logo}
              </div>
              <div
                className="infra-compliance-desc"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(0.62rem, 0.72vw, 0.7rem)",
                  color: "rgba(255, 255, 255, 0.5)",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  marginTop: "8px",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default CompliancePanel;

