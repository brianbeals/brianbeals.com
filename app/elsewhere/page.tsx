import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Elsewhere",
  description:
    "Adventure travel, mostly to places where the signal goes away.",
  alternates: {
    canonical: "/elsewhere",
  },
  openGraph: {
    title: "Elsewhere | Brian Beals",
    description:
      "Adventure travel, mostly to places where the signal goes away.",
    url: "/elsewhere",
    type: "website",
  },
  twitter: {
    title: "Elsewhere | Brian Beals",
    description:
      "Adventure travel, mostly to places where the signal goes away.",
  },
};

const photos = [
  {
    src: "/elsewhere/humpback.jpg",
    alt: "Humpback whale just below the surface, sunlight filtering through the water above.",
    width: 2048,
    height: 1365,
  },
  {
    src: "/elsewhere/orca-swimmer.jpg",
    alt: "Orca swimming below a person floating at the surface.",
    width: 2016,
    height: 1512,
  },
  {
    src: "/elsewhere/polar-bear.jpg",
    alt: "Polar bear walking across a rocky beach.",
    width: 1600,
    height: 1066,
  },
  {
    src: "/elsewhere/walruses.jpg",
    alt: "Group of walruses resting on a beach with snow-capped mountains in the distance.",
    width: 4032,
    height: 3024,
  },
  {
    src: "/elsewhere/kayak-greenland.jpg",
    alt: "A kayaker on a calm fjord at sunset, icebergs and mountains on the horizon.",
    width: 4032,
    height: 3024,
  },
];

export default function Elsewhere() {
  return (
    <div className="flex-1 px-6 py-12 sm:px-12 sm:py-16">
      <article className="max-w-2xl mx-auto">
        <h1
          className="text-4xl sm:text-5xl font-bold tracking-tight mb-8"
          style={{ color: "#1E3A5F" }}
        >
          Elsewhere
        </h1>
        <p className="text-base sm:text-lg leading-relaxed mb-12 text-neutral-800">
          Adventure travel, mostly to places where the signal goes away.
        </p>
        <div className="space-y-10">
          {photos.map((photo) => (
            <Image
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 672px) 100vw, 672px"
              className="w-full h-auto rounded-md shadow-sm"
            />
          ))}
        </div>
      </article>
    </div>
  );
}
