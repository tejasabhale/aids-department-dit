import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiBookOpen,
  FiCalendar,
  FiChevronRight,
  FiFileText,
} from "react-icons/fi";

/**
 * Put a real academics photo (classroom, library, lecture hall) at
 * public/images/academics-hero.jpg. If it is missing or fails to load,
 * the academics illustration below is shown instead.
 */
const HERO_IMAGE = "/images/academics-hero.jpg";

const QUICK_LINKS = [
  {
    label: "Syllabus",
    description: "Subjects and course outlines",
    to: "/academics/syllabus",
    icon: FiBookOpen,
  },
  {
    label: "Timetable",
    description: "Classes and schedules",
    to: "/academics/timetable",
    icon: FiCalendar,
  },
  {
    label: "Exam Resources",
    description: "Exam notices and resources",
    to: "/academics/exams",
    icon: FiFileText,
  },
];

const EASE = [0.22, 1, 0.36, 1];

/* Academics illustration: graduation cap, open book, timetable, grade badge */
function AcademicsIllustration() {
  return (
    <svg
      role="img"
      aria-label="Illustration of a graduation cap, open book and class timetable"
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="ac-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-light)" />
          <stop offset="100%" stopColor="var(--color-gold-light)" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#ac-bg)" />

      {/* dotted grid */}
      <g fill="var(--color-brand)" opacity="0.12">
        {Array.from({ length: 10 }).map((_, r) =>
          Array.from({ length: 10 }).map((_, c) => (
            <circle
              key={`${r}-${c}`}
              cx={20 + c * 40}
              cy={20 + r * 40}
              r="1.5"
            />
          )),
        )}
      </g>

      {/* timetable card */}
      <g transform="translate(28 36)">
        <rect
          width="92"
          height="84"
          rx="10"
          fill="var(--color-surface)"
          stroke="var(--color-border)"
        />
        <rect width="92" height="20" rx="10" fill="var(--color-brand)" />
        <rect y="10" width="92" height="10" fill="var(--color-brand)" />
        {[0, 1, 2].map((r) =>
          [0, 1, 2, 3].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={10 + c * 20}
              y={30 + r * 16}
              width="14"
              height="10"
              rx="2.5"
              fill={
                r === 1 && c === 2
                  ? "var(--color-gold)"
                  : "var(--color-border-strong)"
              }
              opacity={r === 1 && c === 2 ? 1 : 0.6}
            />
          )),
        )}
      </g>

      {/* grade badge */}
      <g transform="translate(330 72)">
        <circle
          r="30"
          fill="var(--color-surface)"
          stroke="var(--color-gold)"
          strokeWidth="3"
        />
        <circle
          r="23"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="1"
          opacity="0.6"
        />
        <text
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="22"
          fontWeight="700"
          fill="var(--color-brand)"
        >
          A+
        </text>
      </g>

      {/* graduation cap */}
      <g>
        <path
          d="M150 168 V198 C150 220 250 220 250 198 V168 L200 188 Z"
          fill="var(--color-brand-dark)"
        />
        <polygon
          points="200,106 304,148 200,190 96,148"
          fill="var(--color-brand)"
        />
        <polygon
          points="200,106 304,148 200,190 96,148"
          fill="none"
          stroke="var(--color-brand-dark)"
          strokeWidth="2"
        />
        <line
          x1="288"
          y1="154"
          x2="288"
          y2="204"
          stroke="var(--color-gold)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="288" cy="208" r="6" fill="var(--color-gold)" />
        <circle cx="200" cy="148" r="5" fill="var(--color-gold)" />
      </g>

      {/* open book */}
      <g>
        <path
          d="M200 262 C158 238 100 238 56 256 V352 C100 334 158 334 200 358 Z"
          fill="var(--color-surface)"
          stroke="var(--color-brand)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M200 262 C242 238 300 238 344 256 V352 C300 334 242 334 200 358 Z"
          fill="var(--color-surface)"
          stroke="var(--color-brand)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <line
          x1="200"
          y1="262"
          x2="200"
          y2="358"
          stroke="var(--color-brand)"
          strokeWidth="2.5"
        />
        <g
          stroke="var(--color-border-strong)"
          strokeWidth="3"
          strokeLinecap="round"
        >
          <path d="M80 272 C110 264 145 266 176 278" />
          <path d="M80 290 C110 282 145 284 176 296" />
          <path d="M80 308 C110 300 145 302 176 314" />
          <path d="M224 278 C255 266 290 264 320 272" />
          <path d="M224 296 C255 284 290 282 320 290" />
        </g>
        <path
          d="M224 314 C255 302 290 300 320 308"
          stroke="var(--color-gold)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
}

