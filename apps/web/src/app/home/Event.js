"use client";

import Link from "next/link";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { PROGRAMS, isPast, detailHref } from "../../lib/programs";

const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export default function Event() {
  const upcoming = PROGRAMS.filter((p) => !isPast(p));
  if (upcoming.length === 0) return null; // dynamic: hide entire section when nothing is upcoming

  return (
    <section id="events" className="scroll-mt-24 bg-[#F8F9FC] py-[72px]">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mx-auto mb-16 max-w-[720px] text-center">
          <span className="inline-flex rounded-full bg-[#FFF3E2] px-5 py-2 text-[13px] font-bold uppercase tracking-[0.18em] text-[#E8861A]">
            Events
          </span>
          <h2 className="mt-6 text-[30px] font-extrabold leading-tight text-[#16223A] md:text-[38px]">
            Upcoming education events to feed your brain
          </h2>
          <p className="mt-5 text-[16px] lg:text-[18px] leading-7 text-[#6A748B]">
            Reserve your seat for what&apos;s next.
          </p>
        </div>

        {/* A lone event is centred at a comfortable width instead of sitting in an empty two-column grid. */}
        <div className={upcoming.length === 1 ? "mx-auto max-w-[760px]" : "grid gap-6 lg:grid-cols-2"}>
          {upcoming.map((ev) => {
            const d = new Date(ev.startDate);
            return (
              <div
                key={ev.slug}
                className="flex flex-col gap-5 rounded-[22px] border border-[#E6E8EF] bg-white px-6 py-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:flex-row md:items-center"
              >
                <div className="flex h-[60px] w-[60px] shrink-0 flex-col items-center justify-center rounded-xl bg-[#FFF3E2] sm:h-[82px] sm:w-[82px] sm:rounded-2xl">
                  <span className="text-[24px] font-extrabold leading-none text-[#E8861A] sm:text-[34px]">
                    {String(d.getUTCDate()).padStart(2, "0")}
                  </span>

                  <span className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#E8861A] sm:mt-1 sm:text-[12px]">
                    {MONTHS[d.getUTCMonth()]}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-[18px] font-bold leading-[1.3] text-[#16223A]">
                    {ev.title}
                  </h3>
                  <p className="mt-2.5 flex items-center gap-2 text-[14px] text-[#6A748B]">
                    <LocationOnOutlinedIcon
                      sx={{ fontSize: 15, color: "#EC4899" }}
                      className="shrink-0"
                    />
                    {ev.location}
                  </p>
                  <p className="mt-1.5 flex items-center gap-2 whitespace-nowrap text-[14px] text-[#6A748B]">
                    <CalendarMonthOutlinedIcon
                      sx={{ fontSize: 15, color: "#E8861A" }}
                      className="shrink-0"
                    />
                    {ev.dateLabel}
                  </p>
                </div>

                <div className="flex w-full shrink-0 flex-col gap-2.5 md:w-[150px]">
                  <Link
                    href={detailHref(ev)}
                    className="w-full whitespace-nowrap rounded-full border border-[#E7E9F0] px-6 py-2.5 text-center text-[14px] font-semibold text-[#16223A] transition hover:border-[#16223A]"
                  >
                    View details
                  </Link>
                  <Link
                    href={`/register?program=${ev.slug}`}
                    className="w-full whitespace-nowrap rounded-full bg-[#FF9D29] px-6 py-2.5 text-center text-[14px] font-semibold text-white transition hover:bg-[#E8861A]"
                  >
                    Reserve a seat
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
