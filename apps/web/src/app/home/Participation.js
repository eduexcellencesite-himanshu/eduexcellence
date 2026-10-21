"use client";

import { useEffect, useRef, useState } from "react";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";

const ROLES = [
  { label: "Principals", value: 1918 },
  { label: "Teachers", value: 532 },
  { label: "Directors", value: 512 },
  { label: "Vice Principals", value: 421 },
  { label: "Co-ordinators", value: 352 },
  { label: "Chairpersons", value: 220 },
  { label: "Corporates", value: 167 },
  { label: "Professors", value: 116 },
  { label: "Research Scholars", value: 112 },
];

const MAX = Math.max(...ROLES.map((r) => r.value));

export default function Participation() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-white py-[72px]">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mx-auto mb-8 lg:mb-14 max-w-[720px] text-center">
          <span className="inline-flex rounded-full bg-[#FFF3E2] px-5 py-2 text-[13px] font-bold uppercase tracking-[0.15em] text-[#E8861A]">Who takes part</span>
          <h2 className="mt-6 text-[30px] font-extrabold leading-tight text-[#16223A] md:text-[36px]">Participation by job function</h2>
          <p className="mt-4 text-[16px]  lg:text-[18px] leading-8 text-[#6B7488]">School leaders across every role join our programs — from principals and directors to teachers and researchers.</p>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[1.5fr_0.9fr]">
          {/* Bar chart */}
          <div className="rounded-[24px] border border-[#E7E9F0] bg-white p-7 shadow-[0_10px_30px_rgba(16,24,43,.05)] md:p-9">
            <div className="flex flex-col gap-4">
              {ROLES.map((r, i) => (
                <div key={r.label} className="grid grid-cols-[130px_1fr] items-center gap-3 md:grid-cols-[150px_1fr]">
                  <span className="text-right text-[14px] font-medium text-[#4B5565]">{r.label}</span>
                  <div className="flex items-center gap-3">
                    <div className="h-[18px] flex-1 overflow-hidden rounded-full bg-[#F2F4F8]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#FFB152] to-[#F26522] transition-[width] duration-1000 ease-out"
                        style={{ width: inView ? `${(r.value / MAX) * 100}%` : "0%", transitionDelay: `${i * 90}ms` }}
                      />
                    </div>
                    <span className="w-[44px] shrink-0 text-[14px] font-bold tabular-nums text-[#16223A]">{r.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badge / stat */}
          <div className="flex flex-col items-center gap-6 rounded-[24px] bg-[#07142D] p-10 text-center text-white">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-[#FF9D29]/15 text-[#FF9D29]">
              <WorkspacePremiumOutlinedIcon sx={{ fontSize: 44 }} />
            </span>
            <div>
              <p className="text-[40px] lg:text-[52px] font-extrabold leading-none text-[#FF9D29]">4000<span className="align-super text-[26px]">+</span></p>
              <p className="mt-2 text-[20px] font-bold">School Leaders</p>
            </div>
            <p className="max-w-[260px] text-[15px] leading-7 text-[#C7CDDA]">A 14-year legacy of working with K–12 schools across India.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
