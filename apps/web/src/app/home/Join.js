"use client";

import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { openPrograms } from "../../lib/programs";

export default function Join() {
  const open = openPrograms();
  const hasOpen = open.length > 0;

  return (
    <section className="bg-white pb-24 pt-0">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="rounded-[30px] bg-[#FF9D29] px-8 py-16 text-center md:px-16">
          <h2 className="heading-font text-[30px] font-extrabold leading-tight text-white md:text-[36px]">
            {hasOpen ? "Ready to join the next cohort?" : "Be first to know about the next cohort"}
          </h2>

          <p className="mx-auto mt-5 max-w-[620px] text-[18px] leading-6 text-white/90">
            {hasOpen
              ? "Reserve a seat on an upcoming study visit or Educarnival — our team will help you choose the right fit for your school."
              : "Registrations are currently closed. Register your interest and we'll reach out as soon as new dates are announced."}
          </p>

          <Link
            href={hasOpen ? `/register?program=${open[0].slug}` : "/contact"}
            className="mt-8 inline-flex h-[56px] items-center gap-2 rounded-full bg-white px-7 text-[16px] font-semibold text-[#E8861A] transition hover:scale-[1.03] hover:bg-[#FFF7ED]"
          >
            {hasOpen ? "Reserve a seat" : "Register your interest"}
            <ArrowForwardIcon sx={{ fontSize: 18 }} />
          </Link>
        </div>
      </div>
    </section>
  );
}
