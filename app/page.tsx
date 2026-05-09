import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-8" style={{ color: "#1E3A5F" }}>
          Brian Beals
        </h1>
        <p className="text-xl sm:text-2xl leading-snug font-medium mb-8">
          I help enterprise organizations get real results out of their AI, analytics, and automation investments.
        </p>
        <p className="text-base sm:text-lg leading-relaxed mb-12 text-neutral-800">
          I've built three enterprise sales practices from scratch. The work I care about is the unglamorous middle: data foundation, integration, governance, the second budget cycle. The part where the technology either pays for itself or doesn't.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-base">
          <Link href="/about" className="underline underline-offset-4 hover:no-underline" style={{ color: "#2E86C1" }}>
            More about my work
          </Link>
          <Link href="/contact" className="underline underline-offset-4 hover:no-underline" style={{ color: "#2E86C1" }}>
            Get in touch
          </Link>
        </div>
      </div>
    </div>
  );
}
