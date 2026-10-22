import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiArrowUpRight,
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiCalendar,
  FiExternalLink,
  FiLayers,
  FiUsers,
} from "react-icons/fi";

const EASE = [0.22, 1, 0.36, 1];

const OFFICIAL_ACHIEVEMENTS_URL =
  "https://engg.dypvp.edu.in/Students-Achievements-AI.aspx";
const OFFICIAL_ACTIVITIES_URL =
  "https://engg.dypvp.edu.in/artificial-intelligence-and-data-science-activity.aspx";
const OFFICIAL_PLACEMENTS_URL =
  "https://engg.dypvp.edu.in/artificial-intelligence-and-data-science-placements.aspx";

// Individual placement and internship entries from the department's published tables.
// The placement table does not publish a personal portrait for each student. The
// images below are official institute placement-event photographs and are labelled
// as such in the UI; they are not represented as portraits of the named students.
const DEFAULT_CAREER_OUTCOMES = [
  {
    id: "aditya-mahindrakar-edgeverve-2026",
    type: "placement",
    audience: "2026-batch",
    studentName: "Aditya Mahindrakar",
    company: "EdgeVerve (Infosys company)",
    cohort: "2026 batch",
    value: "₹8 LPA",
    valueLabel: "Package listed",
    detail: "Listed in the department's 2026-batch placement table.",
    image:
      "https://engg.dypvp.edu.in/images/placement/Placement-photo/new1/image13.jpg",
    imageAlt:
      "Official institute placement-event photograph; not an individual student portrait",
    sourceUrl: OFFICIAL_PLACEMENTS_URL,
  },
  {
    id: "shravani-kadam-edgeverve-2026",
    type: "placement",
    audience: "2026-batch",
    studentName: "Shravani Kadam",
    company: "EdgeVerve (Infosys company)",
    cohort: "2026 batch",
    value: "₹3.6 LPA",
    valueLabel: "Package listed",
    detail: "Listed in the department's 2026-batch placement table.",
    image:
      "https://engg.dypvp.edu.in/images/placement/Placement-photo/new1/HD.jpg",
    imageAlt:
      "Official institute placement-event photograph; not an individual student portrait",
    sourceUrl: OFFICIAL_PLACEMENTS_URL,
  },
  {
    id: "saanvi-khandelwal-forma-ai-2026",
    type: "internship",
    audience: "2026-batch",
    studentName: "Saanvi Khandelwal",
    company: "Forma.ai",
    cohort: "2026 batch",
    value: "₹40,000",
    valueLabel: "Stipend listed · period unspecified",
    detail:
      "The department table records this stipend amount but does not specify its payment period.",
    image:
      "https://engg.dypvp.edu.in/images/placement/Placement-photo/new1/image11.jpg",
    imageAlt:
      "Official institute placement-event photograph; not an individual student portrait",
    sourceUrl: OFFICIAL_PLACEMENTS_URL,
  },
  {
    id: "vaishnavi-babar-merkle-2026",
    type: "internship",
    audience: "2026-batch",
    studentName: "Vaishnavi Sanjay Babar",
    company: "Merkle (a Dentsu company)",
    cohort: "2026 batch",
    value: "₹20,000",
    valueLabel: "Stipend listed · period unspecified",
    detail:
      "The department table records this stipend amount but does not specify its payment period.",
    image:
      "https://engg.dypvp.edu.in/images/placement/Placement-photo/new1/HSBC.jpg",
    imageAlt:
      "Official institute placement-event photograph; not an individual student portrait",
    sourceUrl: OFFICIAL_PLACEMENTS_URL,
  },
  {
    id: "ranjeet-patil-mahindra-comviva-2026",
    type: "internship",
    audience: "2026-batch",
    studentName: "Ranjeet Krishna Patil",
    company: "Mahindra Comviva",
    cohort: "2026 batch",
    value: "₹25,000",
    valueLabel: "Stipend listed · period unspecified",
    detail:
      "The department table records this stipend amount but does not specify its payment period.",
    image:
      "https://engg.dypvp.edu.in/images/placement/Placement-photo/new1/JLL.jpg",
    imageAlt:
      "Official institute placement-event photograph; not an individual student portrait",
    sourceUrl: OFFICIAL_PLACEMENTS_URL,
  },
  {
    id: "vidit-solanki-hackwithinfy-2026",
    type: "placement",
    audience: "2026-batch",
    studentName: "Vidit Solanki",
    company: "Infosys · HackWithInfy",
    cohort: "2026 batch",
    value: "₹9.5 LPA",
    valueLabel: "Package listed",
    detail: "Listed in the department's 2026-batch placement table.",
    image:
      "https://engg.dypvp.edu.in/images/placement/Placement-photo/new1/IBM.jpg",
    imageAlt:
      "Official institute placement-event photograph; not an individual student portrait",
    sourceUrl: OFFICIAL_PLACEMENTS_URL,
  },
  {
    id: "vani-naresh-pillai-ibm-2024-25",
    type: "placement",
    audience: "graduate",
    studentName: "Vani Naresh Pillai",
    company: "IBM",
    cohort: "2024–25 batch",
    value: "₹12 LPA",
    valueLabel: "Package listed",
    detail:
      "Listed as an in-campus placement in the department's 2024–25 table.",
    image:
      "https://engg.dypvp.edu.in/images/placement/Placement-photo/new1/IBM.jpg",
    imageAlt:
      "Official institute placement-event photograph; not an individual student portrait",
    sourceUrl: OFFICIAL_PLACEMENTS_URL,
  },
  {
    id: "rohit-bhadane-epam-2024-25",
    type: "placement",
    audience: "graduate",
    studentName: "Rohit Ananda Bhadane",
    company: "EPAM",
    cohort: "2024–25 batch",
    value: "₹8 LPA",
    valueLabel: "Package listed",
    detail:
      "Listed as an in-campus placement in the department's 2024–25 table.",
    image:
      "https://engg.dypvp.edu.in/images/placement/Placement-photo/new1/image11.jpg",
    imageAlt:
      "Official institute placement-event photograph; not an individual student portrait",
    sourceUrl: OFFICIAL_PLACEMENTS_URL,
  },
  {
    id: "suhelali-pakjade-juspay",
    type: "placement",
    audience: "graduate",
    studentName: "Suhelali Pakjade",
    role: "Software Developer",
    company: "Juspay",
    cohort: "Alumnus · listed in AY 2024–25 placement records",
    value: "₹27 LPA",
    valueLabel: "Off-campus package listed",
    detail:
      "The placement list labels this as an off-campus placement. The department separately identifies him as a Juspay Software Developer in an alumni engagement announcement.",
    image:
      "https://engg.dypvp.edu.in/images/placement/Placement-photo/new1/image13.jpg",
    imageAlt:
      "Official institute placement-event photograph; not an individual student portrait",
    sourceUrl: OFFICIAL_ACTIVITIES_URL,
    secondarySourceUrl: OFFICIAL_PLACEMENTS_URL,
  },
  {
    id: "vaishnavi-akul-airtel-alumna",
    type: "alumni",
    audience: "alumni",
    studentName: "Vaishnavi Akul",
    role: "Assistant Manager",
    company: "Airtel",
    cohort: "Alumna · batch 2024–25",
    value: null,
    valueLabel: null,
    detail:
      "Featured speaker in the department's AlumNXT series. Her session was titled ‘Agentic AI: Intelligence Meets Autonomy’. No package amount is published in that announcement.",
    image:
      "https://engg.dypvp.edu.in/images/placement/Placement-photo/new1/image9.jpg",
    imageAlt:
      "Official institute industry-interaction photograph used for context; not a portrait of Vaishnavi Akul",
    sourceUrl: OFFICIAL_ACTIVITIES_URL,
  },
];

