"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";

export default function LegacySwiper({ items }) {
  return (
    <Swiper
      modules={[Pagination]}
      slidesPerView={1.15}
      spaceBetween={16}
      pagination={{ clickable: true }}
      className="pb-10"
    >
      {items.map(([img, country, years]) => (
        <SwiperSlide key={country} className="h-auto flex">
          <div className="overflow-hidden rounded-2xl border border-[#E7E9F0] bg-white w-full">
            <Image
              src={`/assets/${img}`}
              alt={country}
              width={316}
              height={192}
              className="h-[180px] w-full object-cover"
            />

            <div className="px-5 py-5 text-center">
              <h3 className="heading-font text-[18px] font-bold text-[#16223A]">
                {country}
              </h3>

              <p className="mt-1 text-[14px] text-[#6B7488] mb-4 mb-md-0">
                {years}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}