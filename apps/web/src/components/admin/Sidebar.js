"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ContactPhoneOutlinedIcon from "@mui/icons-material/ContactPhoneOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";

const menus = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: <DashboardOutlinedIcon />,
  },
  {
    title: "Contacts",
    href: "/admin/contacts",
    icon: <ContactPhoneOutlinedIcon />,
  },
  {
    title: "Registration",
    href: "/admin/registration",
    icon: <GroupOutlinedIcon />,
  },
  // /admin/sponsor is obsolete (superseded by Partnership) — intentionally not listed.
  {
    title: "Partnership",
    href: "/admin/partnership",
    icon: <HandshakeOutlinedIcon />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-xl bg-[#16223A] p-2 text-white lg:hidden"
      >
        <MenuIcon />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-72 flex-col
          bg-[#16223A] text-white transition-transform duration-300
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <Link href="/admin/dashboard" className="flex items-center">
            <Image
              src="/assets/logo-white.png"
              alt="EduExcellence"
              width={500}
              height={77}
              priority
              className="h-[26px] w-auto object-contain"
            />
          </Link>

          <button
            onClick={() => setOpen(false)}
            className="lg:hidden"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Menu */}
        <div className="flex-1 p-4">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Main Menu
          </p>

          <nav className="space-y-2">
            {menus.map((menu) => {
              const active =
                pathname === menu.href;

              return (
                <Link
                  key={menu.href}
                  href={menu.href}
                  onClick={() => setOpen(false)}
                  className={`group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 ${
                    active
                      ? "bg-[#FF9D29] text-white shadow-lg"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span
                    className={`transition-transform group-hover:scale-110 ${
                      active
                        ? "text-white"
                        : "text-slate-400"
                    }`}
                  >
                    {menu.icon}
                  </span>

                  <span className="font-medium">
                    {menu.title}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}