// These entries are already featured on the department's public achievement page.
// No job package or unpublished personal placement detail is included.
const DEFAULT_FEATURED_STORY = {
  id: "anjali-protech-2026",
  name: "Anjali Pandurang Sakhare",
  eyebrow: "Student achievement · SE-C",
  title: "First Prize at PROTECH 2026",
  outcome: "National-level project competition",
  date: "28 March 2026",
  recognition: "₹9,500 cash award",
  description:
    "Anjali secured first prize at the PROTECH 2026 National Level Project Competition hosted by Symbiosis Institute of Technology, Pune. The department’s published note confirms the award and event; it does not specify the project title or preparation process.",
  image:
    "https://engg.dypvp.edu.in/img/activities/AIDS/Student-achivement/anjali-pandurang-AIDS.jpg",
  imageAlt:
    "Anjali Pandurang Sakhare with the PROTECH 2026 award team at the competition",
  sourceUrl: OFFICIAL_ACHIEVEMENTS_URL,
  sourceLabel: "Official achievement record",
  icon: FiAward,
};

const DEFAULT_STORIES = [
  {
    id: "gouri-gupta-icdmai",
    name: "Gouri Gupta",
    eyebrow: "Student recognition",
    title: "Best Student Member Volunteer of the Year",
    outcome: "Awarded for 2025 · recognised at ICDMAI 2026",
    description:
      "The department recognises Gouri Gupta with the Best Student Member Volunteer of the Year Award 2025 at the International Conference on Data Management, Analytics & Innovation (ICDMAI 2026). The official post does not specify her graduation year or a personal preparation account.",
    image:
      "https://engg.dypvp.edu.in/img/activities/AIDS/Student-achivement/International-Conference.jpg",
    imageAlt: "Gouri Gupta holding her certificate and award at ICDMAI 2026",
    sourceUrl: OFFICIAL_ACHIEVEMENTS_URL,
    sourceLabel: "Official achievement record",
    icon: FiAward,
    type: "achievement",
  },
  {
    id: "shesolvers-zion",
    name: "SheSolvers",
    eyebrow: "Student team · ZION",
    title: "Recognition at the AI Nexus competition",
    outcome: "Team achievement",
    description:
      "The department’s achievement page reports that team SheSolvers secured a position at the AI Nexus competition under ZION. The published summary does not list individual team members or the exact ranking, so those details are omitted.",
    image:
      "https://engg.dypvp.edu.in/img/activities/AIDS/Student-achivement/damini1.jpeg",
    imageAlt: "Two students photographed with an award at the ZION event",
    sourceUrl: OFFICIAL_ACHIEVEMENTS_URL,
    sourceLabel: "Official achievement record",
    icon: FiUsers,
    type: "achievement",
  },
];

