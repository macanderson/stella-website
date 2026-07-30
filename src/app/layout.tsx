import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { SITE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Stella — Free. Configurable. Fast. Rust. And damn good.",
    template: "%s — Stella",
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "Stella",
    "coding agent",
    "terminal coding agent",
    "Rust",
    "AI agent",
    "deterministic verification",
    "open source",
    "AGPL",
    "Context Graph Protocol",
    "BYOK",
    "developer tools",
  ],
  authors: [{ name: "Oxagen" }],
  creator: "Oxagen",
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
    title: "Stella — Free. Configurable. Fast. Rust. And damn good.",
    description: SITE.description,
    siteName: SITE.name,
    images: [
      { url: "/og-dark.png", width: 1200, height: 630, alt: "Stella" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stella — the coding agent that shows you its work",
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Stella",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "macOS, Linux",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: SITE.description,
    softwareVersion: SITE.version,
    license: "https://www.gnu.org/licenses/agpl-3.0.en.html",
    url: SITE.url,
  };

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} dark`}>
      <head>
        {/* Set `.js` before first paint so scroll-reveals start hidden without
            a flash — and stay visible for no-JS / crawler requests. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
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
