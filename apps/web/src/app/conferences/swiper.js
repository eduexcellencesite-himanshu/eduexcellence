"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function TopicsSwiper({ cards }) {
  return (
    <Swiper
      modules={[Pagination]}
      slidesPerView={1.08}
      spaceBetween={18}
      pagination={{ clickable: true }}
    >
      {cards.map((card) => {
        const Icon = card.Icon;

        return (
          <SwiperSlide key={card.t} className="flex h-auto">
            <div className="flex h-full min-h-[480px] w-full flex-col rounded-2xl border border-[#E7E9F0] bg-white p-6">
              <div className="mb-4 grid h-[46px] w-[46px] place-items-center rounded-xl bg-[#FFF3E2] text-[#E8861A]">
                <Icon sx={{ fontSize: 23 }} />
              </div>

              <h4 className="mb-3 min-h-[52px] text-[18px] font-bold leading-snug text-[#16223A]">
                {card.t}
              </h4>

              <ul className="space-y-2">
                {card.p.map((item) => (
                  <li
                    key={item}
                    className="relative pl-5 text-[14px] leading-7 text-[#3A4660]
                    before:absolute before:left-0 before:top-3 before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#FF9D29]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
