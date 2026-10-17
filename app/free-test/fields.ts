// The free-test form's fields and checks, shared by the form (client) and the
// action (server) so both report the same errors in the same words, as on the
// contact form (app/contact/fields.ts).
//
// Only the shape is checked here. Whether the site resolves to a public address,
// whether the email is on the site's own domain, and every rate limit are the
// engine's (a11y-audit free_test/engine.py), and every one of those paths ends in
// the same response on this site.

export type Errors = Record<string, string>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// A host name with at least one dot, optionally with a scheme and a path.
const SITE = /^(https?:\/\/)?[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+(:\d+)?(\/\S*)?$/i;
const MAX = 300;

export function validate(get: (name: string) => string): Errors {
  const e: Errors = {};
  const url = get("url").trim();
  const email = get("email").trim();
  if (!url) e.url = "Enter your website's address.";
  else if (url.length > MAX || !SITE.test(url)) e.url = "Enter a website address like www.yourcity.gov.";
  if (!email) e.email = "Enter your work email address.";
  else if (email.length > MAX || !EMAIL.test(email)) e.email = "Enter an email address like name@yourcity.gov.";
  return e;
}

export const errorLabel: Record<string, string> = { url: "Website", email: "Work email" };
export const errorTarget = (key: string) => `ft-${key}`;

/* The honeypot's field name. Meaningless on purpose: AutoFill matches names like
   "company" or "website" and fills off-screen fields (readiness form, 2026-10-15). */
export const TRAP = "f_q7m2";