function StoryImage({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt || "Profile photograph not available"}
        className={`flex items-center justify-center bg-brand-light text-brand ${className}`}
      >
        <FiUsers size={30} aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || "Student success story"}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

function FeaturedStory({ story, reduceMotion }) {
  const Icon = story.icon || FiAward;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={
        reduceMotion
          ? undefined
          : { y: -3, transition: { duration: 0.38, ease: EASE } }
      }
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, ease: EASE }}
      className="group grid overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-brand/40 lg:grid-cols-[1.05fr_0.95fr] motion-reduce:transition-none"
    >
      <div className="relative min-h-64 overflow-hidden bg-surface-muted sm:min-h-80 lg:min-h-[430px]">
        <StoryImage
          src={story.image}
          alt={story.imageAlt || story.name}
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025] motion-reduce:transition-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent transition-opacity duration-700 ease-out group-hover:from-foreground/40"
        />
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-on-brand/30 bg-foreground/45 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-on-brand backdrop-blur-sm sm:left-5 sm:top-5 sm:text-xs">
          <Icon size={14} aria-hidden="true" />
          Featured story
        </span>
      </div>

      <div className="flex flex-col justify-center p-5 sm:p-7 lg:p-9 xl:p-11">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand sm:text-xs">
          {story.eyebrow}
        </p>
        <h3 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-foreground transition-colors duration-500 ease-out group-hover:text-brand sm:text-3xl motion-reduce:transition-none">
          {story.title}
        </h3>
        <p className="mt-2 text-sm font-semibold text-brand sm:text-base">
          {story.name}
        </p>
        <p className="mt-4 text-sm leading-7 text-muted sm:text-base sm:leading-8">
          {story.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {story.outcome && (
            <span className="inline-flex items-center rounded-md border border-brand/15 bg-brand-light px-3 py-2 text-xs font-semibold text-brand">
              {story.outcome}
            </span>
          )}
          {story.date && (
            <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-muted px-3 py-2 text-xs font-medium text-muted">
              <FiCalendar size={13} aria-hidden="true" />
              {story.date}
            </span>
          )}
          {story.recognition && (
            <span className="inline-flex items-center rounded-md border border-gold/35 bg-gold-light px-3 py-2 text-xs font-semibold text-foreground">
              {story.recognition}
            </span>
          )}
        </div>

        {story.sourceUrl && (
          <a
            href={story.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex min-h-10 items-center gap-2 self-start text-sm font-semibold text-brand transition-colors duration-300 ease-out hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          >
            {story.sourceLabel || "Read official story"}
            <FiArrowUpRight size={16} aria-hidden="true" />
          </a>
        )}
      </div>
    </motion.article>
  );
}

