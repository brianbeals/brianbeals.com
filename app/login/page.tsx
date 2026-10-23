"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function LoginForm() {
  const params = useSearchParams();
  // Only a path on this site, never another origin: "//evil.example" and
  // "https://..." both fall back to the desk.
  const asked = params.get("next") || "";
  const next = asked.startsWith("/") && !asked.startsWith("//") && !asked.startsWith("/\\") ? asked : "/desk";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setBusy(false);
    if (res.ok) {
      // A full load rather than router.push: the desk's dashboards are route
      // handlers, not pages, and need a real navigation with the new cookie.
      window.location.assign(next);
    } else {
      setError("Incorrect password.");
    }
  }

  return (
    <form method="post" onSubmit={submit} className="space-y-4">
      {/* 3.3.2 / 4.1.2. A placeholder disappears on first keystroke and is not a
          reliable accessible name, so the field carries a real label. */}
      <label htmlFor="site-password" className="sr-only">
        Password
      </label>
      <input
        id="site-password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoComplete="current-password"
        aria-describedby={error ? "login-error" : undefined}
        autoFocus
        className="w-full rounded-md border px-3 py-2 text-base"
        style={{ borderColor: "var(--field-border)" }}
      />
      <button
        type="submit"
        disabled={busy || !password}
        className="w-full rounded-md px-4 py-2 text-white font-medium disabled:opacity-50"
        style={{ background: "var(--btn-bg)" }}
      >
        {busy ? "Checking..." : "Enter"}
      </button>
      {/* 4.1.3 Status Messages. Announced without moving focus. */}
      <p id="login-error" role="alert" className="text-sm" style={{ color: "var(--err)" }}>
        {error}
      </p>
    </form>
  );
}

export default function Login() {
  return (
    <div className="flex-1 px-6 py-16 sm:px-12">
      <div className="max-w-sm mx-auto">
        <h1
          className="text-3xl font-semibold tracking-tight mb-6"
          style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}
        >
          Sign In
        </h1>
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
