"use client";

import React from "react";

export interface PartnerBrand {
  id: string;
  name: string;
  role: string;
  category: "banking" | "regulatory";
  logo: React.ReactNode;
}

export function AxisBankLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="165"
      height="34"
      viewBox="0 0 165 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Axis Bank official logo"
      {...props}
      style={{
        width: "100%",
        height: "auto",
        maxHeight: "30px",
        maxWidth: "145px",
        display: "block",
        ...props.style,
      }}
    >
      {/* Axis Bank Burgundy Chevron in Firstgen Copper */}
      <path d="M21 3L4 31H15L23.5 16.5L21 3Z" fill="#F58220" />
      <path d="M25.5 9L16 26H23.5L30 14.5L25.5 9Z" fill="#FFFFFF" fillOpacity="0.95" />
      {/* Wordmark AXIS BANK */}
      <text
        x="38"
        y="23"
        fill="#FFFFFF"
        fontSize="15"
        fontWeight="800"
        fontFamily="var(--font-sans)"
        letterSpacing="0.05em"
      >
        AXIS BANK
      </text>
    </svg>
  );
}

export function HdfcBankLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="165"
      height="34"
      viewBox="0 0 165 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="HDFC Bank official logo"
      {...props}
      style={{
        width: "100%",
        height: "auto",
        maxHeight: "30px",
        maxWidth: "145px",
        display: "block",
        ...props.style,
      }}
    >
      {/* HDFC Bank Interlocking Grid Symbol */}
      <rect x="3" y="3" width="9" height="9" fill="#F58220" rx="1.5" />
      <rect x="19" y="3" width="9" height="9" fill="#F58220" rx="1.5" />
      <rect x="3" y="19" width="9" height="9" fill="#F58220" rx="1.5" />
      <rect x="19" y="19" width="9" height="9" fill="#F58220" rx="1.5" />
      <rect x="9.5" y="9.5" width="12" height="12" fill="#FFFFFF" rx="1.5" />
      {/* Wordmark HDFC BANK */}
      <text
        x="38"
        y="23"
        fill="#FFFFFF"
        fontSize="15"
        fontWeight="800"
        fontFamily="var(--font-sans)"
        letterSpacing="0.05em"
      >
        HDFC BANK
      </text>
    </svg>
  );
}

export function TataCapitalLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="170"
      height="34"
      viewBox="0 0 170 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Tata Capital official logo"
      {...props}
      style={{
        width: "100%",
        height: "auto",
        maxHeight: "32px",
        maxWidth: "155px",
        display: "block",
        ...props.style,
      }}
    >
      {/* Tata Iconic Oval 'T' Swirl */}
      <ellipse cx="15" cy="17" rx="13" ry="11.5" stroke="#F58220" strokeWidth="2" fill="none" />
      <path d="M8 21C9 14.5 12 11.5 15 11.5" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M22 21C21 14.5 18 11.5 15 11.5" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M15 11.5V22.5" stroke="#F58220" strokeWidth="2.2" strokeLinecap="round" />
      {/* Wordmark TATA CAPITAL */}
      <text
        x="36"
        y="22.5"
        fill="#FFFFFF"
        fontSize="14"
        fontWeight="800"
        fontFamily="var(--font-sans)"
        letterSpacing="0.07em"
      >
        TATA CAPITAL
      </text>
    </svg>
  );
}

export function CibilLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="175"
      height="34"
      viewBox="0 0 175 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="TransUnion CIBIL official logo"
      {...props}
      style={{
        width: "100%",
        height: "auto",
        maxHeight: "28px",
        maxWidth: "135px",
        display: "block",
        ...props.style,
      }}
    >
      {/* TransUnion Radiant Circle Mark */}
      <circle cx="15" cy="17" r="11" stroke="#F58220" strokeWidth="1.8" strokeDasharray="4 2" />
      <circle cx="15" cy="17" r="5.5" fill="#FFFFFF" fillOpacity="0.9" />
      <path d="M15 5V2" stroke="#F58220" strokeWidth="2" strokeLinecap="round" />
      <path d="M15 32V29" stroke="#F58220" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 17H1" stroke="#F58220" strokeWidth="2" strokeLinecap="round" />
      <path d="M29 17H26" stroke="#F58220" strokeWidth="2" strokeLinecap="round" />
      {/* Wordmark TransUnion CIBIL */}
      <text
        x="34"
        y="13"
        fill="rgba(255, 255, 255, 0.7)"
        fontSize="9"
        fontWeight="600"
        fontFamily="var(--font-sans)"
        letterSpacing="0.06em"
      >
        TransUnion
      </text>
      <text
        x="34"
        y="27"
        fill="#FFFFFF"
        fontSize="14.5"
        fontWeight="800"
        fontFamily="var(--font-sans)"
        letterSpacing="0.06em"
      >
        CIBIL
      </text>
    </svg>
  );
}

