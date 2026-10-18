"use client";

import Script from "next/script";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import ErrorSummary from "@/app/components/ErrorSummary";
import SubHeading from "@/app/components/SubHeading";
import { requestFreeTest, type RequestState } from "./actions";
import { ORGS, TRAP, errorLabel, errorTarget, validate, type Errors } from "./fields";

// The free-test request form. Same patterns as the contact form
// (app/contact/ContactForm.tsx): validation here first and again on the server;
// on errors, a summary whose heading takes focus and names every error, plus the
// message beside the field (aria-invalid, aria-describedby); a status region that
// says "Sending…"; on success the form gives way to "Check your email", which
// takes focus.
//
// Cloudflare Turnstile sits above the button (its script loads on this page only)
// and puts its token in the form as cf-turnstile-response; the action checks it
// on the server. A token works once, so the widget is reset after any refused
// send. It is rendered explicitly so a narrow screen gets the compact widget:
// the normal one is a fixed 300px iframe, 4px wider than the form at 320px.

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, string>) => string;
      reset: (el?: string | HTMLElement) => void;
    };
  }
}

const inputCls = "w-full rounded border px-3 py-2 text-base bg-white text-neutral-900";
const labelCls = "block font-semibold mb-1";

export default function FreeTestForm({ siteKey }: { siteKey: string }) {
  const [state, action, pending] = useActionState<RequestState, FormData>(requestFreeTest, { status: "idle" });
  const [clientErrors, setClientErrors] = useState<Errors>({});
  const summaryRef = useRef<HTMLHeadingElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);
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
      document.title = "Check your email | Brian Beals, LLC";
    }
  }, [state]);

  if (state.status === "sent") {
    return (
      <div>
        <SubHeading level={2} ref={doneRef} tabIndex={-1} spacing="mt-0 mb-3">
          Check your email
        </SubHeading>
        <p className="text-base sm:text-lg leading-relaxed text-neutral-800 mb-4">
          A message from freetest@forms.brianbeals.com is on its way. The check starts only after you
          confirm it.
        </p>
        <p className="text-base leading-relaxed text-neutral-800">
          If nothing arrives within ten minutes, check your spam folder, or email
          brian@brianbeals.com.
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
  const border = (bad: boolean) => ({ borderColor: bad ? "var(--err)" : "var(--field-border)" });
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
    <form onSubmit={onSubmit} noValidate className="max-w-xl">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={renderWidget}
      />

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
        { type: "email", autoComplete: "email", spellCheck: false, autoCapitalize: "none" },
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
  );
}
