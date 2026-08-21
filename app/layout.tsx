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

// Structured data. The goal is disambiguation: there is another Brian Beals, and
// Google has been pairing this one's name with a stranger's face.
//
// WHY @graph RATHER THAN A SINGLE Person. The Person and the LLC are separate
// entities that reference each other by @id. A flat Person block cannot express
// that, and the reciprocal founder link is part of what makes the pair coherent.
//
// Person.image points at the RAW high-resolution JPG, not /opengraph-image. That
// endpoint returns a 1200x630 social card whose headshot is a 113px inset, which
// is the wrong thing to hand Google as "this is what this person looks like."
//
// NO worksFor. Deliberate, permanent, do not add one.
const personJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://brianbeals.com/#person",
      name: "Brian Beals",
      jobTitle: "Director, AI, Analytics & Automation",
      description:
        "Brian Beals has built and scaled enterprise AI and analytics practices from scratch three times. I help organizations get real results out of the technology after the pilot, when it has to pay for itself.",
      // disambiguatingDescription exists in schema.org specifically to separate
      // entities that share a name. This is the property most directly aimed at
      // the problem, so keep it short, factual and distinctive.
      disambiguatingDescription:
        "AI, analytics and automation practice leader based in Punta Gorda, Florida. Founder of Brian Beals, LLC, a service-disabled veteran-owned small business.",
      url: "https://brianbeals.com",
      image: "https://brianbeals.com/brian-beals.jpg",
      homeLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Punta Gorda",
          addressRegion: "FL",
          addressCountry: "US",
        },
      },
      // NO reciprocal founder property here. `founder` is defined on Organization
      // only; schema.org has no Person-side inverse, and the validator flags it
      // as unrecognized on a Person. The Organization node below declares
      // founder -> #person, which establishes the relationship once, correctly,
      // and Google resolves @graph references in both directions. Caught by
      // validator.schema.org on 2026-08-20 after the first deploy.
      // Every sameAs must resolve publicly for a signed-out crawler. A URL that
      // 404s or sits behind a login is an unverifiable claim and weakens the set.
      // Checked 2026-08-20: GovTribe resolves and serves a real vendor profile.
      // DELIBERATELY ABSENT, both from the original spec:
      //   HigherGov  - no profile exists. Their awardee pages are generated from
      //                award data and the LLC has no federal awards yet. Add it
      //                the day a profile appears, not before.
      //   SAM.gov    - entity pages require authentication, so a crawler sees a
      //                sign-in wall. Public record, but not a public URL.
      sameAs: [
        "https://www.linkedin.com/in/brianbeals/",
        "https://github.com/brianbeals",
        "https://govtribe.com/vendors/brian-beals-llc-22xm3",
      ],
    },
    {
      "@type": "Organization",
      "@id": "https://brianbeals.com/#organization",
      name: "Brian Beals, LLC",
      url: "https://brianbeals.com",
      founder: { "@id": "https://brianbeals.com/#person" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Punta Gorda",
        addressRegion: "FL",
        addressCountry: "US",
      },
      // Federally issued and globally unique, which makes them far stronger
      // disambiguation than a link to a directory page. Both are already public
      // on /accessibility/maryland and in the SAM registry.
      identifier: [
        {
          "@type": "PropertyValue",
          propertyID: "UEI",
          value: "NJLEHNAQATJ6",
        },
        {
          "@type": "PropertyValue",
          propertyID: "CAGE",
          value: "22XM3",
        },
      ],
      sameAs: ["https://govtribe.com/vendors/brian-beals-llc-22xm3"],
    },
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
          {/* 1.4.10 Reflow. On one line the nav needs 403px, so at the 320px
              WCAG target it overflowed and forced horizontal scrolling. Both
              rows now wrap, and the link gap tightens on narrow viewports. */}
          <nav
            aria-label="Main"
            className="max-w-2xl mx-auto flex flex-wrap items-center justify-between gap-y-2 text-sm"
          >
            <Link href="/" className="font-semibold tracking-tight text-base">
              Brian Beals
            </Link>
            <div className="flex flex-wrap gap-x-4 gap-y-1 sm:gap-x-6">
              <Link href="/about" className="hover:underline underline-offset-4">
                About
              </Link>
              <Link href="/writing" className="hover:underline underline-offset-4">
                Writing
              </Link>
              <Link href="/accessibility" className="hover:underline underline-offset-4">
                Accessibility
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
          <div className="max-w-2xl mx-auto flex flex-wrap gap-x-4 gap-y-1">
            <span>© {new Date().getFullYear()} Brian Beals</span>
            {/* 2.4.5 Multiple Ways. The second route to every page, reachable
                from every page. A site map linked from nowhere satisfies
                nothing. */}
            <Link href="/sitemap-page" className="underline underline-offset-4 hover:no-underline">
              Site map
            </Link>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
