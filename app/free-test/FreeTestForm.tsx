"use client";

import { track } from "@vercel/analytics";
import Script from "next/script";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import BookCallLink from "@/app/components/BookCallLink";
import ErrorSummary from "@/app/components/ErrorSummary";
import SubHeading from "@/app/components/SubHeading";
import { requestFreeTest, type RequestState } from "./actions";
import { ORGS, TRAP, errorLabel, errorTarget, validate, type Errors } from "./fields";

// The free-test request form. Same patterns as the contact form
// (app/contact/ContactForm.tsx): validation here first and again on the server;
// on errors, a summary whose heading takes focus and names every error, plus the
// message beside the field (aria-invalid, aria-describedby); a status region that
// says "Sending…"; on success the form gives way to "Thank you. Check your
// email.", which takes focus so a screen reader announces it, over the address the
// link went to, what happens next (the How It Works steps in short), the spam
// folder line and a "Book a 15-minute call" link (book_call_click, placement
// free-test-confirm, 2026-10-25).
//
// Cloudflare Turnstile sits above the button (its script loads on this page only)
// and puts its token in the form as cf-turnstile-response; the action checks it
// on the server. A token works once, so the widget is reset after any refused
// send. It is rendered explicitly so a narrow screen gets the compact widget:
// the normal one is a fixed 300px iframe, 4px wider than the form at 320px.
//
// Signed in to /desk, a send is Brian's own check (actions.ts): the action answers
// "owner" and the form gives way to one line naming the site and where the report
// goes, with no "Can't get past the check?" line under it. The form itself looks
// the same either way; the server ignores the typed address.
//
// The "Can't get past the check?" line is the way past Turnstile when its check
// fails (2026-10-22): the ACR's 1.1.1 answer for /free-test names it as the
// alternative route. It lives here so owner mode can leave it out.

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, string>) => string;
      reset: (el?: string | HTMLElement) => void;
    };
  }
}

const link = "underline underline-offset-4 hover:no-underline";
const body = "text-base sm:text-lg leading-relaxed text-neutral-800";

const checkHelp = (
  <p className="mt-6 text-base leading-relaxed text-neutral-800">
    Can&apos;t get past the check? Email{" "}
    <a href="mailto:brian@brianbeals.com" className={link} style={{ color: "var(--link)" }}>
      brian@brianbeals.com
    </a>{" "}
    and I&apos;ll run it for you.
  </p>
);

const inputCls = "w-full rounded border px-3 py-2 text-base bg-white text-neutral-900";
const labelCls = "block font-semibold mb-1";

