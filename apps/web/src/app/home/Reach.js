"use client";

import Image from "next/image";

const states = [
  "Punjab",
  "Haryana",
  "Rajasthan",
  "Gujarat",
  "Madhya Pradesh",
  "Uttar Pradesh",
  "Maharashtra",
  "Uttarakhand",
  "Jammu & Kashmir",
  "West Bengal",
  "Jharkhand",
  "Chhattisgarh",
  "Bihar",
  "Himachal Pradesh",
  "Assam",
  "North East States",
];

export default function Reach() {
  return (
    <section className="bg-[#F7F8FB] py-[72px]">
      <div className="mx-auto grid max-w-[1180px] items-center gap-14 px-6 lg:grid-cols-[0.8fr_1.2fr]">
        {/* Left */}
        <div className="flex min-h-[430px] items-center justify-center rounded-3xl border border-[#E7E9F0] bg-white p-8 lg:h-full">
          <Image
            src="/assets/india-map.png"
            alt="India Map"
            width={320}
            height={420}
            className="h-full max-h-[420px] w-auto object-contain"
          />
        </div>

        {/* Right */}
        <div>
          <span className="inline-flex rounded-full bg-[#FFF3E2] px-5 py-2 text-[13px] font-bold uppercase tracking-[0.15em] text-[#E8861A]">
            Pan-India Reach
          </span>

          <h2 className="mt-6  text-[30px] font-extrabold leading-tight text-[#16223A]">
            School leaders from across the country
          </h2>

          <p className="mt-3 max-w-[650px] text-[16px] leading-8 text-[#6B7488]">
            Our programs bring together educators from 16+ states — from Punjab
            and Maharashtra to West Bengal and the North-East.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {states.map((state, index) => (
              <span
                key={index}
                className="rounded-full border border-[#E7E9F0] bg-white px-5 py-2 text-[14px] font-medium text-[#4B5565] transition-all duration-300 hover:border-[#FF9D29] hover:bg-[#FFF3E2] hover:text-[#E8861A]"
              >
                {state}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
