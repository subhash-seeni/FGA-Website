import type { Metadata, Viewport } from "next";
import { assetPath } from "@/lib/utils/basePath";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#08090B",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Firstgen Assets | Operating Leases for India's Ambition",
  description:
    "Firstgen Assets structures operating leases for luxury vehicle fleets, heavy construction equipment, and enterprise IT hardware. 48-hour delivery. ₹0 down payment. Ahmedabad, India.",
  icons: {
    icon: assetPath("/firstgen-logo-transparent.png"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
