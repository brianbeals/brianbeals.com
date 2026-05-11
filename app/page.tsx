import Image from "next/image";
import Link from "next/link";

const stats = [
  {
    figure: "$0 → $20M",
    label: "Mainline Information Systems Business Analytics, five years",
  },
  {
    figure: "$20M → $78M",
    label: "Sirius Big Data & Analytics, 3.9× in under four years",
  },
];

export default function Home() {
  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 sm:float-right sm:ml-8 sm:mb-6">
          <Image
            src="/brian-beals.jpg"
            alt="Photo of Brian Beals"
            width={180}
            height={180}
            className="rounded-md shadow-sm"
            priority
          />
        </div>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-8" style={{ color: "#1E3A5F", fontFamily: "var(--font-serif)" }}>
          Brian Beals
        </h1>
        <p className="text-xl sm:text-2xl leading-snug font-medium mb-8">
          I help enterprise organizations get real results out of their AI, analytics, and automation investments.
        </p>
        <p className="text-base sm:text-lg leading-relaxed mb-12 text-neutral-800">
          I've built three enterprise sales practices from scratch. The work I care about is the unglamorous middle: data foundation, integration, governance, the second budget cycle. The part where the technology either pays for itself or doesn't.
        </p>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 mb-12 pb-12 border-b border-neutral-200">
          {stats.map((s) => (
            <div key={s.figure}>
              <dt
                className="text-2xl sm:text-3xl font-semibold tracking-tight"
                style={{ color: "#1E3A5F", fontFamily: "var(--font-serif)" }}
              >
                {s.figure}
              </dt>
              <dd className="mt-2 text-sm text-neutral-600 leading-snug">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
        <p className="text-base sm:text-lg leading-relaxed mb-8 text-neutral-800">
          I don't sell technology I haven't tried to build myself. The current projects live at <a href="https://github.com/brianbeals" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:no-underline" style={{ color: "#2E86C1" }}>github.com/brianbeals</a>.
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
