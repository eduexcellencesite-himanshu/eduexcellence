"use client";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_85%_-20%,#FFF3E2_0%,transparent_45%)]  py-[72px]">
      <div className="absolute -left-24 top-0 h-[280px] w-[280px] rounded-full bg-[#FF9D29]/20 blur-[120px]" />

      <div className="absolute right-0 bottom-0 h-[300px] w-[300px] rounded-full bg-[#FF9D29]/20 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-[1180px] px-6">
        <div className="max-w-[720px]">
          <span className="inline-flex rounded-full bg-[#FFF] md:bg-[#FFF3E2] px-5 py-2 text-[13px] font-bold uppercase tracking-[0.12em] text-[#E8861A]">
            Contact Us
          </span>

          <h1 className="heading-font mt-6 text-[30px] font-extrabold leading-tight text-[#16223A] lg:text-[48px]">
            Let's start a<span className="text-[#FF9D29]"> conversation</span>
          </h1>

          <p className="mt-4 max-w-[620px] text-[16px]  lg:mt-6  lg:text-[18px]  leading-8 text-[#6B7488]">
            Have questions about study visits, Educarnivals or partnerships? Our
            team would love to hear from you and help you find the right
            opportunity for your school.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#contact-form"
              className="flex items-center gap-2 rounded-full bg-[#FF9D29] px-8 py-3 font-semibold text-white shadow-[0_10px_30px_rgba(255,157,41,.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E8861A]"
            >
              Contact Now
              <ArrowForwardIcon sx={{ fontSize: 18 }} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
