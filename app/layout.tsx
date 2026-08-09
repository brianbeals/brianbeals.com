import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
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
    default: "Brian Beals | AI, Analytics & Automation",
    template: "%s | Brian Beals",
  },
  description:
    "Brian Beals has built and scaled enterprise AI and analytics practices from scratch three times. I help organizations get real results out of the technology after the pilot, when it has to pay for itself.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Brian Beals | AI, Analytics & Automation",
    description:
      "Brian Beals has built and scaled enterprise AI and analytics practices from scratch three times. I help organizations get real results out of the technology after the pilot, when it has to pay for itself.",
    url: "/",
    siteName: "Brian Beals",
    images: ["/opengraph-image"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brian Beals | AI, Analytics & Automation",
    description:
      "Brian Beals has built and scaled enterprise AI and analytics practices from scratch three times. I help organizations get real results out of the technology after the pilot, when it has to pay for itself.",
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F6F9" },
    { media: "(prefers-color-scheme: dark)", color: "#0F1822" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Brian Beals",
  jobTitle: "Director, AI, Analytics & Automation",
  description:
    "Brian Beals has built and scaled enterprise AI and analytics practices from scratch three times. I help organizations get real results out of the technology after the pilot, when it has to pay for itself.",
  url: "https://brianbeals.com",
  image: "https://brianbeals.com/opengraph-image",
  sameAs: [
    "https://www.linkedin.com/in/brianbeals/",
    "https://github.com/brianbeals",
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
        }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <header className="px-6 sm:px-12 pt-8 pb-2">
          <nav
            aria-label="Main"
            className="max-w-2xl mx-auto flex items-center justify-between text-sm"
          >
            <Link href="/" className="font-semibold tracking-tight text-base">
              Brian Beals
            </Link>
            <div className="flex gap-6">
              <Link href="/about" className="hover:underline underline-offset-4">
                About
              </Link>
              <Link href="/writing" className="hover:underline underline-offset-4">
                Writing
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
        {/* tabIndex -1 makes main a valid focus target for the skip link.
            Without it Chrome still advances the tab sequence, but Safari
            scrolls and leaves focus at the top of the nav, which makes the
            skip link do nothing on the default macOS and iOS browser. */}
        <main id="main" tabIndex={-1} className="flex-1 flex flex-col">
          {children}
        </main>
        <footer className="px-6 sm:px-12 py-6 text-xs" style={{ color: "var(--footer-ink)" }}>
          <div className="max-w-2xl mx-auto">© {new Date().getFullYear()} Brian Beals</div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
