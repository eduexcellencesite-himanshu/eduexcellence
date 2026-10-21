"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { openPrograms } from "@/lib/programs";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function Card({ label, value, note, href }) {
  const body = (
    <>
      <p className="text-sm text-gray-500">{label}</p>
      <h3 className="mt-2 text-4xl font-bold text-[#16223A]">{value}</h3>
      {note && <p className="mt-2 text-[13px] text-[#6B7488]">{note}</p>}
    </>
  );
  const cls = "block rounded-3xl bg-white p-6 shadow-sm transition hover:shadow-md";
  return href ? <Link href={href} className={cls}>{body}</Link> : <div className={cls}>{body}</div>;
}

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const upcoming = openPrograms();

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found. Please log in again.");
        if (!API_URL) throw new Error("API URL is missing. Please configure NEXT_PUBLIC_API_URL.");
        const res = await fetch(`${API_URL}/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.message || `Request failed with status ${res.status}`);
        setStats(data.data);
      } catch (e) {
        setError(e.message);
      }
    };
    load();
  }, []);

  const n = (v) => (stats ? v : "…");
  const week = (v) => (stats ? `${v} in the last 7 days` : "");

  return (
    <ProtectedRoute>
      <div>
        <h2 className="mb-6 text-3xl font-bold text-[#16223A]">Dashboard Overview</h2>

        {error && (
          <p className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
        )}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <Card label="Contact enquiries" value={n(stats?.contacts.total)} note={week(stats?.contacts.week)} href="/admin/contacts" />
          <Card label="Registrations" value={n(stats?.registrations.total)} note={week(stats?.registrations.week)} href="/admin/registration" />
          <Card
            label="Partnership inquiries"
            value={n(stats?.inquiries.total)}
            note={stats ? `${stats.inquiries.pending} awaiting a reply · ${stats.inquiries.week} this week` : ""}
            href="/admin/partnership"
          />
          <Card
            label="Upcoming programs"
            value={upcoming.length}
            note={upcoming.map((p) => p.short).join(" · ") || "Nothing open for registration"}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}
