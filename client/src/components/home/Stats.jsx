import React, { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* Data — PLACEHOLDER numbers, replace with real department figures    */
/* ------------------------------------------------------------------ */

const ICONS = {
  students:
    "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
  faculty:
    "M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z",
  research:
    "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z",
  placements:
    "M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z",
};

const stats = [
  { id: "students", icon: ICONS.students, value: 1000, suffix: "+", label: "Students Enrolled", note: "Across all years" },
  { id: "faculty", icon: ICONS.faculty, value: 20, suffix: "+", label: "Faculty Members", note: "Experienced mentors" },
  { id: "research", icon: ICONS.research, value: 50, suffix: "+", label: "Research Papers", note: "Published by the department" },
  { id: "placements", icon: ICONS.placements, value: 95, suffix: "%", label: "Placement Support", note: "Training and drives" },
];

/* ------------------------------------------------------------------ */
/* Hooks                                                               */
/* ------------------------------------------------------------------ */

// Becomes true once, the first time the element scrolls into view.
function useInViewOnce(ref, threshold = 0.25) {
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return seen;
}

// Counts from 0 to `target` with an ease-out curve once `start` is true.
function useCountUp(target, start, duration = 1800) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return undefined;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setValue(target);
      return undefined;
    }

    let frame;
    const startedAt = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target, duration]);

  return value;
}

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */

function StatCard({ stat, index, visible }) {
  const count = useCountUp(stat.value, visible);

  return (
    <div
      className={[
        "group relative overflow-hidden rounded-xl border border-border bg-surface p-5 shadow-soft sm:p-6",
        "transition-[border-color,box-shadow,opacity,translate] duration-500 ease-out",
        "hover:border-gold hover:shadow-card motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
      ].join(" ")}
      style={{ transitionDelay: visible ? `${index * 90}ms` : "0ms" }}
    >
      <span
        aria-hidden="true"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-light text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-on-brand motion-reduce:transition-none"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d={stat.icon} />
        </svg>
      </span>

      <p className="mt-4 text-3xl font-extrabold leading-none text-brand tabular-nums sm:text-4xl">
        {/* Screen readers get the final number; the animated one is visual only */}
        <span aria-hidden="true">
          {count}
          {stat.suffix}
        </span>
        <span className="sr-only">
          {stat.value}
          {stat.suffix}
        </span>
      </p>

      <p className="mt-2 text-sm font-semibold text-foreground sm:text-base">{stat.label}</p>
      <p className="mt-0.5 text-xs text-muted sm:text-sm">{stat.note}</p>

      {/* Gold bar draws across the bottom on hover (no scaling, no movement) */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-1 w-0 bg-gold transition-[width] duration-500 ease-out group-hover:w-full motion-reduce:transition-none"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

const Stats = () => {
  const sectionRef = useRef(null);
  const visible = useInViewOnce(sectionRef);

  return (
    <section
      ref={sectionRef}
      aria-label="Department at a glance"
      className="bg-surface py-10 sm:py-14"
    >
      <div className="container-page grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={stat.id} stat={stat} index={index} visible={visible} />
        ))}
      </div>
    </section>
  );
};

export default Stats;