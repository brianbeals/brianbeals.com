import type { Metadata } from "next";
import Link from "next/link";
import PageHeading from "@/app/components/PageHeading";
import ContactForm from "./ContactForm";
import { enabled as freeTestEnabled } from "@/lib/free-test";

// The contact page (form since 2026-10-16). The form sends through Resend like the
// readiness checklist (actions.ts, lib/form-mail.ts). Email, phone and the
// checklist stay beside it, so nobody has to use the form to reach Brian.
const DESCRIPTION =
  "Request a free 15-minute call about the ADA Title II, Section 504 or Section 508 dates, or send a message. Email and phone work too.";

export const metadata: Metadata = {
  title: { absolute: "Let's Talk | Brian Beals, LLC" },
  description: DESCRIPTION,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Let's Talk | Brian Beals, LLC",
    description: DESCRIPTION,
    url: "/contact",
    type: "website",
  },
  twitter: {
    title: "Let's Talk | Brian Beals, LLC",
    description: DESCRIPTION,
  },
};

const link = "underline underline-offset-4 hover:no-underline";

export default function Contact() {
  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
      <article className="max-w-5xl mx-auto page-wide">
        <PageHeading>Let&apos;s Talk</PageHeading>
        <p className="text-base sm:text-lg leading-relaxed mb-10 text-neutral-800">
          Request a free 15-minute call about the ADA Title II, Section 504 or Section 508 dates and
          where your site stands against them. Brian replies within one business day with times.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_16rem] gap-10 md:gap-12">
          <ContactForm canSend={Boolean(process.env.RESEND_API_KEY)} />

          <aside aria-label="Other ways to reach Brian" className="text-base">
            <ul className="space-y-4">
              <li>
                <span className="block text-sm" style={{ color: "var(--muted-ink)" }}>
                  Email
                </span>
                <a href="mailto:brian@brianbeals.com" className={link} style={{ color: "var(--link)" }}>
                  brian@brianbeals.com
                </a>
              </li>
              <li>
                <span className="block text-sm" style={{ color: "var(--muted-ink)" }}>
                  Phone
                </span>
                <a href="tel:+19419796282" className={link} style={{ color: "var(--link)" }}>
                  (941) 979-6282
                </a>
              </li>
              <li>
                <span className="block text-sm" style={{ color: "var(--muted-ink)" }}>
                  Mail
                </span>
                <address className="not-italic">
                  Brian Beals, LLC
                  <br />
                  3366 Tripoli Blvd
                  <br />
                  Punta Gorda, FL 33950
                </address>
              </li>
              {/* The free test's quiet entry point, only while it is on (lib/free-test.ts). */}
              {freeTestEnabled() ? (
                <li>
                  <span className="block text-sm" style={{ color: "var(--muted-ink)" }}>
                    A first look at your site
                  </span>
                  <Link href="/free-test" className={link} style={{ color: "var(--link)" }}>
                    Free automated check
                  </Link>
                </li>
              ) : null}
              <li>
                <span className="block text-sm" style={{ color: "var(--muted-ink)" }}>
                  Getting ready for an evaluation
                </span>
                <Link href="/accessibility/before-we-start#readiness" className={link} style={{ color: "var(--link)" }}>
                  Readiness checklist
                </Link>
              </li>
              <li>
                <span className="block text-sm" style={{ color: "var(--muted-ink)" }}>
                  LinkedIn
                </span>
                <a href="https://www.linkedin.com/company/brian-beals-llc/" target="_blank" rel="noreferrer" className={link} style={{ color: "var(--link)" }}>
                  linkedin.com/company/brian-beals-llc
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </article>
    </div>
  );
}
