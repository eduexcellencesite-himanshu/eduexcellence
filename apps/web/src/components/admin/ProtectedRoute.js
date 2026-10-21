"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Allow login page
    if (pathname === "/auth/admin/login") {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/auth/admin/login");
      return;
    }

    setLoading(false);
  }, [pathname, router]);

  if (loading) {
    return null;
  }

  return children;
}