import type { Metadata } from "next";
import EssayByline from "@/app/components/EssayByline";

export const metadata: Metadata = {
  title: "I Built the Thing",
  description:
    "I traced 32,000 blocked DNS queries to ten speakers, then rebuilt my home network in an afternoon. I was a network engineer once. None of it survived.",
  alternates: {
    canonical: "/writing/i-built-the-thing",
  },
  openGraph: {
    title: "I Built the Thing | Brian Beals",
    description:
      "I traced 32,000 blocked DNS queries to ten speakers, then rebuilt my home network in an afternoon. I was a network engineer once. None of it survived.",
    url: "/writing/i-built-the-thing",
    type: "article",
    publishedTime: "2026-08-22T12:00:00.000Z",
    authors: ["Brian Beals"],
  },
  twitter: {
    card: "summary_large_image",
    title: "I Built the Thing | Brian Beals",
    description:
      "I traced 32,000 blocked DNS queries to ten speakers, then rebuilt my home network in an afternoon. I was a network engineer once. None of it survived.",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "I Built the Thing",
  description:
    "I traced 32,000 blocked DNS queries to ten speakers, then rebuilt my home network in an afternoon. I was a network engineer once. None of it survived.",
  datePublished: "2026-08-22",
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
  mainEntityOfPage: "https://brianbeals.com/writing/i-built-the-thing",
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
          I Built the Thing
        </h1>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          My Pi-hole showed talk.google.com blocked 32,000 times, and I had no idea why.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          By that evening I&rsquo;d traced it to ten Sonos speakers, put both DNS servers under version control, hardened them to key-only SSH, stood up a sync container, walled the smart-home gear off from my laptops with firewall rules, and geo-blocked 11 countries at the gateway.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          I was a network engineer once, long enough ago that none of it survived.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          My view has been that people who sell technology without ever having built it tend to oversell it. So I built the thing. I built it in my actual house, where that firewall carries my family&rsquo;s notifications and the security cameras, and one wrong move kills the music in every room.
        </p>

        <h2
          className="text-2xl font-semibold mt-12 mb-4 tracking-tight flex items-center gap-3"
          style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
        >
          <span
            aria-hidden="true"
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "var(--link)" }}
          ></span>
          The mystery
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          32,000 blocks against a single hostname is a fight.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Ten Sonos units were reaching for Google&rsquo;s push servers, getting a wall, and trying again. Harder. Block something your devices genuinely need and the traffic gets louder.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Diagnosing that came down to knowing what a retry storm looks like from the outside, and being willing to consider that the blocklist doing its job was the problem. Almost no typing involved. The storm stopped that night, which is how I know the read was right.
        </p>

        <h2
          className="text-2xl font-semibold mt-12 mb-4 tracking-tight flex items-center gap-3"
          style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
        >
          <span
            aria-hidden="true"
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "var(--link)" }}
          ></span>
          Version control before convenience
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Before changing anything, I put both DNS servers in git. I did it to answer one specific question: if either box died tonight, could I rebuild it from nothing?
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          That question separates someone who administers a system from someone who merely has one. I&rsquo;ve watched enterprise teams fail it on infrastructure worth far more than my house.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The sync container came out of the same question. Two DNS servers only help you if they agree, so something has to keep them in step without me remembering to do it.
        </p>

        <h2
          className="text-2xl font-semibold mt-12 mb-4 tracking-tight flex items-center gap-3"
          style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
        >
          <span
            aria-hidden="true"
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "var(--link)" }}
          ></span>
          Where a mistake is permanent
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Then I moved to SSH keys and turned off password login.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          This is the one step where a mistake sticks. Get it wrong and the box keeps running, perfectly healthy, and you can never get back in remotely. At home that costs you a walk to the closet with a keyboard. In a data center three states away it costs considerably more.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          So keep the working session open, open a second window, and prove the new way in actually works. Only then burn the old way. That&rsquo;s the discipline of not closing the door you&rsquo;re standing in, and no tool told me to do it.
        </p>

        <h2
          className="text-2xl font-semibold mt-12 mb-4 tracking-tight flex items-center gap-3"
          style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
        >
          <span
            aria-hidden="true"
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "var(--link)" }}
          ></span>
          The part a consultant would invoice for
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          One-way firewall rules, so a compromised camera can reach the internet but can&rsquo;t reach my laptop. I understood that goal precisely. I could not have written the rule order from memory, and I didn&rsquo;t have to. The established and related allow, the rule that lets already-open connections back through, has to sit above the block, or you cut off your own ability to control the devices you&rsquo;re protecting.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Then I tested it, because a rule you haven&rsquo;t tested is a belief. From the camera network I tried to reach my laptop and got nothing. Tried the internet and got through. Two minutes, and it&rsquo;s the difference between having a firewall rule and having a firewall.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          At house scale, that kind of detail once meant hiring someone and now takes an afternoon. At enterprise scale it&rsquo;s still change control, a test window, and a blast radius, and I&rsquo;d be overselling this if I said otherwise.
        </p>

        <h2
          className="text-2xl font-semibold mt-12 mb-4 tracking-tight flex items-center gap-3"
          style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
        >
          <span
            aria-hidden="true"
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "var(--link)" }}
          ></span>
          Nobody gets to the long tail
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          I geo-blocked 11 countries, updated two access points sitting a firmware version behind, and finally dealt with a certificate warning I&rsquo;d clicked past for a year.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          None of it was urgent. That&rsquo;s exactly why it had sat there for a year. Every organization I walk into has a version of this list, and it&rsquo;s rarely hard work. It belongs to nobody, and it never wins the argument for someone&rsquo;s afternoon.
        </p>

        <h2
          className="text-2xl font-semibold mt-12 mb-4 tracking-tight flex items-center gap-3"
          style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
        >
          <span
            aria-hidden="true"
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "var(--link)" }}
          ></span>
          What I didn&rsquo;t become
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          I directed the work and something else supplied the syntax. Whatever I knew when I did this for a living is long gone, and directing the work didn&rsquo;t give it back.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          I still had to know the fix for the certificate warning was two things at once: trust the certificate, and reach the box by the exact name printed inside it. I still caught the near-misses, a password that pasted into the wrong window and a spare SSID the interface offered no way to switch off, which had to come down another way.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          There&rsquo;s a fair objection here and I&rsquo;d rather raise it myself. Knowing the allow has to sit above the block is judgment. I didn&rsquo;t have it and something else did. What I brought was knowing what I wanted and being able to check whether I got it. That&rsquo;s a smaller claim than the one people usually make about this, and it&rsquo;s the one I can defend.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          A reader who builds this kind of automation for a living offered a test I&rsquo;ve adopted. If you can write a passing test for the step, it doesn&rsquo;t need a model. I&rsquo;d push it one step further. If you can&rsquo;t tell whether the result is right, you have no business directing the work at all, however good the tool is.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The work is all still there. The hard part just relocated, out of writing the commands and into recognizing a right answer when you see one.
        </p>

        <h2
          className="text-2xl font-semibold mt-12 mb-4 tracking-tight flex items-center gap-3"
          style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
        >
          <span
            aria-hidden="true"
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "var(--link)" }}
          ></span>
          The enterprise version
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          This is the conversation I keep having with CIOs. Most of them are still counting engineers, and for a growing share of the work, headcount was never the constraint.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The bottleneck was always the distance between the person who knows the goal and the person who can execute it. Every requirements document ever written is a monument to that gap. For work this size, that distance just collapsed, and the org chart hasn&rsquo;t caught up.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The enterprise version of my afternoon is the analyst who stands up her own pipeline instead of filing a ticket, or the seller who builds the account model himself. It&rsquo;s the leader who prototypes the thing instead of writing a spec and waiting two quarters to find out it was the wrong thing.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          A consultant told me recently that he&rsquo;d had three clients in two months ask for AI to do their bank reconciliation, and one had already built and shelved a version. What stuck with me was his disappointment. The most resilient answer kept coming back as a deterministic framework with AI in a few places, and nobody in the room wanted that to be the answer.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The answer here is just as unglamorous. The people who already know what good looks like can now do the work, and the ones who don&rsquo;t will ship confident nonsense faster than they ever could before.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          If you want one thing to do about it, go find the person on your team who has been right about the last three things and has been waiting on someone else to build them. Take the queue away from them and give them a quarter.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The gate moved. It stands in front of judgment now, and judgment doesn&rsquo;t ship with the model.
        </p>

        <EssayByline>
          Brian Beals writes about AI, automation, and the work of building at
          brianbeals.com. Reach him at brian@brianbeals.com.
        </EssayByline>
      </article>
    </div>
  );
}
