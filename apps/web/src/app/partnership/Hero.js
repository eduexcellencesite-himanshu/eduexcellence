"use client";

import Image from "next/image";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

export default function Hero() {
  return (
    <section className="relative flex min-h-[520px] items-center overflow-hidden bg-[#17233B] md:min-h-[640px] lg:min-h-[700px]">
      {/*
        hero-building.webp is the campus photo cropped to drop the trees on the right,
        so the building name plaque lands to the right of the text column instead of under it.
        The vertical position keeps the plaque in view across hero heights.
      */}
      <Image
        src="/assets/hero-building.webp"
        alt="IIT Delhi main building"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_58%]"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#07111F]/85 via-[#07111F]/50 to-[#07111F]/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07111F]/70 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-6 py-12 md:py-14">
        <div className="max-w-[700px] md:max-w-[860px]">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.14em] text-[#FFB45C] backdrop-blur-sm">
            17th Annual International School Conference
          </span>

          {/* Client wants "IIT DELHI EDUCARNIVAL 2026" on one line from tablet up; sized to fit at 768px. */}
          <h1 className="heading-font mt-4 text-[34px] font-extrabold leading-[1.1] tracking-[-0.03em] text-white sm:text-[44px] md:whitespace-nowrap md:text-[46px] lg:text-[54px]">
            IIT DELHI <span className="text-[#FF9D29]">EDUCARNIVAL 2026</span>
          </h1>

          <p className="mt-3 text-[18px] font-bold text-white md:text-[22px]">
            Designing a Future-Ready School
          </p>
          <p className="mt-1 text-[14px] font-medium text-[#D7DCE8] md:text-[16px]">
            Climate-Conscious
            <span className="mx-2 text-[#FFB45C]">|</span>
            Human-Centered
            <span className="mx-2 text-[#FFB45C]">|</span>
            AI-Aware
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[13px] font-semibold text-white backdrop-blur-sm md:text-[14px]">
              <CalendarMonthOutlinedIcon sx={{ fontSize: 17, color: "#FFB45C" }} />
              28–29 December 2026
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[13px] font-semibold text-white backdrop-blur-sm md:text-[14px]">
              <LocationOnOutlinedIcon sx={{ fontSize: 17, color: "#FFB45C" }} />
              IIT Delhi Campus
            </span>
          </div>

          <p className="mt-5 max-w-[560px] text-[14px] leading-7 text-[#D7DCE8] md:text-[15px]">
            <span className="font-bold text-white">500+ School Owners, Principals and Educators</span>{" "}
            from across India,{" "}
            {/* Keep "backed by a 17-year journey" together on its own line from tablet up. */}
            <br className="hidden sm:block" />
            backed by a <span className="font-bold text-white">17-year journey</span> across IIT Delhi and IIT Madras.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#partner-form"
              className="inline-flex h-[52px] items-center gap-2 rounded-full bg-[#FF9D29] px-7 text-[15px] font-bold text-white shadow-[0_10px_24px_rgba(255,157,41,.35)] transition hover:bg-[#E8861A]"
            >
              Explore Partnership
              <ArrowForwardIcon sx={{ fontSize: 19 }} />
            </a>
            <a
              href="#why-partner"
              className="inline-flex h-[52px] items-center rounded-full border border-white/35 bg-white/10 px-7 text-[15px] font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Why Partner With Us?
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
