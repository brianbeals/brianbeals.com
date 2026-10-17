"use client";

import { useEffect, useRef } from "react";

/*
 * Copy buttons for the desk's client-shareable tables (2026-10-17).
 *
 * desk.html (private repo) marks a table, a definition list, or the allowlist
 * email with data-shareable="true" and names it with data-copy-label. This adds a
 * real <button> above each one after the page loads, so a new shareable table
 * needs only the attribute. Anything marked data-internal never reaches the
 * clipboard: an internal row or element is dropped, an internal cell is emptied
 * so the columns still line up.
 *
 * A table copies twice over, as text/html (inline styles only, since Proton and
 * Outlook strip classes: navy header row, light row headers, 1px #BFBFBF borders,
 * 14px system font, and a source line under it) and as text/plain (tab-separated
 * rows). The email (data-copy-kind="email") copies as plain text with its
 * paragraphs intact. Without the Clipboard API the clean copy is selected
 * instead and the live region says to press Cmd-C.
 */

const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const CELL = "border:1px solid #BFBFBF;padding:6px 10px;text-align:left;vertical-align:top";
const HEAD = `${CELL};background:#1E3A5F;color:#FFFFFF;font-weight:700`;
const ROWHEAD = `${CELL};background:#D6EAF8;color:#1E3A5F;font-weight:700`;
const DATA = `${CELL};background:#FFFFFF;color:#1A1A1A`;
const SOURCE = "Brian Beals, LLC · brianbeals.com";

type Cell = { text: string; head: "col" | "row" | null; span: number };

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* Visible text of a node: <br> becomes a newline, other whitespace collapses. */
function textOf(node: Node): string {
  let out = "";
  node.childNodes.forEach((n) => {
    if (n.nodeType === Node.TEXT_NODE) out += n.textContent;
    else if (n.nodeName === "BR") out += "\n";
    else out += textOf(n);
  });
  return out.replace(/[ \t\r\f\v]+/g, " ").replace(/ ?\n ?/g, "\n").trim();
}

/* A copy of the element with everything desk-only taken out. */
function clean(el: Element): Element {
  const c = el.cloneNode(true) as Element;
  c.querySelectorAll("[data-internal]").forEach((n) => {
    if (n.tagName === "TD" || n.tagName === "TH") n.textContent = "";
    else n.remove();
  });
  return c;
}

function rowsOf(el: Element): Cell[][] {
  if (el.tagName === "DL") {
    const rows: Cell[][] = [];
    el.querySelectorAll(":scope > dt").forEach((dt) => {
      const dd = dt.nextElementSibling;
      rows.push([
        { text: textOf(dt), head: "row", span: 1 },
        { text: dd && dd.tagName === "DD" ? textOf(dd) : "", head: null, span: 1 },
      ]);
    });
    return rows;
  }
  return [...el.querySelectorAll("tr")].map((tr) =>
    [...tr.children].map((c) => ({
      text: textOf(c),
      head: c.tagName === "TH" ? (c.closest("thead") ? "col" : "row") : null,
      span: Number(c.getAttribute("colspan")) || 1,
    })),
  );
}

function tableHtml(rows: Cell[][]): string {
  const body = rows
    .map((r) => {
      const cells = r
        .map((c) => {
          const tag = c.head ? "th" : "td";
          const style = c.head === "col" ? HEAD : c.head === "row" ? ROWHEAD : DATA;
          const bg = c.head === "col" ? "#1E3A5F" : c.head === "row" ? "#D6EAF8" : "#FFFFFF";
          const span = c.span > 1 ? ` colspan="${c.span}"` : "";
          return `<${tag}${span} bgcolor="${bg}" style="${style}">${esc(c.text).replace(/\n/g, "<br>")}</${tag}>`;
        })
        .join("");
      return `<tr>${cells}</tr>`;
    })
    .join("");
  return (
    `<meta charset="utf-8"><div style="font-family:${FONT};font-size:14px;line-height:1.45;color:#1A1A1A">` +
    `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:${FONT};font-size:14px;line-height:1.45">${body}</table>` +
    `<p style="font-family:${FONT};font-size:12px;color:#5B6470;margin:6px 0 0">${esc(SOURCE)}</p></div>`
  );
}

