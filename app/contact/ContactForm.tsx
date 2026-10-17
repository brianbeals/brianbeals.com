"use client";

import { track } from "@vercel/analytics";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import SubHeading from "@/app/components/SubHeading";
import { sendContact, type ContactState } from "./actions";
import ErrorSummary from "@/app/components/ErrorSummary";
import { TRAP, errorLabel, errorTarget, validate, type Errors } from "./fields";

// The contact form. Same patterns as the readiness checklist
// (app/accessibility/before-we-start/ReadinessForm.tsx): validation here first and
// again on the server; on errors, a summary that takes focus and links to each
// field, plus the message beside the field (aria-invalid, aria-describedby); a
// status region that says "Sending…"; and on success the form gives way to
// "Message received", which takes focus.
//
// Email and phone sit in one fieldset because one of them is required, not each.
// That error ("reach") is shown under the fieldset's legend, and both fields are
// marked invalid and described by it, so either field announces why.
//
// The send counts as a conversion in Vercel Web Analytics (track, no new script).
// canSend is false when the site has no Resend key: the page then shows email and
// phone only.

const inputCls = "w-full rounded border px-3 py-2 text-base bg-white text-neutral-900";
const labelCls = "block font-semibold mb-1";

export default function ContactForm({ canSend }: { canSend: boolean }) {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, { status: "idle" });
  const [clientErrors, setClientErrors] = useState<Errors>({});
  const summaryRef = useRef<HTMLHeadingElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);
  const startRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (startRef.current) startRef.current.value = String(Date.now());
  }, []);

  const errors: Errors = state.status === "invalid" ? state.errors : clientErrors;
  const errorKeys = Object.keys(errors);

  useEffect(() => {
    if (state.status === "invalid") summaryRef.current?.focus();
    if (state.status === "sent") {
      doneRef.current?.focus();
      document.title = "Message received | Brian Beals, LLC";
      track("contact_submitted");
    }
  }, [state]);

  if (!canSend) {
    return (
      <p className="text-base sm:text-lg leading-relaxed text-neutral-800">
        Email or call, using the details on this page.
      </p>
    );
  }

  if (state.status === "sent") {
    return (
      <div>
        <SubHeading level={2} ref={doneRef} tabIndex={-1} spacing="mt-0 mb-3">
          Message received
        </SubHeading>
        <p className="text-base sm:text-lg leading-relaxed text-neutral-800">
          Brian will reply within one business day.
        </p>
      </div>
    );
  }

  function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    const e = validate((n) => String(fd.get(n) || ""));
    setClientErrors(e);
    if (Object.keys(e).length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    startTransition(() => action(fd));
  }

  const ids = (...xs: (string | false | undefined)[]) => xs.filter(Boolean).join(" ") || undefined;
  const fieldErr = (name: string) =>
    errors[name] ? (
      <p id={`c-err-${name}`} className="text-sm font-semibold mb-1" style={{ color: "var(--err)" }}>
        {errors[name]}
      </p>
    ) : null;
  const border = (bad: boolean) => ({ borderColor: bad ? "var(--err)" : "var(--field-border)" });

  // Email and phone: invalid if their own check failed or the pair is empty.
  const pair = (name: "email" | "phone", type: "email" | "tel", autoComplete: string, label: string) => {
    const bad = Boolean(errors[name] || errors.reach);
    return (
      <div className="mb-4">
        <label htmlFor={`c-${name}`} className={labelCls}>
          {label}
        </label>
        {fieldErr(name)}
        <input
          id={`c-${name}`}
          name={name}
          type={type}
          autoComplete={autoComplete}
          aria-invalid={bad || undefined}
          aria-describedby={ids(errors[name] && `c-err-${name}`, errors.reach && "c-err-reach", "c-reach-hint")}
          className={inputCls}
          style={border(bad)}
        />
      </div>
    );
  };

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-xl">
      {errorKeys.length ? (
        <ErrorSummary
          ref={summaryRef}
          items={errorKeys.map((k) => ({ target: errorTarget(k), label: errorLabel[k] || k, message: errors[k] }))}
        />
      ) : null}

      {state.status === "error" ? (
        <div role="alert" className="doc-note stop bg-white mb-6">
          <p>
            <strong>Not sent</strong>. {state.message}
          </p>
        </div>
      ) : null}

      <div className="mb-4">
        <label htmlFor="c-name" className={labelCls}>
          Name <span className="font-normal">(required)</span>
        </label>
        {fieldErr("name")}
        <input
          id="c-name"
          name="name"
          type="text"
          autoComplete="name"
          aria-required="true"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={ids(errors.name && "c-err-name")}
          className={inputCls}
          style={border(Boolean(errors.name))}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="c-org" className={labelCls}>
          Organization <span className="font-normal">(optional)</span>
        </label>
        {fieldErr("org")}
        <input
          id="c-org"
          name="org"
          type="text"
          autoComplete="organization"
          aria-invalid={errors.org ? true : undefined}
          aria-describedby={ids(errors.org && "c-err-org")}
          className={inputCls}
          style={border(Boolean(errors.org))}
        />
      </div>

      <fieldset className="mb-4">
        <legend className="font-semibold mb-1">How to reach you</legend>
        <p id="c-reach-hint" className="hint mb-2">
          Email or phone, at least one.
        </p>
        {errors.reach ? (
          <p id="c-err-reach" className="text-sm font-semibold mb-2" style={{ color: "var(--err)" }}>
            {errors.reach}
          </p>
        ) : null}
        {pair("email", "email", "email", "Email")}
        {pair("phone", "tel", "tel", "Phone")}
      </fieldset>

      <div className="mb-6">
        <label htmlFor="c-message" className={labelCls}>
          Message <span className="font-normal">(required)</span>
        </label>
        {fieldErr("message")}
        <textarea
          id="c-message"
          name="message"
          rows={6}
          aria-required="true"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={ids(errors.message && "c-err-message")}
          className={inputCls}
          style={border(Boolean(errors.message))}
        />
      </div>

      {/* Honeypot: off screen, out of the tab order and the accessibility tree,
          with a meaningless name, as on the readiness form. A filled trap marks the
          email "[check: ...]"; it never drops the message (lib/form-mail.ts). */}
      <div aria-hidden="true" className="ck-hp">
        <input
          type="text"
          name={TRAP}
          id={TRAP}
          tabIndex={-1}
          autoComplete="off"
          data-1p-ignore=""
          data-lpignore="true"
          data-form-type="other"
          aria-label="Leave empty"
          defaultValue=""
        />
      </div>
      <input ref={startRef} type="hidden" name="t" defaultValue="" />

      <p className="text-sm mb-3" style={{ color: "var(--muted-ink)" }}>
        Sent to Brian Beals by email. Not stored on this site.
      </p>
      <button
        type="submit"
        disabled={pending}
        className="rounded px-5 py-2.5 font-semibold text-white disabled:opacity-70"
        style={{ backgroundColor: "var(--btn-bg)" }}
      >
        {pending ? "Sending…" : "Send message"}
      </button>
      {/* Announces the pending state without moving focus. */}
      <span role="status" className="sr-only">
        {pending ? "Sending…" : ""}
      </span>
    </form>
  );
}