function StoryCard({ story, index, reduceMotion }) {
  const Icon = story.icon || FiLayers;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={
        reduceMotion
          ? undefined
          : { y: -4, transition: { duration: 0.36, ease: EASE } }
      }
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.42,
        delay: reduceMotion ? 0 : Math.min(index * 0.06, 0.18),
        ease: EASE,
      }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-[border-color,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-brand/40 motion-reduce:transition-none"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-muted">
        <StoryImage
          src={story.image}
          alt={story.imageAlt || story.name}
          className="h-full w-full object-cover transition-transform duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025] motion-reduce:transition-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-foreground/35 via-transparent to-transparent transition-opacity duration-700 ease-out group-hover:from-foreground/25"
        />
        <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg border border-on-brand/30 bg-foreground/40 text-on-brand backdrop-blur-sm">
          <Icon size={17} aria-hidden="true" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand sm:text-[11px]">
          {story.eyebrow}
        </p>
        <h4 className="mt-2 text-lg font-bold leading-snug tracking-tight text-foreground transition-colors duration-500 ease-out group-hover:text-brand sm:text-xl motion-reduce:transition-none">
          {story.title}
        </h4>
        <p className="mt-2 text-sm font-semibold text-foreground/90">
          {story.name}
        </p>
        {story.outcome && (
          <p className="mt-2 text-xs font-medium leading-5 text-brand">
            {story.outcome}
          </p>
        )}
        <p className="mt-3 text-sm leading-6 text-muted">{story.description}</p>

        {story.project && (
          <div className="mt-4 rounded-lg border border-gold/30 bg-gold-light/45 p-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-foreground">
              Project / focus
            </p>
            <p className="mt-1 text-sm leading-5 text-muted">{story.project}</p>
          </div>
        )}

        {story.sourceUrl && (
          <a
            href={story.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-auto inline-flex min-h-10 items-center justify-between gap-3 border-t border-border pt-4 text-sm font-semibold text-brand transition-colors duration-300 ease-out hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          >
            {story.sourceLabel || "Read official story"}
            <FiExternalLink size={15} aria-hidden="true" />
          </a>
        )}
      </div>
    </motion.article>
  );
}

