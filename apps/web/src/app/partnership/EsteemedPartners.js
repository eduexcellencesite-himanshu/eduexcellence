"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { shuffle } from "../../lib/shuffle";

// Partner logos already in /public/assets. Drop new files in and add a line here.
const logos = [
  { name: "Avishkaar", img: "/assets/Avishkaar.png" },
  { name: "Class Teacher Learning System", img: "/assets/class-teacher-learning-system.png" },
  { name: "Codevidhya", img: "/assets/Codevidhya.png" },
  { name: "Creya", img: "/assets/Creya.png" },
  { name: "Edunext", img: "/assets/Edunext.png" },
  { name: "Eduvate", img: "/assets/Eduvate.png" },
  { name: "IOSIGNITE", img: "/assets/Losignite.png" },
  { name: "Mapmystudy", img: "/assets/Mapmystudy.png" },
  { name: "MKCL", img: "/assets/MKCL.png" },
  { name: "NU", img: "/assets/NU.png" },
  { name: "Oracle", img: "/assets/Oracle.png" },
  { name: "Parenting Orb", img: "/assets/parenting-orb.png" },
  { name: "Pepsi", img: "/assets/pepsi.png" },
  { name: "Primary Plus", img: "/assets/primary-plus.png" },
  { name: "QFS", img: "/assets/qfs.png" },
  { name: "Rancho Labs", img: "/assets/rancho-labs.png" },
  { name: "Rishihood University", img: "/assets/rishihood-university.png" },
  { name: "Scholarly", img: "/assets/scholarly.png" },
  { name: "Sonacore", img: "/assets/Sonacore.png" },
  { name: "ViewSonic", img: "/assets/ViewSonic.png" },
  { name: "Ryan Group", img: "/assets/p-ryan.png" },
  { name: "Torrins", img: "/assets/p1.png" },
  { name: "Scholastic", img: "/assets/p2.png" },
  // `scale` nudges logos with lots of built-in whitespace so visual weight is even.
  // Keep it ≤ 1.15: the tile is 200×100 with a 168×84 image box, so anything larger
  // can push the (object-contain) image box past the tile edge and clip the logo.
  { name: "Active Mind", img: "/assets/logo1.webp", scale: 1.15 },
  { name: "Yugen Infra", img: "/assets/yugen.webp" },
  { name: "TeachBetter.ai", img: "/assets/logo3.webp" },
  { name: "Suraasa", img: "/assets/logo4.webp" },
  { name: "Sprix", img: "/assets/logo5.webp" },
  { name: "Sparkl", img: "/assets/logo6.webp", scale: 1.15 },
  { name: "MTG & SOF", img: "/assets/mtg.webp", scale: 1.1 },
  { name: "School Decor", img: "/assets/logo8.webp" },
  { name: "RoboSpecies", img: "/assets/logo9.webp" },
  { name: "Plaksha University", img: "/assets/logo10.webp" },
  { name: "PhygiTech", img: "/assets/logo11.webp" },
  { name: "Mittsure", img: "/assets/mitt.webp" },
  { name: "Mariners Realty", img: "/assets/mariners.webp", scale: 1.15 },
  { name: "KIET University", img: "/assets/logo14.webp" },
  { name: "JK Lakshmipat University", img: "/assets/logo15.webp", scale: 1.1 },
  { name: "Vishwa Hara Chakra", img: "/assets/logo-vishwa-hara-chakra.webp", scale: 1.05 },
  { name: "Ruhil Future Technologies", img: "/assets/logo-ruhil.webp", scale: 1.05 },
  { name: "Greyy Elephant", img: "/assets/logo17.webp" },
  { name: "Google for Education", img: "/assets/logo18.webp" },
  { name: "FeelFirst Publishing", img: "/assets/logo19.webp" },
  { name: "DataLyca Technologies", img: "/assets/logo20.webp" },
  { name: "Credila", img: "/assets/logo21.webp" },
  { name: "Council for International Education", img: "/assets/logo22.webp", scale: 1.15 },
  { name: "Campus Mall", img: "/assets/logo23.webp", scale: 1.1 },
  { name: "BOSSE Sikkim", img: "/assets/logo24.webp", scale: 1.1 },
  { name: "Ashoka University", img: "/assets/ashoka.webp" },
  { name: "Smarts-Shapes", img: "/assets/smart.webp" },
  { name: "Aakash BYJU'S", img: "/assets/aakash.webp" },
  { name: "Senrysa", img: "/assets/sen.webp" },
  { name: "ScienceUtsav", img: "/assets/logo29.webp" },
  { name: "MyLeading Campus", img: "/assets/leading.webp" },
  { name: "Jeppiaar University", img: "/assets/jeppi.webp" },
  { name: "inspace", img: "/assets/logo32.webp" },
  { name: "Indira Publishers", img: "/assets/logo33.webp" },
  { name: "CK-12", img: "/assets/logo34.webp" },
  { name: "DIYA Academy", img: "/assets/logo35.webp" },
  { name: "EduAI Hub", img: "/assets/logo36.webp", scale: 1.1 },
  { name: "edutech", img: "/assets/logo37.webp" },
  { name: "Blue Orange", img: "/assets/logo39.webp", scale: 1.1 },
  { name: "TATA ClassEdge", img: "/assets/logo41.webp", scale: 1.15 },
  { name: "Vidyalaya", img: "/assets/vidya.webp" },
  { name: "StudyAPT", img: "/assets/study.webp" },
  { name: "Connect School ERP", img: "/assets/connect.webp", scale: 1.15 },
  { name: "NEERI", img: "/assets/neeri.webp", scale: 1.1 },
  { name: "Klip VR", img: "/assets/klip.webp", scale: 1.15 },
  { name: "PHASE Sports", img: "/assets/logo-phase-sports.webp" },
  // Added from the client's "Logos" Drive folder (Oct 2026 audit).
  { name: "Delhi Jal Board", img: "/assets/logo-delhi-jal-board.webp" },
  { name: "Dextres", img: "/assets/logo-dextres.webp", scale: 1.1 },
  { name: "Education World", img: "/assets/logo-education-world.webp" },
  { name: "Engrezi", img: "/assets/logo-engrezi.webp" },
  { name: "In-Fluent Learning", img: "/assets/logo-influent-learning.webp", scale: 1.1 },
  { name: "School Founders Club", img: "/assets/logo-school-founders-club.webp" },
  { name: "Designmate", img: "/assets/logo-designmate.webp" },
  { name: "Entab", img: "/assets/logo-entab.webp" },
];

