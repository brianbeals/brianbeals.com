import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email Brian directly. No form, no funnel.",
};
export default function Contact() {
  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
      <article className="max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-8" style={{ color: "#1E3A5F" }}>
          Contact
        </h1>
        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Email is the fastest way to reach me. Direct, no form needed.
        </p>
        <p className="text-base sm:text-lg leading-relaxed mb-8 text-neutral-800">
          The conversations I want are about AI, analytics, and automation. Not the slide decks, the actual work. If you're modernizing a data stack, sorting out governance, taking a pilot to production, or building a practice from scratch, write me.
        </p>
        <ul className="space-y-4 text-base sm:text-lg">
          <li>
            <span className="text-neutral-500 mr-2 inline-block w-20">Email</span>
            <a href="mailto:brian@bealsfamily.com" className="underline underline-offset-4 hover:no-underline" style={{ color: "#2E86C1" }}>brian@bealsfamily.com</a>
          </li>
          <li>
            <span className="text-neutral-500 mr-2 inline-block w-20">LinkedIn</span>
            <a href="https://www.linkedin.com/in/brianbeals/" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:no-underline" style={{ color: "#2E86C1" }}>linkedin.com/in/brianbeals</a>
          </li>
        </ul>
      </article>
    </div>
  );
}
