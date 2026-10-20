import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/* ------------------------------------------------------------------ */
/* Department statistics                                               */
/* Replace these sample figures with verified department data.          */
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
  {
    id: "students",
    icon: ICONS.students,
    value: 1000,
    suffix: "+",
    label: "Students Enrolled",
    note: "Across all academic years",
  },
  {
    id: "faculty",
    icon: ICONS.faculty,
    value: 20,
    suffix: "+",
    label: "Faculty Members",
    note: "Teaching and research mentors",
  },
  {
    id: "research",
    icon: ICONS.research,
    value: 50,
    suffix: "+",
    label: "Research Papers",
    note: "Published by the department",
  },
  {
    id: "placements",
    icon: ICONS.placements,
    value: 95,
    suffix: "%",
    label: "Placement Support",
    note: "Career guidance and preparation",
  },
];

/* ------------------------------------------------------------------ */
/* Motion variants                                                     */
/* ------------------------------------------------------------------ */

const EASE = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/* ------------------------------------------------------------------ */
/* Count-up: replays every time the panel enters view (up or down)      */
/* Writes straight to the DOM, so no re-render per frame                */
/* ------------------------------------------------------------------ */

function CountUp({ value, suffix, start, reduceMotion }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (!start) {
      node.textContent = reduceMotion ? value : 0;
      return undefined;
    }

    if (reduceMotion) {
      node.textContent = value;
      return undefined;
    }

    const controls = animate(0, value, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (latest) => {
        node.textContent = Math.round(latest);
      },
    });

    return () => controls.stop();
  }, [start, value, reduceMotion]);

  return (
    <>
      <span aria-hidden="true">
        <span ref={ref}>0</span>
        {suffix}
      </span>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Stat cell                                                           */
/* ------------------------------------------------------------------ */

function StatCell({ stat, index, visible, reduceMotion, progress }) {
  // Alternate cells drift in opposite directions as the section scrolls.
  const shift = reduceMotion ? 0 : index % 2 === 0 ? 14 : -14;
  const numberY = useTransform(progress, [0, 1], [shift, -shift]);

  return (
    <motion.article
      variants={item}
      className="group relative flex min-w-0 flex-col gap-3 overflow-hidden bg-foreground p-5 sm:p-6"
    >
      {/* Hover wash */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gold/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
      />

      <div className="relative flex items-center justify-between">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-on-brand/10 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-foreground"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d={stat.icon} />
          </svg>
        </span>

        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-gold transition-transform duration-300 group-hover:scale-150"
        />
      </div>

      <motion.p
        style={{ y: numberY }}
        className="relative text-4xl font-bold leading-none tracking-tight text-gold tabular-nums sm:text-5xl"
      >
        <CountUp
          value={stat.value}
          suffix={stat.suffix}
          start={visible}
          reduceMotion={reduceMotion}
        />
      </motion.p>

      <div className="relative">
        <h3 className="text-sm font-semibold text-on-brand sm:text-base">
          {stat.label}
        </h3>
        <p className="mt-0.5 text-xs leading-5 text-border-strong sm:text-sm">
          {stat.note}
        </p>
      </div>

      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
      />
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function Stats() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Not "once": reveals replay when scrolling down and back up.
  const visible = useInView(gridRef, { amount: 0.35 });

  // Scroll progress across the section (0 as it enters, 1 as it leaves).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const patternY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [-40, 40],
  );
  const headingY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [16, -16],
  );
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.4,
  });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="department-stats-title"
      className="relative isolate overflow-hidden bg-foreground py-10 text-on-brand sm:py-12 lg:py-14"
    >
      {/* Minimal dot grid that drifts slowly with scroll */}
      <motion.div
        aria-hidden="true"
        style={{
          y: patternY,
          backgroundImage:
            "radial-gradient(var(--color-on-brand) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        className="pointer-events-none absolute -inset-y-12 inset-x-0 -z-10 opacity-[0.07]"
      />

      <div className="container-page">
        {/* Header: title left, copy right */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.5 }}
          variants={container}
          style={{ y: headingY }}
          className="mb-6 flex flex-col gap-3 sm:mb-8 md:flex-row md:items-end md:justify-between md:gap-10"
        >
          <div>
            <motion.p
              variants={item}
              className="mb-2 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold"
            >
              <motion.span
                aria-hidden="true"
                variants={{
                  hidden: { scaleX: 0 },
                  show: {
                    scaleX: 1,
                    transition: { duration: 0.6, ease: EASE },
                  },
                }}
                className="h-0.5 w-8 origin-left bg-gold"
              />
              The department in numbers
            </motion.p>

            <motion.h2
              id="department-stats-title"
              variants={item}
              className="text-2xl font-bold leading-tight tracking-tight text-on-brand sm:text-3xl lg:text-4xl"
            >
              Learning today.{" "}
              <span className="text-gold">Building tomorrow.</span>
            </motion.h2>
          </div>

          <motion.p
            variants={item}
            className="max-w-sm text-sm leading-6 text-border-strong"
          >
            A snapshot of our academic community, research activity, and career
            development support.
          </motion.p>
        </motion.div>

        {/* Scroll progress hairline */}
        <div
          aria-hidden="true"
          className="mb-4 h-px w-full bg-on-brand/10 sm:mb-5"
        >
          <motion.div
            style={{ scaleX: lineScale }}
            className="h-full origin-left bg-gold"
          />
        </div>

        {/* Stats: one bordered panel, cells separated by 1px gaps */}
        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={visible ? "show" : "hidden"}
          variants={container}
          className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-on-brand/10 bg-on-brand/10 min-[420px]:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <StatCell
              key={stat.id}
              stat={stat}
              index={index}
              visible={visible}
              reduceMotion={reduceMotion}
              progress={scrollYProgress}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
