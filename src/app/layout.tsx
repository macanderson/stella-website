import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { SITE } from "@/lib/site";
import "./globals.css";

const TITLE = "Stella — a coding agent that keeps receipts";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: TITLE, template: "%s — Stella" },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "Stella",
    "terminal coding agent",
    "Rust",
    "deterministic verification",
    "agent governance",
    "audit evidence",
    "Context Graph Protocol",
    "BYOK",
    "AGPL-3.0-only",
    "developer tools",
  ],
  authors: [{ name: "Oxagen, Inc." }],
  creator: "Oxagen, Inc.",
  publisher: "Oxagen, Inc.",
  manifest: "/manifest.webmanifest",
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-180.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    url: SITE.url,
    title: TITLE,
    description: SITE.description,
    siteName: SITE.name,
    locale: "en_US",
    images: [
      {
        url: "/og-dark.png",
        width: 1200,
        height: 630,
        alt: "Stella — a terminal coding agent written in Rust",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SITE.description,
    images: ["/og-dark.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05070C",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE.name,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "macOS, Linux",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: SITE.description,
    softwareVersion: SITE.version,
    license: "https://www.gnu.org/licenses/agpl-3.0.en.html",
    url: SITE.url,
    author: { "@type": "Organization", name: "Oxagen, Inc." },
  };

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
