"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function GainSwiper({ gain }) {
  return (
    <Swiper
      modules={[Pagination]}
      slidesPerView={1.1}
      spaceBetween={16}
      pagination={{ clickable: true }}
      className="pb-10"
    >
      {gain.map(({ Icon, t, d }) => (
        <SwiperSlide key={t} className="h-auto flex">
         <div className="mt-5 flex h-full min-h-[300px] sm:min-h-[250px] w-full gap-[18px] rounded-2xl border border-[#E7E9F0] bg-white p-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#FFF3E2] text-[#E8861A]">
              <Icon sx={{ fontSize: 23 }} />
            </span>

            <div>
              <h3 className="heading-font text-[18px] font-bold text-[#16223A]">
                {t}
              </h3>

              <p className="mt-1 text-[14.5px] text-[#6B7488]">
                {d}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}