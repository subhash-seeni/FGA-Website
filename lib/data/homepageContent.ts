export interface NavLink {
  label: string;
  href: string;
}

export interface HeroStat {
  number: string;
  label: string;
  value: string;
  detail: string;
}

export interface CategoryCardData {
  id: string;
  num: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  startingRate: string;
  typicalTenure: string;
  assets: string[];
  inclusions: string[];
  image: string;
}

export interface ProcessStep {
  number: string;
  timeline: string;
  title: string;
  summary: string;
  detail: string;
  requirements: string[];
}

export interface ValueComparisonPoint {
  dimension: string;
  traditional: string;
  operatingLease: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export const navigationData = {
  brandName: "Firstgen Assets",
  tagline: "PRIVATE LIMITED",
  subdescriptor: "Operating Lease Platform · Ahmedabad",
  links: [
    { label: "Overview", href: "#hero" },
    { label: "Why Lease", href: "#business-value" },
    { label: "Asset Portfolio", href: "#asset-portfolio" },
    { label: "Leasing Model", href: "#leasing-model" },
    { label: "The Journey", href: "#leasing-journey" },
    { label: "Institutional Trust", href: "#institutional-trust" },
  ] as NavLink[],
  primaryCta: {
    label: "Begin Lease",
    href: "#enquiry",
  },
};

export const heroData = {
  locationTag: "AHMEDABAD · GUJARAT · INDIA",
  subTag: "OPERATING LEASE PLATFORM",
  headlineLine1: "Assets That Work.",
  headlineLine2: "Capital That Stays.",
  bodyCopy:
    "Operating leases for luxury fleets, heavy construction equipment, and enterprise IT, delivered within 48 hours. Zero down payment. Paperless digital onboarding.",
  primaryCta: {
    label: "Apply for a Lease",
    href: "#enquiry",
  },
  secondaryCta: {
    label: "Explore Portfolio",
    href: "#asset-portfolio",
  },
  stats: [
    {
      number: "01",
      label: "Asset Classes",
      value: "6+ Categories",
      detail: "Fleet, machinery & enterprise compute",
    },
    {
      number: "02",
      label: "Delivery SLA",
      value: "48 Hours",
      detail: "From digital signature to site handover",
    },
    {
      number: "03",
      label: "Down Payment",
      value: "₹0 Required",
      detail: "100% equipment financing",
    },
    {
      number: "04",
      label: "Onboarding",
      value: "100% Paperless",
      detail: "Aadhaar eSign & automated eNACH",
    },
  ] as HeroStat[],
  liveTicker: [
    // Luxury Fleet
    "Rolls-Royce Ghost",
    "Mercedes-Benz S-Class",
    "BMW 7 Series",
    "Jaguar XJ",
    "Lexus LS",
    "Audi A8 L",
    "Range Rover Vogue",
    "Porsche Cayenne",
    // Construction & Warehouse
    "JCB 3CX Backhoe Loader",
    "Tower Crane 40 Tonne",
    "Putzmeister Concrete Pump",
    "Forklift 5 Tonne",
    "DG Set 250 KVA",
    "Compressor 500 CFM",
    "Pallet Truck Fleet",
    "Reach Stacker",
    // IT Hardware
    "Dell PowerEdge R750 Server",
    "MacBook Pro M4 Fleet",
    "Cisco Catalyst 9200",
    "HP EliteBook Fleet",
    "Lenovo ThinkStation",
    "NetApp AFF A250 Storage Array",
    "Polycom Video Suite",
    "APC UPS 40 KVA",
  ],
};

export const businessValueData = {
  sectionNum: "02 / CAPITAL EFFICIENCY",
  title: "The Case for the Operating Lease",
  subtitle:
    "Convert heavy capital expenditures into fixed, predictable operational expenses.",
  thesis:
    "Firstgen Assets structures operating leases that convert capital expenditure to a predictable monthly cost, freeing Indian enterprises to deploy capital where it earns the highest return.",
  founderQuote: {
    quote:
      "True wealth is measured not by what you possess, but by what you enable. Firstgen Assets exists to place the right asset in the right hands at the right time.",
    author: "Kartik",
    title: "Founder, Firstgen Assets",
    location: "Ahmedabad, Gujarat",
  },
  comparisonLedger: [
    {
      dimension: "Capital Outlay",
      traditional: "20-30% heavy down payment + full asset purchase cost upfront",
      operatingLease: "₹0 down payment; preserve working capital for core growth",
    },
    {
      dimension: "Balance Sheet Impact",
      traditional: "Heavy capital asset on books; burdened with long-term depreciation",
      operatingLease: "Off-balance sheet operating expense; enhances liquidity ratios",
    },
    {
      dimension: "Deployment Speed",
      traditional: "3-6 weeks of banking loan underwriting and collateral pledge",
      operatingLease: "48 hours from digital Aadhaar eSign to asset delivery",
    },
  ] as ValueComparisonPoint[],
};

export const categoryCardsData: CategoryCardData[] = [
  {
    id: "luxury-fleet",
    num: "CATEGORY 01",
    badge: "EXECUTIVE & PREMIUM VEHICLES",
    title: "Luxury Fleet",
    subtitle: "EXECUTIVE & CORPORATE MOBILITY",
    description:
      "Structured operating leases for India's most prestigious automobiles, enabling corporate houses and HNIs to access premier fleets without capital lock-in.",
    startingRate: "From ₹4,20,000 / mo",
    typicalTenure: "24-36 Months",
    assets: [
      "Rolls-Royce Ghost",
      "Mercedes-Benz S-Class",
      "BMW 7 Series",
      "Range Rover Vogue",
    ],
    inclusions: [
      "Comprehensive insurance cover included",
      "Zero-maintenance lease structure",
      "24/7 dedicated roadside concierge",
    ],
    image: "/images/luxury-fleet.jpg",
  },
  {
    id: "construction-warehouse",
    num: "CATEGORY 02",
    badge: "HEAVY MACHINERY & LOGISTICS",
    title: "Construction & Warehouse",
    subtitle: "INDUSTRIAL & INFRASTRUCTURE ASSETS",
    description:
      "Financing heavy earthmoving machinery, lifting equipment, and warehouse logistics for contractors, port operators, and industrial enterprises across India.",
    startingRate: "From ₹68,000 / mo",
    typicalTenure: "18-36 Months",
    assets: [
      "JCB 3CX Backhoe Loader",
      "Tower Crane 40 Tonne",
      "Putzmeister Concrete Pump",
      "Heavy Forklift 5 Tonne",
    ],
    inclusions: [
      "Site delivery across Gujarat & major corridors",
      "OEM authorised service network maintenance",
      "BOCW Act compliant configuration",
    ],
    image: "/images/construction-warehouse.jpg",
  },
  {
    id: "it-hardware",
    num: "CATEGORY 03",
    badge: "ENTERPRISE TECHNOLOGY ASSETS",
    title: "IT Hardware",
    subtitle: "COMPUTE, CLOUD & WORKSTATION FLEET",
    description:
      "Structuring compute and workstation fleet leases for enterprises and fintechs to enable continuous technology refresh without balance-sheet depreciation.",
    startingRate: "From ₹38,000 / mo",
    typicalTenure: "24-36 Months",
    assets: [
      "Dell PowerEdge R750 Server",
      "MacBook Pro M4 Fleet",
      "Cisco Catalyst 9200 Switches",
      "NetApp AFF A250 Storage",
    ],
    inclusions: [
      "3-Year OEM ProSupport / AppleCare+ included",
      "Certified data sanitization & wipe on return",
      "Hardware replacement on fault within 48 hours",
    ],
    image: "/images/it-hardware.jpg",
  },
];

export interface InterstitialMetric {
  value: string;
  label: string;
  sub: string;
}

export const leasingMechanicsData = {
  sectionNum: "04 / OPERATING METRICS",
  title: "The Mechanics of the Operating Lease",
  subtitle: "Structured under Indian commercial law with zero capital lock-in.",
  metrics: [
    {
      value: "₹0",
      label: "Down Payment Required",
      sub: "100% equipment financing without capital lock-in",
    },
    {
      value: "48 hrs",
      label: "Lease to Delivery SLA",
      sub: "Direct mobilization to site or corporate HQ",
    },
    {
      value: "100%",
      label: "Digital Onboarding",
      sub: "Aadhaar eSign & automated eNACH mandate",
    },
    {
      value: "3 Core",
      label: "Asset Categories",
      sub: "Luxury fleet, heavy machinery & IT compute",
    },
  ] as InterstitialMetric[],
};

export const processStepsData: ProcessStep[] = [
  {
    number: "01",
    timeline: "Day 1",
    title: "Apply Online",
    summary: "Submit your requirement and business details on the portal.",
    detail:
      "Select your asset category and submit basic corporate KYC details on the portal.",
    requirements: ["GST Registration Certificate", "Company PAN & CIN", "Basic Asset Specifications"],
  },
  {
    number: "02",
    timeline: "Day 1",
    title: "AI Due Diligence",
    summary: "Our AI engine reviews your documents and credit profile in real-time.",
    detail:
      "Automated verification assesses GST filing consistency, 6-month bank cashflows, and CIBIL commercial scores.",
    requirements: ["6-Month Bank Statements (PDF)", "Last 2 Years ITR / Financials", "DigiLocker Verification"],
  },
  {
    number: "03",
    timeline: "Day 2",
    title: "Lease Proposal",
    summary: "Receive a detailed lease proposal within 4 working hours.",
    detail:
      "Transparent terms covering monthly rental, tenure options (12-36 mo), inclusions, and SLA commitments.",
    requirements: ["Board Resolution / Authorised Signatory", "Lease Schedule Approval"],
  },
  {
    number: "04",
    timeline: "Day 2-3",
    title: "eSign & eNACH",
    summary: "Sign digitally via Aadhaar eSign. Auto-debit mandate registered.",
    detail:
      "100% paperless execution. Execute legally binding lease agreements digitally with automated recurring payments.",
    requirements: ["Aadhaar-linked Mobile OTP", "Bank Account for eNACH Mandate"],
  },
  {
    number: "05",
    timeline: "Day 3-5",
    title: "Asset Delivered",
    summary: "Vehicle, machinery, or IT hardware delivered to your premises.",
    detail:
      "Delivery coordinated directly with OEM dealers to your corporate headquarters, project site, or data center.",
    requirements: ["Delivery Challan Acknowledgment", "Handover Protocol & Asset Tagging"],
  },
];

export const trustData = {
  sectionNum: "06 / INSTITUTIONAL TRUST",
  title: "Substantiated Institutional Partnerships",
  subtitle:
    "Operating within India's recognized banking, credit reporting, and statutory regulatory ecosystems.",
  badges: [
    "Axis Bank Approved",
    "HDFC Bank Partner",
    "Tata Capital Empanelled",
    "CIBIL Integrated",
    "DigiLocker KYC",
    "eNACH Enabled",
    "GST & IND AS Compliant",
    "SARFAESI Protected",
  ],
  tickerItems: [
    "Axis Bank Approved",
    "HDFC Bank Partner",
    "Tata Capital Empanelled",
    "CIBIL Integrated",
    "DigiLocker KYC",
    "eNACH Enabled",
    "GST & IND AS Compliant",
    "SARFAESI Protected",
  ],
};

export const conversionData = {
  headline: "Your Next Asset. Leased Today.",
  subtext:
    "Convert capital expenditure into predictable operational liquidity. Access executive fleets, heavy machinery, and enterprise IT with 48-hour delivery and ₹0 down payment.",
  ctaPrimary: "Structure Your Lease Proposal",
  locationStamp: "Ahmedabad Headquarters · Pan-India Delivery",
};

export const footerData = {
  brand: "Firstgen Assets",
  tagline: "PRIVATE LIMITED",
  descriptor:
    "Gujarat's premier operating lease company for luxury fleets, construction & warehouse equipment, and enterprise IT hardware.",
  email: "leasing@firstgenassets.in",
  location: "Ahmedabad, Gujarat, India",
  coverage: "Pan-India Deployment & Support",
  columns: [
    {
      title: "Asset Categories",
      links: [
        { label: "Luxury Fleet", href: "#asset-portfolio" },
        { label: "Construction & Warehouse", href: "#asset-portfolio" },
        { label: "IT Hardware", href: "#asset-portfolio" },
        { label: "Custom Asset Leases", href: "#enquiry" },
      ],
    },
    {
      title: "The Leasing Model",
      links: [
        { label: "Why Lease (CapEx vs OpEx)", href: "#business-value" },
        { label: "Operating Principles", href: "#leasing-model" },
        { label: "The 48-Hour Journey", href: "#leasing-journey" },
        { label: "AI Document Due Diligence", href: "#institutional-trust" },
      ],
    },
    {
      title: "Company & Compliance",
      links: [
        { label: "About Firstgen Assets", href: "#business-value" },
        { label: "Ahmedabad Headquarters", href: "#enquiry" },
        { label: "Statutory Governance", href: "#institutional-trust" },
        { label: "Direct Lease Enquiry", href: "#enquiry" },
      ],
    },
  ] as FooterColumn[],
  legalLine: "© 2025 Firstgen Assets Private Limited · All rights reserved · Ahmedabad, Gujarat",
  jurisdictionLine: "Governed by Indian Law · Subject to Ahmedabad Jurisdiction",
};
