// The contact form's fields and their checks, shared by the form (client) and the
// action (server) so both report the same errors in the same words.

export type Errors = Record<string, string>;

export const FIELDS = [
  { name: "name", label: "Name", required: true, autoComplete: "name", type: "text" },
  { name: "org", label: "Organization", required: false, autoComplete: "organization", type: "text" },
  { name: "email", label: "Email", required: false, autoComplete: "email", type: "email" },
  { name: "phone", label: "Phone", required: false, autoComplete: "tel", type: "tel" },
  { name: "message", label: "Message", required: true, autoComplete: "off", type: "textarea" },
] as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = 200;
const MAX_MESSAGE = 5_000;

/* Name and message are required. Email and phone are each optional, but one of
   them has to be there, so there is a way to reply. That error belongs to the pair:
   it is keyed "reach" and the form shows it on the fieldset that holds both. A
   wrong email or a short phone number is keyed to its own field. */
export function validate(get: (name: string) => string): Errors {
  const e: Errors = {};
  const name = get("name").trim();
  const email = get("email").trim();
  const phone = get("phone").trim();
  const message = get("message").trim();
  if (!name) e.name = "Enter your name.";
  else if (name.length > MAX) e.name = `Keep your name under ${MAX} characters.`;
  if (get("org").trim().length > MAX) e.org = `Keep the organization under ${MAX} characters.`;
  if (!email && !phone) e.reach = "Enter an email address or a phone number, so I can reply.";
  if (email && !EMAIL.test(email)) e.email = "Enter an email address like name@yourcity.gov.";
  if (phone && phone.replace(/\D/g, "").length < 7) e.phone = "Enter a phone number with its area code.";
  if (!message) e.message = "Enter a message.";
  else if (message.length > MAX_MESSAGE) e.message = `Keep the message under ${MAX_MESSAGE.toLocaleString("en-US")} characters.`;
  return e;
}

/* Where each error's summary link points: the field, or for "reach" the email
   field, the first of the pair. */
export const errorTarget = (key: string) => (key === "reach" ? "c-email" : `c-${key}`);

/* The honeypot's field name. Meaningless on purpose, as on the readiness form:
   AutoFill matches names like "company" or "website" and fills off-screen fields. */
export const TRAP = "f_r3x9";
