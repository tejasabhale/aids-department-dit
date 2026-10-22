import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiAward,
  FiBookOpen,
  FiCode,
  FiUsers,
} from "react-icons/fi";

/*
 * DEMONSTRATION CONTENT
 * Replace the sample project details, student credits, and stock photos
 * with verified student work and department-approved photographs.
 */
const FEATURED_PROJECT = {
  id: "featured-project",
  category: "FINAL-YEAR PROJECT",
  title: "From Research Question to Working Prototype",
  description:
    "Showcase a final-year project with a concise overview of the problem, approach, and outcome.",
  credit: "Student team · Add verified names",
  image:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1800&q=85",
  imageAlt: "Students collaborating on a technical project",
  icon: FiCode,
};

const PROJECTS = [
  {
    id: "research-paper",
    category: "STUDENT RESEARCH",
    title: "Conference Papers & Research Work",
    description:
      "Highlight a student co-authored paper, its research focus, and publication details.",
    credit: "Student authors · Add verified names",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Laboratory research equipment",
    icon: FiBookOpen,
  },
  {
    id: "hackathon-prototype",
    category: "HACKATHONS & PROTOTYPES",
    title: "Ideas Built, Tested and Demonstrated",
    description:
      "Feature a hackathon entry, prototype, or experimental system and explain what the team built.",
    credit: "Project team · Add verified names",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Electronic circuit board used for prototyping",
    icon: FiAward,
  },
];

const EASE = [0.22, 1, 0.36, 1];

function SectionEyebrow({ children }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-gold" />
      <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand sm:text-xs">
        {children}
      </span>
      <span aria-hidden="true" className="h-px w-10 bg-border-strong sm:w-16" />
    </div>
  );
}

function FeaturedProject({ project, reduceMotion }) {
  const Icon = project.icon;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.58, ease: EASE }}
      className="group relative isolate flex min-h-[390px] flex-col overflow-hidden rounded-2xl border border-border bg-foreground sm:min-h-[440px] lg:min-h-full"
    >
      <img
        src={project.image}
        alt={project.imageAlt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-[filter] duration-700 ease-out group-hover:brightness-105 motion-reduce:transition-none"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/35 to-foreground/5"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-brand/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
      />

      <div className="relative z-10 flex flex-1 flex-col justify-between p-5 text-on-brand sm:p-7 lg:p-8">
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-on-brand/30 bg-foreground/40 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-on-brand backdrop-blur-sm sm:text-xs">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-gold"
            />
            {project.category}
          </span>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-on-brand/35 bg-foreground/35 text-on-brand backdrop-blur-sm">
            <Icon size={18} aria-hidden="true" />
          </span>
        </div>

        <div className="max-w-xl pt-16">
          <p className="mb-2 flex items-center gap-2 text-xs font-medium text-on-brand/80">
            <FiUsers size={14} aria-hidden="true" />
            {project.credit}
          </p>
          <h3 className="text-2xl font-bold leading-tight tracking-tight text-on-brand sm:text-3xl lg:text-4xl">
            {project.title}
          </h3>
          <p className="mt-3 max-w-lg text-sm leading-6 text-on-brand/85 sm:text-base sm:leading-7">
            {project.description}
          </p>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 z-10 h-1 w-full origin-left scale-x-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 motion-reduce:transition-none"
      />
    </motion.article>
  );
}

function ProjectStory({ project, index, reduceMotion }) {
  const Icon = project.icon;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, x: 12 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.5,
        delay: reduceMotion ? 0 : index * 0.07,
        ease: EASE,
      }}
      className="group grid min-h-[190px] min-w-0 grid-cols-[36%_1fr] overflow-hidden rounded-2xl border border-border bg-surface transition-[border-color,background-color,box-shadow] duration-300 hover:border-brand/30 hover:bg-white hover:shadow-soft motion-reduce:transition-none sm:min-h-[210px] sm:grid-cols-[40%_1fr] lg:min-h-0"
    >
      <div className="relative min-h-full overflow-hidden bg-surface-muted">
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-[filter] duration-700 ease-out group-hover:brightness-105 group-hover:saturate-[1.06] motion-reduce:transition-none"
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
          <span className="text-[9px] font-bold uppercase leading-4 tracking-[0.12em] text-brand sm:text-[10px]">
            {project.category}
          </span>
        </div>

        <h3 className="text-base font-bold leading-snug tracking-tight text-foreground sm:text-lg">
          {project.title}
        </h3>
        <p className="mt-1.5 text-xs leading-5 text-muted sm:text-sm sm:leading-6">
          {project.description}
        </p>
        <p className="mt-3 text-[10px] font-medium leading-4 text-muted sm:text-xs">
          {project.credit}
        </p>

        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold transition-[width] duration-500 ease-out group-hover:w-full motion-reduce:transition-none"
        />
      </div>
    </motion.article>
  );
}

export default function StudentResearchInnovation() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="student-research-title"
      className="relative isolate w-full overflow-hidden border-y border-border bg-surface-muted py-12 sm:py-14 lg:py-16"
    >
      {/* Subtle maroon-and-gold background pattern */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle
          cx="1320"
          cy="55"
          r="220"
          fill="var(--color-brand-light)"
          opacity="0.45"
        />
        <circle
          cx="65"
          cy="740"
          r="175"
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
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mb-7 flex flex-col gap-4 sm:mb-9 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <SectionEyebrow>Student Research &amp; Innovation</SectionEyebrow>
            <h2
              id="student-research-title"
              className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Ideas built into <span className="text-brand">impact.</span>
            </h2>
          </div>

          <div className="flex max-w-xl items-end justify-between gap-4 lg:max-w-md">
            <p className="text-sm leading-6 text-muted sm:text-base">
              Student projects, research, prototypes, and competition work from
              concept to demonstration.
            </p>
            <Link
              to="/research/projects"
              className="group hidden shrink-0 items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-brand transition-colors duration-200 hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:inline-flex"
            >
              All projects
              <FiArrowUpRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
              />
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:gap-6">
          <FeaturedProject
            project={FEATURED_PROJECT}
            reduceMotion={reduceMotion}
          />

          <div className="grid min-w-0 grid-cols-1 gap-4 sm:gap-5 lg:grid-rows-2 lg:gap-6">
            {PROJECTS.map((project, index) => (
              <ProjectStory
                key={project.id}
                project={project}
                index={index}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>

        <div className="mt-5 sm:hidden">
          <Link
            to="/research/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            Explore all projects
            <FiArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
