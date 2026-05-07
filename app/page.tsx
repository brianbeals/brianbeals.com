export default function Home() {
  return (
    <div className="flex-1 flex items-center justify-center px-6 py-16 sm:px-12">
      <div className="max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-8">
          Brian Beals
        </h1>
        <p className="text-xl sm:text-2xl leading-snug font-medium mb-8">
          I help enterprise organizations stop piloting AI and start producing real results with it.
        </p>
        <p className="text-base sm:text-lg leading-relaxed mb-12 text-neutral-700">
          I've built three enterprise practices from scratch. The work I care about is what happens after the pilot, when AI either pays for itself or doesn't.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-base">
          <a href="/about" className="underline underline-offset-4 hover:no-underline">
            More about my work
          </a>
          <a href="/contact" className="underline underline-offset-4 hover:no-underline">
            Get in touch
          </a>
        </div>
      </div>
    </div>
  );
}
