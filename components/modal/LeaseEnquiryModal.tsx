"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2, ArrowRight, ShieldCheck, Car, HardHat, Cpu, Sparkles } from "lucide-react";

interface LeaseEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
}

export default function LeaseEnquiryModal({
  isOpen,
  onClose,
  initialCategory = "luxury-fleet",
}: LeaseEnquiryModalProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [assetRequirement, setAssetRequirement] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [prevInitialCategory, setPrevInitialCategory] = useState(initialCategory);
  if (initialCategory !== prevInitialCategory) {
    setPrevInitialCategory(initialCategory);
    setSelectedCategory(initialCategory);
  }

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setCompanyName("");
    setContactName("");
    setContactEmail("");
    setPhone("");
    setAssetRequirement("");
    onClose();
  };

  const categories = [
    { id: "luxury-fleet", label: "Luxury Fleet", icon: Car },
    { id: "construction-warehouse", label: "Construction", icon: HardHat },
    { id: "it-hardware", label: "IT Hardware", icon: Cpu },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 250,
        backgroundColor: "rgba(4, 5, 8, 0.82)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        animation: "modalBackdropFade 0.25s ease-out forwards",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#0d0f14",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: "28px",
          width: "100%",
          maxWidth: "620px",
          padding: "clamp(32px, 5vw, 44px)",
          position: "relative",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 32px 80px -16px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
          color: "#ffffff",
          animation: "modalContentZoom 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Copper Lighting Glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "360px",
            height: "180px",
            background: "radial-gradient(ellipse at 50% 0%, rgba(245, 130, 32, 0.25) 0%, rgba(13, 15, 20, 0) 70%)",
            pointerEvents: "none",
            borderRadius: "28px 28px 0 0",
          }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "22px",
            right: "22px",
            background: "rgba(255, 255, 255, 0.06)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "50%",
            color: "rgba(255, 255, 255, 0.7)",
            cursor: "pointer",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.14)";
            e.currentTarget.style.color = "#ffffff";
            e.currentTarget.style.transform = "rotate(90deg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.06)";
            e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
            e.currentTarget.style.transform = "rotate(0deg)";
          }}
          aria-label="Close modal dialog"
        >
          <X size={17} />
        </button>

        {!submitted ? (
          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Top Pill Meta */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "4px 12px",
                borderRadius: "9999px",
                backgroundColor: "rgba(245, 130, 32, 0.12)",
                border: "1px solid rgba(245, 130, 32, 0.3)",
                color: "var(--color-copper)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              <Sparkles size={12} />
              <span>Commercial Lease Proposal</span>
            </div>

            <h3
              id="modal-title"
              className="font-display"
              style={{
                fontSize: "clamp(1.75rem, 3.2vw, 2.25rem)",
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                marginBottom: "10px",
              }}
            >
              Structure Your Operating Lease
            </h3>

            <p
              style={{
                fontSize: "0.92rem",
                color: "rgba(255, 255, 255, 0.65)",
                marginBottom: "26px",
                lineHeight: 1.55,
              }}
            >
              Zero down payment required. Commercial lease proposals delivered within 4 working
              hours under strict non-disclosure terms.
            </p>

            <form onSubmit={handleSubmit}>
              {/* Asset Category Selection */}
              <div style={{ marginBottom: "22px" }}>
                <label
                  style={{
                    display: "block",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(255, 255, 255, 0.6)",
                    marginBottom: "10px",
                    fontWeight: 700,
                  }}
                >
                  Selected Asset Division
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                  {categories.map((cat) => {
                    const isSelected =
                      selectedCategory === cat.id ||
                      (cat.id === "construction-warehouse" && selectedCategory === "construction");
                    const IconComponent = cat.icon;

                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        style={{
                          padding: "12px 10px",
                          borderRadius: "14px",
                          border: isSelected
                            ? "1px solid var(--color-copper)"
                            : "1px solid rgba(255, 255, 255, 0.1)",
                          backgroundColor: isSelected
                            ? "rgba(245, 130, 32, 0.16)"
                            : "rgba(255, 255, 255, 0.03)",
                          color: isSelected ? "#ffffff" : "rgba(255, 255, 255, 0.7)",
                          fontSize: "0.82rem",
                          fontWeight: isSelected ? 700 : 500,
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "6px",
                          boxShadow: isSelected ? "0 0 16px rgba(245, 130, 32, 0.25)" : "none",
                        }}
                      >
                        <IconComponent
                          size={18}
                          style={{
                            color: isSelected ? "var(--color-copper)" : "rgba(255, 255, 255, 0.45)",
                          }}
                        />
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Input Rows */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "14px",
                  marginBottom: "14px",
                }}
                className="modal-form-grid"
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "rgba(255, 255, 255, 0.6)",
                      marginBottom: "6px",
                      fontWeight: 600,
                    }}
                  >
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Adani / Larsen & Toubro"
                    className="modal-dark-input"
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "rgba(255, 255, 255, 0.6)",
                      marginBottom: "6px",
                      fontWeight: 600,
                    }}
                  >
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Full name"
                    className="modal-dark-input"
                  />
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "14px",
                  marginBottom: "14px",
                }}
                className="modal-form-grid"
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "rgba(255, 255, 255, 0.6)",
                      marginBottom: "6px",
                      fontWeight: 600,
                    }}
                  >
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="name@enterprise.com"
                    className="modal-dark-input"
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "rgba(255, 255, 255, 0.6)",
                      marginBottom: "6px",
                      fontWeight: 600,
                    }}
                  >
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="modal-dark-input"
                  />
                </div>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label
                  style={{
                    display: "block",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(255, 255, 255, 0.6)",
                    marginBottom: "6px",
                    fontWeight: 600,
                  }}
                >
                  Asset Requirement & Quantity (Optional)
                </label>
                <textarea
                  rows={3}
                  value={assetRequirement}
                  onChange={(e) => setAssetRequirement(e.target.value)}
                  placeholder="e.g. 2x Mercedes S-Class (36 mo) or 10x Dell PowerEdge R750"
                  className="modal-dark-input"
                  style={{ resize: "vertical" }}
                />
              </div>

              {/* Electric Copper Submit Button */}
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "16px 28px",
                  backgroundColor: "var(--color-copper)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "9999px",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  fontSize: "0.92rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  boxShadow:
                    "0 0 28px rgba(245, 130, 32, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                  transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--color-copper-hover)";
                  e.currentTarget.style.transform = "scale(1.01)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--color-copper)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
                id="modal-submit-cta"
              >
                <span>Request Proposal within 4 Hours</span>
                <ArrowRight size={16} />
              </button>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  marginTop: "16px",
                  fontSize: "0.75rem",
                  color: "rgba(255, 255, 255, 0.45)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                <ShieldCheck size={14} style={{ color: "var(--color-copper)" }} />
                <span>Confidential · Governed by Indian Commercial Law</span>
              </div>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "28px 0", position: "relative", zIndex: 1 }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                backgroundColor: "rgba(245, 130, 32, 0.16)",
                border: "1px solid rgba(245, 130, 32, 0.35)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
                boxShadow: "0 0 24px rgba(245, 130, 32, 0.3)",
              }}
            >
              <CheckCircle2 size={28} style={{ color: "var(--color-copper)" }} />
            </div>

            <h3
              className="font-display"
              style={{
                fontSize: "1.85rem",
                fontWeight: 800,
                color: "#ffffff",
                marginBottom: "12px",
                letterSpacing: "-0.02em",
              }}
            >
              Lease Enquiry Registered
            </h3>

            <p
              style={{
                fontSize: "0.95rem",
                color: "rgba(255, 255, 255, 0.65)",
                maxWidth: "440px",
                margin: "0 auto 28px auto",
                lineHeight: 1.6,
              }}
            >
              Thank you, <strong style={{ color: "#ffffff" }}>{contactName || "Client"}</strong>. Your
              enquiry for{" "}
              <strong style={{ color: "#ffffff" }}>{companyName || "your enterprise"}</strong> has
              been logged with our Ahmedabad corporate desk. A structured lease proposal will be
              dispatched to{" "}
              <strong style={{ color: "var(--color-copper)" }}>
                {contactEmail || "your email"}
              </strong>{" "}
              within 4 working hours.
            </p>

            <button
              onClick={handleReset}
              style={{
                padding: "14px 32px",
                backgroundColor: "var(--color-copper)",
                color: "#ffffff",
                border: "none",
                borderRadius: "9999px",
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                fontSize: "0.88rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                cursor: "pointer",
                boxShadow: "0 0 24px rgba(245, 130, 32, 0.35)",
              }}
            >
              Return to Website
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes modalBackdropFade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes modalContentZoom {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        :global(.modal-dark-input) {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          font-size: 0.88rem;
          background-color: rgba(255, 255, 255, 0.04);
          color: #ffffff;
          outline: none;
          transition: all 0.2s ease;
          box-sizing: border-box;
          font-family: inherit;
        }
        :global(.modal-dark-input::placeholder) {
          color: rgba(255, 255, 255, 0.3);
        }
        :global(.modal-dark-input:focus) {
          border-color: var(--color-copper);
          background-color: rgba(255, 255, 255, 0.07);
          box-shadow: 0 0 0 3px rgba(245, 130, 32, 0.2);
        }
        @media (max-width: 600px) {
          :global(.modal-form-grid) {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}
