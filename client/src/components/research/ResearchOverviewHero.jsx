import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiBookOpen,
  FiChevronRight,
  FiFolder,
  FiHome,
  FiLayers,
} from "react-icons/fi";

const QUICK_LINKS = [
  {
    label: "Publications",
    description: "Papers and scholarly work",
    to: "/research/publications",
    icon: FiBookOpen,
  },
  {
    label: "Research Projects",
    description: "Projects and applied research",
    to: "/research/projects",
    icon: FiFolder,
  },
  {
    label: "Research Areas",
    description: "Themes and specialisations",
    to: "/research/areas",
    icon: FiLayers,
  },
];

const EASE = [0.22, 1, 0.36, 1];

/**
 * ResearchOverviewHero
 *
 * Optional props:
 * - imageSrc: approved research/AI image URL (kept small: w=1000, q=70)
 * - imageAlt: descriptive alternative text for the image
 * - metrics: optional VERIFIED metrics, e.g. [{ value: "12", label: "Publications" }]
 *
 * Do not provide metrics until the figures have been verified by the department.
 *
 * Alternative images (replace the photo ID in the URL):
 * - photo-1620712943543-bcc4688e7485 (AI robot hand)
 * - photo-1518770660439-4636190af475 (circuit board / chip)
 */
export default function ResearchOverviewHero({
  imageSrc = "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=70",
  imageAlt = "White humanoid robot representing artificial intelligence research",
  metrics = [],
}) {
  const reduceMotion = useReducedMotion();
  const validMetrics = Array.isArray(metrics)
    ? metrics.filter(
        (metric) =>
          metric &&
          metric.value !== undefined &&
          metric.value !== null &&
          String(metric.label ?? "").trim(),
      )
    : [];

  return (
    <section
      aria-labelledby="research-hero-title"
      className="relative isolate w-full overflow-hidden border-b border-border bg-surface-muted"
    >
      {/* Restrained hero-style pattern using the shared A&DS theme tokens */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        viewBox="0 0 1440 560"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle
          cx="1320"
          cy="35"
          r="220"
          fill="var(--color-brand-light)"
          opacity="0.56"
        />
        <circle
          cx="70"
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
          <path d="M-100 155 C190 100 410 205 700 150 S1200 100 1540 155" />
          <path d="M-100 190 C190 135 410 240 700 185 S1200 135 1540 190" />
          <path d="M-100 225 C190 170 410 275 700 220 S1200 170 1540 225" />
        </g>
      </svg>

      <div className="mx-auto grid w-full max-w-[1500px] grid-cols-1 items-center gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:gap-12 lg:px-8 lg:py-12 2xl:px-12">
        {/* Breadcrumb, heading, introduction and research links */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="min-w-0"
        >
          <h1
            id="research-hero-title"
            className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Research <span className="text-brand">&amp; Innovation</span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">
            Explore the department&apos;s research, student and faculty
            projects, and scholarly work across artificial intelligence, machine
            learning, computer vision, and data science.
          </p>

          {/* Compact quick links rather than promotional calls to action */}
          <nav aria-label="Research resources" className="mt-6">
            <ul className="flex flex-wrap gap-2.5">
              {QUICK_LINKS.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.li
                    key={item.label}
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: reduceMotion ? 0 : 0.06 * (index + 1),
                      ease: EASE,
                    }}
                  >
                    <Link
                      to={item.to}
                      className="group inline-flex min-h-10 items-center gap-2 rounded-lg border border-border bg-surface px-3.5 py-2 text-sm font-semibold text-foreground transition-[border-color,background-color,color,box-shadow] duration-300 hover:border-brand/35 hover:bg-white hover:text-brand hover:shadow-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:transition-none"
                    >
                      <Icon
                        size={16}
                        aria-hidden="true"
                        className="text-brand"
                      />
                      {item.label}
                      <FiArrowUpRight
                        size={14}
                        aria-hidden="true"
                        className="text-muted transition-colors duration-200 group-hover:text-brand"
                      />
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {/* Render metrics only when verified values are provided as props. */}
          {validMetrics.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 border-t border-border pt-5">
              {validMetrics.map((metric) => (
                <div key={metric.label} className="min-w-[100px]">
                  <p className="text-xl font-bold leading-none tracking-tight text-brand sm:text-2xl">
                    {metric.value}
                  </p>
                  <p className="mt-1.5 text-xs font-medium text-muted">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Research photograph */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 14 }}
          animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          transition={{
            duration: 0.65,
            delay: reduceMotion ? 0 : 0.08,
            ease: EASE,
          }}
          className="relative min-w-0 lg:ml-2"
        >
          <div
            aria-hidden="true"
            className="absolute -bottom-3 -right-3 h-1/2 w-1/2 rounded-2xl border border-gold/45 sm:-bottom-4 sm:-right-4"
          />

          <figure className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-surface shadow-soft sm:aspect-[16/9] lg:aspect-[5/4]">
            <img
              src={imageSrc}
              alt={imageAlt}
              loading="eager"
              decoding="async"
              className="h-full w-full object-cover transition-[filter] duration-700 ease-out group-hover:brightness-[1.035] motion-reduce:transition-none"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-tr from-brand/10 via-transparent to-gold/10"
            />
            <figcaption className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
              <div className="inline-flex max-w-full items-center gap-2 rounded-lg border border-on-brand/25 bg-foreground/65 px-3.5 py-2.5 text-on-brand backdrop-blur-sm sm:px-4">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                />
                <span className="truncate text-xs font-semibold sm:text-sm">
                  Research, experimentation &amp; discovery
                </span>
              </div>
            </figcaption>
          </figure>
        </motion.div>
      </div>
    </section>
  );
}
