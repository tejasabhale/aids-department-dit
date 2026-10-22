import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiArrowUpRight,
  FiAward,
  FiBookOpen,
  FiCalendar,
  FiExternalLink,
  FiMapPin,
  FiUsers,
} from "react-icons/fi";

const EASE = [0.22, 1, 0.36, 1];

const OFFICIAL_ACHIEVEMENTS_URL =
  "https://engg.dypvp.edu.in/Students-Achievements-AI.aspx";

const DEFAULT_FEATURED_ACHIEVEMENT = {
  id: "protech-2026-anjali-sakhare",
  studentNames: ["Anjali Pandurang Sakhare"],
  title: "First Prize — PROTECH 2026",
  category: "National-level project competition",
  year: "2026",
  date: "28 March 2026",
  organisation: "Symbiosis Institute of Technology, Pune",
  award: "₹9,500 cash reward",
  description:
    "Anjali Pandurang Sakhare from SE-C secured first prize at the PROTECH 2026 National Level Project Competition.",
  image:
    "https://engg.dypvp.edu.in/img/activities/AIDS/Student-achivement/anjali-pandurang-AIDS.jpg",
  imageAlt: "Anjali Pandurang Sakhare at the PROTECH 2026 award presentation",
  detailsUrl: OFFICIAL_ACHIEVEMENTS_URL,
  detailsLabel: "View achievement",
};

const DEFAULT_ACHIEVEMENTS = [
  {
    id: "gouri-gupta-volunteer-award",
    studentNames: ["Gouri Gupta"],
    title: "Best Student Member Volunteer of the Year Award",
    category: "Professional recognition",
    year: "2025",
    date: "Recognised at ICDMAI 2026",
    description:
      "The department recognises Gouri Gupta for the Best Student Member Volunteer of the Year Award 2025, associated with the International Conference on Data Management, Analytics & Innovation (ICDMAI 2026).",
    image:
      "https://engg.dypvp.edu.in/img/activities/AIDS/Student-achivement/International-Conference.jpg",
    imageAlt: "Gouri Gupta holding her certificate at ICDMAI 2026",
    detailsUrl: OFFICIAL_ACHIEVEMENTS_URL,
    detailsLabel: "View achievement",
    Icon: FiAward,
  },
  {
    id: "se-semester-one-toppers-2025-26",
    studentNames: [
      "Arati Shelar",
      "Niraj Karnawat",
      "Viraj Patel",
      "Samiksha Shinde",
      "Anjali Sakhare",
      "Shreyans Anchalia",
    ],
    title: "SE Semester I Academic Toppers",
    category: "Academic achievement",
    year: "2025–26",
    description:
      "The department published its SE Semester I topper list for the 2025–26 academic year. The announcement lists Arati Shelar and Niraj Karnawat at SGPA 9.36, followed by Viraj Patel at SGPA 9.32, alongside other top-performing students.",
    image:
      "https://engg.dypvp.edu.in/images/Students-Achievements-AI/se-topper-2025-2026.jpg",
    imageAlt:
      "Official department poster announcing SE Semester I toppers for 2025–26",
    detailsUrl: OFFICIAL_ACHIEVEMENTS_URL,
    detailsLabel: "View topper list",
    Icon: FiBookOpen,
  },
];

function AchievementImage({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt || "Achievement photograph unavailable"}
        className={`flex items-center justify-center bg-gradient-to-br from-brand-light via-surface-muted to-gold-light text-brand ${className}`}
      >
        <FiAward size={34} aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || "Student achievement"}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

function AchievementTag({ children }) {
  return (
    <span className="inline-flex w-fit items-center rounded-full border border-brand/15 bg-brand-light px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-brand sm:text-[11px]">
      {children}
    </span>
  );
}

