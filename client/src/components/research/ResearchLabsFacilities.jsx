import { motion, useReducedMotion } from "framer-motion";
import {
  FiArrowUpRight,
  FiBookOpen,
  FiCode,
  FiCpu,
  FiDatabase,
  FiMonitor,
  FiServer,
  FiWifi,
  FiZap,
} from "react-icons/fi";

const OFFICIAL_FACILITIES_URL =
  "https://engg.dypvp.edu.in/artificial-intelligence-and-data-science-infra.aspx";

/*
 * Facility names and infrastructure details below are based on the
 * institute's published AI & DS infrastructure page.
 * The image URLs are illustrative stock photographs, not confirmed photos
 * of this department. Replace them with approved departmental photographs.
 */
const FACILITIES = [
  {
    id: "ai-lab",
    number: "01",
    title: "Artificial Intelligence Laboratory",
    category: "Artificial Intelligence",
    description:
      "A dedicated Artificial Intelligence Laboratory is listed in the department's facilities inventory.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Illustrative photograph of a technical workstation",
    icon: FiCpu,
  },
  {
    id: "ml-lab",
    number: "02",
    title: "Machine Learning Laboratory",
    category: "Machine Learning",
    description:
      "The department lists a Machine Learning Laboratory among its computing facilities.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Illustrative close-up of a computing circuit board",
    icon: FiCpu,
  },
  {
    id: "data-analytics-lab",
    number: "03",
    title: "Data Analytics Laboratory",
    category: "Data & Analytics",
    description:
      "A dedicated laboratory listed for data analytics coursework and practical work.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Illustrative data analytics charts on a computer display",
    icon: FiDatabase,
  },
  {
    id: "database-lab",
    number: "04",
    title: "Database Laboratory",
    category: "Data Management",
    description:
      "The published facilities list includes a Database Laboratory for database-related learning.",
    image:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Illustrative database and computing equipment",
    icon: FiDatabase,
  },
  {
    id: "programming-lab",
    number: "05",
    title: "Programming Laboratory",
    category: "Programming",
    description:
      "A core computing facility listed for programming practice and laboratory sessions.",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Illustrative programming code displayed on a computer screen",
    icon: FiCode,
  },
  {
    id: "computer-center",
    number: "06",
    title: "Computer Center",
    category: "Computing Infrastructure",
    description:
      "The department's infrastructure inventory also lists a Computer Center and supporting network equipment.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Illustrative server and network infrastructure",
    icon: FiServer,
  },
];

const INFRASTRUCTURE = [
  {
    icon: FiMonitor,
    title: "Computing systems",
    detail: "Desktop PCs and computer workstations",
  },
  {
    icon: FiServer,
    title: "Network infrastructure",
    detail: "Server, router, and network switches",
  },
  {
    icon: FiZap,
    title: "Power backup",
    detail: "UPS equipment listed in the inventory",
  },
  {
    icon: FiWifi,
    title: "Connectivity & peripherals",
    detail: "Point-to-point internet, printer, and scanner",
  },
];

const EASE = [0.22, 1, 0.36, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

function FacilityCard({ facility, index, reduceMotion }) {
  const Icon = facility.icon;

  return (
    <motion.article
      variants={reduceMotion ? undefined : cardVariants}
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-[border-color,background-color,box-shadow] duration-300 ease-out hover:border-brand/30 hover:bg-surface hover:shadow-card motion-reduce:transition-none"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-muted">
        <img
          src={facility.image}
          alt={facility.imageAlt}
          loading={index < 3 ? "eager" : "lazy"}
          decoding="async"
          onError={(event) => {
            event.currentTarget.style.visibility = "hidden";
          }}
          className="h-full w-full object-cover transition-[filter] duration-700 ease-out group-hover:brightness-[1.06] group-hover:saturate-[1.06] motion-reduce:transition-none"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-transparent to-transparent"
        />

        <span className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-on-brand/35 bg-foreground/55 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.13em] text-on-brand backdrop-blur-sm">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-gold"
          />
          {facility.category}
        </span>

        <span className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-xl border border-on-brand/35 bg-foreground/50 text-on-brand backdrop-blur-sm">
          <Icon size={19} aria-hidden="true" />
        </span>

        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-[3px] w-0 bg-gold transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full motion-reduce:transition-none"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-bold leading-snug tracking-tight text-foreground sm:text-lg">
            {facility.title}
          </h3>
          <span
            aria-hidden="true"
            className="pt-0.5 text-xs font-semibold tabular-nums text-brand/70"
          >
            {facility.number}
          </span>
        </div>

        <p className="mt-2 flex-1 text-sm leading-6 text-muted">
          {facility.description}
        </p>
      </div>
    </motion.article>
  );
}

export default function ResearchLabsFacilities() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="research-facilities-title"
      className="relative isolate w-full overflow-hidden border-y border-border bg-surface-muted py-12 sm:py-14 lg:py-16"
    >
      {/* Subtle maroon-and-gold pattern matching the department site */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle
          cx="1320"
          cy="55"
          r="220"
          fill="var(--color-brand-light)"
          opacity="0.42"
        />
        <circle
          cx="70"
          cy="840"
          r="175"
          fill="var(--color-gold-light)"
          opacity="0.5"
        />
        <g
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="1"
          opacity="0.04"
        >
          <path d="M-100 200 C190 145 410 255 700 200 S1200 145 1540 200" />
          <path d="M-100 236 C190 181 410 291 700 236 S1200 181 1540 236" />
        </g>
      </svg>

      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 2xl:px-12">
        {/* Section heading */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mb-7 grid gap-4 sm:mb-9 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-12"
        >
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand sm:text-xs">
                Department Infrastructure
              </span>
              <span
                aria-hidden="true"
                className="h-px w-10 bg-border-strong sm:w-16"
              />
            </div>

            <h2
              id="research-facilities-title"
              className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Research Labs <span className="text-brand">&amp; Facilities</span>
            </h2>
          </div>

          <p className="max-w-xl border-l-2 border-gold pl-4 text-sm leading-6 text-muted sm:text-base">
            Explore the laboratories and computing infrastructure listed by the
            Artificial Intelligence &amp; Data Science department.
          </p>
        </motion.div>

        {/* Image-led facility gallery; additional entries wrap automatically */}
        <motion.div
          variants={reduceMotion ? undefined : gridVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.08 }}
          className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
        >
          {FACILITIES.map((facility, index) => (
            <FacilityCard
              key={facility.id}
              facility={facility}
              index={index}
              reduceMotion={reduceMotion}
            />
          ))}
        </motion.div>

        {/* Equipment inventory: keep the language factual, not promotional */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface sm:mt-10">
          <div className="flex flex-col gap-2 border-b border-border px-5 py-4 sm:flex-row sm:items-end sm:justify-between sm:px-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand">
                Infrastructure inventory
              </p>
              <h3 className="mt-1 text-lg font-bold text-foreground sm:text-xl">
                Computing, equipment &amp; connectivity
              </h3>
            </div>
            <a
              href={OFFICIAL_FACILITIES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-brand transition-colors duration-200 hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              Official facility listing
              <FiArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
            {INFRASTRUCTURE.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-start gap-3 p-4 sm:p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-brand/10 bg-brand-light text-brand">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-foreground">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs leading-5 text-muted">
                      {item.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
