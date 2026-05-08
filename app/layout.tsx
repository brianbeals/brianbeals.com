import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://brianbeals.com"),
  title: {
    default: "Brian Beals - Enterprise Technology Leader",
    template: "%s — Brian Beals",
  },
  description:
    "Brian Beals - Enterprise Technology Leader. 30 years across data, analytics, automation, and AI. I help enterprise organizations turn technology investments into real business results.",
  openGraph: {
    title: "Brian Beals - Enterprise Technology Leader",
    description:
      "Enterprise technology leader with 30 years across data, analytics, automation, and AI. I help organizations turn technology investments into real business results.",
    url: "https://brianbeals.com",
    siteName: "Brian Beals",
    images: ["/opengraph-image"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brian Beals - Enterprise Technology Leader",
    description:
      "Enterprise technology leader with 30 years across data, analytics, automation, and AI. I help organizations turn technology investments into real business results.",
    images: ["/opengraph-image"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Brian Beals",
  jobTitle: "Enterprise Technology Leader",
  description:
    "Enterprise technology leader with 30 years across data, analytics, automation, and AI. I help organizations turn technology investments into real business results.",
  url: "https://brianbeals.com",
  image: "https://brianbeals.com/opengraph-image",
  sameAs: [
    "https://www.linkedin.com/in/brianbeals/",
    "https://github.com/bbeals42",
    "https://bbeals.substack.com",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className="min-h-screen flex flex-col antialiased text-neutral-900"
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          background:
            "radial-gradient(at 25% 20%, rgba(46,134,193,0.12) 0, transparent 50%), radial-gradient(at 75% 80%, rgba(30,58,95,0.10) 0, transparent 50%), #F4F6F9",
        }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <header className="px-6 sm:px-12 pt-8 pb-2">
          <nav className="max-w-2xl mx-auto flex items-center justify-between text-sm">
            <Link href="/" className="font-semibold tracking-tight text-base">
              Brian Beals
            </Link>
            <div className="flex gap-6">
              <Link href="/about" className="hover:underline underline-offset-4">
                About
              </Link>
              <Link href="/contact" className="hover:underline underline-offset-4">
                Contact
              </Link>
            </div>
          </nav>
        </header>
        <main className="flex-1 flex flex-col">{children}</main>
        <footer className="px-6 sm:px-12 py-6 text-xs text-neutral-500">
          <div className="max-w-2xl mx-auto">© Brian Beals</div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
