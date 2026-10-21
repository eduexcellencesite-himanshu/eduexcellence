"use client";

import { useEffect, useRef, useState } from "react";

// Renders the final value by default (server HTML, crawlers, link previews,
// reduced-motion users all see the real number). Once the element scrolls into
// view it counts up from 0 as an enhancement. If the observer never fires, the
// real value simply stays on screen.
// All instances using the same duration finish together, regardless of target.
export default function CountUp({ end, suffix = "", duration = 1600, className }) {
  const [value, setValue] = useState(end);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const run = () => {
      if (started.current) return;
      started.current = true;
      let startTs = null;
      const step = (ts) => {
        if (startTs === null) startTs = ts;
        const p = Math.min((ts - startTs) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        setValue(Math.round(end * eased));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && run(),
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString("en-IN")}{suffix}
    </span>
  );
}