const tablePlain = (rows: Cell[][]) =>
  rows.map((r) => r.map((c) => c.text.replace(/\s+/g, " ")).join("\t")).join("\n");

/* Paragraphs separated by a blank line; line breaks inside one kept. */
const emailPlain = (el: Element) =>
  [...el.querySelectorAll("p")].map(textOf).filter(Boolean).join("\n\n");

export default function DeskCopy() {
  const status = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const say = (msg: string) => {
      const s = status.current;
      if (!s) return;
      // Clear first so the same message twice is still announced.
      s.textContent = "";
      window.setTimeout(() => (s.textContent = msg), 50);
    };

    let holder: HTMLDivElement | null = null;
    /* No Clipboard API: put the clean copy where it can be selected, select it. */
    const selectClean = (node: Element) => {
      holder?.remove();
      holder = document.createElement("div");
      holder.className = "desk-copy-holder";
      holder.setAttribute("aria-hidden", "true");
      holder.appendChild(node);
      document.body.appendChild(holder);
      const range = document.createRange();
      range.selectNodeContents(holder);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    };

    const added: Element[] = [];
    document.querySelectorAll('.desk [data-shareable="true"]').forEach((el) => {
      if (el.hasAttribute("data-copy-ready")) return;
      el.setAttribute("data-copy-ready", "");
      const email = el.getAttribute("data-copy-kind") === "email";
      const verb = email ? "Copy email" : "Copy table";
      const label = el.getAttribute("data-copy-label") || el.querySelector("caption")?.textContent || "";

      const bar = document.createElement("div");
      bar.className = "desk-copy-bar";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "desk-copy";
      btn.textContent = verb;
      btn.setAttribute("aria-label", label ? `${verb}: ${label}` : verb);
      const note = document.createElement("span");
      note.className = "desk-copy-note";
      note.setAttribute("aria-hidden", "true");
      bar.append(btn, note);

      btn.addEventListener("click", async () => {
        const c = clean(el);
        let plain: string;
        let html: string | null = null;
        if (email) {
          plain = emailPlain(c);
        } else {
          const rows = rowsOf(c).filter((r) => r.some((x) => x.text));
          plain = tablePlain(rows);
          html = tableHtml(rows);
        }
        const show = (msg: string) => {
          note.textContent = msg;
          window.setTimeout(() => (note.textContent = ""), 4000);
        };
        const fallback = (why?: string) => {
          if (html) {
            const d = document.createElement("div");
            d.innerHTML = html;
            selectClean(d);
          } else {
            const pre = document.createElement("pre");
            pre.textContent = plain;
            selectClean(pre);
          }
          const msg = "Selected. Press Cmd-C.";
          say(why ? `${why} ${msg}` : msg);
          show(msg);
        };
        if (!navigator.clipboard?.write || typeof ClipboardItem === "undefined") return fallback();
        try {
          const parts: Record<string, Blob> = { "text/plain": new Blob([plain], { type: "text/plain" }) };
          if (html) parts["text/html"] = new Blob([html], { type: "text/html" });
          await navigator.clipboard.write([new ClipboardItem(parts)]);
          say(`Copied${label ? `: ${label}` : ""}.`);
          show("Copied");
        } catch (e) {
          fallback(`Couldn't copy (${(e as Error).name || "error"}).`);
        }
      });

      const anchor = el.closest(".table-scroll") || el;
      anchor.before(bar);
      added.push(bar);
    });

    return () => {
      added.forEach((b) => b.remove());
      document.querySelectorAll("[data-copy-ready]").forEach((el) => el.removeAttribute("data-copy-ready"));
      holder?.remove();
    };
  }, []);

  return <div ref={status} role="status" aria-live="polite" className="sr-only" />;
}
