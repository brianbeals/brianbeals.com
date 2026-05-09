import Link from "next/link";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center px-6 py-16 sm:px-12">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6" style={{ color: "#1E3A5F", fontFamily: "var(--font-serif)" }}>
          That page isn't here.
        </h1>
        <p className="text-base sm:text-lg text-neutral-700 mb-10">
          You probably want one of these instead.
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-base">
          <Link href="/" className="underline underline-offset-4 hover:no-underline" style={{ color: "#2E86C1" }}>
            Home
          </Link>
          <Link href="/about" className="underline underline-offset-4 hover:no-underline" style={{ color: "#2E86C1" }}>
            About
          </Link>
          <Link href="/elsewhere" className="underline underline-offset-4 hover:no-underline" style={{ color: "#2E86C1" }}>
            Elsewhere
          </Link>
          <Link href="/contact" className="underline underline-offset-4 hover:no-underline" style={{ color: "#2E86C1" }}>
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
