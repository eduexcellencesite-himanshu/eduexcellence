"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";

export default function CardSwiper({ items }) {
  return (
    <Swiper
      modules={[Pagination]}
      slidesPerView={1.1}
      spaceBetween={16}
      pagination={{ clickable: true }}
      className="pb-10"
    >
      {items.map(([tag, title, desc, img]) => (
        <SwiperSlide key={title} className="h-auto flex">
       <div className="mt-5 flex h-full min-h-[480px] sm:min-h-[430px] lg:min-h-[390px] w-full flex-col overflow-hidden rounded-2xl border border-[#E7E9F0] bg-white">
            {/* Image */}
            <div className="relative h-[210px] shrink-0">
              <Image
                src={img}
                alt={title}
                fill
                sizes="(max-width:768px) 90vw, 33vw"
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <span className="text-[11px] font-bold uppercase tracking-wide text-[#E8861A]">
                {tag}
              </span>

              <h3 className="heading-font my-2 text-[18px] font-bold text-[#16223A]">
                {title}
              </h3>

              <p className="text-[14px] text-[#6B7488]">
                {desc}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}