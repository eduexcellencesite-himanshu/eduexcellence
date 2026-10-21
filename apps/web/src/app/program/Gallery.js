"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const CAROUSEL_THRESHOLD = 5;

export default function Gallery({
  heading = "Moments from this event",
  items = [],
}) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const isCarousel = items.length > CAROUSEL_THRESHOLD;

  const show = useCallback(
    (n) => setIdx((n + items.length) % items.length),
    [items.length],
  );
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, idx, show, close]);

  const cur = items[idx] || {};

  return (
    <section
      className="border-t border-[#E7E9F0] bg-white py-[72px]"
      id="gallery"
    >
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mx-auto mb-8  lg:mb-14 max-w-[680px] text-center">
          <span className="inline-flex rounded-full bg-[#FFF3E2] px-5 py-2 text-[13px] font-bold uppercase tracking-[0.12em] text-[#E8861A]">
            Gallery
          </span>
          <h2 className="heading-font mt-4 text-[30px]  lg:mt-6 lg:text-[38px] font-extrabold text-[#16223A] leading-tight">
            {heading}
          </h2>
          <p className="mt-4 text-[17px] text-[#6B7488]">
            Relive the highlights — tap any photo or video to view it.
          </p>
        </div>

        {isCarousel ? (
          <GalleryCarousel
            items={items}
            onSelect={(n) => {
              setIdx(n);
              setOpen(true);
            }}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {items.map((it, n) => (
              <button
                key={n}
                onClick={() => {
                  setIdx(n);
                  setOpen(true);
                }}
                className={`group relative overflow-hidden rounded-2xl border border-[#E7E9F0] ${
                  n === 0
                    ? "col-span-2 h-[240px] md:row-span-2 md:h-full md:aspect-auto"
                    : "aspect-[4/3]"
                }`}
              >
                <GalleryThumb item={it} />
              </button>
            ))}
          </div>
        )}
      </div>

      {open && (
        <div
          onClick={(e) => {
            if (e.currentTarget === e.target) close();
          }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#10182b]/[0.93] p-12"
        >
          <button
            onClick={close}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 z-30 grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
          >
            <CloseIcon sx={{ fontSize: 22 }} />
          </button>
          <button
            onClick={() => show(idx - 1)}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 grid h-10 w-10 md:h-12 md:w-12 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
          >
            <ChevronLeftIcon sx={{ fontSize: 28 }} />
          </button>

          <button
            onClick={() => show(idx + 1)}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 grid h-10 w-10 md:h-12 md:w-12 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
          >
            <ChevronRightIcon sx={{ fontSize: 28 }} />
          </button>
          <div className="relative w-full max-w-[1000px]">
            <div className="relative mx-auto h-[220px] w-full sm:h-[320px] md:h-[420px] lg:h-[560px] max-w-[1000px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#283655] to-[#141d33] text-[#8b93a6]">
              {cur.img && (
                <Image
                  src={cur.img}
                  alt={cur.cap || ""}
                  fill
                  sizes="1000px"
                  className="object-cover"
                />
              )}
              {cur.type === "video" && (
                <span className="relative z-10 grid h-16 w-16 place-items-center rounded-full bg-black/40 text-white">
                  <PlayArrowRoundedIcon sx={{ fontSize: 40 }} />
                </span>
              )}
              {!cur.img && cur.type !== "video" && (
                <span className="flex flex-col items-center text-[15px]">
                  <ImageOutlinedIcon sx={{ fontSize: 46, opacity: 0.7 }} />
                  <span className="mt-2">Photo</span>
                </span>
              )}
            </div>
            <p className="mt-4 text-center text-[13px] text-[#8b93a6]">
              {idx + 1} / {items.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

function GalleryThumb({ item }) {
  return (
    <>
      {item.img ? (
        <Image
          src={item.img}
          alt={item.cap || ""}
          fill
          sizes="(max-width:768px) 50vw, 25vw"
          className="object-cover"
        />
      ) : (
        <span className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#eef1f6] to-[#e3e7f0] text-[#9aa3b5]">
          <ImageOutlinedIcon sx={{ fontSize: 30, opacity: 0.65 }} />
          <span className="mt-1 text-[13px] font-semibold">
            {item.type === "video" ? "Video" : "Photo"}
          </span>
        </span>
      )}
      {item.type === "video" && (
        <span className="absolute inset-0 grid place-items-center bg-[#10182b]/30 text-white">
          <PlayArrowRoundedIcon sx={{ fontSize: 46 }} />
        </span>
      )}
    </>
  );
}

function GalleryCarousel({ items, onSelect }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = useCallback((n) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[n];
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, []);

  const step = (dir) => {
    setActive((a) => {
      const next = Math.max(0, Math.min(items.length - 1, a + dir));
      scrollToIndex(next);
      return next;
    });
  };

  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    let closest = 0;
    let closestDist = Infinity;
    Array.from(track.children).forEach((card, n) => {
      const dist = Math.abs(card.offsetLeft - track.offsetLeft - track.scrollLeft);
      if (dist < closestDist) {
        closestDist = dist;
        closest = n;
      }
    });
    setActive(closest);
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => step(-1)}
        disabled={active === 0}
        aria-label="Previous"
        className="absolute -left-2 sm:-left-4 top-1/2 z-10 hidden -translate-y-1/2 h-11 w-11 place-items-center rounded-full border border-[#E7E9F0] bg-white text-[#16223A] shadow-[0_10px_30px_rgba(16,24,43,.12)] transition hover:border-[#FF9D29] disabled:pointer-events-none disabled:opacity-30 md:grid"
      >
        <ChevronLeftIcon sx={{ fontSize: 24 }} />
      </button>

      <button
        onClick={() => step(1)}
        disabled={active === items.length - 1}
        aria-label="Next"
        className="absolute -right-2 sm:-right-4 top-1/2 z-10 hidden -translate-y-1/2 h-11 w-11 place-items-center rounded-full border border-[#E7E9F0] bg-white text-[#16223A] shadow-[0_10px_30px_rgba(16,24,43,.12)] transition hover:border-[#FF9D29] disabled:pointer-events-none disabled:opacity-30 md:grid"
      >
        <ChevronRightIcon sx={{ fontSize: 24 }} />
      </button>

      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((it, n) => (
          <button
            key={n}
            onClick={() => onSelect(n)}
            className="group relative shrink-0 snap-start overflow-hidden rounded-2xl border border-[#E7E9F0] w-[85%] sm:w-[58%] md:w-[42%] lg:w-[32%] aspect-[4/3]"
          >
            <GalleryThumb item={it} />
          </button>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {items.map((_, n) => (
          <button
            key={n}
            onClick={() => {
              setActive(n);
              scrollToIndex(n);
            }}
            aria-label={`Go to slide ${n + 1}`}
            className={`h-2 rounded-full transition-all ${
              n === active ? "w-6 bg-[#FF9D29]" : "w-2 bg-[#E7E9F0]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}