function LogoRow({ items, reverse }) {
  return (
    // py-2 leaves room for the hover lift so the tile's top border isn't clipped.
    <div className="overflow-hidden py-2">
      <div
        className="partner-track flex w-max gap-4 md:gap-5"
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      >
        {[...items, ...items].map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="group flex h-[88px] w-[170px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#E7E9F0] bg-white px-4 py-2 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF9D29] hover:shadow-[0_10px_24px_rgba(16,24,43,.08)] md:h-[100px] md:w-[200px]"
          >
            <div className="relative h-full w-full transition-transform duration-300 ease-out group-hover:scale-[1.04]">
              <Image
                src={logo.img}
                alt={logo.name}
                fill
                sizes="200px"
                loading="eager"
                style={{ transform: `scale(${logo.scale || 1})` }}
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EsteemedPartners() {
  // Static order for the server render, randomised once mounted so no two visits look alike.
  const [order, setOrder] = useState(logos);
  useEffect(() => setOrder(shuffle(logos)), []);
  const half = Math.ceil(order.length / 2);
  const rows = [order.slice(0, half), order.slice(half)];

  return (
    <section className="overflow-hidden bg-white py-16 md:py-20">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mx-auto max-w-[760px] text-center">
          <span className="inline-flex rounded-full bg-[#FFF3E2] px-5 py-2 text-[12px] font-bold uppercase tracking-[0.14em] text-[#E8861A]">
            Our Associations
          </span>
          <h2 className="heading-font mt-5 text-[32px] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#16223A] sm:text-[40px] md:text-[46px]">
            Partners Who Believe in <span className="text-[#E8861A]">Our Vision</span>
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-[#6B7488] md:text-[16px]">
            Brands and institutions that have partnered with Educarnival across IIT Delhi and IIT Madras.
          </p>
        </div>
      </div>

      <div className="relative mt-10 space-y-4 md:mt-12 md:space-y-5">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent md:w-32" />
        <LogoRow items={rows[0]} reverse={false} />
        <LogoRow items={rows[1]} reverse />
      </div>

      <style jsx global>{`
        @keyframes partnerScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .partner-track { animation: partnerScroll 90s linear infinite; will-change: transform; }
        .partner-track:hover { animation-play-state: paused; }
        @media (max-width: 768px) { .partner-track { animation-duration: 70s; } }
        @media (prefers-reduced-motion: reduce) { .partner-track { animation: none; } }
      `}</style>
    </section>
  );
}
