// The readiness checklist, defined once. The form renders from it, the server
// action validates and formats the email from it, and the confirmation view
// lists the answers from it. Labels and hints are the approved checklist wording
// (hints added 2026-10-15); change them here and all three follow.

export type Part =
  | { type: "text"; name: string; label?: string; inputType?: "text" | "email"; required?: boolean; autoComplete?: string }
  | { type: "radio"; name: string; options: string[] }
  | { type: "checkbox"; name: string; options: string[]; required?: boolean };

export type Item = {
  id: string;
  label: string;
  hint: string;
  parts: Part[];
  /* A hint for one sub-field rather than the item, shown under it. */
  subHint?: { after: string; text: string };
};

export const ITEMS: Item[] = [
  {
    id: "domain",
    label: "Primary domain",
    hint: "The main web address, e.g. yourcity.gov.",
    parts: [{ type: "text", name: "domain", required: true, autoComplete: "url" }],
  },
  {
    id: "waf",
    label: "Does the site use a WAF, CDN, or bot protection?",
    hint: "Security services that sit in front of the site, such as Cloudflare, Akamai, or Imperva. Your IT or web team will know.",
    parts: [
      { type: "radio", name: "waf", options: ["Yes", "No", "Unknown"] },
      { type: "text", name: "waf_which", label: "If yes, which" },
      { type: "text", name: "waf_admin", label: "Who administers it" },
    ],
  },
  {
    id: "allowlist",
    label: "Can the evaluation tooling be allowlisted?",
    hint: "Telling that security service to let our testing tool through. Usually one email to whoever runs it.",
    parts: [{ type: "radio", name: "allowlist", options: ["Yes", "No", "Need to ask"] }],
  },
  {
    id: "pages",
    label: "Approximate page count",
    hint: "A rough number is fine; your web team or CMS can give it.",
    parts: [{ type: "text", name: "pages" }],
  },
  {
    id: "urls",
    label: "URL list available?",
    hint: "A list of the pages to test, or permission to start from the home page and follow links.",
    parts: [{ type: "radio", name: "urls", options: ["Will send by email", "Crawl from home page is fine"] }],
  },
  {
    id: "auth",
    label: "Authenticated areas in scope?",
    hint: "Pages behind a login, like permit portals or payment accounts. If in scope, we need a test account.",
    parts: [{ type: "radio", name: "auth", options: ["Yes, credentials can be provided", "No, exclude them"] }],
  },
  {
    id: "docs",
    label: "Approximate document count",
    hint: "PDFs, Word files, and spreadsheets posted on the site. A rough number is fine.",
    parts: [{ type: "text", name: "docs" }],
  },
  {
    id: "docs_scope",
    label: "Documents in scope?",
    hint: "Whether this engagement covers those files or only the web pages.",
    parts: [{ type: "radio", name: "docs_scope", options: ["Yes", "No", "Scope separately"] }],
  },
  {
    id: "contact",
    label: "Point of contact",
    hint: "One person who can answer scope questions during the work.",
    parts: [
      { type: "text", name: "contact_name", label: "Name", required: true, autoComplete: "name" },
      { type: "text", name: "contact_title", label: "Title", autoComplete: "organization-title" },
      { type: "text", name: "contact_email", label: "Email", inputType: "email", required: true, autoComplete: "email" },
    ],
  },
  {
    id: "obligation",
    label: "Which obligation applies?",
    hint: "The rule that covers you. Cities, counties, school districts, and colleges are usually ADA Title II.",
    parts: [
      {
        type: "checkbox",
        name: "obligation",
        options: ["ADA Title II", "Section 504", "Section 508 vendor", "ADA Title III", "Unsure"],
        required: true,
      },
      { type: "text", name: "census", label: "If Title II, 2020 Census population" },
    ],
    subHint: {
      after: "census",
      text: "Sets your compliance date: 50,000 or more is April 26, 2027; smaller entities and special districts, April 26, 2028.",
    },
  },
  {
    id: "embeds",
    label: "Third-party embeds in use",
    hint: "Services from other companies running inside your pages: chat boxes, video players, maps, payment forms, scheduling tools. Not the same as an accessibility overlay, which is asked about below.",
    parts: [{ type: "text", name: "embeds" }],
  },
  {
    id: "prior",
    label: "Prior audit, report, or accessibility statement?",
    hint: "Any earlier accessibility review, conformance report, or published accessibility statement.",
    parts: [{ type: "radio", name: "prior", options: ["Yes, will send by email", "None"] }],
  },
  {
    id: "overlay",
    label: "Accessibility overlay or monitoring product in use?",
    hint: "An “accessibility” toolbar or widget (e.g. UserWay, accessiBe, or AudioEye), or a scanning service like Siteimprove or Monsido.",
    parts: [
      { type: "radio", name: "overlay", options: ["Yes", "No"] },
      { type: "text", name: "overlay_which", label: "If yes, which" },
    ],
  },
  {
    id: "redesign",
    label: "Redesign, migration, or template change planned in the next 90 days?",
    hint: "A new website, CMS change, or template redesign in the next 90 days changes what we would be testing.",
    parts: [
      { type: "radio", name: "redesign", options: ["Yes", "No"] },
      { type: "text", name: "redesign_what", label: "If yes, what" },
    ],
  },
  {
    id: "sr",
    label: "Screen reader testing",
    hint: "Testing with the software blind users rely on. It is the only way to confirm two of the criteria.",
    parts: [{ type: "radio", name: "sr", options: ["Include", "Exclude", "Discuss"] }],
  },
  {
    id: "threshold",
    label: "Direct-purchase threshold, if known",
    hint: "The dollar amount your department can approve without a formal bid. Purchasing will know.",
    parts: [{ type: "text", name: "threshold" }],
  },
  {
    id: "target",
    label: "Target date for the report",
    hint: "When you need it in hand.",
    parts: [{ type: "text", name: "target" }],
  },
];

export type Errors = Record<string, string>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = 500;

/* Required: domain, contact name, contact email, and at least one obligation.
   Keyed by part name; the message is the one shown beside the field. */
export function validate(get: (name: string) => string[]): Errors {
  const e: Errors = {};
  const one = (n: string) => (get(n)[0] || "").trim();
  if (!one("domain")) e.domain = "Enter the primary domain.";
  if (!one("contact_name")) e.contact_name = "Enter the point of contact's name.";
  const em = one("contact_email");
  if (!em) e.contact_email = "Enter the point of contact's email address.";
  else if (!EMAIL.test(em)) e.contact_email = "Enter an email address like name@yourcity.gov.";
  if (get("obligation").length === 0) e.obligation = "Choose at least one obligation, or Unsure.";
  for (const item of ITEMS)
    for (const p of item.parts)
      if (p.type === "text" && one(p.name).length > MAX) e[p.name] = `Keep this under ${MAX} characters.`;
  return e;
}

/* Every answer in checklist order, one [label, value] per item. An item with
   several fields reads as one line ("Unknown. If yes, which: Cloudflare."), with
   blank sub-fields left out. Blank items are kept, so the email and the
   confirmation show what was left open. */
export function answers(get: (name: string) => string[]): [string, string][] {
  return ITEMS.map((item) => {
    const bits: string[] = [];
    for (const p of item.parts) {
      const v = get(p.name).map((s) => s.trim()).filter(Boolean).join(", ");
      if (!v) continue;
      bits.push("label" in p && p.label ? `${p.label}: ${v}` : v);
    }
    return [item.label, item.parts.length > 1 ? bits.join(". ") : bits[0] || ""] as [string, string];
  });
}
