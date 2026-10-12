import { projects } from "@/app/projects";

/**
 * The building-in-public list. The home page passes "summary" (one sentence per
 * project); /about passes "description" (the full write-up). Same order, same
 * links, from app/projects.ts.
 */
export default function ProjectList({ text }: { text: "summary" | "description" }) {
  return (
    <div className={text === "summary" ? "space-y-6" : "space-y-8"}>
      {projects.map((p) => (
        <div key={p.name}>
          <h3
            className="text-xl font-semibold tracking-tight mb-2"
            style={{ color: "var(--head)" }}
          >
            {p.name}
          </h3>
          <p className="text-base leading-relaxed text-neutral-800">{p[text]}</p>
          {p.links.length > 0 && (
            <p className={text === "summary" ? "mt-2 text-sm" : "mt-3 text-sm"}>
              {p.links.map((l, i) => (
                <span key={l.href}>
                  {i > 0 && (
                    <span aria-hidden="true" style={{ color: "var(--muted-ink)" }}>
                      {" "}
                      ·{" "}
                    </span>
                  )}
                  {/* 2.4.4 Link Purpose. Seven links in this list read "Live"
                      or "Code". A screen reader's links list shows them
                      stripped of their card, so name the project. */}
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${l.label}: ${p.name}`}
                    className="underline underline-offset-4 hover:no-underline"
                    style={{ color: "var(--link)" }}
                  >
                    {l.label}
                  </a>
                </span>
              ))}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
