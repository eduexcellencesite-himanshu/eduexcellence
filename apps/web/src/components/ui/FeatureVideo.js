"use client";

import { useRef, useState } from "react";
import Image from "next/image";

// Poster with a centred play button; native controls take over once playing.
export default function FeatureVideo({ src, poster, title }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const start = () => {
    setPlaying(true);
    const v = videoRef.current;
    if (v) v.play().catch(() => {});
  };

  return (
    <div className="relative aspect-video w-full bg-black">
      <video
        ref={videoRef}
        className="h-full w-full"
        src={src}
        poster={poster}
        controls={playing}
        controlsList="nodownload"
        preload="none"
        playsInline
        onEnded={() => setPlaying(false)}
      />

      {!playing && (
        <button
          type="button"
          onClick={start}
          aria-label={title ? `Play: ${title}` : "Play video"}
          className="group absolute inset-0 flex items-center justify-center"
        >
          {poster && (
            <Image
              src={poster}
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 900px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          )}
          <span className="absolute inset-0 bg-black/25 transition group-hover:bg-black/35" />
          <span className="relative flex h-[76px] w-[76px] items-center justify-center rounded-full bg-[#FF9D29] text-white shadow-[0_12px_40px_rgba(0,0,0,0.45)] ring-8 ring-white/20 transition-transform duration-300 group-hover:scale-110 md:h-[92px] md:w-[92px]">
            <svg viewBox="0 0 24 24" className="ml-1 h-9 w-9 md:h-11 md:w-11" fill="currentColor" aria-hidden="true">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
