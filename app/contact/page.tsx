import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email or call Brian Beals. Accessibility evaluation for counties, cities, school districts and hospitals, and conversations about enterprise AI, analytics and automation. No form.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Brian Beals",
    description: "Email or call Brian Beals. Accessibility evaluation for counties, cities, school districts and hospitals, and conversations about enterprise AI, analytics and automation. No form.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    title: "Contact | Brian Beals",
    description: "Email or call Brian Beals. Accessibility evaluation for counties, cities, school districts and hospitals, and conversations about enterprise AI, analytics and automation. No form.",
  },
};
export default function Contact() {
  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
      <article className="max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-8" style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}>
          Contact
        </h1>
        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Email is the fastest way to reach me. No form.
        </p>
        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          If you run the website for a county, city, school district or hospital and want to know where it stands against WCAG 2.1 AA before the Title II or Section 504 date, write me and say which entity. Thirty minutes is usually enough to tell whether an evaluation is worth your time.
        </p>
        <p className="text-base sm:text-lg leading-relaxed mb-8 text-neutral-800">
          I also take conversations about enterprise AI, analytics and automation: the actual work, modernizing a data stack, sorting out governance, taking a pilot to production.
        </p>
        <ul className="space-y-4 text-base sm:text-lg">
          <li>
            <span className="mr-2 inline-block w-20" style={{ color: "var(--muted-ink)" }}>Phone</span>
            <a href="tel:+19419796282" className="underline underline-offset-4 hover:no-underline" style={{ color: "var(--link)" }}>(941) 979-6282</a>
          </li>
          <li>
            <span className="mr-2 inline-block w-20" style={{ color: "var(--muted-ink)" }}>Email</span>
            <a href="mailto:brian@brianbeals.com" className="underline underline-offset-4 hover:no-underline" style={{ color: "var(--link)" }}>brian@brianbeals.com</a>
          </li>
          <li>
            <span className="mr-2 inline-block w-20" style={{ color: "var(--muted-ink)" }}>LinkedIn</span>
            <a href="https://www.linkedin.com/in/brianbeals/" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:no-underline" style={{ color: "var(--link)" }}>linkedin.com/in/brianbeals</a>
          </li>
          <li>
            <span className="mr-2 inline-block w-20" style={{ color: "var(--muted-ink)" }}>GitHub</span>
            <a href="https://github.com/brianbeals" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:no-underline" style={{ color: "var(--link)" }}>github.com/brianbeals</a>
          </li>
        </ul>
      </article>
    </div>
  );
}
