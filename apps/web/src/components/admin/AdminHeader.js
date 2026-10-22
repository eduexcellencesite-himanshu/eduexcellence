"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import MenuIcon from "@mui/icons-material/Menu";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

export default function AdminHeader({ onOpenMobile }) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const logout = () => {
    localStorage.clear();
    router.replace("/auth/admin/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
      <div className="flex h-16 items-center justify-between px-4 md:h-18 md:px-6">
        {/* Mobile: opens the sidebar drawer. Desktop: the sidebar has its own arrow. */}
        <button
          onClick={onOpenMobile}
          className="rounded-xl border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-50 lg:hidden"
          aria-label="Open menu"
        >
          <MenuIcon />
        </button>
        <div className="hidden lg:block" />

        <button
          onClick={(e) => setAnchorEl(e.currentTarget)}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1.5 transition-all hover:bg-slate-50 md:gap-3 md:px-3"
        >
          <Avatar sx={{ width: 38, height: 38, bgcolor: "#FF9D29", fontWeight: 700, fontSize: "14px" }}>
            {user?.name?.charAt(0)?.toUpperCase() || "A"}
          </Avatar>

          {/* Hide name on very small screens */}
          <div className="hidden text-left sm:block">
            <h4 className="text-sm font-semibold text-slate-800">{user?.name || "Admin"}</h4>
            <p className="text-xs text-slate-500">Administrator</p>
          </div>

          <KeyboardArrowDownOutlinedIcon fontSize="small" className="text-slate-500" />
        </button>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          PaperProps={{ sx: { mt: 1, minWidth: 180, borderRadius: 3, boxShadow: "0px 10px 30px rgba(0,0,0,0.12)" } }}
        >
          <MenuItem onClick={logout} sx={{ color: "#ef4444" }}>
            <LogoutOutlinedIcon sx={{ mr: 1 }} />
            Logout
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
}
