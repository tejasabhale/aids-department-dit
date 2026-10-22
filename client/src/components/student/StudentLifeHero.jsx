import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiChevronRight, FiHome, FiUsers } from "react-icons/fi";

const SECTION_LINKS = [
  { label: "Student Activities", href: "#student-activities" },
  { label: "Clubs & Communities", href: "#clubs-communities" },
  { label: "Events", href: "#student-events" },
  { label: "Student Resources", href: "#student-resources" },
];

const EASE = [0.22, 1, 0.36, 1];

export default function StudentLifeHero({
  imageSrc = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2200&q=90",
  imageAlt = "Students collaborating around a table on academic work",
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="student-life-hero-title"
      className="relative isolate w-full overflow-hidden border-b border-border bg-surface-muted py-5 sm:py-7 lg:py-9"
    >
      {/* Soft background details that match the department's visual theme */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        viewBox="0 0 1440 560"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle
          cx="1320"
          cy="25"
          r="225"
          fill="var(--color-brand-light)"
          opacity="0.55"
        />
        <circle
          cx="75"
          cy="540"
          r="175"
          fill="var(--color-gold-light)"
          opacity="0.6"
        />
        <g
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="1"
          opacity="0.045"
        >
          <path d="M-100 130 C190 75 410 180 700 125 S1200 75 1540 130" />
          <path d="M-100 165 C190 110 410 215 700 160 S1200 110 1540 165" />
        </g>
      </svg>

      <div className="mx-auto w-full max-w-[1600px] px-3 sm:px-6 lg:px-8 2xl:px-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{
            duration: 0.65,
            delay: reduceMotion ? 0 : 0.06,
            ease: EASE,
          }}
          className="group relative isolate min-h-[440px] overflow-hidden rounded-2xl border border-border bg-foreground sm:min-h-[470px] lg:min-h-[500px] xl:min-h-[520px]"
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center transition-[filter] duration-700 ease-out group-hover:brightness-[1.04] motion-reduce:transition-none"
          />

          {/* Strong contrast for readable text, with a restrained maroon tone */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/15"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-brand/10 mix-blend-multiply"
          />

          <div className="relative z-10 flex min-h-[440px] flex-col justify-between p-5 sm:min-h-[470px] sm:p-8 lg:min-h-[500px] lg:p-12 xl:min-h-[520px] xl:p-14">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-on-brand/35 bg-on-brand/10 text-on-brand backdrop-blur-sm">
                <FiUsers size={17} aria-hidden="true" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-brand/85 sm:text-xs">
                AI &amp; Data Science · Student Community
              </span>
            </div>

            <div className="max-w-3xl py-8 sm:py-10">
              <p className="mb-4 flex items-center gap-2 text-xs font-semibold text-gold sm:text-sm">
                <span aria-hidden="true" className="h-px w-8 bg-gold" />
                Learn together. Build together.
              </p>

              <h1
                id="student-life-hero-title"
                className="max-w-2xl text-4xl font-bold leading-[1.04] tracking-tight text-on-brand sm:text-5xl lg:text-6xl xl:text-7xl"
              >
                Life Beyond
                <br />
                the <span className="text-gold">Classroom.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-on-brand/85 sm:text-base sm:leading-8 lg:text-lg">
                Discover a student community shaped by collaboration,
                innovation, lasting friendships, and opportunities to grow
                beyond lectures and labs.
              </p>
            </div>

            <nav
              aria-label="Student life sections"
              className="flex flex-wrap gap-2.5"
            >
              {SECTION_LINKS.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: reduceMotion ? 0 : 0.1 + index * 0.06,
                    ease: EASE,
                  }}
                  className="group/link inline-flex min-h-10 items-center gap-2 rounded-lg border border-on-brand/30 bg-foreground/30 px-3.5 py-2 text-xs font-semibold text-on-brand backdrop-blur-sm transition-[background-color,border-color,color] duration-300 hover:border-gold hover:bg-gold hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:transition-none sm:text-sm"
                >
                  {item.label}
                  <FiArrowRight
                    size={14}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover/link:translate-x-0.5 motion-reduce:transition-none"
                  />
                </motion.a>
              ))}
            </nav>
          </div>

          <span
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 motion-reduce:transition-none"
          />
        </motion.div>
      </div>
    </section>
  );
}
