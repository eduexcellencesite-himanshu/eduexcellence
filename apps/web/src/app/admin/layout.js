"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({ children }) {
  // Desktop: full sidebar or icon rail. Mobile: off-canvas drawer.
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8F9FC]">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className={`min-w-0 flex-1 transition-[margin] duration-300 ${collapsed ? "lg:ml-20" : "lg:ml-72"}`}>
        <AdminHeader
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          onOpenMobile={() => setMobileOpen(true)}
        />

        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
