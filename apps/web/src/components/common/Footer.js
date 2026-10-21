"use client";

import Link from "next/link";
import Image from "next/image";

import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { studyVisits, conferences, detailHref } from "../../lib/programs";

export default function Footer() {
  const visits = studyVisits();
  const confs = conferences();

  return (
    <footer className="relative overflow-hidden bg-[#07152E] text-white">
      {/* Glow Effects */}

      <div className="absolute left-[-120px] top-[80px] h-[260px] w-[260px] rounded-full bg-[#FF9D29]/20 blur-[120px]" />

      <div className="absolute right-[-120px] bottom-[80px] h-[260px] w-[260px] rounded-full bg-[#315BFF]/20 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 py-[72px]">
        {/* Main Footer */}

        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr]">
          {/* Brand */}

          <div>
            <Link href="/">
              <Image
                src="/assets/logo-white.png"
                alt="EduExcellence"
                width={220}
                height={32}
                className="w-[220px]"
              />
            </Link>

            <p className="mt-8 max-w-[320px] text-[14px] leading-8 text-[#C7CDDA]">
              A research-based training and development organisation focused on
              transforming K–12 education through global learning experiences.
            </p>

            <div className="mt-8 flex gap-3">
              {[
                {
                  Icon: FacebookIcon,
                  href: "https://www.facebook.com/EduExcellence4Schools/",
                  label: "Facebook",
                },
                {
                  Icon: LinkedInIcon,
                  href: "https://www.linkedin.com/company/eduexcellence/",
                  label: "LinkedIn",
                },
                {
                  Icon: InstagramIcon,
                  href: "https://www.instagram.com/eduexcellencesociety/",
                  label: "Instagram",
                },
                {
                  Icon: YouTubeIcon,
                  href: "https://www.youtube.com/@eduexcellence1519",
                  label: "YouTube",
                },
              ].map(({ Icon, href, label }) => {
                const external = href.startsWith("http");
                return (
                  <Link
                    key={label}
                    href={href}
                    aria-label={label}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.06] text-white/75 ring-1 ring-white/10 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-gradient-to-br hover:from-[#FFB152] hover:to-[#E8861A] hover:text-white hover:ring-transparent hover:shadow-[0_10px_24px_rgba(232,134,26,.4)]"
                  >
                    <Icon
                      sx={{ fontSize: 19 }}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="text-[15px] font-semibold text-white">
              Quick Links
            </h3>

            <div className="mt-3 h-[3px] w-12 rounded-full bg-[#FF9D29]" />

            <ul className="mt-6 space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Contact", href: "/contact" },
                { label: "Reserve a seat", href: "/register" },
                { label: "Become a Partner", href: "/partnership" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-2 text-[14px] text-[#D2D8E5]"
                  >
                    <ChevronRightIcon
                      sx={{ fontSize: 17 }}
                      className="transition-all duration-500 ease-out group-hover:translate-x-1.5 group-hover:text-[#FF9D29]"
                    />

                    <span className="transition-all duration-500 ease-out group-hover:translate-x-1.5 group-hover:text-[#FF9D29]">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Study Visits */}

          <div>
            <h3 className="text-[15px] font-semibold text-white">
              Study Visits
            </h3>

            <div className="mt-3 h-[3px] w-12 rounded-full bg-[#FF9D29]" />

            <ul className="mt-6 space-y-3">
              {visits.slice(0, 6).map((item) => (
                <li key={item.slug}>
                  <Link
                    href={detailHref(item)}
                    className="group flex items-start gap-2 text-[14px] text-[#D2D8E5]"
                  >
                    <ChevronRightIcon
                      sx={{ fontSize: 17 }}
                      className="mt-[2px] transition-all duration-500 ease-out group-hover:translate-x-1.5 group-hover:text-[#FF9D29]"
                    />

                    <span className="transition-all duration-500 ease-out group-hover:translate-x-1.5 group-hover:text-[#FF9D29]">
                      {item.short}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Conferences */}

          <div>
            <h3 className="text-[15px] font-semibold text-white">
              Conferences
            </h3>

            <div className="mt-3 h-[3px] w-12 rounded-full bg-[#FF9D29]" />

            <ul className="mt-6 space-y-3">
              {confs.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={detailHref(item)}
                    className="group flex items-start gap-2 text-[14px] text-[#D2D8E5]"
                  >
                    <ChevronRightIcon
                      sx={{ fontSize: 17 }}
                      className="mt-[2px] transition-all duration-500 ease-out group-hover:translate-x-1.5 group-hover:text-[#FF9D29]"
                    />

                    <span className="transition-all duration-500 ease-out group-hover:translate-x-1.5 group-hover:text-[#FF9D29]">
                      {item.short}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="text-[15px] font-semibold text-white">
              Get In Touch
            </h3>

            <div className="mt-3 h-[3px] w-12 rounded-full bg-[#FF9D29]" />

            <div className="mt-6 space-y-5">
              <div className="group flex items-start gap-4">
                <EmailOutlinedIcon
                  sx={{
                    color: "#FF9D29",
                    fontSize: 18,
                  }}
                />

                <a
                  href="mailto:arnab@eduexcellence.in"
                  className="text-[14px] text-[#D2D8E5] transition-all duration-500 ease-out group-hover:translate-x-1.5 group-hover:text-[#FF9D29]"
                >
                  arnab@eduexcellence.in
                </a>
              </div>

              <div className="group flex items-start gap-4">
                <PhoneOutlinedIcon
                  sx={{
                    color: "#FF9D29",
                    fontSize: 18,
                  }}
                />

                <a
                  href="tel:+919990418600"
                  className="text-[14px] text-[#D2D8E5] transition-all duration-500 ease-out group-hover:translate-x-1.5 group-hover:text-[#FF9D29]"
                >
                  +91 99904 18600
                </a>
              </div>

              <div className="group flex items-start gap-4">
                <LocationOnOutlinedIcon
                  sx={{
                    color: "#FF9D29",
                    fontSize: 18,
                  }}
                />

                <p className="text-[14px] leading-7 text-[#D2D8E5] transition-all duration-500 ease-out group-hover:translate-x-1.5 group-hover:text-[#FF9D29]">
                  402, 4th Floor, A-09
                  <br />
                  Northex GDITL Tower
                  <br />
                  Netaji Subhash Place
                  <br />
                  Delhi 110034
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Area */}

        <div className="mt-10 lg:mt-20 border-t border-white/10 pt-10">
          <div className="grid gap-8 items-start lg:grid-cols-3">
            {/* Left */}
            <p className=" text-[14px] text-[#D2D8E5] lg:text-left lg:self-center">
              © 2026 EduExcellence. All rights reserved.
            </p>

            {/* Center */}
            <div className="flex  lg:justify-center">
              <div className="flex items-center gap-5">
                <Link
                  href="/privacy-policy"
                  className="text-[14px] text-[#D2D8E5] transition hover:text-white"
                >
                  Privacy Policy
                </Link>

                <span className="text-white/20">|</span>

                <Link
                  href="/terms"
                  className="text-[14px] text-[#D2D8E5] transition hover:text-white"
                >
                  Terms of Service
                </Link>
              </div>
            </div>

            {/* Right */}
            <p className=" text-[14px] text-[#D2D8E5] lg:text-right lg:self-center">
              Designed & Developed by{" "}
              <a
                href="https://www.engeniatech.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#FF9D29] transition hover:text-white"
              >
                Engenia Technologies
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
