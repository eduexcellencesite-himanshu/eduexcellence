"use client";

import { useState } from "react";
import Image from "next/image";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

export default function Itinerary({ days = [] }) {
  const [active, setActive] = useState(0);
  const cur = days[active] || {};

  return (
    <>
      {/* Desktop layout */}
      <div className="hidden md:grid mx-auto max-w-[1180px] grid-cols-1 items-start gap-12 px-6 lg:grid-cols-[1.05fr_.95fr]">
        {/* Day list */}
        <div className="relative">
          {days.map((d, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="relative grid w-full grid-cols-[26px_1fr] gap-5 pb-7 text-left last:pb-0"
            >
              {i < days.length - 1 && (
                <span className="absolute left-3 top-3 h-full w-0.5 bg-[#E7E9F0]" />
              )}
              <span
                className={`z-10 mt-1 h-[18px] w-[18px] justify-self-center rounded-full border-[3px] border-white shadow-[0_0_0_1px_#E7E9F0] transition ${i === active ? "bg-[#FF9D29] shadow-[0_0_0_1px_#FF9D29]" : "bg-[#E7E9F0]"}`}
              />
              <span>
                <span
                  className={`text-[12px] font-bold uppercase tracking-wide ${i === active ? "text-[#E8861A]" : "text-[#6B7488]"}`}
                >
                  {d.day}
                </span>
                <span
                  className={`heading-font mb-1 mt-0.5 block text-[18px] font-bold ${i === active ? "text-[#E8861A]" : "text-[#16223A]"}`}
                >
                  {d.title}
                </span>
                <span className="block text-[15px] text-[#6B7488]">
                  {d.desc}
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* Media panel - desktop */}
        <aside className="sticky top-24 overflow-hidden rounded-2xl border border-[#E7E9F0] bg-white">
          <div className="relative grid h-[300px] place-items-center overflow-hidden bg-gradient-to-br from-[#eef1f6] to-[#e3e7f0] text-[#9aa3b5]">
            {cur.img ? (
              <Image
                key={cur.img}
                src={cur.img}
                alt={cur.title || ""}
                fill
                sizes="(max-width:1024px) 100vw, 520px"
                className="object-cover"
              />
            ) : (
              <span className="flex flex-col items-center text-[13px]">
                <ImageOutlinedIcon sx={{ fontSize: 40, opacity: 0.6 }} />
                {cur.day} photo
              </span>
            )}
          </div>
          <div className="p-6">
            <div className="text-[12px] font-bold uppercase tracking-wide text-[#E8861A]">
              {cur.day}
            </div>
            <h3 className="heading-font mb-1.5 mt-1 text-[20px] font-bold text-[#16223A]">
              {cur.title}
            </h3>
            <p className="text-[14.5px] text-[#6B7488]">{cur.desc}</p>
          </div>
        </aside>
      </div>

      {/* Mobile layout - image below each day */}
      <div className="md:hidden mx-auto max-w-[1180px] px-6">
        <div className="space-y-6">
          {days.map((d, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-[#E7E9F0] bg-white transition hover:shadow-[0_8px_30px_rgba(16,24,43,.08)]"
            >
              {/* Content */}
              <div className="p-5">
                <span className="text-[12px] font-bold uppercase tracking-wide text-[#E8861A]">
                  {d.day}
                </span>
                <h3 className="heading-font mb-1 mt-0.5 text-[18px] font-bold text-[#16223A]">
                  {d.title}
                </h3>
                <p className="text-[14.5px] text-[#6B7488]">{d.desc}</p>
              </div>

              {/* Image below content - only on mobile */}
              {d.img && (
                <div className="relative h-[200px] w-full">
                  <Image
                    src={d.img}
                    alt={d.title || ""}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
