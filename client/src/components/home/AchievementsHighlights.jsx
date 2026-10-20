import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FiArrowUpRight,
  FiAward,
  FiBookOpen,
  FiChevronLeft,
  FiChevronRight,
  FiCode,
} from "react-icons/fi";

/*
 * Sample content only.
 * Replace with verified department achievements before publishing.
 */

// Left carousel: every achievement, image + minimal text
const carouselAchievements = [
  {
    id: "hackathon",
    date: "Student Innovation",
    title: "Ideas that move beyond the classroom",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Students collaborating on a technical project",
    icon: FiCode,
  },
  {
    id: "coding",
    date: "Coding Contest",
    title: "Problem solvers who think in code",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "A student writing code on a laptop",
    icon: FiCode,
  },
  {
    id: "team-project",
    date: "Project Showcase",
    title: "Teams building solutions that matter",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "A team discussing a project around a table",
    icon: FiAward,
  },
  {
    id: "conference",
    date: "Paper Presentation",
    title: "Student voices on national stages",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Students presenting their work",
    icon: FiBookOpen,
  },
];

// Right side: the 2 major wins, each links to its full story
const featuredAchievements = [
  {
    id: "competition",
    category: "TECHNICAL COMPETITIONS",
    date: "Student Achievement",
    title: "Recognising technical excellence",
    description:
      "Share a competition result, award, or standout student project with the event name and year.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "A team working together on a digital project",
    icon: FiAward,
    href: "#",
  },
  {
    id: "research",
    category: "RESEARCH & PUBLICATIONS",
    date: "Research Highlight",
    title: "Research with real-world relevance",
    description:
      "Feature a publication, patent, or applied research project, including its contributors and outcome.",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Research equipment in a laboratory",
    icon: FiBookOpen,
    href: "#",
  },
];

const ease = [0.22, 1, 0.36, 1];
const AUTOPLAY_MS = 5000;

function SectionHeader({ reduceMotion }) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ amount: 0.25 }}
      transition={{ duration: 0.55, ease }}
      className="mb-8 flex flex-col gap-4 sm:mb-10 lg:flex-row lg:items-end lg:justify-between"
    >
      <div className="max-w-3xl">
        <div className="mb-3 flex items-center gap-3">
          <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-gold" />
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand sm:text-xs">
            Achievements &amp; Highlights
          </span>
          <span
            aria-hidden="true"
            className="h-px w-10 bg-border-strong sm:w-16"
          />
        </div>

        <h2
          id="achievements-title"
          className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
        >
          Moments worth <span className="text-brand">celebrating.</span>
        </h2>
      </div>

      <p className="max-w-md border-l-2 border-gold pl-4 text-sm leading-6 text-muted sm:text-base">
        A closer look at student achievements, technical milestones, and
        research with impact.
      </p>
    </motion.div>
  );
}

