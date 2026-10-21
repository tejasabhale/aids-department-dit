import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

// Sample data only. Replace these entries with official department notices.
const notices = [
  {
    id: "exam-schedule",
    day: "21",
    month: "OCT",
    dateLabel: "21 October 2026",
    category: "Examination",
    title: "Examination schedule and updates",
    summary:
      "Check the latest exam timetable and examination-related instructions.",
    to: "/academics/exams",
    tone: "brand",
    latest: true,
  },
  {
    id: "assignment-deadlines",
    day: "19",
    month: "OCT",
    dateLabel: "19 October 2026",
    category: "Assignment",
    title: "Assignment and project submission deadlines",
    summary:
      "Review upcoming submissions and project milestones for your courses.",
    to: "/academics/assignments",
    tone: "gold",
  },
  {
    id: "timetable-change",
    day: "16",
    month: "OCT",
    dateLabel: "16 October 2026",
    category: "Timetable",
    title: "Class timetable updates",
    summary: "View the latest class schedule changes and room updates.",
    to: "/academics/timetable",
    tone: "brand",
  },
  {
    id: "department-circular",
    day: "14",
    month: "OCT",
    dateLabel: "14 October 2026",
    category: "Circular",
    title: "Department circulars and student notices",
    summary: "Read important academic announcements from the department.",
    to: "/academics/notices",
    tone: "gold",
  },
];

const EASE = [0.22, 1, 0.36, 1];

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE },
  },
};

/* Plain text label: no background, no border, no padding. */
function Category({ children, tone }) {
  return (
    <span
      className={`text-[10px] font-bold uppercase leading-none tracking-[0.14em] sm:text-[11px] ${
        tone === "gold" ? "text-gold-light" : "text-gold"
      }`}
    >
      {children}
    </span>
  );
}

function NoticeRow({ notice }) {
  return (
    <motion.li variants={rowVariants} className="min-w-0">
      <Link
        to={notice.to}
        aria-label={`${notice.title}. Published ${notice.dateLabel}.`}
        className="group relative grid min-w-0 grid-cols-[54px_minmax(0,1fr)_32px] items-center gap-x-3 overflow-hidden rounded-xl border border-on-brand/10 bg-on-brand/5 px-3.5 py-3.5 transition-[border-color,background-color,box-shadow] duration-300 ease-out hover:border-gold/50 hover:bg-on-brand/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:transition-none sm:grid-cols-[62px_minmax(0,1fr)_32px] sm:gap-x-4 sm:px-4 sm:py-4 md:grid-cols-[62px_minmax(0,1fr)_132px_32px]"
      >
        {/* Date tile */}
        <span className="flex h-[54px] w-[54px] shrink-0 flex-col items-center justify-center rounded-lg border border-on-brand/15 bg-brand sm:h-[62px] sm:w-[62px]">
          <span className="text-xl font-bold leading-none text-on-brand sm:text-2xl">
            {notice.day}
          </span>
          <span className="mt-1 text-[9px] font-bold leading-none tracking-[0.16em] text-gold-light">
            {notice.month}
          </span>
        </span>

        {/* Text */}
        <span className="flex min-w-0 flex-col">
          <span className="flex min-h-[14px] items-center gap-2">
            <Category tone={notice.tone}>{notice.category}</Category>
            {notice.latest && (
              <>
                <span
                  aria-hidden="true"
                  className="h-1 w-1 rounded-full bg-on-brand/30"
                />
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold leading-none text-on-brand sm:text-[11px]">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-gold"
                  />
                  Latest
                </span>
              </>
            )}
          </span>

          <span className="mt-2 block text-sm font-semibold leading-snug text-on-brand transition-colors duration-200 group-hover:text-gold sm:text-[15px]">
            {notice.title}
          </span>

          <span className="mt-1 hidden text-xs leading-5 text-on-brand/65 sm:block">
            {notice.summary}
          </span>
        </span>

        {/* Date (fixed-width column so every row lines up) */}
        <span className="hidden whitespace-nowrap text-right text-xs text-on-brand/60 md:block">
          {notice.dateLabel}
        </span>

        {/* Arrow */}
        <span
          aria-hidden="true"
          className="flex h-8 w-8 items-center justify-center justify-self-end rounded-full text-on-brand/60 transition-[background-color,color] duration-300 group-hover:bg-brand group-hover:text-on-brand motion-reduce:transition-none"
        >
          <FiChevronRight size={17} />
        </span>

        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold transition-[width] duration-300 ease-out group-hover:w-full motion-reduce:transition-none"
        />
      </Link>
    </motion.li>
  );
}

export default function LatestAcademicNotices() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="latest-notices-title"
      className="relative isolate w-full overflow-hidden border-y border-on-brand/10 bg-foreground py-12 sm:py-14 lg:py-16"
    >
      {/* Dark background pattern: faint gold rings on a solid color */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        viewBox="0 0 1440 650"
        preserveAspectRatio="xMidYMid slice"
      >
        <g
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="1"
          opacity="0.08"
        >
          <circle cx="1390" cy="610" r="110" />
          <circle cx="1390" cy="610" r="180" />
          <circle cx="1390" cy="610" r="250" />
        </g>
      </svg>

      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-3">
              <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold sm:text-xs">
                Department Updates
              </span>
              <span
                aria-hidden="true"
                className="h-px w-10 bg-on-brand/20 sm:w-16"
              />
            </div>

            <h2
              id="latest-notices-title"
              className="text-2xl font-bold leading-tight tracking-tight text-on-brand sm:text-3xl lg:text-4xl"
            >
              Latest Academic <span className="text-gold">Notices</span>
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-on-brand/65 sm:text-base">
              Exam updates, deadlines, timetable changes, and important
              circulars in one place.
            </p>
          </div>

          <Link
            to="/academics/notices"
            className="group inline-flex min-h-10 w-fit shrink-0 items-center gap-2 rounded-lg border border-on-brand/25 px-4 py-2 text-sm font-semibold text-on-brand transition-[border-color,background-color,color] duration-300 hover:border-brand hover:bg-brand hover:text-on-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:transition-none"
          >
            View all notices
            <FiArrowUpRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
            />
          </Link>
        </motion.div>

        <motion.ul
          variants={reduceMotion ? undefined : listVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.12 }}
          className="grid list-none grid-cols-1 gap-3 p-0 lg:gap-3.5"
        >
          {notices.map((notice) => (
            <NoticeRow key={notice.id} notice={notice} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
