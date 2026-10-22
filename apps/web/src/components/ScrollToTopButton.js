"use client";

import { usePathname } from "next/navigation";

import { useEffect, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function ScrollToTopButton() {
  // Not on the admin panel or its login page — these are visitor-facing helpers.
  const pathname = usePathname();
  const onAdmin = pathname?.startsWith("/admin") || pathname?.startsWith("/auth/admin");
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10;

      setAtBottom(isBottom);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    if (atBottom) {
      // Bottom → Top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      // Top/Middle → Bottom
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  if (onAdmin) return null;

  return (
    <button
      onClick={handleClick}
      aria-label={atBottom ? "Scroll to top" : "Scroll to bottom"}
      className="fixed bottom-5 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#FF9D29] text-white shadow-xl transition-all duration-300 hover:scale-110 md:bottom-6 md:right-6 md:h-14 md:w-14"
    >
      {atBottom ? (
        <KeyboardArrowUpIcon />
      ) : (
        <KeyboardArrowDownIcon />
      )}
    </button>
  );
}