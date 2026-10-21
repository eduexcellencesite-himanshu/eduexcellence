"use client";

import Image from "next/image";

// Hand-picked, recognisable partners. Files in /assets/home-logos are pre-processed:
// trimmed, flattened to white and centred on a 240×96 canvas, so every tile reads
// with the same visual weight whatever the source file looked like.
const logos = [
  { name: "Oracle", file: "oracle" },
  { name: "ViewSonic", file: "viewsonic" },
  { name: "Pepsi", file: "pepsi" },
  { name: "TATA ClassEdge", file: "tata-classedge" },
  { name: "Ryan Group of Institutions", file: "ryan" },
  { name: "Mapmystudy", file: "mapmystudy" },
  { name: "Aakash BYJU'S", file: "aakash-byjus" },
  { name: "Ashoka University", file: "ashoka" },
  { name: "Plaksha University", file: "plaksha" },
  { name: "CK-12", file: "ck-12" },
  { name: "HDFC Credila", file: "hdfc-credila" },
  { name: "Rishihood University", file: "rishihood" },
  { name: "KIET University", file: "kiet" },
  { name: "Avishkaar", file: "avishkaar" },
  { name: "Entab", file: "entab" },
  { name: "Suraasa", file: "suraasa" },
  { name: "Dextres", file: "dextres" },
];

export default function Partner() {
  return (
    <section className="overflow-hidden border-y border-gray-200 bg-[#F8F9FC] py-10">
      <div className="mx-auto max-w-[1180px] px-6">
        <p className="mb-8 text-center text-sm font-semibold uppercase tracking-[4px] text-gray-500">
          Trusted by Leading Education Groups &amp; Partners
        </p>
      </div>

      <div className="relative overflow-hidden py-2">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#F8F9FC] to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#F8F9FC] to-transparent md:w-32" />

        <div className="home-logo-track flex w-max items-center gap-4 md:gap-5">
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="relative h-[72px] w-[180px] shrink-0 overflow-hidden rounded-2xl border border-[#E7E9F0] bg-white shadow-[0_6px_18px_rgba(16,24,43,.05)] md:h-[84px] md:w-[210px]"
            >
              <Image
                src={`/assets/home-logos/${logo.file}.webp`}
                alt={logo.name}
                fill
                sizes="210px"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes homeLogoScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .home-logo-track { animation: homeLogoScroll 70s linear infinite; will-change: transform; }
        .home-logo-track:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .home-logo-track { animation: none; } }
      `}</style>
    </section>
  );
}
