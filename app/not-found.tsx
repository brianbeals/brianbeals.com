import Link from "next/link";
import { navLinks } from "./components/nav-links";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center px-6 py-16 sm:px-12">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6" style={{ color: "var(--head)", fontFamily: "var(--font-serif)" }}>
          That page isn't here.
        </h1>
        <p className="text-base sm:text-lg text-neutral-700 mb-10">
          You probably want one of these instead.
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-base">
          {/* Same six items as the main nav, in nav order, from one list. */}
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="underline underline-offset-4 hover:no-underline" style={{ color: "var(--link)" }}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
