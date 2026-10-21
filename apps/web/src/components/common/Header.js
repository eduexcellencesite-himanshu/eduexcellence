"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  studyVisits,
  conferences,
  isPast,
  detailHref,
} from "../../lib/programs";

function Tag({ program }) {
  const past = isPast(program);
  return (
    <span
      className={`ml-3 shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${past ? "bg-[#F1EFE8] text-[#5F5E5A]" : "bg-[#E1F5EE] text-[#0F6E56]"}`}
    >
      {past ? "Past" : "Upcoming"}
    </span>
  );
}

function NavDropdown({ label, items }) {
  return (
    <div className="group relative">
      <button className="flex cursor-pointer items-center gap-1 text-[15px] font-medium text-[#3A4660] transition group-hover:text-[#E8861A]">
        {label}
        <KeyboardArrowDownIcon sx={{ fontSize: 17 }} />
      </button>
      <div className="invisible absolute left-0 top-full z-50 min-w-[360px] pt-3.5 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
        <div className="rounded-2xl border border-[#E7E9F0] bg-white p-2 shadow-[0_10px_30px_rgba(16,24,43,.08)]">
          {items.map((p) => (
            <Link
              key={p.slug}
              href={detailHref(p)}
              className="flex items-center justify-between rounded-xl px-3 py-2.5 text-[14.5px] font-medium text-[#3A4660] transition hover:bg-[#FFF3E2] hover:text-[#16223A]"
            >
              {p.short}
              <Tag program={p} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [reserveMenu, setReserveMenu] = useState(false);
  const visits = studyVisits();
  const confs = conferences();
  const open = [...confs, ...visits].filter((p) => !isPast(p));

  return (
    <header className="sticky top-0 z-50 border-b border-[#E7E9F0] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1180px] items-center justify-between px-6">
        <Link href="/" className="flex cursor-pointer items-center">
          <Image
            src="/assets/logo.png"
            alt="EduExcellence Logo"
            width={220}
            height={55}
            priority
            className="h-[20px] w-auto object-contain sm:h-[26px]"
          />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          <Link
            href="/"
            className="text-[15px] font-medium text-[#3A4660] transition hover:text-[#E8861A]"
          >
            Home
          </Link>
          <NavDropdown label="Study visits" items={visits} />
          <NavDropdown label="Conferences" items={confs} />
          <Link
            href="/contact"
            className="text-[15px] font-medium text-[#3A4660] transition hover:text-[#E8861A]"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center">
          <div className="relative hidden lg:block">
            {open.length > 0 ? (
              <>
                <button
                  onClick={() => setReserveMenu(!reserveMenu)}
                  className="flex cursor-pointer items-center gap-2 rounded-full bg-[#FF9D29] px-7 py-3 text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(255,157,41,0.35)] transition-all duration-200 hover:bg-[#E8861A]"
                >
                  Reserve a seat
                  <KeyboardArrowDownIcon sx={{ fontSize: 18 }} />
                </button>
                {reserveMenu && (
                  <div className="absolute right-0 mt-3 w-[320px] overflow-hidden rounded-2xl border border-[#E7E9F0] bg-white shadow-[0_10px_30px_rgba(16,24,43,.08)]">
                    <div className="border-b border-[#E7E9F0] bg-[#F8F8F8] px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                      Open for registration
                    </div>
                    {open.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/register?program=${p.slug}`}
                        className="block cursor-pointer border-b border-[#E7E9F0] px-5 py-4 transition last:border-0 hover:bg-[#FFF3E2]"
                      >
                        <span className="mb-2 inline-block rounded-md bg-[#FFF3E2] px-2 py-1 text-[10px] font-bold uppercase text-[#E8861A]">
                          {p.type === "conference"
                            ? "Conference"
                            : "Study Visit"}
                        </span>
                        <h4 className="font-semibold text-[#16223A]">
                          {p.short}
                        </h4>
                        <p className="mt-1 text-sm text-gray-500">
                          {p.dateLabel} · {p.location}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href="/contact"
                className="flex cursor-pointer items-center gap-2 rounded-full bg-[#FF9D29] px-7 py-3 text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(255,157,41,0.35)] transition-all duration-200 hover:bg-[#E8861A]"
              >
                Register your interest
              </Link>
            )}
          </div>

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="cursor-pointer lg:hidden"
          >
            {mobileMenu ? (
              <CloseIcon sx={{ fontSize: 30 }} />
            ) : (
              <MenuIcon sx={{ fontSize: 30 }} />
            )}
          </button>
        </div>
      </div>

      {mobileMenu && (
        <div className="border-t border-[#E7E9F0] bg-white lg:hidden">
          <nav className="flex flex-col px-6 py-4">
            <Link
              href="/"
              className="border-b border-[#E7E9F0] py-4 text-[#3A4660]"
              onClick={() => setMobileMenu(false)}
            >
              Home
            </Link>
            <div className="border-b border-[#E7E9F0] py-3">
              <p className="mb-1 text-[12px] font-bold uppercase tracking-wide text-[#6B7488]">
                Study visits
              </p>
              {visits.map((p) => (
                <Link
                  key={p.slug}
                  href={detailHref(p)}
                  className="flex items-center justify-between py-2 text-[15px] text-[#3A4660]"
                  onClick={() => setMobileMenu(false)}
                >
                  {p.short}
                  <Tag program={p} />
                </Link>
              ))}
            </div>
            <div className="border-b border-[#E7E9F0] py-3">
              <p className="mb-1 text-[12px] font-bold uppercase tracking-wide text-[#6B7488]">
                Conferences
              </p>
              {confs.map((p) => (
                <Link
                  key={p.slug}
                  href={detailHref(p)}
                  className="flex items-center justify-between py-2 text-[15px] text-[#3A4660]"
                  onClick={() => setMobileMenu(false)}
                >
                  {p.short}
                  <Tag program={p} />
                </Link>
              ))}
            </div>
            <Link
              href="/contact"
              className="py-4 text-[#3A4660]"
              onClick={() => setMobileMenu(false)}
            >
              Contact
            </Link>
            <Link
              href={open[0] ? `/register?program=${open[0].slug}` : "/contact"}
              className="mt-5 rounded-full bg-[#FF9D29] py-3 text-center text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(255,157,41,0.35)] hover:bg-[#E8861A]"
              onClick={() => setMobileMenu(false)}
            >
              {open[0] ? "Reserve a seat" : "Register your interest"}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
