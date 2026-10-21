"use client";

import Image from "next/image";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";

const opportunities = [
  {
    Icon: RecordVoiceOverOutlinedIcon,
    title: "Speaking Opportunities",
    desc: "Share your expertise with 500+ school leaders from the main stage.",
    cta: "Apply to speak",
    img: "/assets/speaking.webp",
  },
  {
    Icon: StorefrontOutlinedIcon,
    title: "Expo & Exhibition",
    desc: "Showcase your products to decision-makers in a dedicated exhibition zone.",
    cta: "Book your stall",
    img: "/assets/exhibition.png",
  },
  {
    Icon: HandshakeOutlinedIcon,
    title: "Partnership & Sponsorship",
    desc: "Support the conference as a partner or sponsor and build lasting relationships with school leaders.",
    cta: "Partner with us",
    img: "/assets/moment-17.webp",
  },
  {
    Icon: WorkspacePremiumOutlinedIcon,
    title: "Recognition",
    desc: "Celebrate excellence — nominate leaders and institutions for recognition.",
    cta: "Nominate now",
    img: "/assets/award.png",
  },
];

export default function Recognition() {
  return (
    <section id="why-partner" className="bg-[#F7F8FB] py-16 md:py-20">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mx-auto max-w-[760px] text-center">
          <span className="inline-flex rounded-full bg-[#FFF3E2] px-5 py-2 text-[12px] font-bold uppercase tracking-[0.14em] text-[#E8861A]">
            Be Part of the Journey
          </span>
          <h2 className="heading-font mt-5 text-[32px] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#16223A] sm:text-[40px] md:text-[46px]">
            Let&apos;s Create <span className="text-[#E8861A]">Impact Together</span>
          </h2>
          <p className="mt-4 text-balance text-[15px] leading-7 text-[#6B7488] md:text-[16px]">
            Four ways to be part of IIT Delhi Educarnival 2026 — on stage, on the floor, as a partner or through recognition.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {opportunities.map(({ Icon, title, desc, cta, img }) => (
            <a
              key={title}
              href="#partner-form"
              // Preselect this interest in the form below (ConnectPartner listens for it).
              onClick={() => window.dispatchEvent(new CustomEvent("partner-interest", { detail: title }))}
              className="group flex flex-col overflow-hidden rounded-[22px] border border-[#E7E9F0] bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FF9D29]/50 hover:shadow-[0_22px_45px_rgba(16,24,43,.12)]"
            >
              {/* Taller on phones (card is full width there) and anchored to the top so faces aren't cropped. */}
              <div className="relative h-[210px] overflow-hidden sm:h-[160px]">
                <Image src={img} alt={title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px" className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#FFF3E2] text-[#E8861A]">
                  <Icon sx={{ fontSize: 22 }} />
                </span>
                <h3 className="heading-font mt-4 text-[19px] font-extrabold leading-snug text-[#16223A]">{title}</h3>
                <p className="mt-2 flex-1 text-[14px] leading-6 text-[#6B7488]">{desc}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-bold text-[#E8861A]">
                  {cta}
                  <ArrowForwardIcon sx={{ fontSize: 16 }} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
