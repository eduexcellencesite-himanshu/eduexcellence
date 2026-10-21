"use client";

import Link from "next/link";
import Image from "next/image";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import { openPrograms } from "../../lib/programs";
import CountUp from "../../components/ui/CountUp";

export default function Hero() {
  const hasUpcoming = openPrograms().length > 0;
  const go = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className="overflow-hidden bg-[radial-gradient(circle_at_90%_-10%,#FFF3E2_0%,transparent_45%)] py-[72px]">
      <div className="mx-auto max-w-[1180px] px-6">
        {/* Content - Always first */}
        <div className="lg:grid lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
          {/* Content */}
          <div className="lg:order-1">
            {/* Eyebrow */}
            <span className="inline-flex rounded-full bg-[#FFF3E2] px-5 py-2 text-[13px] font-bold uppercase tracking-[0.12em] text-[#E8861A]">
              Research-Based · K–12 Education · Since 2008
            </span>

            {/* Heading */}
            <h1 className="heading-font mt-7 text-[30px] lg:text-[52px] font-extrabold leading-tight tracking-[-0.03em] text-[#16223A]">
              Transforming K-12 Education
              <span className="text-[#FF9D29]"> Globally!</span>
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-[560px] text-[16px] leading-8 text-[#4C5875] lg:mt-7 lg:text-[18px] lg:leading-8">
              EduExcellence takes K–12 school leaders on international study
              visits and hosts the Educarnival conferences — turning what works
              abroad into better schools at home.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#offer"
                onClick={go("offer")}
                className="flex h-[54px] items-center gap-2 rounded-full bg-[#FF9D29] px-8 text-[15px] font-semibold text-white shadow-[0_10px_22px_rgba(255,157,41,.35)] transition hover:bg-[#E8861A]"
              >
                See what we offer
                <ArrowForwardIcon sx={{ fontSize: 18 }} />
              </a>

              {hasUpcoming && (
                <a
                  href="#events"
                  onClick={go("events")}
                  className="flex h-[54px] items-center rounded-full border border-[#D7DBE7] px-8 text-[15px] font-medium text-[#3A4660] transition hover:border-[#16223A]"
                >
                  Upcoming events
                </a>
              )}
            </div>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap gap-14">
              <div>
                <h3 className="font-['Plus_Jakarta_Sans'] text-[26px] font-extrabold text-[#16223A]">
                  <CountUp end={14} suffix="+" />
                </h3>
                <p className="mt-1 text-[14px] text-[#6B7488]">
                  Years of impact
                </p>
              </div>

              <div>
                <h3 className="font-['Plus_Jakarta_Sans'] text-[26px] font-extrabold text-[#16223A]">
                  <CountUp end={7} />
                </h3>
                <p className="mt-1 text-[14px] text-[#6B7488]">
                  Countries visited
                </p>
              </div>

              <div>
                <h3 className="font-['Plus_Jakarta_Sans'] text-[26px] font-extrabold text-[#16223A]">
                  <CountUp end={4000} suffix="+" />
                </h3>
                <p className="mt-1 text-[14px] text-[#6B7488]">
                  School leaders
                </p>
              </div>
            </div>
          </div>

          {/* Image - Below content on mobile, right side on desktop */}
          <div className="relative flex flex-col items-center justify-center mt-14 lg:mt-0 lg:order-2">
            <div className="relative h-[320px] w-full max-w-[520px] overflow-hidden rounded-[24px] sm:h-[400px] lg:h-[520px] lg:rounded-[30px]">
              <Image
                src="/assets/hero.jpg"
                alt="Hero"
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Floating Card */}
            <div
              className="
        mt-5 flex w-full max-w-[520px] items-center gap-4 rounded-2xl bg-white px-5 py-4
        shadow-[0_18px_40px_rgba(16,24,43,.12)]
        lg:absolute lg:bottom-7 lg:left-7 lg:mt-0 lg:w-auto
      "
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF3E2] text-[#FF9D29]">
                <SchoolOutlinedIcon sx={{ fontSize: 24 }} />
              </div>

              <div>
                <h4 className="heading-font text-[17px] font-bold text-[#16223A]">
                  Trusted by 2800+ schools
                </h4>
                <p className="mt-1 text-[14px] text-[#6B7488]">
                  Across India & International
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