export default function FreeTestForm({ siteKey, source }: { siteKey: string; source: string }) {
  const [state, action, pending] = useActionState<RequestState, FormData>(requestFreeTest, {
    status: "idle",
  });
  const [clientErrors, setClientErrors] = useState<Errors>({});
  const summaryRef = useRef<HTMLHeadingElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);
  const ownerRef = useRef<HTMLParagraphElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const renderWidget = () => {
    const el = widgetRef.current;
    if (!el || !window.turnstile || el.childElementCount) return;
    window.turnstile.render(el, {
      sitekey: siteKey,
      theme: "auto",
      size: window.innerWidth < 380 ? "compact" : "normal",
    });
  };

  const errors: Errors = state.status === "invalid" ? state.errors : clientErrors;
  const errorKeys = Object.keys(errors);

  useEffect(() => {
    if (state.status === "invalid") summaryRef.current?.focus();
    if (state.status === "error" || state.status === "invalid") window.turnstile?.reset();
    if (state.status === "sent") {
      doneRef.current?.focus();
      document.title = "Check Your Email | Brian Beals, LLC";
      track("free_check_submitted");
    }
    // Not a conversion: no analytics event for Brian's own checks.
    if (state.status === "owner") {
      ownerRef.current?.focus();
      document.title = "Running | Brian Beals, LLC";
    }
  }, [state]);

  if (state.status === "owner") {
    return (
      <p ref={ownerRef} tabIndex={-1} className={body}>
        Running {state.domain}. The report will come to brian@brianbeals.com in about <span className="whitespace-nowrap">2–4 minutes</span>.
      </p>
    );
  }

  if (state.status === "sent") {
    return (
      <>
        <div>
          {/* Sentence case on purpose (Brian, 2026-10-25), like the home hero's H1. */}
          <SubHeading level={2} ref={doneRef} tabIndex={-1} spacing="mt-0 mb-3">
            Thank you. Check your email.
          </SubHeading>
          <p className={`${body} mb-4`}>
            We sent a confirmation link to <strong className="[overflow-wrap:anywhere]">{state.email}</strong>. Click it within three
            business days and your check starts.
          </p>
          <p className={`${body} mb-4`}>
            What happens next: the scanner checks up to 10 pages and 10 linked PDFs, I review the results myself, and
            the report usually arrives by the next business day.
          </p>
          <p className={`${body} mb-4`}>
            Didn&apos;t get the email? Check your spam folder, or write to{" "}
            <a href="mailto:brian@brianbeals.com" className={link} style={{ color: "var(--link)" }}>
              brian@brianbeals.com
            </a>
            .
          </p>
          <p className={body}>
            <BookCallLink placement="free-test-confirm" className={link} style={{ color: "var(--link)" }}>
              Book a 15-minute call
            </BookCallLink>
          </p>
        </div>
        {checkHelp}
      </>
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
  const border = (bad: boolean) => ({
    borderColor: bad ? "var(--err)" : "var(--field-border)",
  });
  const field = (
    name: "url" | "email",
    label: string,
    hint: string,
    props: React.InputHTMLAttributes<HTMLInputElement>,
  ) => (
    <div className="mb-5">
      <label htmlFor={`ft-${name}`} className={labelCls}>
        {label} <span className="font-normal">(required)</span>
      </label>
      <p id={`ft-hint-${name}`} className="hint mb-1">
        {hint}
      </p>
      {errors[name] ? (
        <p id={`ft-err-${name}`} className="text-sm font-semibold mb-1" style={{ color: "var(--err)" }}>
          {errors[name]}
        </p>
      ) : null}
      <input
        id={`ft-${name}`}
        name={name}
        aria-required="true"
        aria-invalid={errors[name] ? true : undefined}
        aria-describedby={ids(errors[name] && `ft-err-${name}`, `ft-hint-${name}`)}
        className={inputCls}
        style={border(Boolean(errors[name]))}
        {...props}
      />
    </div>
  );

  return (
    <>
      <form method="post" onSubmit={onSubmit} noValidate className="max-w-xl">
        {/* The QR or link the visitor arrived by (?ref=), for the request event. */}
        {source ? <input type="hidden" name="ref" value={source} /> : null}
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onReady={renderWidget}
        />

        {errorKeys.length ? (
          <ErrorSummary
            ref={summaryRef}
            items={errorKeys.map((k) => ({
              target: errorTarget(k),
              label: errorLabel[k] || k,
              message: errors[k],
            }))}
          />
        ) : null}

        {state.status === "error" ? (
          <div role="alert" className="doc-note stop bg-white mb-6">
            <p>
              <strong>Not sent</strong>. {state.message}
            </p>
          </div>
        ) : null}

        {field("url", "Website", "The home page of the site to check, such as www.yourcity.gov.", {
          type: "text",
          inputMode: "url",
          autoComplete: "url",
          spellCheck: false,
          autoCapitalize: "none",
        })}
        {field(
          "email",
          "Work email",
          "An address on the site's own domain, such as name@yourcity.gov. The report goes here.",
          {
            type: "email",
            autoComplete: "email",
            spellCheck: false,
            autoCapitalize: "none",
          },
        )}

        <div className="mb-5">
          <label htmlFor="ft-org" className={labelCls}>
            What kind of organization? <span className="font-normal">(optional)</span>
          </label>
          <select
            id="ft-org"
            name="org"
            defaultValue=""
            className={inputCls}
            style={{ borderColor: "var(--field-border)" }}
          >
            <option value="">Choose one</option>
            {ORGS.map(([k, label]) => (
              <option key={k} value={k}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Honeypot: off screen, out of the tab order and the accessibility tree,
          with a meaningless name. Filled, the request is answered like any other
          and nothing is sent (actions.ts). */}
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

        <div ref={widgetRef} className="mb-4" />

        <p className="text-sm mb-3" style={{ color: "var(--muted-ink)" }}>
          Sent to Brian Beals by email. Not stored on this site.
        </p>
        <button
          type="submit"
          disabled={pending}
          className="rounded px-5 py-2.5 font-semibold text-white disabled:opacity-70"
          style={{ backgroundColor: "var(--btn-bg)" }}
        >
          {pending ? "Sending…" : "Request the free check"}
        </button>
        <span role="status" className="sr-only">
          {pending ? "Sending…" : ""}
        </span>
      </form>
      {checkHelp}
    </>
  );
}
