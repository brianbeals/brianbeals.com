import type { Metadata } from "next";
import EssayByline from "@/app/components/EssayByline";

export const metadata: Metadata = {
  title: "Seeing the Next Rung",
  description:
    "A lit hot-sheet tray in a 1968 patrol car, an early automation that vanished, and a test for the things you build: does the work compound or just accumulate?",
  alternates: {
    canonical: "/writing/seeing-the-next-rung",
  },
  openGraph: {
    title: "Seeing the Next Rung | Brian Beals",
    description:
      "A lit hot-sheet tray in a 1968 patrol car, an early automation that vanished, and a test for the things you build: does the work compound or just accumulate?",
    url: "/writing/seeing-the-next-rung",
    type: "article",
    publishedTime: "2026-07-25T13:00:00.000Z",
    authors: ["Brian Beals"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seeing the Next Rung | Brian Beals",
    description:
      "A lit hot-sheet tray in a 1968 patrol car, an early automation that vanished, and a test for the things you build: does the work compound or just accumulate?",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Seeing the Next Rung",
  description:
    "A lit hot-sheet tray in a 1968 patrol car, an early automation that vanished, and a test for the things you build: does the work compound or just accumulate?",
  datePublished: "2026-07-25",
  author: {
    "@type": "Person",
    name: "Brian Beals",
    url: "https://brianbeals.com",
  },
  publisher: {
    "@type": "Person",
    name: "Brian Beals",
    url: "https://brianbeals.com",
  },
  mainEntityOfPage: "https://brianbeals.com/writing/seeing-the-next-rung",
};

export default function EssayPage() {
  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article className="max-w-2xl mx-auto">
        <h1
          className="text-4xl sm:text-5xl font-semibold tracking-tight mb-8"
          style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
        >
          Seeing the Next Rung
        </h1>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          In a 1968 patrol car there was a small metal tray bolted to the dash, lit by a single bulb. It held the day&rsquo;s hot sheet, the list of stolen plates, so an officer could read it at night without pulling over. I spotted one in the background of an old show and had to stop the frame to work out what I was looking at.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Then it landed. My father joined the Michigan State Police in 1968. His first patrols were in cars with that tray on the dash.
        </p>

        <h2
          className="text-2xl font-semibold mt-12 mb-4 tracking-tight flex items-center gap-3"
          style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
        >
          <span
            aria-hidden="true"
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "#2E86C1" }}
          ></span>
          Somebody&rsquo;s automation project
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          That tray was somebody&rsquo;s automation project. Some sergeant watched officers squint at a clipboard under the dome light, or skip the list entirely after dark, and decided the car should solve it. A bracket, a bulb, a tray. Fleet-wide, problem solved.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          It worked so well it disappeared. Fifty years later, the son of a man who read those sheets on night patrol couldn&rsquo;t tell what it was for. That&rsquo;s the best outcome an automation can have, and it&rsquo;s also the first clue about how this kind of work behaves.
        </p>

        <h2
          className="text-2xl font-semibold mt-12 mb-4 tracking-tight flex items-center gap-3"
          style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
        >
          <span
            aria-hidden="true"
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "#2E86C1" }}
          ></span>
          The floor keeps rising
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Solve the squinting problem and the next constraint surfaces. Now the plates are readable at forty miles an hour, and the radio becomes the problem: switch channels to talk to the next district and you&rsquo;ve gone deaf to your own dispatcher. Fix that, and the next one is waiting. The radio is bolted to the car, so on a traffic stop the mic gets hung out the window with the volume cranked, and everyone on the street hears your business. Hand the officer a portable, and the paperwork becomes the bottleneck. Keep pulling that thread for a few decades and you arrive at the in-car computer that replaced the tray, the bulb, and the hot sheet itself.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          My father&rsquo;s career spanned that whole climb. He started with the tray and retired twenty-some years later, within sight of the terminal that buried it.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Each fix exposed the friction underneath it. Nobody could feel the radio problem until the squinting problem was gone.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          That&rsquo;s the engine: every automation raises the floor of what&rsquo;s normal, and your sense of friction resets to the new floor. The job was never done, it&rsquo;s just that the baseline moved.
        </p>

        <h2
          className="text-2xl font-semibold mt-12 mb-4 tracking-tight flex items-center gap-3"
          style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
        >
          <span
            aria-hidden="true"
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "#2E86C1" }}
          ></span>
          A treadmill is the wrong picture
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The easy read on that engine is a treadmill: fifty years of running and the work is still there, so what was the point. I&rsquo;ve heard the same sigh from people who build software tooling and people who build workshop jigs. The backlog never shrinks. The tinkering never ends.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          A ladder is the right picture. The next rung only becomes visible once you&rsquo;re standing on the one below it. Nobody in 1968 could have written the requirement for a mobile data terminal; that idea wasn&rsquo;t reachable from the ground. What they could see was exactly one rung: read the list at night without stopping the car. Standing on that rung, the radio problem came into focus. Standing on the radio, the paperwork did. From the inside, progress feels like a clearer view of the next problem. That&rsquo;s the proof you&rsquo;re climbing, and the reason it never feels like arriving.
        </p>

        <h2
          className="text-2xl font-semibold mt-12 mb-4 tracking-tight flex items-center gap-3"
          style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
        >
          <span
            aria-hidden="true"
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "#2E86C1" }}
          ></span>
          Compounds or accumulates
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The tray can&rsquo;t teach the part that took me longest to learn: not all of it counts.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          I build my own trays. I keep a library of small tools for my own work. A profile file that every other tool reads, so nothing asks me the same question twice. A one-page voice standard every draft gets checked against. Naming conventions each new tool gets to assume instead of negotiate. Scripts that build the workbooks and reports I used to assemble by hand. It&rsquo;s the most useful thing I&rsquo;ve built in years. It also taught me an uncomfortable distinction: some of what&rsquo;s in there compounds, and some of it just accumulates.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The compounding pieces are load-bearing. The profile file made the next ten tools simpler before I&rsquo;d written any of them, because none of them needed their own copy of the basics. The naming conventions mean a new script finds every file the old scripts made. Each piece lowers the cost of the piece after it. That&rsquo;s infrastructure in the real sense: the value shows up in everything built on top.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The accumulating pieces look identical on the shelf: the tracker I updated twice and never opened again, the dashboard for numbers I could eyeball in the raw file, the template polished for a report nobody asked for twice. Building them felt exactly like building the good stuff, and that&rsquo;s the trap. The satisfaction signal is the same on both sides. Polishing a system you don&rsquo;t use still feels like work, because it is work. It just isn&rsquo;t progress.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The test that separates them fits into one question: am I removing friction I hit this month, or friction I imagine I might hit someday? A month is the right window. Long enough that the sample is real, short enough that memory stays honest. The question is portable, too. It works on the shell setup tuned for a job you left a year ago, and on the beautiful rack of workshop jigs for cuts you&rsquo;ve never made. If the friction is real and recent, build the tray. If you&rsquo;re building against a hypothetical, you&rsquo;re decorating.
        </p>

        <h2
          className="text-2xl font-semibold mt-12 mb-4 tracking-tight flex items-center gap-3"
          style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
        >
          <span
            aria-hidden="true"
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "#2E86C1" }}
          ></span>
          The day it ends
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The tray didn&rsquo;t survive, and it didn&rsquo;t fail. It got buried under fifty years of fixes, each one invisible from the rung before it, until a stranger had to ask what it was. Everything useful you build is headed for the same retirement, and the next constraint is already in the car with you.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The day this ends is the day you stop noticing friction. That isn&rsquo;t a day worth wanting.
        </p>

        <EssayByline>
          Brian Beals writes about AI, automation, and the work of building at
          brianbeals.com. Reach him at brian@brianbeals.com.
        </EssayByline>
      </article>
    </div>
  );
}
