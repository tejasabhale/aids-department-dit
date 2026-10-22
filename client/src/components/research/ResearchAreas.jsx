import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiActivity,
  FiArrowUpRight,
  FiBarChart2,
  FiCpu,
  FiEye,
  FiLayers,
  FiMessageCircle,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

/*
 * Research areas adapted from the department's published research-area list.
 * Descriptions are concise summaries; use the links to connect each area
 * to your site's relevant project and faculty listings.
 */
const RESEARCH_AREAS = [
  {
    id: "computer-vision",
    number: "01",
    title: "Computer Vision",
    description:
      "Methods that help computers interpret images, video, and visual information.",
    icon: FiEye,
    keywords: ["Image analysis", "Visual recognition"],
    accent: "brand",
  },
  {
    id: "natural-language-processing",
    number: "02",
    title: "Natural Language Processing",
    description:
      "Computational approaches for understanding, analysing, and generating human language.",
    icon: FiMessageCircle,
    keywords: ["Text analytics", "Language models"],
    accent: "gold",
  },
  {
    id: "generative-ai",
    number: "03",
    title: "Generative AI",
    description:
      "Research into AI systems that generate or transform text, images, and other content.",
    icon: FiCpu,
    keywords: ["Content generation", "Applied AI"],
    accent: "brand",
  },
  {
    id: "reinforcement-learning",
    number: "04",
    title: "Reinforcement Learning",
    description:
      "Learning strategies that improve decisions through feedback from an environment.",
    icon: FiActivity,
    keywords: ["Decision systems", "Reward-based learning"],
    accent: "gold",
  },
  {
    id: "federated-learning",
    number: "05",
    title: "Federated Learning",
    description:
      "Distributed model training approaches designed to learn across decentralised data sources.",
    icon: FiUsers,
    keywords: ["Distributed training", "Data privacy"],
    accent: "brand",
  },
  {
    id: "automated-online-ml",
    number: "06",
    title: "Automated & Online Machine Learning",
    description:
      "Methods for automating model workflows and adapting learning systems as data changes.",
    icon: FiLayers,
    keywords: ["Adaptive models", "ML workflows"],
    accent: "gold",
  },
  {
    id: "time-series-analysis",
    number: "07",
    title: "Time-Series Analysis",
    description:
      "Analysing sequential data to study patterns, trends, and changes over time.",
    icon: FiTrendingUp,
    keywords: ["Forecasting", "Temporal patterns"],
    accent: "brand",
  },
  {
    id: "data-analysis-visualisation",
    number: "08",
    title: "Data Analysis & Visualisation",
    description:
      "Turning structured data into useful insights through statistical analysis and clear visual communication.",
    icon: FiBarChart2,
    keywords: ["Data insights", "Visual analytics"],
    accent: "gold",
  },
];

const EASE = [0.22, 1, 0.36, 1];

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.075, delayChildren: 0.03 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: EASE },
  },
};

function ResearchAreaCard({ area, reduceMotion }) {
  const Icon = area.icon;
  const isGold = area.accent === "gold";

  return (
    <motion.article
      variants={reduceMotion ? undefined : cardVariants}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-surface p-5 transition-[border-color,background-color,box-shadow] duration-300 ease-out hover:border-brand/30 hover:bg-white hover:shadow-soft motion-reduce:transition-none sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border transition-colors duration-300 motion-reduce:transition-none ${
            isGold
              ? "border-gold/25 bg-gold-light text-gold-dark group-hover:border-gold group-hover:bg-gold group-hover:text-foreground"
              : "border-brand/15 bg-brand-light text-brand group-hover:border-brand group-hover:bg-brand group-hover:text-on-brand"
          }`}
        >
          <Icon size={19} aria-hidden="true" />
        </span>

        <span
          aria-hidden="true"
          className={`select-none text-3xl font-semibold leading-none tracking-tight text-transparent transition-colors duration-300 [-webkit-text-stroke:1px_var(--color-border-strong)] group-hover:[-webkit-text-stroke-color:var(--color-brand)] motion-reduce:transition-none ${
            isGold
              ? "group-hover:text-gold-light"
              : "group-hover:text-brand-light"
          }`}
        >
          {area.number}
        </span>
      </div>

      <h3 className="mt-5 text-lg font-bold leading-snug tracking-tight text-foreground sm:text-xl">
        {area.title}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-6 text-muted">
        {area.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {area.keywords.map((keyword) => (
          <span
            key={keyword}
            className={`rounded-md border px-2.5 py-1 text-[10px] font-medium sm:text-[11px] ${
              isGold
                ? "border-gold/25 bg-gold-light/70 text-gold-dark"
                : "border-brand/10 bg-brand-light/65 text-brand-dark"
            }`}
          >
            {keyword}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4">
        <Link
          to={`/research/projects?area=${encodeURIComponent(area.id)}`}
          className="group/link inline-flex items-center gap-1.5 text-xs font-semibold text-brand transition-colors duration-200 hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          Related projects
          <FiArrowUpRight
            size={14}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 motion-reduce:transition-none"
          />
        </Link>
        <Link
          to={`/faculty?specialization=${encodeURIComponent(area.id)}`}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors duration-200 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          Faculty
        </Link>
      </div>

      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold transition-[width] duration-400 ease-out group-hover:w-full motion-reduce:transition-none"
      />
    </motion.article>
  );
}

export default function ResearchAreas() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="research-areas-title"
      className="relative isolate w-full overflow-hidden border-y border-border bg-surface-muted py-12 sm:py-14 lg:py-16"
    >
      {/* Restrained background pattern using existing theme variables */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        viewBox="0 0 1440 850"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle
          cx="1325"
          cy="60"
          r="215"
          fill="var(--color-brand-light)"
          opacity="0.45"
        />
        <circle
          cx="65"
          cy="800"
          r="175"
          fill="var(--color-gold-light)"
          opacity="0.5"
        />
        <g
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="1"
          opacity="0.045"
        >
          <path d="M-100 200 C190 145 410 255 700 200 S1200 145 1540 200" />
          <path d="M-100 236 C190 181 410 291 700 236 S1200 181 1540 236" />
        </g>
      </svg>

      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 2xl:px-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ amount: 0.25 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mb-7 grid gap-4 sm:mb-9 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-12"
        >
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand sm:text-xs">
                Research at AI&amp;DS Department
              </span>
              <span
                aria-hidden="true"
                className="h-px w-10 bg-border-strong sm:w-16"
              />
            </div>

            <h2
              id="research-areas-title"
              className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Research <span className="text-brand">Areas</span>
            </h2>
          </div>

          <p className="max-w-xl border-l-2 border-gold pl-4 text-sm leading-6 text-muted sm:text-base">
            Explore the department&apos;s published research themes across
            language, vision, learning systems, and data analysis.
          </p>
        </motion.div>

        <motion.div
          variants={reduceMotion ? undefined : listVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ amount: 0.12 }}
          className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4"
        >
          {RESEARCH_AREAS.map((area) => (
            <ResearchAreaCard
              key={area.id}
              area={area}
              reduceMotion={reduceMotion}
            />
          ))}
        </motion.div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <a
            href="https://engg.dypvp.edu.in/MajorAreasOfResearch.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand transition-colors duration-200 hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            Official research areas
            <FiArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