function FeaturedAchievement({ achievement, reduceMotion }) {
  if (!achievement) return null;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="overflow-hidden rounded-2xl border border-border bg-surface"
    >
      <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-64 overflow-hidden bg-surface-muted sm:min-h-80 lg:min-h-[460px]">
          <AchievementImage
            src={achievement.image}
            alt={achievement.imageAlt || achievement.title}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-foreground/65 via-transparent to-foreground/10"
          />
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-on-brand/25 bg-foreground/40 px-3 py-2 text-xs font-semibold text-on-brand backdrop-blur-sm sm:left-6 sm:top-6">
            <FiAward size={15} aria-hidden="true" />
            Featured achievement
          </div>
          <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
            {achievement.award && (
              <span className="inline-flex items-center gap-2 rounded-lg bg-gold px-3.5 py-2 text-sm font-bold text-foreground shadow-sm">
                <FiAward size={16} aria-hidden="true" />
                {achievement.award}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <AchievementTag>
              {achievement.category || "Achievement"}
            </AchievementTag>
            {achievement.year && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted">
                <FiCalendar size={14} aria-hidden="true" />
                {achievement.year}
              </span>
            )}
          </div>

          <h3 className="mt-5 text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            {achievement.title}
          </h3>

          {achievement.studentNames?.length > 0 && (
            <p className="mt-4 flex items-start gap-2.5 text-sm font-semibold leading-6 text-brand sm:text-base">
              <FiUsers
                size={18}
                aria-hidden="true"
                className="mt-0.5 shrink-0"
              />
              <span>{achievement.studentNames.join(", ")}</span>
            </p>
          )}

          {achievement.description && (
            <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
              {achievement.description}
            </p>
          )}

          <div className="mt-6 space-y-3 border-y border-border py-5 text-sm text-muted">
            {achievement.date && (
              <p className="flex items-start gap-3">
                <FiCalendar
                  size={17}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-brand"
                />
                <span>{achievement.date}</span>
              </p>
            )}
            {achievement.organisation && (
              <p className="flex items-start gap-3">
                <FiMapPin
                  size={17}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-brand"
                />
                <span>{achievement.organisation}</span>
              </p>
            )}
          </div>

          {achievement.detailsUrl && (
            <a
              href={achievement.detailsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-on-brand transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:transition-none"
            >
              {achievement.detailsLabel || "View details"}
              <FiArrowUpRight size={17} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function AchievementCard({ achievement, index, reduceMotion }) {
  const Icon = achievement.Icon || FiAward;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.42,
        delay: reduceMotion ? 0 : Math.min(index * 0.06, 0.18),
        ease: EASE,
      }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-300 hover:border-brand/35 motion-reduce:transition-none"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-muted">
        <AchievementImage
          src={achievement.image}
          alt={achievement.imageAlt || achievement.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-foreground/45 via-transparent to-transparent"
        />
        <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl border border-on-brand/25 bg-foreground/40 text-on-brand backdrop-blur-sm">
          <Icon size={19} aria-hidden="true" />
        </span>
        {achievement.year && (
          <span className="absolute bottom-4 right-4 rounded-full border border-on-brand/25 bg-foreground/45 px-3 py-1.5 text-xs font-semibold text-on-brand backdrop-blur-sm">
            {achievement.year}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {achievement.category && (
          <AchievementTag>{achievement.category}</AchievementTag>
        )}

        <h4 className="mt-4 text-lg font-bold leading-snug tracking-tight text-foreground sm:text-xl">
          {achievement.title}
        </h4>

        {achievement.studentNames?.length > 0 && (
          <p className="mt-3 flex items-start gap-2 text-sm font-semibold leading-5 text-brand">
            <FiUsers size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
            <span>{achievement.studentNames.join(", ")}</span>
          </p>
        )}

        {achievement.description && (
          <p className="mt-3 text-sm leading-6 text-muted">
            {achievement.description}
          </p>
        )}

        {achievement.date && (
          <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-muted">
            <FiCalendar
              size={14}
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-brand"
            />
            <span>{achievement.date}</span>
          </p>
        )}

        <div className="mt-auto pt-5">
          {achievement.detailsUrl && (
            <a
              href={achievement.detailsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 w-full items-center justify-between gap-3 border-t border-border pt-4 text-sm font-semibold text-brand transition-colors hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              {achievement.detailsLabel || "View details"}
              <FiExternalLink size={16} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function StudentAchievements({
  featuredAchievement = DEFAULT_FEATURED_ACHIEVEMENT,
  achievements = DEFAULT_ACHIEVEMENTS,
  title = "Achievement worth celebrating.",
  description = "Recognising the students who turn ideas, persistence, and hard work into meaningful academic and professional milestones.",
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="student-achievements"
      aria-labelledby="student-achievements-title"
      className="relative isolate overflow-hidden bg-background py-14 sm:py-16 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 top-8 -z-10 h-80 w-80 rounded-full bg-brand-light/55 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-24 -z-10 h-72 w-72 rounded-full bg-gold-light/60 blur-3xl"
      />

      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 2xl:px-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-9 flex flex-col gap-6 border-b border-border pb-7 sm:mb-10 sm:pb-9 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand sm:text-sm">
              <span aria-hidden="true" className="h-px w-7 bg-gold" />
              Student achievements
            </p>
            <h2
              id="student-achievements-title"
              className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              {title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
              {description}
            </p>
          </div>

          <a
            href={OFFICIAL_ACHIEVEMENTS_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-lg border border-border bg-surface px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:self-auto"
          >
            Official achievements
            <FiArrowUpRight size={16} aria-hidden="true" />
          </a>
        </motion.div>

        {featuredAchievement && (
          <div className="mb-12 sm:mb-14">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-7 w-1 rounded-full bg-gold" />
              <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                Featured achievement
              </h3>
            </div>
            <FeaturedAchievement
              achievement={featuredAchievement}
              reduceMotion={reduceMotion}
            />
          </div>
        )}

        <div>
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand">
              More milestones
            </p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              More reasons to celebrate
            </h3>
          </div>

          {achievements.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {achievements.map((achievement, index) => (
                <AchievementCard
                  key={achievement.id || achievement.title}
                  achievement={achievement}
                  index={index}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-border-strong bg-surface-muted p-6 text-sm leading-6 text-muted">
              Add verified student achievements to the achievements prop to
              display them here.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
