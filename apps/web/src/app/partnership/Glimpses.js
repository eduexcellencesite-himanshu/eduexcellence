"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { shuffle } from "../../lib/shuffle";

// Educarnival moments (IIT Delhi + IIT Madras). The order is shuffled on the
// client after mount so venues, speakers and audience shots mix on every visit.
const photos = [
  "/assets/moment-01.webp", "/assets/moment-02.webp", "/assets/moment-03.webp",
  "/assets/moment-04.webp", "/assets/moment-05.webp", "/assets/moment-06.webp",
  "/assets/moment-07.webp", "/assets/moment-08.webp", "/assets/moment-09.webp",
  "/assets/moment-10.webp", "/assets/moment-11.webp", "/assets/moment-12.webp",
  "/assets/moment-13.webp", "/assets/moment-14.webp", "/assets/moment-15.webp",
  "/assets/moment-16.webp", "/assets/moment-17.webp", "/assets/moment-18.webp",
  "/assets/moment-19.webp",
  "/assets/iitdelhi-1.jpg", "/assets/iitdelhi-2.jpg", "/assets/iitdelhi-3.jpeg",
  "/assets/iitdelhi-4.jpeg", "/assets/iitdelhi-5.jpeg",
  "/assets/iitmadras-1.jpeg", "/assets/iitmadras-2.jpeg", "/assets/iitmadras-4.jpeg",
  "/assets/iitmadras-5.jpeg", "/assets/iitmadras-6.jpeg",
];

function Row({ items, reverse, onOpen }) {
  return (
    // py-3 leaves room for the hover lift/shadow so tiles aren't clipped at the top.
    <div className="relative overflow-hidden py-3">
      <div
        className="glimpses-track flex w-max gap-4 md:gap-5"
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      >
        {[...items, ...items].map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => onOpen(photos.indexOf(src))}
            aria-label="View photo"
            className="group relative h-[220px] w-[330px] shrink-0 overflow-hidden rounded-2xl bg-[#E7E9F0] shadow-[0_10px_30px_rgba(16,24,43,.10)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_45px_rgba(232,134,26,.22)] sm:h-[270px] sm:w-[410px] md:h-[330px] md:w-[500px]"
          >
            <Image
              src={src}
              alt="Educarnival moment"
              fill
              sizes="(max-width: 640px) 330px, (max-width: 768px) 410px, 500px"
              quality={82}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-[#07111F]/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Glimpses() {
  const [index, setIndex] = useState(null);
  // Start with the static order (matches the server render), then randomise once mounted.
  const [order, setOrder] = useState(photos);
  useEffect(() => setOrder(shuffle(photos)), []);
  const half = Math.ceil(order.length / 2);
  const rows = [order.slice(0, half), order.slice(half)];

  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(() => setIndex((c) => (c === null ? 0 : (c + 1) % photos.length)), []);
  const prev = useCallback(() => setIndex((c) => (c === null ? 0 : (c - 1 + photos.length) % photos.length)), []);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [index, close, next, prev]);

  return (
    <>
      <section className="overflow-hidden bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1180px] px-6">
          <div className="mx-auto max-w-[760px] text-center">
            <span className="inline-flex rounded-full bg-[#FFF3E2] px-5 py-2 text-[12px] font-bold uppercase tracking-[0.14em] text-[#E8861A]">
              A Journey of Excellence
            </span>
            <h2 className="heading-font mt-5 text-[32px] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#16223A] sm:text-[40px] md:text-[46px]">
              Moments That <span className="text-[#E8861A]">Matter</span>
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#6B7488] md:text-[16px]">
              The atmosphere, the speakers, the audience and the conversations — glimpses from Educarnival at IIT Delhi and IIT Madras.
            </p>
          </div>
        </div>

        <div className="relative mt-10 space-y-4 md:mt-12 md:space-y-5">
          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent md:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent md:w-28" />
          <Row items={rows[0]} reverse={false} onOpen={setIndex} />
          <Row items={rows[1]} reverse onOpen={setIndex} />
        </div>
      </section>

      {index !== null && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 md:p-10"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <button type="button" onClick={close} aria-label="Close" className="absolute right-4 top-4 z-30 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-[#16223A] md:right-7 md:top-7">
            <CloseIcon sx={{ fontSize: 24 }} />
          </button>
          <button type="button" onClick={prev} aria-label="Previous" className="absolute left-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-[#FFB42A] hover:text-[#16223A] md:left-8 md:h-14 md:w-14">
            <ChevronLeftIcon sx={{ fontSize: 30 }} />
          </button>
          <button type="button" onClick={next} aria-label="Next" className="absolute right-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-[#FFB42A] hover:text-[#16223A] md:right-8 md:h-14 md:w-14">
            <ChevronRightIcon sx={{ fontSize: 30 }} />
          </button>
          <div className="relative flex w-full max-w-[1100px] flex-col items-center">
            <div className="relative h-[55vh] w-full md:h-[75vh]">
              <Image key={photos[index]} src={photos[index]} alt="Educarnival moment" fill sizes="(max-width: 768px) 100vw, 1100px" quality={90} priority className="object-contain" />
            </div>
            <p className="mt-4 text-[13px] font-medium text-white/80">{index + 1} / {photos.length}</p>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes glimpsesScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .glimpses-track { animation: glimpsesScroll 110s linear infinite; will-change: transform; }
        .glimpses-track:hover { animation-play-state: paused; }
        @media (max-width: 768px) { .glimpses-track { animation-duration: 80s; } }
        @media (prefers-reduced-motion: reduce) { .glimpses-track { animation: none; } }
      `}</style>
    </>
  );
}
