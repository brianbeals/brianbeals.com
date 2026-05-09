import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://brianbeals.com"),
  title: {
    default: "Brian Beals | Enterprise Sales Leader",
    template: "%s | Brian Beals",
  },
  description:
    "Brian Beals, enterprise sales leader. Three practices built from scratch across AI, analytics, and automation. I help organizations get real results out of the technology after the pilot, when it has to pay for itself.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Brian Beals | Enterprise Sales Leader",
    description:
      "Brian Beals, enterprise sales leader. Three practices built from scratch across AI, analytics, and automation. I help organizations get real results out of the technology after the pilot, when it has to pay for itself.",
    url: "/",
    siteName: "Brian Beals",
    images: ["/opengraph-image"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brian Beals | Enterprise Sales Leader",
    description:
      "Brian Beals, enterprise sales leader. Three practices built from scratch across AI, analytics, and automation. I help organizations get real results out of the technology after the pilot, when it has to pay for itself.",
    images: ["/opengraph-image"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Brian Beals",
  jobTitle: "Enterprise Sales Leader",
  description:
    "Brian Beals, enterprise sales leader. Three practices built from scratch across AI, analytics, and automation. I help organizations get real results out of the technology after the pilot, when it has to pay for itself.",
  url: "https://brianbeals.com",
  image: "https://brianbeals.com/opengraph-image",
  sameAs: [
    "https://www.linkedin.com/in/brianbeals/",
    "https://github.com/Bbeals42",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={sourceSerif.variable}>
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
              <Link href="/elsewhere" className="hover:underline underline-offset-4">
                Elsewhere
              </Link>
              <Link href="/contact" className="hover:underline underline-offset-4">
                Contact
              </Link>
            </div>
          </nav>
        </header>
        <main className="flex-1 flex flex-col">{children}</main>
        <footer className="px-6 sm:px-12 py-6 text-xs" style={{ color: "rgba(30, 58, 95, 0.7)" }}>
          <div className="max-w-2xl mx-auto">© {new Date().getFullYear()} Brian Beals</div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
