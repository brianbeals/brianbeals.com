export default function Home() {
  return (
    <main
  className="min-h-screen flex items-center justify-center px-6 py-16 sm:px-12"
  style={{
    background:
      "radial-gradient(at 25% 20%, rgba(46,134,193,0.12) 0, transparent 50%), radial-gradient(at 75% 80%, rgba(30,58,95,0.10) 0, transparent 50%), #F4F6F9",
  }}
>
      <div className="max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-8">
          Brian Beals
        </h1>
        <p className="text-xl sm:text-2xl leading-snug font-medium mb-8">
          I help enterprise organizations stop piloting AI and start producing real results with it.
        </p>
        <p className="text-base sm:text-lg leading-relaxed mb-4 text-neutral-700 dark:text-neutral-300">
          Career started in 1992. Built and led AI, analytics, and enterprise data practices at Mainline Information Systems, Sirius Computer Solutions, and LRS IT Solutions: each grown from the ground up.
        </p>
        <p className="text-base sm:text-lg leading-relaxed mb-12 text-neutral-700 dark:text-neutral-300">
          Currently leading AI, Analytics &amp; Automation at LRS IT Solutions. Punta Gorda, Florida.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-base">
          <a href="mailto:brian@bealsfamily.com" className="underline underline-offset-4 hover:no-underline">Email</a>
          <a href="https://www.linkedin.com/in/brian-beals-ab79363/" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:no-underline">LinkedIn</a>
        </div>
      </div>
    </main>
  );
}