function CareerOutcomeCard({ outcome, index, reduceMotion }) {
  const isInternship = outcome.type === "internship";
  const isAlumni = outcome.type === "alumni";
  const Icon = isInternship ? FiBookOpen : isAlumni ? FiUsers : FiBriefcase;
  const typeLabel = isInternship
    ? "Internship"
    : isAlumni
      ? "Alumni profile"
      : "Placement";

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={
        reduceMotion
          ? undefined
          : { y: -3, transition: { duration: 0.34, ease: EASE } }
      }
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reduceMotion ? 0 : 0.38,
        delay: reduceMotion ? 0 : Math.min(index * 0.035, 0.16),
        ease: EASE,
      }}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-[border-color,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-brand/40 motion-reduce:transition-none"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-surface-muted">
        <StoryImage
          src={outcome.image}
          alt={outcome.imageAlt || "Official department placement activity"}
          className="h-full w-full object-cover transition-transform duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025] motion-reduce:transition-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-transparent to-foreground/5 transition-colors duration-700 ease-out group-hover:from-foreground/45"
        />
        <span className="absolute bottom-3 left-3 rounded-md border border-on-brand/25 bg-foreground/50 px-2.5 py-1.5 text-[9px] font-semibold text-on-brand backdrop-blur-sm sm:text-[10px]">
          Department event photo
        </span>
        <span
          className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] ${
            isInternship
              ? "border border-gold/40 bg-gold-light text-foreground"
              : isAlumni
                ? "border border-on-brand/35 bg-foreground/55 text-on-brand"
                : "border border-brand/15 bg-brand-light text-brand"
          }`}
        >
          {typeLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-muted sm:text-[11px]">
          {outcome.cohort}
        </p>
        <h4 className="mt-2 text-lg font-bold leading-snug text-foreground transition-colors duration-500 ease-out group-hover:text-brand sm:text-xl motion-reduce:transition-none">
          {outcome.studentName}
        </h4>

        {outcome.role && (
          <p className="mt-1 text-sm font-medium text-brand">{outcome.role}</p>
        )}

        <div className="mt-3 flex items-start gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand/10 bg-brand-light text-brand">
            <Icon size={16} aria-hidden="true" />
          </span>
          <div className="min-w-0 pt-0.5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">
              {isInternship
                ? "Internship provider"
                : isAlumni
                  ? "Current employer"
                  : "Listed employer"}
            </p>
            <p className="mt-0.5 break-words text-sm font-semibold text-foreground">
              {outcome.company}
            </p>
          </div>
        </div>

        {outcome.value && (
          <div className="mt-4 border-y border-border py-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">
              {outcome.valueLabel || "Published value"}
            </p>
            <p className="mt-1 text-2xl font-semibold leading-tight tracking-tight text-brand tabular-nums sm:text-3xl">
              {outcome.value}
            </p>
          </div>
        )}

        <p className="mt-3 text-xs leading-5 text-muted">{outcome.detail}</p>

        <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 border-t border-border pt-4 mt-4">
          {outcome.sourceUrl && (
            <a
              href={outcome.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-8 items-center gap-1.5 text-xs font-semibold text-brand transition-colors duration-300 ease-out hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand"
            >
              Official record <FiExternalLink size={13} aria-hidden="true" />
            </a>
          )}
          {outcome.secondarySourceUrl && (
            <a
              href={outcome.secondarySourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-8 items-center gap-1.5 text-xs font-semibold text-muted transition-colors duration-300 ease-out hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand"
            >
              Placement listing <FiArrowUpRight size={13} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function CareerOutcomesSection({ outcomes, reduceMotion }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const filters = [
    { id: "all", label: "All students" },
    { id: "graduate", label: "Graduate placements" },
    { id: "2026-batch", label: "2026 batch" },
    { id: "internship", label: "Internships" },
    { id: "alumni", label: "Alumni careers" },
  ];

  const visibleOutcomes = outcomes.filter((outcome) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "internship") return outcome.type === "internship";
    if (activeFilter === "graduate")
      return outcome.audience === "graduate" && outcome.type === "placement";
    if (activeFilter === "2026-batch") return outcome.audience === "2026-batch";
    if (activeFilter === "alumni")
      return outcome.type === "alumni" || outcome.audience === "alumni";
    return true;
  });

  return (
    <div className="mb-12 sm:mb-14">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
            Placements &amp; internships
          </p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            From campus to opportunity
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Individual names, employers, batches, and listed packages or
            stipends from the department’s published records. Job roles appear
            only where the department has explicitly published them.
          </p>
        </div>
        <a
          href={OFFICIAL_PLACEMENTS_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-9 shrink-0 items-center gap-2 self-start text-sm font-semibold text-brand transition-colors duration-300 ease-out hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:self-auto"
        >
          Full placement list
          <FiArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>

      <div
        role="tablist"
        aria-label="Filter placement outcomes"
        className="mb-5 flex max-w-full gap-2 overflow-x-auto pb-2 [scrollbar-width:thin]"
      >
        {filters.map((filter) => {
          const selected = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveFilter(filter.id)}
              className={`min-h-9 shrink-0 rounded-lg border px-3.5 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:text-sm ${
                selected
                  ? "border-brand bg-brand text-on-brand"
                  : "border-border bg-surface text-muted hover:border-brand/40 hover:text-brand"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {visibleOutcomes.length > 0 ? (
        <motion.div
          key={activeFilter}
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.28, ease: EASE }}
          role="tabpanel"
          className="grid grid-cols-1 gap-3 min-[460px]:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4"
        >
          {visibleOutcomes.map((outcome, index) => (
            <CareerOutcomeCard
              key={outcome.id}
              outcome={outcome}
              index={index}
              reduceMotion={reduceMotion}
            />
          ))}
        </motion.div>
      ) : (
        <p className="rounded-xl border border-dashed border-border-strong bg-surface px-4 py-8 text-center text-sm text-muted">
          No published outcomes are available in this category yet.
        </p>
      )}
    </div>
  );
}

