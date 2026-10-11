import Link from "next/link";
import { essayTopic, topicLabel } from "@/app/writing/essays";

/**
 * TopicLabel: the topic caption under an essay's title, linked to /writing
 * filtered to that topic. The topic comes from app/writing/essays.ts, the same
 * list /writing renders, so the caption here and the one on the card cannot
 * disagree. Text only, no icon. The hidden " essays" gives the link a purpose
 * out of context while keeping the visible word at the start of its name.
 */
export default function TopicLabel({ slug }: { slug: string }) {
  const topic = essayTopic(slug);
  if (!topic) return null;
  return (
    <p className="-mt-5 mb-8 text-xs font-semibold uppercase tracking-wider">
      <Link
        href={`/writing#${topic}`}
        className="underline underline-offset-4 hover:no-underline"
        style={{ color: "var(--muted-ink)" }}
      >
        {topicLabel(topic)}
        <span className="sr-only"> essays</span>
      </Link>
    </p>
  );
}
