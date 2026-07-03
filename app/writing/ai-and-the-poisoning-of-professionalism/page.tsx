import type { Metadata } from "next";
import EssayByline from "@/app/components/EssayByline";

export const metadata: Metadata = {
  title: "AI and the Poisoning of Professionalism",
  description:
    "A colleague discovered AI for email replies last month. The recipients can tell. The sender can't. What AI-curated correspondence is doing to your voice.",
  alternates: {
    canonical: "/writing/ai-and-the-poisoning-of-professionalism",
  },
  openGraph: {
    title: "AI and the Poisoning of Professionalism | Brian Beals",
    description:
      "A colleague discovered AI for email replies last month. The recipients can tell. The sender can't. What AI-curated correspondence is doing to your voice.",
    url: "/writing/ai-and-the-poisoning-of-professionalism",
    type: "article",
    publishedTime: "2026-05-30T13:00:00.000Z",
    authors: ["Brian Beals"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI and the Poisoning of Professionalism | Brian Beals",
    description:
      "A colleague discovered AI for email replies last month. The recipients can tell. The sender can't. What AI-curated correspondence is doing to your voice.",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "AI and the Poisoning of Professionalism",
  description:
    "A colleague discovered AI for email replies last month. The recipients can tell. The sender can't. What AI-curated correspondence is doing to your voice.",
  datePublished: "2026-05-30",
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
  mainEntityOfPage:
    "https://brianbeals.com/writing/ai-and-the-poisoning-of-professionalism",
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
          AI and the Poisoning of Professionalism
        </h1>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          A colleague discovered AI for email replies last month. I can tell, we ALL can tell. The sender is the only one who can&rsquo;t.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          This is happening at thousands of companies right now. The pattern is universal enough that no reader will be sure who I&rsquo;m describing, because everyone has the colleague. Or three. Or three hundred.
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
          Two weeks ago they wrote three-sentence replies
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Now every reply runs four paragraphs, three bullets, and a sign-off that warmly invites the recipient to &ldquo;jump on a quick call.&rdquo; The substance hasn&rsquo;t changed. The shape has, and the shape is wrong. We went from circles to squares.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          They think the new replies are more professional. The new replies look more professional. They also sound like every other AI-curated crap reply on Earth this month, which means they no longer sound like the colleague, which is sad, because talented people are losing their voices.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          That last fact is the entire story.
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
          The tells
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Six things to look for. Any one of them is fine. Any three of them together means the AI wrote it.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The phantom warmth. &ldquo;I hope this email finds you well.&rdquo; No real human writes that line as a genuine sentiment. The AI writes it every time, with no idea whether the recipient is having a good week, a bad week, or just lost their dog.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The phantom continuity. &ldquo;Circling back on our previous conversation.&rdquo; There was no previous conversation. There was one email three days ago. The AI fills in a relationship that doesn&rsquo;t exist, and the recipient notices immediately.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The three-bullet recap of a one-line question. The sender asked &ldquo;can you do Tuesday at 2.&rdquo; The reply contains four paragraphs, three bullets, and a closing offer to &ldquo;make this a quick win for both of us.&rdquo;
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The unsolicited reassurance. &ldquo;I completely understand the importance of this and want to make sure we get it right.&rdquo; Nobody asked for the reassurance. The AI volunteers it because reassurance is part of its trained shape of professionalism.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The closing &ldquo;jump on a quick call.&rdquo; Nobody jumps on quick calls. Quick calls get scheduled three weeks out, like every other call.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The sign-off that has nothing to do with the relationship. &ldquo;Looking forward to partnering with you on this journey.&rdquo; It was a calendar question. There is no journey.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Any one of these in isolation is fine. The pileup is the tell. I bail. The sender lands in mute.
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
          What this costs
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Recipients don&rsquo;t bounce. They don&rsquo;t object. They slow down. Then they stop.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The sender reads the silence as a cold prospect. The prospect didn&rsquo;t go cold. The prospect read three of these replies and decided this person is no longer in the conversation. Or worse, maybe no longer relevant. Just an inbox that produces text. The email-marketing industry has a name for the bulk version of this problem. The relationship version doesn&rsquo;t have one yet. Call it professionalism poisoning. Every AI-curated reply pays down whatever recognition the recipient had for the sender. Eventually the meter hits zero, and a reply lands in the same mental folder as the LinkedIn auto-greeting and the QBR reminder from the customer-success platform.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          That folder is not a place anyone wins business or long-term relationships from.
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
          Why the sender can&rsquo;t see it
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The output looks responsive. Looks professional. Looks like an upgrade. That&rsquo;s the trap.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          AI defaults are tuned for &ldquo;looks professional to a billion users at once.&rdquo; That is the voice of nobody in particular, dressed up well enough to pass any single look. The sender is grading their own output on &ldquo;did this look good when I clicked send.&rdquo; The recipient is grading it on &ldquo;do I want to keep reading emails from this person.&rdquo; The first test passes effortlessly. The second one fails quietly, with no notification when it fails.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          If the failure mode were a typo, the sender would catch it. If it were a tone mismatch, they would catch it. The failure mode is a faint generic gloss across every sentence, which is exactly what the model was trained to produce. The sender doesn&rsquo;t catch it because the model is doing exactly what it was asked to do.
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
          The discipline
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          One rule. Read every reply out loud before you send it. Yes, your cubicle buddies will look. They&rsquo;ll get over it. If it doesn&rsquo;t sound like you on the phone, rewrite it.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          That&rsquo;s it. No tools. No prompts. No filter layer. Just the ear.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          This works because AI defaults pass the eye test and fail the ear test. The eye accepts professional shape. The ear hears the seams. The reader&rsquo;s ear is going to hear them too, even on a phone scrolling at speed. Especially then.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Most of what needs rewriting is the opener, the closer, and one or two phantom continuity phrases in the middle. The body usually has the actual answer in it. The shell around the answer is the problem. Strip the shell. Keep the answer.
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
          The bigger argument
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Every AI-default reply that ships under your name erodes the trust the recipient has in your voice. Three replies in, they&rsquo;ve forgotten how you actually sound. Ten replies in, they don&rsquo;t notice when you stop replying at all.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          The colleague feels twice as productive. Every recipient is reading the same generic text. Speed in your inbox is buying you irrelevance with the people on the other side of it.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6 text-neutral-800">
          Your inbox is where the relationship lives. Don&rsquo;t outsource it to a model that&rsquo;s never met the recipient.
        </p>

        <EssayByline variant="lrs" />
      </article>
    </div>
  );
}