function HeroVisual() {
  const [imageFailed, setImageFailed] = useState(false);

  return imageFailed ? (
    <AcademicsIllustration />
  ) : (
    <img
      src={HERO_IMAGE}
      alt="Students studying in a classroom"
      loading="eager"
      decoding="async"
      onError={() => setImageFailed(true)}
      className="h-full w-full object-cover transition-[filter] duration-700 ease-out group-hover:brightness-[1.04] motion-reduce:transition-none"
    />
  );
}

export default function AcademicsHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="academics-hero-title"
      className="relative isolate w-full overflow-hidden border-b border-border bg-surface-muted"
    >
      {/* Restrained background pattern in the department's maroon-and-gold palette */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        viewBox="0 0 1440 520"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle
          cx="1310"
          cy="25"
          r="220"
          fill="var(--color-brand-light)"
          opacity="0.65"
        />
        <circle
          cx="85"
          cy="500"
          r="170"
          fill="var(--color-gold-light)"
          opacity="0.62"
        />
        <g
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="1"
          opacity="0.055"
        >
          <path d="M-80 130 C210 80 410 175 700 125 S1190 82 1510 135" />
          <path d="M-80 160 C210 110 410 205 700 155 S1190 112 1510 165" />
          <path d="M-80 190 C210 140 410 235 700 185 S1190 142 1510 195" />
        </g>
      </svg>

      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-8 lg:py-12 2xl:px-12">
        {/* Copy and navigation */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="min-w-0"
        >
          <h1
            id="academics-hero-title"
            className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Academics<span className="text-brand">.</span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base sm:leading-7">
            Explore academic programs, curriculum, class schedules, and
            essential learning resources for the AI &amp; Data Science
            department.
          </p>

          {/* Quick access links */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:max-w-3xl">
            {QUICK_LINKS.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.label}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: reduceMotion ? 0 : 0.08 * index,
                    ease: EASE,
                  }}
                  className="min-w-0"
                >
                  <Link
                    to={item.to}
                    className="group relative flex h-full min-h-[72px] items-center gap-3 rounded-xl border border-border bg-surface px-3.5 py-3 transition-[border-color,background-color,box-shadow] duration-300 hover:border-brand/35 hover:shadow-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:transition-none sm:flex-col sm:items-start sm:gap-2 sm:p-4"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-light text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-on-brand motion-reduce:transition-none">
                      <Icon size={17} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-foreground">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block text-[11px] leading-4 text-muted sm:text-xs">
                        {item.description}
                      </span>
                    </span>
                    <FiChevronRight
                      aria-hidden="true"
                      size={16}
                      className="shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-brand motion-reduce:transition-none sm:absolute sm:right-3 sm:top-3"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-3 right-3 h-[2px] origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none sm:left-4 sm:right-4"
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Square image */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 16 }}
          animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          transition={{
            duration: 0.7,
            delay: reduceMotion ? 0 : 0.12,
            ease: EASE,
          }}
          className="relative mx-auto w-full max-w-[320px] min-w-0 sm:max-w-[380px] lg:ml-auto lg:mr-0 lg:max-w-[460px]"
        >
          <div className="absolute -bottom-3 -right-3 h-1/2 w-1/2 rounded-2xl border border-gold/40 sm:-bottom-4 sm:-right-4" />
          <div className="group relative aspect-square overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
            <HeroVisual />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-tr from-brand/15 via-transparent to-gold/10"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
