// The essay list, one source of truth for /writing and for the topic caption
// under each essay's title, so the two cannot disagree. Added 2026-10-11 with
// the topic filter on /writing.

export const TOPICS = [
  { slug: "accessibility", label: "Accessibility" },
  { slug: "ai", label: "AI" },
  { slug: "building", label: "Building" },
] as const;

export type Topic = (typeof TOPICS)[number]["slug"];

export type Essay = {
  slug: string;
  topic: Topic;
  title: string;
  date: string;
  summary: string;
};

export const essays: Essay[] = [
  // Newest first. Add new essays to the top of this array. Every essay
  // carries a topic; the publish skill maps essays.yml `track` to it.
  {
    slug: "the-form-that-sets-the-price",
    topic: "accessibility",
    title: "The Form That Sets the Price",
    date: "2026-10-17",
    summary:
      "What one Florida health center's forms say about the May 2027 date, and why the sliding-fee application comes first.",
  },
  {
    slug: "eight-of-twenty-six",
    topic: "accessibility",
    title: "Eight of Twenty-Six",
    date: "2026-10-11",
    summary:
      "What the PDFs on one Florida city's website say about the April 2027 date, and why the forms library comes before the home page.",
  },
  {
    slug: "who-could-afford-to-find-out",
    topic: "ai",
    title: "Who Could Afford to Find Out",
    date: "2026-10-03",
    summary:
      "Uber turned on Claude Code in December and burned through its 2026 AI coding budget by April. Eight months later it had an answer. Most companies bought a $30 seat for everybody instead, and a year later can't say what came back. One of them bought an experiment. The other bought a subscription.",
  },
  {
    slug: "everybody-got-a-license",
    topic: "ai",
    title: "Everybody Got a License",
    date: "2026-09-19",
    summary:
      "My AI spend went up tenfold this year and I can account for every step, which turns out to be the unusual part. The industry solved cost metering: rate cards, token billing, a specification, a conference named after the unit. The number nobody can produce is still the useful one.",
  },
  {
    slug: "sixty-cents-a-year",
    topic: "building",
    title: "Sixty Cents a Year",
    date: "2026-09-05",
    summary:
      "Six tubs of ice cream since February, two of them free. The thing that found the free ones is a rules engine with exactly one model call bolted to the end, and it costs sixty cents a year to run. What that says about the other conversation I'm in every week.",
  },
  {
    slug: "i-built-the-thing",
    topic: "building",
    title: "I Built the Thing",
    date: "2026-08-22",
    summary:
      "32,000 blocked DNS queries, ten Sonos speakers, and an afternoon of firewall rules and SSH keys. I was a network engineer once, long enough ago that none of it survived. What that afternoon says about who gets to do the work now.",
  },
  {
    slug: "ai-is-not-automation",
    topic: "ai",
    title: "AI Is Not Automation",
    date: "2026-08-08",
    summary:
      "Two clients tried to tell me AI and automation are the same thing. They aren't, and the confusion gets expensive at scale. Two systems I run at home, and where AI actually belongs in them.",
  },
  {
    slug: "seeing-the-next-rung",
    topic: "building",
    title: "Seeing the Next Rung",
    date: "2026-07-25",
    summary:
      "A lit hot-sheet tray in a 1968 patrol car, an early automation that worked so well it vanished. The floor of normal keeps rising, so the real test of anything you build is whether it compounds or just accumulates.",
  },
  {
    slug: "the-voice-book",
    topic: "ai",
    title: "The Voice Book",
    date: "2026-07-11",
    summary:
      "What voice rules? Here's mine. One page, mostly a list of things I refuse to write, and why a refusal list beats an inspiring adjective. Plus how the same idea scales from one writer to a whole company.",
  },
  {
    slug: "how-i-review-my-own-writing",
    topic: "ai",
    title: "How I Review My Own Writing",
    date: "2026-06-27",
    summary:
      "Five dimensions I run on any piece of writing in 2026: three letter grades, two percentages, one of them scoring how much it reads as AI. How I grade my own essays before they ship, and the AI-shaped pitches that land in my inbox.",
  },
  {
    slug: "an-llm-with-a-logo",
    topic: "ai",
    title: "An LLM With a Logo",
    date: "2026-06-13",
    summary:
      "Pull ten artifacts from one company in 2026 and read them back to back. They sound like ten different companies. The brand book has a guardian. The voice book doesn't have one yet, and the company pays for it.",
  },
  {
    slug: "ai-and-the-poisoning-of-professionalism",
    topic: "ai",
    title: "AI and the Poisoning of Professionalism",
    date: "2026-05-30",
    summary:
      "A colleague discovered AI for email replies last month. The recipients can tell. The sender can't. Notes on what AI-curated correspondence is doing to your voice, your relationships, and your inbox.",
  },
  {
    slug: "the-last-moat-is-your-voice",
    topic: "ai",
    title: "The Last Moat Is Your Voice",
    date: "2026-05-16",
    summary:
      "Speed and cost stopped being the AI differentiator. When everyone uses the same models with the same defaults, the last moat is whether your output still sounds like you.",
  },
];

export function topicLabel(topic: Topic): string {
  return TOPICS.find((t) => t.slug === topic)?.label ?? topic;
}

export function essayTopic(slug: string): Topic | undefined {
  return essays.find((e) => e.slug === slug)?.topic;
}