export function DigiLockerLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="165"
      height="34"
      viewBox="0 0 165 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="DigiLocker official logo"
      {...props}
      style={{
        width: "100%",
        height: "auto",
        maxHeight: "28px",
        maxWidth: "135px",
        display: "block",
        ...props.style,
      }}
    >
      {/* DigiLocker Cloud & Keyhole Symbol */}
      <path
        d="M6 22H22C24.5 22 26.5 19.8 26.5 17.2C26.5 14.8 24.7 12.8 22.3 12.5C21.8 9.4 19.1 7 16 7C13.6 7 11.5 8.3 10.3 10.3C7.5 10.7 5.5 13.1 5.5 16C5.5 19.3 7.8 22 6 22Z"
        fill="rgba(245, 130, 32, 0.22)"
        stroke="#F58220"
        strokeWidth="1.8"
      />
      <circle cx="16" cy="15" r="2" fill="#FFFFFF" />
      <path d="M15 16H17L17.5 19H14.5L15 16Z" fill="#FFFFFF" />
      {/* Wordmark DigiLocker */}
      <text
        x="34"
        y="23"
        fill="rgba(255, 255, 255, 0.85)"
        fontSize="14.5"
        fontWeight="600"
        fontFamily="var(--font-sans)"
      >
        Digi<tspan fill="#FFFFFF" fontWeight="800">Locker</tspan>
      </text>
    </svg>
  );
}

export function EnachLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="155"
      height="34"
      viewBox="0 0 155 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="eNACH NPCI official logo"
      {...props}
      style={{
        width: "100%",
        height: "auto",
        maxHeight: "28px",
        maxWidth: "130px",
        display: "block",
        ...props.style,
      }}
    >
      {/* eNACH Recurring Mandate Cycle */}
      <path
        d="M15 4C9 4 4 9 4 15C4 18 5.2 20.7 7.2 22.7L4 26H12V18L9.2 20.8C7.7 19.3 6.8 17.3 6.8 15C6.8 10.5 10.5 6.8 15 6.8C18 6.8 20.6 8.4 22 10.8L24.3 9.2C22.3 6 18.9 4 15 4Z"
        fill="#F58220"
      />
      <path
        d="M15 26C18 26 20.6 24.4 22 22L24.3 23.6C22.3 26.8 18.9 28.8 15 28.8C9 28.8 4 23.8 4 17.8H6.8C6.8 22.3 10.5 26 15 26Z"
        fill="#FFFFFF"
      />
      {/* Wordmark eNACH */}
      <text
        x="30"
        y="23"
        fill="#F58220"
        fontSize="15"
        fontWeight="700"
        fontFamily="var(--font-mono)"
      >
        e<tspan fill="#FFFFFF" fontWeight="800">NACH</tspan>
      </text>
    </svg>
  );
}

export function SarfaesiLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="165"
      height="34"
      viewBox="0 0 165 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="SARFAESI statutory seal"
      {...props}
      style={{
        width: "100%",
        height: "auto",
        maxHeight: "28px",
        maxWidth: "135px",
        display: "block",
        ...props.style,
      }}
    >
      {/* Scales of Justice Symbol */}
      <path d="M5 11H25" stroke="#F58220" strokeWidth="2" strokeLinecap="round" />
      <path d="M15 7V25" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <path d="M11 25H19" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 11L2 18H10L7 11" stroke="#F58220" strokeWidth="1.6" fill="rgba(245, 130, 32, 0.22)" />
      <path d="M23 11L20 18H28L25 11" stroke="#F58220" strokeWidth="1.6" fill="rgba(245, 130, 32, 0.22)" />
      {/* Wordmark SARFAESI */}
      <text
        x="34"
        y="22"
        fill="#FFFFFF"
        fontSize="13.5"
        fontWeight="800"
        fontFamily="var(--font-mono)"
        letterSpacing="0.09em"
      >
        SARFAESI
      </text>
    </svg>
  );
}

export const bankingPartners: PartnerBrand[] = [
  {
    id: "axis-bank",
    name: "Axis Bank",
    role: "Liquidity Syndication",
    category: "banking",
    logo: <AxisBankLogo />,
  },
  {
    id: "hdfc-bank",
    name: "HDFC Bank",
    role: "Escrow Banking",
    category: "banking",
    logo: <HdfcBankLogo />,
  },
  {
    id: "tata-capital",
    name: "Tata Capital",
    role: "Institutional Line",
    category: "banking",
    logo: <TataCapitalLogo />,
  },
];

export const regulatoryPartners: PartnerBrand[] = [
  {
    id: "cibil-commercial",
    name: "CIBIL Commercial",
    role: "Real-time Underwriting",
    category: "regulatory",
    logo: <CibilLogo />,
  },
  {
    id: "digilocker",
    name: "DigiLocker",
    role: "Instant e-KYC",
    category: "regulatory",
    logo: <DigiLockerLogo />,
  },
  {
    id: "enach",
    name: "eNACH",
    role: "Automated Repayment",
    category: "regulatory",
    logo: <EnachLogo />,
  },
  {
    id: "sarfaesi",
    name: "SARFAESI",
    role: "Statutory Recourse",
    category: "regulatory",
    logo: <SarfaesiLogo />,
  },
];

export const partnerBrands: PartnerBrand[] = [...bankingPartners, ...regulatoryPartners];
