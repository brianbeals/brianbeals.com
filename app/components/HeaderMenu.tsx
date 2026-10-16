"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navLinks } from "./nav-links";

/**
 * The main nav and, below 1024px, the Menu button that shows and hides it
 * (2026-10-16). From 1024px the button is hidden and the list is always shown in
 * the bar, as before.
 *
 * Source order is button, then list, so Tab from an open button moves straight
 * into the links. The button keeps focus when it opens the list. Escape closes it
 * and returns focus to the button; following a link, or a click outside the
 * header, closes it.
 *
 * WITHOUT JAVASCRIPT THE LINKS SHOW. The list is collapsed only under html.js
 * (set by an inline script in app/layout.tsx before first paint), and the button
 * only shows there. If the script runs but this component never mounts, that
 * script removes html.js after three seconds, so the nav is never hidden for good.
 */
export default function HeaderMenu() {
  // The path the list was opened on. It counts as open only there, so moving to
  // another page (a link, Back, Forward) leaves it closed without an effect.
  const pathname = usePathname();
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const close = () => setOpenOn(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.documentElement.classList.add("menu-ready");
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        buttonRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      const header = buttonRef.current?.closest("header");
      if (header && !header.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="menu-btn"
        aria-expanded={open}
        aria-controls="site-nav-list"
        onClick={() => setOpenOn(open ? null : pathname)}
      >
        {/* Three bars, decorative: the word Menu is the name. */}
        <svg viewBox="0 0 16 12" width="16" height="12" aria-hidden="true" focusable="false">
          <path d="M0 1h16M0 6h16M0 11h16" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
        Menu
      </button>
      <nav aria-label="Main" className="site-nav" data-open={open || undefined}>
        <ul id="site-nav-list">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={close} className="hover:underline underline-offset-4">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