function FeaturedCarousel({ items, reduceMotion }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = items.length;
  const item = items[index];

  const go = useCallback(
    (dir) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  useEffect(() => {
    if (reduceMotion || paused || count < 2) return undefined;
    const timer = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [go, paused, reduceMotion, count]);

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ amount: 0.15 }}
      transition={{ duration: 0.65, ease }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="group"
      aria-roledescription="carousel"
      aria-label="Featured achievements"
      className="group relative flex h-[300px] flex-col overflow-hidden rounded-2xl border border-border bg-foreground sm:h-[340px] lg:h-[420px]"
    >
      {/* Slide images */}
      <AnimatePresence initial={false}>
        <motion.img
          key={item.id}
          src={item.image}
          alt={item.imageAlt}
          loading="lazy"
          decoding="async"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.8, ease }}
          drag={count > 1 ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) go(1);
            else if (info.offset.x > 60) go(-1);
          }}
          className="absolute inset-0 h-full w-full cursor-grab object-cover active:cursor-grabbing"
        />
      </AnimatePresence>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground via-foreground/55 to-foreground/5"
      />

      <div className="pointer-events-none relative z-10 flex flex-1 flex-col justify-between p-5 text-on-brand sm:p-6 lg:p-7">
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-on-brand/30 bg-foreground/35 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-on-brand backdrop-blur-sm sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Featured Achievements
          </span>
        </div>

        <div className="max-w-xl pt-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={item.id}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease }}
              aria-live="polite"
            >
              <p className="mb-3 text-xs font-semibold tracking-wide text-gold sm:text-sm">
                {item.date}
              </p>

              <h3 className="max-w-lg text-2xl font-bold leading-tight tracking-tight text-on-brand sm:text-3xl">
                {item.title}
              </h3>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          {count > 1 && (
            <div className="pointer-events-auto mt-5 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous achievement"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-on-brand/35 bg-foreground/25 text-on-brand backdrop-blur-sm transition-colors duration-300 hover:bg-gold hover:text-foreground motion-reduce:transition-none"
                >
                  <FiChevronLeft size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next achievement"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-on-brand/35 bg-foreground/25 text-on-brand backdrop-blur-sm transition-colors duration-300 hover:bg-gold hover:text-foreground motion-reduce:transition-none"
                >
                  <FiChevronRight size={18} aria-hidden="true" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                {items.map((slide, i) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === index}
                    className={`h-1.5 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                      i === index
                        ? "w-7 bg-gold"
                        : "w-1.5 bg-on-brand/50 hover:bg-on-brand/80"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-10 h-1 w-full origin-left scale-x-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 motion-reduce:transition-none"
      />
    </motion.article>
  );
}

function StoryCard({ item, index, reduceMotion }) {
  const Icon = item.icon;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, x: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
      viewport={{ amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease }}
      className="group grid min-h-[190px] grid-cols-[34%_1fr] overflow-hidden rounded-2xl border border-border bg-surface transition-[border-color,background-color,box-shadow] duration-300 hover:border-brand/35 hover:bg-surface-muted hover:shadow-soft motion-reduce:transition-none sm:grid-cols-[36%_1fr] lg:h-full lg:min-h-0"
    >
      <div className="relative min-h-full overflow-hidden bg-surface-muted">
        <img
          src={item.image}
          alt={item.imageAlt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-[filter] duration-700 ease-out group-hover:saturate-[1.08] motion-reduce:transition-none"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-brand/5 transition-colors duration-500 group-hover:bg-brand/10 motion-reduce:transition-none"
        />
      </div>

      <div className="relative flex min-h-0 min-w-0 flex-col justify-between gap-2 p-4 sm:px-5 sm:py-4">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-light text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-on-brand motion-reduce:transition-none">
              <Icon size={16} aria-hidden="true" />
            </span>

            <div className="min-w-0">
              <p className="truncate text-[10px] font-bold uppercase leading-4 tracking-[0.12em] text-brand">
                {item.category}
              </p>
              <p className="truncate text-[11px] font-medium leading-4 text-muted">
                {item.date}
              </p>
            </div>
          </div>

          <h3 className="line-clamp-2 text-[15px] font-bold leading-snug tracking-tight text-foreground sm:text-base">
            {item.title}
          </h3>

          <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted">
            {item.description}
          </p>
        </div>

        <a
          href={item.href}
          aria-label={`Read more: ${item.title}`}
          className="inline-flex w-fit items-center gap-1 text-xs font-semibold text-brand underline-offset-4 decoration-2 hover:underline focus-visible:underline"
        >
          Read more
          <FiArrowUpRight
            size={14}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
          />
        </a>

        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold transition-[width] duration-500 ease-out group-hover:w-full motion-reduce:transition-none"
        />
      </div>
    </motion.article>
  );
}

export default function AchievementsHighlights() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="achievements-title"
      className="relative isolate w-full overflow-hidden border-y border-border bg-surface-muted py-14 sm:py-16 lg:py-20"
    >
      {/* Subtle hero-style maroon and gold background pattern */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle
          cx="1280"
          cy="80"
          r="230"
          fill="var(--color-brand-light)"
          opacity="0.52"
        />
        <circle
          cx="80"
          cy="730"
          r="190"
          fill="var(--color-gold-light)"
          opacity="0.64"
        />
        <g
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="1"
          opacity="0.06"
        >
          <path d="M-100 230 C180 175 420 275 700 220 S1200 170 1540 230" />
          <path d="M-100 270 C180 215 420 315 700 260 S1200 210 1540 270" />
        </g>
      </svg>

      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 2xl:px-12">
        <SectionHeader reduceMotion={reduceMotion} />

        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[1.12fr_0.88fr] lg:gap-6">
          <FeaturedCarousel
            items={carouselAchievements}
            reduceMotion={reduceMotion}
          />

          <div className="grid min-w-0 grid-cols-1 gap-5 lg:h-[420px] lg:grid-rows-2 lg:gap-6">
            {featuredAchievements.map((item, index) => (
              <StoryCard
                key={item.id}
                item={item}
                index={index}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
