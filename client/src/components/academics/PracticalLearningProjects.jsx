import { motion, useReducedMotion } from "framer-motion";
import {
  FiArrowUpRight,
  FiBookOpen,
  FiCpu,
  FiActivity,
  FiUsers,
} from "react-icons/fi";
import { Link } from "react-router-dom";

/*
 * Image URLs are illustrative photographic placeholders.
 * Replace them with approved photos from your department's own labs,
 * student projects, practical sessions, and workshops before publishing.
 */
const resources = [
  {
    id: "projects",
    category: "PROJECT GUIDELINES",
    title: "Mini & final-year projects",
    description:
      "Project briefs, milestones, documentation, and submission guidance.",
    href: "/academics/projects",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Students collaborating on a technical project",
    icon: FiCpu,
  },
  {
    id: "practicals",
    category: "PRACTICAL RESOURCES",
    title: "Experiments & learning material",
    description:
      "Lab manuals, experiment sheets, and supporting learning resources.",
    href: "/academics/resources",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Students working with digital learning resources",
    icon: FiBookOpen,
  },
  {
    id: "workshops",
    category: "RESEARCH & WORKSHOPS",
    title: "Workshops and research activities",
    description:
      "Technical sessions, research opportunities, and hands-on events.",
    href: "/events/workshops",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "A team sharing ideas during a collaborative workshop",
    icon: FiUsers,
  },
];

const EASE = [0.22, 1, 0.36, 1];

function SectionHeading({ reduceMotion }) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: EASE }}
      className="mb-7 flex flex-col gap-4 sm:mb-9 lg:flex-row lg:items-end lg:justify-between"
    >
      <div className="max-w-3xl">
        <div className="mb-3 flex items-center gap-3">
          <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-gold" />
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand sm:text-xs">
            Learn by doing
          </span>
          <span
            aria-hidden="true"
            className="h-px w-10 bg-border-strong sm:w-16"
          />
        </div>

        <h2
          id="practical-learning-title"
          className="text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl"
        >
          Practical Learning <span className="text-brand">&amp; Projects</span>
        </h2>
      </div>

      <div className="flex max-w-xl items-end justify-between gap-4 lg:max-w-md">
        <p className="text-sm leading-6 text-muted sm:text-base">
          From laboratory experiments to student-built solutions and technical
          workshops.
        </p>
        <Link
          to="/academics/resources"
          className="group hidden shrink-0 items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-brand transition-colors duration-200 hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:inline-flex"
        >
          All resources
          <FiArrowUpRight
            size={16}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
          />
        </Link>
      </div>
    </motion.div>
  );
}

function FeatureCard({ reduceMotion }) {
  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="group relative isolate flex min-h-[360px] flex-col overflow-hidden rounded-2xl border border-border bg-foreground sm:min-h-[420px] lg:min-h-[490px]"
    >
      <img
        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=85"
        alt="Technical professional working with computing equipment"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-[filter] duration-700 ease-out group-hover:brightness-105 motion-reduce:transition-none"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-foreground/5"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-brand/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
      />

      <div className="relative z-10 flex flex-1 flex-col justify-between p-5 text-on-brand sm:p-7 lg:p-8">
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-on-brand/30 bg-foreground/35 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-on-brand backdrop-blur-sm sm:text-xs">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-gold"
            />
            Laboratory facilities
          </span>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-on-brand/35 bg-foreground/30 text-on-brand backdrop-blur-sm">
            <FiActivity size={18} aria-hidden="true" />
          </span>
        </div>

        <div className="max-w-lg">
          <h3 className="text-2xl font-bold leading-tight tracking-tight text-on-brand sm:text-3xl lg:text-4xl">
            Where concepts become practice.
          </h3>
          <p className="mt-3 max-w-md text-sm leading-6 text-on-brand/85 sm:text-base">
            Explore computing facilities, lab work, and practical environments
            that support hands-on learning.
          </p>
          <Link
            to="/academics/labs"
            className="group/link mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-foreground transition-colors duration-300 hover:bg-gold-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:transition-none"
          >
            Explore laboratories
            <FiArrowUpRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 motion-reduce:transition-none"
            />
          </Link>
        </div>
      </div>
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 z-10 h-1 w-full origin-left scale-x-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 motion-reduce:transition-none"
      />
    </motion.article>
  );
}

function ResourceCard({ resource, index, reduceMotion }) {
  const Icon = resource.icon;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, x: 12 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: EASE }}
      className="group grid min-h-[150px] grid-cols-[36%_1fr] overflow-hidden rounded-2xl border border-border bg-surface transition-[border-color,background-color,box-shadow] duration-300 hover:border-brand/30 hover:bg-white hover:shadow-soft motion-reduce:transition-none sm:min-h-[155px] sm:grid-cols-[34%_1fr] lg:min-h-0"
    >
      <div className="relative min-h-full overflow-hidden bg-surface-muted">
        <img
          src={resource.image}
          alt={resource.imageAlt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-[filter] duration-700 ease-out group-hover:brightness-105 group-hover:saturate-[1.08] motion-reduce:transition-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-brand/5 transition-colors duration-500 group-hover:bg-brand/10 motion-reduce:transition-none"
        />
      </div>

      <div className="relative flex min-w-0 flex-col justify-center p-4 sm:p-5">
        <div className="mb-2 flex items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-light text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-on-brand motion-reduce:transition-none">
            <Icon size={16} aria-hidden="true" />
          </span>
          <span className="text-[9px] font-bold uppercase leading-4 tracking-[0.13em] text-brand sm:text-[10px]">
            {resource.category}
          </span>
        </div>

        <h3 className="text-base font-bold leading-snug tracking-tight text-foreground sm:text-lg">
          {resource.title}
        </h3>
        <p className="mt-1.5 text-xs leading-5 text-muted sm:text-sm sm:leading-6">
          {resource.description}
        </p>

        <Link
          to={resource.href}
          className="mt-3 inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-brand transition-colors duration-200 hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          View resources
          <FiArrowUpRight
            size={14}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
          />
        </Link>

        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold transition-[width] duration-500 ease-out group-hover:w-full motion-reduce:transition-none"
        />
      </div>
    </motion.article>
  );
}

export default function PracticalLearningProjects() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="practical-learning-title"
      className="relative isolate w-full overflow-hidden border-y border-border bg-surface-muted py-12 sm:py-14 lg:py-16"
    >
      {/* Light maroon-and-gold line pattern */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        viewBox="0 0 1440 780"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle
          cx="1320"
          cy="35"
          r="220"
          fill="var(--color-brand-light)"
          opacity="0.48"
        />
        <circle
          cx="70"
          cy="740"
          r="180"
          fill="var(--color-gold-light)"
          opacity="0.55"
        />
        <g
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="1"
          opacity="0.045"
        >
          <path d="M-100 210 C190 155 410 260 700 205 S1200 155 1540 210" />
          <path d="M-100 246 C190 191 410 296 700 241 S1200 191 1540 246" />
        </g>
      </svg>

      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-8 2xl:px-12">
        <SectionHeading reduceMotion={reduceMotion} />

        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[1.03fr_0.97fr] lg:gap-6">
          <FeatureCard reduceMotion={reduceMotion} />

          <div className="grid min-w-0 grid-cols-1 gap-4 sm:gap-5 lg:grid-rows-3">
            {resources.map((resource, index) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                index={index}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>

        <div className="mt-5 sm:hidden">
          <Link
            to="/academics/resources"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            Explore all practical resources
            <FiArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
