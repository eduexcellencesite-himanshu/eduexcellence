import Link from "next/link";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { openPrograms, detailHref } from "../lib/programs";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FlightTakeoffOutlinedIcon from "@mui/icons-material/FlightTakeoffOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import MailOutlineIcon from "@mui/icons-material/EmailOutlined";

const LINKS = [
  { Icon: HomeOutlinedIcon, label: "Home", desc: "Back to the start", href: "/" },
  { Icon: FlightTakeoffOutlinedIcon, label: "Study visits", desc: "Our latest international visit", href: "/study-visits" },
  { Icon: GroupsOutlinedIcon, label: "Conferences", desc: "The latest Educarnival", href: "/conferences" },
  { Icon: MailOutlineIcon, label: "Contact us", desc: "We'll point you the right way", href: "/contact" },
];

export const metadata = { title: "Page not found — EduExcellence" };

export default function NotFound() {
  const open = openPrograms();
  const featured = open[0];

  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="mx-auto max-w-[860px] px-6 py-24 text-center">
          <span className="heading-font block text-[110px] font-extrabold leading-none text-[#FF9D29] md:text-[150px]">404</span>
          <h1 className="heading-font mt-4 text-[30px] font-extrabold text-[#16223A] md:text-[40px]">This page took a different study tour</h1>
          <p className="mx-auto mt-4 max-w-[560px] text-[17px] leading-relaxed text-[#6B7488]">
            The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get you back to something useful.
          </p>

          {featured && (
            <Link
              href={`/register?program=${featured.slug}`}
              className="mt-9 inline-flex h-[52px] items-center gap-2 rounded-full bg-[#FF9D29] px-8 text-[15px] font-semibold text-white transition hover:bg-[#E8861A]"
            >
              Reserve a seat on {featured.short} <ArrowForwardIcon sx={{ fontSize: 18 }} />
            </Link>
          )}

          <div className="mt-14 grid gap-5 text-left sm:grid-cols-2">
            {LINKS.map(({ Icon, label, desc, href }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-4 rounded-2xl border border-[#E7E9F0] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#FF9D29] hover:shadow-[0_10px_30px_rgba(16,24,43,.08)]"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#FFF3E2] text-[#E8861A]">
                  <Icon sx={{ fontSize: 23 }} />
                </span>
                <span>
                  <span className="heading-font block text-[17px] font-bold text-[#16223A]">{label}</span>
                  <span className="text-[14px] text-[#6B7488]">{desc}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
