"use client";

import { track } from "@vercel/analytics";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import SubHeading from "@/app/components/SubHeading";
import { sendReadiness, type SendState } from "./actions";
import ErrorSummary from "@/app/components/ErrorSummary";
import { ITEMS, TRAP, fieldLabel, validate, type Errors, type Item, type Part } from "./fields";

// The readiness checklist as a form. Each item is a row: label and hint on the
// left, the answer on the right (stacked below 640px). Single fields use a real
// <label>; items with several controls are a role="group" named by the label,
// so the grid layout never fights a <legend>. Every hint is the description of
// its field or group.
//
// Validation runs here first, so most errors appear without a round trip, then
// again on the server. Errors: a summary that takes focus and links to each
// field, plus the message beside the field (aria-describedby, aria-invalid).
//
// canSend is false when the site has no Resend key: the form still renders, as
// a printable checklist, and the send button gives way to "email it to me".

const inputCls =
  "w-full max-w-md rounded border px-2 py-1.5 text-base bg-white text-neutral-900 ck-input";

function firstName(item: Item) {
  return item.parts[0].name;
}

export default function ReadinessForm({ canSend }: { canSend: boolean }) {
  const [state, action, pending] = useActionState<SendState, FormData>(sendReadiness, { status: "idle" });
  const [clientErrors, setClientErrors] = useState<Errors>({});
  const summaryRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);
  const startRef = useRef<HTMLInputElement>(null);

  // Render time, for the minimum-fill check. Set after hydration so the server
  // and client HTML match.
  useEffect(() => {
    if (startRef.current) startRef.current.value = String(Date.now());
  }, []);

  const errors: Errors = state.status === "invalid" ? state.errors : clientErrors;
  const errorKeys = Object.keys(errors);

  useEffect(() => {
    if (state.status === "invalid") summaryRef.current?.focus();
    if (state.status === "sent") {
      doneRef.current?.focus();
      document.title = "Checklist received | Brian Beals, LLC";
      // A conversion in Vercel Web Analytics (track, no new script).
      track("readiness_submitted");
    }
  }, [state]);

  if (state.status === "sent") {
    return (
      <div className="ck-received">
        <SubHeading ref={doneRef} tabIndex={-1} spacing="mt-0 mb-3">
          Checklist received
        </SubHeading>
        <p className="text-base sm:text-lg leading-relaxed mb-4 text-neutral-800">
          Brian will reply within one business day. Your answers are below; print them for
          your file if you need a copy, since none was emailed to you.
        </p>
        <p className="mb-6 no-print">
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded px-4 py-2 font-semibold text-white"
            style={{ backgroundColor: "var(--btn-bg)" }}
          >
            Print your answers
          </button>
        </p>
        <dl className="ck-answers text-neutral-800">
          {state.answers.map(([k, v]) => (
            <div key={k} className="ck-answer">
              <dt className="font-semibold" style={{ color: "var(--head)" }}>
                {k}
              </dt>
              <dd>{v || <span style={{ color: "var(--muted-ink)" }}>Not answered</span>}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }

  // Submitted by hand rather than through <form action>: React resets a form
  // after its action runs, which would wipe every answer when a send fails.
  function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    const e = validate((n) => fd.getAll(n).map(String));
    setClientErrors(e);
    if (Object.keys(e).length) {
      // Focus after the summary renders.
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    startTransition(() => action(fd));
  }

  const describedBy = (ids: (string | false | undefined)[]) => ids.filter(Boolean).join(" ") || undefined;

  function control(item: Item, p: Part, hintId: string | undefined) {
    if (p.type === "text") {
      const id = `f-${p.name}`;
      const err = errors[p.name];
      const sub = item.subHint?.after === p.name ? `hint-${p.name}` : undefined;
      const input = (
        <input
          id={id}
          name={p.name}
          type={p.inputType || "text"}
          autoComplete={p.autoComplete || "off"}
          aria-required={p.required || undefined}
          aria-invalid={err ? true : undefined}
          aria-describedby={describedBy([err && `err-${p.name}`, hintId, sub])}
          className={inputCls}
          style={{ borderColor: err ? "var(--err)" : "var(--field-border)" }}
        />
      );
      return (
        <div key={p.name} className="ck-field">
          {p.label ? (
            <label htmlFor={id} className="block text-sm font-semibold mb-1">
              {p.label}
              {p.required ? " (required)" : ""}
            </label>
          ) : null}
          {err ? (
            <p id={`err-${p.name}`} className="text-sm font-semibold mb-1" style={{ color: "var(--err)" }}>
              {err}
            </p>
          ) : null}
          {input}
          {sub ? (
            <span id={sub} className="hint">
              {item.subHint!.text}
            </span>
          ) : null}
        </div>
      );
    }
    const err = errors[p.name];
    return (
      <div
        key={p.name}
        role={p.type === "radio" ? "radiogroup" : "group"}
        aria-labelledby={`q-${item.id}`}
        aria-describedby={describedBy([err && `err-${p.name}`, `hint-${item.id}`])}
        id={`f-${p.name}`}
        tabIndex={err ? -1 : undefined}
        className="ck-field"
      >
        {err ? (
          <p id={`err-${p.name}`} className="text-sm font-semibold mb-1" style={{ color: "var(--err)" }}>
            {err}
          </p>
        ) : null}
        <span className="flex flex-wrap gap-x-5 gap-y-1">
          {p.options.map((o) => (
            <label key={o} className="inline-flex items-center gap-2 ck-opt">
              <input
                type={p.type}
                name={p.name}
                value={o}
                className="ck-tick"
                aria-invalid={err ? true : undefined}
              />
              {o}
            </label>
          ))}
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="ck-form">
      {errorKeys.length ? (
        <ErrorSummary
          ref={summaryRef}
          level={3}
          className="doc-note stop bg-white mb-6 no-print"
          items={errorKeys.map((k) => ({ target: `f-${k}`, label: fieldLabel(k), message: errors[k] }))}
        />
      ) : null}

      {state.status === "error" ? (
        <div role="alert" className="doc-note stop bg-white mb-6">
          <p>
            <strong>Not sent</strong>. {state.message}
          </p>
        </div>
      ) : null}

      <p className="text-sm mb-4 no-print" style={{ color: "var(--muted-ink)" }}>
        Required: primary domain, contact name and email, and which obligation applies.
        Everything else can be left blank.
      </p>

      <div className="ck-list text-neutral-800">
        {ITEMS.map((item) => {
          const single = item.parts.length === 1 && item.parts[0].type === "text";
          const hintId = `hint-${item.id}`;
          const required = item.parts.some((p) => "required" in p && p.required);
          const labelText = (
            <>
              {item.label}
              {required ? <span className="ck-req"> (required)</span> : null}
            </>
          );
          return (
            <div key={item.id} className="ck-row">
              <div className="ck-q">
                {single ? (
                  <label htmlFor={`f-${firstName(item)}`} id={`q-${item.id}`} className="font-semibold">
                    {labelText}
                  </label>
                ) : (
                  <span id={`q-${item.id}`} className="font-semibold">
                    {labelText}
                  </span>
                )}
                <span id={hintId} className="hint">
                  {item.hint}
                </span>
              </div>
              <div className="ck-a">
                {item.parts.map((p) => control(item, p, single || p.type === "text" ? hintId : undefined))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Honeypot: off screen, out of the tab order and the accessibility tree,
          with a meaningless name and no label text, so AutoFill has nothing to match
          (Safari filled the old "Company website" one). A filled trap no longer
          drops the submission; it marks the email "[check: ...]" (actions.ts). */}
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

      <div className="mt-8 no-print">
        {canSend ? (
          <>
            <p className="text-sm mb-3" style={{ color: "var(--muted-ink)" }}>
              Sent to Brian Beals by email. Not stored on this site. Used only to scope your
              evaluation.
            </p>
            <button
              type="submit"
              disabled={pending}
              className="rounded px-5 py-2.5 font-semibold text-white disabled:opacity-70"
              style={{ backgroundColor: "var(--btn-bg)" }}
            >
              {pending ? "Sending…" : "Send the checklist"}
            </button>
            {/* Announces the pending state to screen readers without moving focus. */}
            <span role="status" className="sr-only">
              {pending ? "Sending the checklist" : ""}
            </span>
          </>
        ) : (
          <p className="text-base sm:text-lg leading-relaxed text-neutral-800">
            Print this page and email the checklist to{" "}
            <a href="mailto:brian@brianbeals.com" className="underline underline-offset-4" style={{ color: "var(--link)" }}>
              brian@brianbeals.com
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
