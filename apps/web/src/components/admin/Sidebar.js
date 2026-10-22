"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ContactPhoneOutlinedIcon from "@mui/icons-material/ContactPhoneOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";

const menus = [
  { title: "Dashboard", href: "/admin/dashboard", icon: <DashboardOutlinedIcon /> },
  { title: "Contact Us", href: "/admin/contacts", icon: <ContactPhoneOutlinedIcon /> },
  { title: "Registration", href: "/admin/registration", icon: <GroupOutlinedIcon /> },
  // /admin/sponsor is obsolete (superseded by Partnership) — intentionally not listed.
  { title: "Partnership", href: "/admin/partnership", icon: <HandshakeOutlinedIcon /> },
];

// Desktop (lg+): always visible, either full width or an icon rail, toggled with the
// arrow on its edge. Below lg: an off-canvas drawer opened from the header.
export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const pathname = usePathname();

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen flex-col bg-[#16223A] text-white transition-[width,transform] duration-300
          w-72 ${collapsed ? "lg:w-20" : "lg:w-72"}
          lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className={`flex h-[72px] items-center border-b border-white/10 ${collapsed ? "lg:justify-center lg:px-0" : ""} justify-between px-5`}>
          <Link href="/admin/dashboard" className="flex items-center" onClick={() => setMobileOpen(false)} title="EduExcellence">
            {collapsed ? (
              <>
                <span className="hidden text-2xl font-extrabold text-[#FF9D29] lg:block">e</span>
                <Image src="/assets/logo-white.png" alt="EduExcellence" width={500} height={77} priority className="h-[26px] w-auto object-contain lg:hidden" />
              </>
            ) : (
              <Image src="/assets/logo-white.png" alt="EduExcellence" width={500} height={77} priority className="h-[26px] w-auto object-contain" />
            )}
          </Link>

          <button onClick={() => setMobileOpen(false)} className="rounded-lg p-1 text-slate-300 hover:bg-white/10 hover:text-white lg:hidden" aria-label="Close menu">
            <CloseIcon />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 space-y-1.5 p-3">
          {!collapsed && (
            <p className="mb-2 px-3 pt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Main Menu</p>
          )}
          {menus.map((menu) => {
            const active = pathname === menu.href || pathname.startsWith(menu.href + "/");
            return (
              <Link
                key={menu.href}
                href={menu.href}
                title={menu.title}
                onClick={() => setMobileOpen(false)}
                className={`group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 ${collapsed ? "lg:justify-center lg:px-0" : ""} ${
                  active ? "bg-[#FF9D29] text-white shadow-lg" : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className={`shrink-0 transition-transform group-hover:scale-110 ${active ? "text-white" : "text-slate-400"}`}>
                  {menu.icon}
                </span>
                <span className={`whitespace-nowrap font-medium ${collapsed ? "lg:hidden" : ""}`}>{menu.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Collapse / expand arrow (desktop only), sitting on the sidebar's edge */}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand" : "Collapse"}
          className="absolute -right-3.5 top-[88px] hidden h-7 w-7 items-center justify-center rounded-full border border-[#E7E9F0] bg-white text-[#16223A] shadow-md transition hover:bg-[#FFF3E2] hover:text-[#E8861A] lg:flex"
        >
          {collapsed ? <ChevronRightIcon sx={{ fontSize: 18 }} /> : <ChevronLeftIcon sx={{ fontSize: 18 }} />}
        </button>
      </aside>
    </>
  );
}
