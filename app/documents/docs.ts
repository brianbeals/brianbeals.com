// The capability statements, one source for /documents and sitemap.xml (2026-10-31),
// so the sitemap lists every statement's HTML and PDF and cannot drift from the page.

export type Doc = {
  name: string;
  note: string;
  html: string | null;
  pdf: string;
  // Page 1 of the PDF, written by scripts/build_capability_web.py.
  thumb: string;
};

export const docs: Doc[] = [
  {
    name: "Section 504 Digital Accessibility for Healthcare",
    note: "45 CFR Part 84, WCAG 2.1 AA, and the May 11 2027 deadline for recipients of HHS funding.",
    html: "/capability-statement-accessibility-healthcare.html",
    pdf: "/Brian-Beals-LLC-Accessibility-Capability-Statement-Healthcare.pdf",
    thumb: "/thumbs/capability-statement-accessibility-healthcare.png",
  },
  // Published 2026-10-24. No program page of its own; /accessibility/healthcare
  // covers the rule.
  {
    name: "Section 504 for HHS-Funded Nonprofits",
    note: "Aging services, early learning and Head Start, behavioral health.",
    html: "/capability-statement-accessibility-nonprofit.html",
    pdf: "/Brian-Beals-LLC-Accessibility-Capability-Statement-Nonprofit.pdf",
    thumb: "/thumbs/capability-statement-accessibility-nonprofit.png",
  },
  {
    name: "ADA Title II Digital Accessibility",
    note: "28 CFR 35.200 for state and local government, and the April 26 2027 deadline.",
    html: "/capability-statement-accessibility.html",
    pdf: "/Brian-Beals-LLC-Accessibility-Capability-Statement.pdf",
    thumb: "/thumbs/capability-statement-accessibility.png",
  },
  {
    name: "Section 508 Digital Accessibility",
    note: "Federal agencies and their contractors.",
    html: "/capability-statement-accessibility-federal.html",
    pdf: "/Brian-Beals-LLC-Accessibility-Capability-Statement-Federal.pdf",
    thumb: "/thumbs/capability-statement-accessibility-federal.png",
  },
  {
    name: "Maryland Digital Accessibility and Nonvisual Access",
    note: "The § 3.5-311 nonvisual access clause, and the CATS+ vehicle.",
    html: "/capability-statement-accessibility-maryland.html",
    pdf: "/Brian-Beals-LLC-Accessibility-Capability-Statement-Maryland.pdf",
    thumb: "/thumbs/capability-statement-accessibility-maryland.png",
  },
];
