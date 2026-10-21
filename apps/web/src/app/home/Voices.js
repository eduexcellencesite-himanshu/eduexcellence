"use client";

import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";

const testimonials = [
  {
    text: "The Singapore study visit gave our leadership team a shared language for curriculum design.",
    name: "Suman Patel",
    role: "Head of School, Ahmedabad",
  },
  {
    text: "The Finland visit completely reframed how we think about assessment and student wellbeing at our school.",
    name: "Rajesh Sharma",
    role: "Principal, Delhi",
  },
  {
    text: "Seeing Design Tech High and the Oracle partnership first-hand gave us a concrete model to bring home.",
    name: "Anita Kapoor",
    role: "Director, Mumbai",
  },
  {
    text: "Educarnival is the one event every year where founders and academic leaders genuinely learn together.",
    name: "Vikram Mehta",
    role: "Chairman, Bengaluru",
  },
];

export default function Voices({ altBg = false }) {
  return (
    <section className={`overflow-hidden py-[72px] ${altBg ? "bg-[#F8F9FC]" : "bg-white"}`}>
      <div className="mx-auto max-w-[1180px] px-6 text-center">
        <span className="inline-flex rounded-full bg-[#FFF3E2] px-5 py-2 text-[13px] font-bold uppercase tracking-[0.18em] text-[#E8861A]">
          Voices
        </span>

        <h2 className="heading-font mt-6 text-[30px]  lg:text-[38px] font-extrabold text-[#16223A] leading-tight">
          What school leaders say
        </h2>
      </div>

      <div className="mt-10 overflow-hidden">
        <div className="voices-track flex w-max gap-6">

          {[...testimonials, ...testimonials].map((item, index) => (
            <div
              key={index}
              className="w-[380px] rounded-[22px] border border-[#E7E9F0] bg-[#F8F9FC] p-7"
            >
              < FormatQuoteRoundedIcon
                sx={{
                  fontSize: 34,
                  color: "#FF9D29",
                }}
              />

              <p className="mt-4 text-[16px] leading-8 text-[#4C5875]">
                {item.text}
              </p>

              <div className="mt-8">
                <h4 className="text-[18px] font-semibold text-[#16223A]">
                  {item.name}
                </h4>

                <p className="mt-1 text-[15px] text-[#7B859D]">
                  {item.role}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}