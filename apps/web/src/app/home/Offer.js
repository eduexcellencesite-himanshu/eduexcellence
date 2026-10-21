"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { detailHref } from "../../lib/programs";

const offers = [
  {
    tag: "Study Visit",
    title: "USA Study Visit 2026",
    desc: "San Francisco & Silicon Valley — observe AI, design thinking and industry-partnered schools first-hand.",
    image: "/assets/d-classroom.jpg",
    slug: "usa-study-visit-2026",
    type: "study-visit",
  },
  {
    tag: "Educarnival",
    title: "Educarnival · IIT Madras 2026",
    desc: '5th international symposium — "Building a dream school team" for founders and academic leaders.',
    image: "/assets/d-iitmadras.png",
    slug: "educarnival-iitmadras-2026",
    type: "conference",
  },
  {
    tag: "Study Visit",
    title: "Singapore & Malaysia",
    desc: "Explore PISA Rank-2 systems and collaborative international curricula across two countries.",
    image: "/assets/d-malaysia.png",
    slug: "singapore",
    type: "study-visit",
  },
  {
    tag: "Study Visit",
    title: "Finland",
    desc: "Helsinki's trust-based, low-stakes model — forest curriculum, qualified teachers.",
    image: "/assets/prog-photo.jpg",
    slug: "finland",
    type: "study-visit",
  },
  {
    tag: "Study Visit",
    title: "Australia & Germany",
    desc: "Dual-destination immersion into vocational pathways and world-class school operations.",
    image: "/assets/d-germany.png",
    slug: "australia-germany",
    type: "study-visit",
  },
  {
    tag: "Educarnival",
    title: "Educarnival 2024",
    desc: "Our flagship K-12 conference bringing together 500+ schools.",
    image: "/assets/d-audience.jpg",
    slug: "educarnival-iitdelhi-2024",
    type: "conference",
  },
];

export default function Offer() {
  return (
    <section id="offer" className="scroll-mt-24 bg-white py-[72px]">
      <div className="mx-auto max-w-[1180px] px-8">
        {/* Heading */}

        <div className="text-center">
          <span className="inline-flex rounded-full bg-[#FFF3E2] px-5 py-2 text-[13px] font-bold uppercase tracking-[0.16em] text-[#E8861A]">
            Study Visits & Educarnivals
          </span>

          <h2 className="mt-6 text-[30px] lg:text-[38px] font-extrabold text-[#16223A]">
            What we offer
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-[16px] lg:text-[18px] leading-8 text-[#6A748B]">
            International study visits for school leaders, and the Educarnival{" "}
            <br></br>
            conferences — no courses, only immersive experiences.
          </p>
        </div>

        {/* Swiper */}

        <div className="mt-20">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={26}
            breakpoints={{
              0: {
                slidesPerView: 1.1,
              },
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="offer-swiper !pb-14 items-stretch"
          >
            {offers.map((item, index) => (
              <SwiperSlide key={index} className="!h-auto flex">
                <Link
                  href={detailHref({
                    type: item.type,
                    slug: item.slug,
                  })}
                  className="group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-[#E6E8EF] bg-white transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-[220px]">
                    <Image
                      src={item.image}
                      fill
                      alt={item.title}
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <span className="inline-block rounded-lg bg-[#FFF3E2] px-3 py-2 text-[12px] font-bold uppercase tracking-wider text-[#E8861A]">
                      {item.tag}
                    </span>

                    <h3 className="mt-5 min-h-[36px] text-[20px] font-bold text-[#16223A]">
                      {item.title}
                    </h3>

                    <p className="mt-3 flex-1 text-[16px] leading-8 text-[#6A748B]">
                      {item.desc}
                    </p>

                    <span className="mt-6 font-semibold text-[#E8861A] ">
                      Know more →
                    </span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