export default function StudentSuccessStories({
  featuredStory = DEFAULT_FEATURED_STORY,
  stories = DEFAULT_STORIES,
  // Career profiles should be passed only after explicit publication permission.
  careerStories = [],
  careerOutcomes = DEFAULT_CAREER_OUTCOMES,
  title = "Stories of progress.",
  description = "Recognising student achievement, practical work, and the people who bring their experience back to the department.",
}) {
  const reduceMotion = useReducedMotion();
  const approvedCareerStories = careerStories.filter(
    (story) => story.consentApproved === true,
  );

  return (
    <section
      id="student-success-stories"
      aria-labelledby="student-success-stories-title"
      className="relative isolate overflow-hidden bg-surface-muted py-14 sm:py-16 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-24 -z-10 h-72 w-72 rounded-full bg-brand-light/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-24 -z-10 h-72 w-72 rounded-full bg-gold-light/55 blur-3xl"
      />

      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 2xl:px-12">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.48, ease: EASE }}
          className="mb-8 flex flex-col gap-5 border-b border-border pb-7 sm:mb-10 sm:pb-8 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.17em] text-brand sm:text-sm">
              <span aria-hidden="true" className="h-px w-7 bg-gold" />
              Student success stories
            </p>
            <h2
              id="student-success-stories-title"
              className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              {title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
              {description}
            </p>
          </div>
          <a
            href={OFFICIAL_ACHIEVEMENTS_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:self-auto"
          >
            Official achievements
            <FiArrowUpRight size={15} aria-hidden="true" />
          </a>
        </motion.header>

        <div className="mb-12 sm:mb-14">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-7 w-1 rounded-full bg-gold" />
            <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Featured story
            </h3>
          </div>
          <FeaturedStory story={featuredStory} reduceMotion={reduceMotion} />
        </div>

        <CareerOutcomesSection
          outcomes={careerOutcomes}
          reduceMotion={reduceMotion}
        />

        <div>
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
              More from our community
            </p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Achievement in action
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {stories.map((story, index) => (
              <StoryCard
                key={story.id || story.title}
                story={story}
                index={index}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>

        {approvedCareerStories.length > 0 && (
          <div className="mt-12 sm:mt-14">
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
                Approved career profiles
              </p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Alumni &amp; current students
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                Approved profiles can feature job roles, employers, graduation
                years, projects, and preparation stories. Only profiles with
                publication permission are shown.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {approvedCareerStories.map((story, index) => (
                <StoryCard
                  key={story.id || story.name}
                  story={{
                    ...story,
                    eyebrow: [story.graduationYear, story.role]
                      .filter(Boolean)
                      .join(" · "),
                    title: story.headline || story.employer || "Career journey",
                    outcome: story.employer,
                    description: story.preparationStory || story.description,
                    project: story.project,
                    sourceLabel: story.sourceLabel || "Official profile",
                  }}
                  index={index}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-2 border-t border-border pt-4 sm:flex-row sm:items-start sm:justify-between">
          <a
            href={OFFICIAL_ACTIVITIES_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-8 shrink-0 items-center gap-2 text-xs font-semibold text-muted transition-colors duration-300 ease-out hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          >
            Department activity reports
            <FiArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
