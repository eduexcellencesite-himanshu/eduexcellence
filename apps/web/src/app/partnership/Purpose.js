"use client";

import CountUp from "../../components/ui/CountUp";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import HistoryEduOutlinedIcon from "@mui/icons-material/HistoryEduOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

// Stat strip in the spirit of csi.ca: icon · big number · short label.
const stats = [
  {
    Icon: GroupsOutlinedIcon,
    end: 4000,
    suffix: "+",
    label: (
      <>
        Leaders from across <span className="font-bold text-[#16223A]">2800+</span> schools
      </>
    ),
  },
  { Icon: HandshakeOutlinedIcon, end: 300, suffix: "+", label: "Industry partners" },
  { Icon: HistoryEduOutlinedIcon, end: 17, suffix: "", label: (
      <>
        Years of shaping the <span className="whitespace-nowrap">future of education</span>
      </>
    ) },
  { Icon: CalendarMonthOutlinedIcon, end: 2, suffix: "", label: "Days of Impact, Insights, Connections & Opportunities" },
];

export default function Purpose() {
  return (
    <section className="bg-[#F7F8FB] py-16 md:py-20">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mx-auto max-w-[820px] text-center">
          <span className="inline-flex rounded-full bg-[#FFF3E2] px-5 py-2 text-[12px] font-bold uppercase tracking-[0.14em] text-[#E8861A]">
            Partner with Purpose
          </span>
          <h2 className="heading-font mt-5 text-[32px] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#16223A] sm:text-[40px] md:text-[46px]">
            Bringing Together the Minds Shaping India&apos;s{" "}
            <span className="text-[#E8861A]">Education Future.</span>
          </h2>
        </div>

        <div className="mt-12 grid overflow-hidden rounded-[24px] border border-[#E7E9F0] bg-white shadow-[0_12px_40px_rgba(16,24,43,.06)] sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ Icon, end, suffix, label }, i) => (
            <div
              key={i}
              className={`group flex items-center gap-4 px-6 py-7 transition-colors hover:bg-[#FFFAF3] lg:flex-col lg:items-center lg:px-5 lg:py-9 lg:text-center ${
                i !== stats.length - 1 ? "border-b border-[#EEF0F5] sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r" : ""
              }`}
            >
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#FFF3E2] text-[#E8861A] transition-transform duration-300 group-hover:scale-110">
                <Icon sx={{ fontSize: 28 }} />
              </span>
              <div className="min-w-0">
                <p className="heading-font text-[34px] font-extrabold leading-none text-[#16223A] md:text-[38px]">
                  <CountUp end={end} suffix={suffix} />
                </p>
                <p className="mt-1.5 text-[13.5px] font-medium leading-5 text-[#6B7488]">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
