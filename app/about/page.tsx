import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ProjectList from "@/app/components/ProjectList";
import SectionHeading from "@/app/components/SectionHeading";
import PageHeading from "@/app/components/PageHeading";
const DESCRIPTION =
  "Brian Beals, LLC: independent WCAG 2.1 AA evaluation and Accessibility Conformance Reports for government agencies, health centers, schools, and vendors. Evaluation only, never remediation. SBA-certified SDVOSB.";

export const metadata: Metadata = {
  title: { absolute: "About | Brian Beals, LLC" },
  description: DESCRIPTION,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | Brian Beals, LLC",
    description: DESCRIPTION,
    url: "/about",
    type: "website",
  },
  twitter: {
    title: "About | Brian Beals, LLC",
    description: DESCRIPTION,
  },
};
// Third person since 2026-10-23 (SBDC review). The first-person voice lives in the
// signed founder note under "Why I Do This" on the home page.
export default function About() {
  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
      <article className="max-w-5xl mx-auto page-wide">
        <PageHeading>About</PageHeading>
        <div className="mb-8 sm:float-right sm:ml-8 sm:mb-6">
          <Image
            src="/brian-beals.jpg"
            alt="Photo of Brian Beals"
            width={180}
            height={180}
            className="rounded-md shadow-sm"
          />
        </div>
        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">Brian Beals founded Brian Beals, LLC, an independent digital accessibility practice for government agencies, health centers, schools, and the vendors who sell to them.</p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">He tests websites, apps, and documents against WCAG 2.1 AA and writes the Accessibility Conformance Report that marks and evidences every criterion. For an agency with years of PDFs online, he inventories the documents and sorts each one into retire, replace, remediate, or leave, so the remediation budget goes to the files people actually use.</p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">Evaluation only, never remediation. The firm doesn&apos;t sell the repair, so the report has no stake in what it finds.</p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">Brian Beals, LLC is an SBA-certified service-disabled veteran-owned small business, a Florida Veteran Business Enterprise, and a Maryland Veteran-Owned Small Business Enterprise.</p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">This site gets the same test.{" "}
          <a href="/conformance-report.html" className="underline underline-offset-4 font-semibold" style={{ color: "var(--link)" }}>
            Read its Accessibility Conformance Report
          </a>
          , or see{" "}
          <Link href="/accessibility" className="underline underline-offset-4 font-semibold" style={{ color: "var(--link)" }}>
            what Brian tests and what it costs
          </Link>
          .
        </p>

        <SectionHeading>Earlier</SectionHeading>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">He has built three enterprise technology practices from a blank page. Before that, he worked in technical sales at Red Hat, Oracle, and MicroStrategy.</p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">He served as a U.S. Navy electronics technician and was honorably discharged. What he took from it: honor in the work, integrity when nobody is checking, an attention to detail that's hard to switch off. It's also why he'd rather lose a deal than sell a customer something that won't deliver.</p>

        {/* The full project write-ups, moved from the home page 2026-10-12. The
            home page keeps one sentence each; both read app/projects.ts. */}
        <SectionHeading>Building in Public</SectionHeading>

        <ProjectList text="description" />

        {/* Off the main nav since 2026-10-10. This line and the site map are its two routes. */}
        <p className="text-base sm:text-lg leading-relaxed mt-12 text-neutral-800"><Link href="/elsewhere" className="underline underline-offset-4 hover:no-underline" style={{ color: "var(--link)" }}>Elsewhere</Link>: adventure travel, mostly to places where the signal goes away.</p>
      </article>
    </div>
  );
}
