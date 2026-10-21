"use client";

import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import FlightTakeoffOutlinedIcon from "@mui/icons-material/FlightTakeoffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CoPresentOutlinedIcon from "@mui/icons-material/CoPresentOutlined";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const PROGRAMS = [
  {
    Icon: GroupsOutlinedIcon,
    title: "Leadership Conclave",
    desc: "Collaboration and reflection on real problems of practice — you leave with practical strategies you can use straight away.",
  },
  {
    Icon: SchoolOutlinedIcon,
    title: "Journey Back to School",
    desc: "Visits to leading Indian schools to understand what makes them a brand — history, culture, curriculum, pedagogy and teacher development.",
  },
  {
    Icon: CampaignOutlinedIcon,
    title: "International K-12 Conference · Educarnival",
    desc: "Our annual three-day conference with IIT Delhi — the biggest gathering of school leaders in India, from 800+ CBSE, ICSE and IB schools.",
  },
  {
    Icon: FlightTakeoffOutlinedIcon,
    title: "International Study Tour",
    desc: "A five-day program to learn from international education systems and collaborate with experts, away from day-to-day administration.",
  },
  {
    Icon: VisibilityOutlinedIcon,
    title: "Shadowing Programs",
    desc: "Explore international education up close by observing a global educator at work in their own classroom.",
  },
  {
    Icon: CoPresentOutlinedIcon,
    title: "Faculty Development Workshops",
    desc: "Hands-on, research-based training for teachers and school leaders — practical classroom and leadership skills they can apply the moment they're back at school.",
  },
];

// No fixed min-height: cards size to their text. In the swiper the slides stretch
// to the tallest card, so they still line up without leaving a blank block.
function ProgramCard({ Icon, title, desc }) {
  return (
   <div className="group flex w-full flex-col rounded-2xl border border-[#E7E9F0] bg-white p-6 transition hover:-translate-y-1 hover:border-[#FF9D29]/40 hover:shadow-[0_15px_35px_rgba(16,24,43,.08)]">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF3E2] text-[#E8861A] transition group-hover:scale-110">
          <Icon sx={{ fontSize: 22 }} />
        </span>

        <div className="flex h-full flex-1 flex-col">
          <h3 className="min-h-[36px] text-[18px] lg:text-[20px] font-bold leading-snug text-[#16223A]">
            {title}
          </h3>

          <p className="mt-2 flex-1 text-[16px] leading-8 text-[#6B7488]">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Programs() {
  return (
    <section className="bg-[#F7F8FB] py-20">
      <div className="mx-auto max-w-[1180px] px-6">
        {/* Heading */}

        <div className="mx-auto mb-14 max-w-[720px] text-center">
          <span className="inline-flex rounded-full bg-[#FFF3E2] px-5 py-2 text-[13px] font-bold uppercase tracking-[0.15em] text-[#E8861A]">
            Our Programs
          </span>

          <h2 className="mt-5 text-[30px] font-extrabold leading-tight text-[#16223A] md:text-[34px]">
            Programs Built for School Leaders
          </h2>

          <p className="mt-3 text-[16px] leading-8 text-[#6B7488] lg:text-[18px]">
            From conferences and study tours to classroom shadowing — formats
            designed around how school leaders actually learn.
          </p>
        </div>

        {/* Mobile Swiper */}

        <div className="lg:hidden">
          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView={1.08}
            spaceBetween={18}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            className="pb-12"
          >
            {PROGRAMS.map((item) => (
              <SwiperSlide key={item.title} className="!flex !h-auto">
                <ProgramCard {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop Grid */}

        <div className="hidden grid-cols-1 gap-6 sm:grid-cols-2 lg:grid">
          {PROGRAMS.map((item) => (
            <ProgramCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}