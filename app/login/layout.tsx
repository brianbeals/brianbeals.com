import type { Metadata } from "next";

// WCAG 2.4.2 Page Titled. This route is a client component, so it cannot
// export metadata itself and was falling back to the root title, which made
// /login and / carry the identical name. A screen reader user moving between
// browser tabs, and anyone scanning a history list, gets no way to tell them
// apart.
export const metadata: Metadata = {
  title: "Sign in | Brian Beals",
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
