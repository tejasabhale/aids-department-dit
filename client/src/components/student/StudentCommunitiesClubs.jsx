import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FiArrowUpRight,
  FiAward,
  FiBarChart2,
  FiChevronLeft,
  FiChevronRight,
  FiCode,
  FiHeart,
  FiMusic,
  FiUsers,
} from "react-icons/fi";

const EASE = [0.22, 1, 0.36, 1];
const SLIDE_TRANSITION = { duration: 0.8, ease: EASE };
const AUTOPLAY_DELAY_MS = 2400;
const ACTIVITY_DETAILS_URL =
  "https://engg.dypvp.edu.in/artificial-intelligence-and-data-science-activity.aspx";
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85";

// Official department event photographs are used where available.
// Replace or extend each `images` array with approved club photographs as needed.
const DEFAULT_GROUPS = [
  {
    id: "dsaii",
    shortName: "DSAII",
    name: "Data Science and Artificial Intelligence Inquisitive Club",
    focusArea: "Technical learning",
    description:
      "A technical student club bringing learners together through coding competitions, project showcases, technical talks, and collaborative problem-solving.",
    activities: ["Technical talks", "Coding competitions", "Project showcases"],
    recentHighlight:
      "Technovation 4.0 was listed among the department's club activities in April 2026.",
    Icon: FiCode,
    href: ACTIVITY_DETAILS_URL,
    linkLabel: "View club activities",
    images: [
      {
        src: "https://engg.dypvp.edu.in/img/activities/AIDS/club/technovation1.JPG",
        alt: "Students participating in a DSAII Technovation technical event",
        caption: "Technovation · Technical event",
      },
      {
        src: "https://engg.dypvp.edu.in/img/activities/AIDS/club/technovation2.JPG",
        alt: "Students working on computers during a technical competition",
        caption: "Hands-on coding activity",
      },
    ],
  },
  {
    id: "tarang",
    shortName: "TARANG",
    name: "Tarang Cultural Club",
    focusArea: "Culture and holistic growth",
    description:
      "A student community that encourages creativity, cultural participation, self-expression, and growth beyond the classroom.",
    activities: [
      "Cultural programmes",
      "Creative competitions",
      "Student showcases",
    ],
    recentHighlight:
      "A Tarang blog competition was listed among the department's activities in April 2026.",
    coordinator: "Sonam Singh",
    Icon: FiMusic,
    href: ACTIVITY_DETAILS_URL,
    linkLabel: "View club activities",
    images: [
      {
        src: "https://engg.dypvp.edu.in/img/activities/AIDS/club/Blog-1.jpeg",
        alt: "Students taking part in a Tarang club creative competition",
        caption: "Student creativity",
      },
      {
        src: "https://engg.dypvp.edu.in/img/activities/AIDS/club/Blog-2.jpeg",
        alt: "Students and faculty at a Tarang-related student activity",
        caption: "Celebrating student work",
      },
      {
        src: "https://engg.dypvp.edu.in/img/activities/AIDS/club/marathi-bhasha-1.jpeg",
        alt: "Department participants at a Marathi language celebration",
        caption: "Marathi language celebration",
      },
      {
        src: "https://engg.dypvp.edu.in/img/activities/AIDS/club/marathi-bhasha-2.jpeg",
        alt: "Students and faculty gathered for the Marathi language celebration",
        caption: "Culture and community",
      },
    ],
  },
  {
    id: "byteminds",
    shortName: "BYTEMINDS",
    name: "ByteMinds Society",
    focusArea: "Digital literacy and community outreach",
    description:
      "A digital-literacy student society that connects technical learning with outreach, volunteering, and projects supporting community organisations.",
    activities: ["Digital literacy", "Community outreach", "NGO projects"],
    recentHighlight:
      "The department listed an MoU signing with Sproug Hub Foundation under ByteMinds in August 2026.",
    coordinator: "Chetana Shravage",
    Icon: FiHeart,
    href: ACTIVITY_DETAILS_URL,
    linkLabel: "View club activities",
    images: [
      {
        src: "https://engg.dypvp.edu.in/img/activities/AIDS/club/connectfor1.jpg",
        alt: "ByteMinds students presenting a community project",
        caption: "Community project presentation",
      },
      {
        src: "https://engg.dypvp.edu.in/img/activities/AIDS/club/connectfor2.jpg",
        alt: "ByteMinds students and participants at a project or internship event",
        caption: "Student collaboration",
      },
      {
        src: "https://engg.dypvp.edu.in/img/activities/AIDS/club/donation1.png",
        alt: "ByteMinds community outreach and donation activity",
        caption: "Community outreach",
      },
      {
        src: "https://engg.dypvp.edu.in/img/activities/AIDS/club/donation2.png",
        alt: "Students interacting with children during a ByteMinds donation drive",
        caption: "Donation drive",
      },
      {
        src: "https://engg.dypvp.edu.in/img/activities/mou/mou-1.webp",
        alt: "Participants working together at an institutional collaboration event",
        caption: "Institutional collaboration",
      },
      {
        src: "https://engg.dypvp.edu.in/img/activities/mou/mou-2.webp",
        alt: "Participants at an institutional memorandum of understanding event",
        caption: "Partnership and outreach",
      },
    ],
  },
  {
    id: "s4ds",
    shortName: "S4DS",
    name: "Society for Data Science",
    focusArea: "Data science and professional development",
    description:
      "A professional student chapter for learners interested in data science, AI, machine learning, technical workshops, and collaborative projects.",
    activities: ["Hackathons", "Technical sessions", "Project exhibitions"],
    recentHighlight:
      "S4DS organised VORTEXA 2.0, a two-day hackathon held in September 2025.",
    Icon: FiBarChart2,
    href: "https://www.s4dsdit.in/",
    linkLabel: "Visit S4DS website",
    images: [
      {
        src: "https://engg.dypvp.edu.in/images/AI/AI-activities/data-science-event/Hackathon-1.jpg",
        alt: "S4DS student chapter members and faculty gathered after a hackathon",
        caption: "VORTEXA · Hackathon group photo",
      },
      {
        src: FALLBACK_IMAGE,
        alt: "Illustrative photograph of students collaborating at a table",
        caption: "Illustrative image · Collaborative learning",
        illustrative: true,
      },
    ],
  },
];

const ROUND_BUTTON =
  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-on-brand/40 bg-foreground/35 text-on-brand transition-colors duration-300 hover:bg-on-brand hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:transition-none";

/* ------------------------------------------------------------------ */
/* Photo carousel inside each card: sliding track + hover autoplay     */
/* ------------------------------------------------------------------ */
function ClubImageCarousel({ images = [], groupName, autoplay, reduceMotion }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState({});
  const slides = images.length
    ? images
    : [
        {
          src: FALLBACK_IMAGE,
          alt: `Illustrative student collaboration image for ${groupName}`,
          caption: "Illustrative image",
          illustrative: true,
        },
      ];
  const total = slides.length;
  const currentImage = slides[activeIndex] ?? slides[0];
  const isPlaying = autoplay && total > 1 && !reduceMotion;

  const goTo = (nextIndex) => {
    setActiveIndex(((nextIndex % total) + total) % total);
  };

  // Autoplay only while the card is hovered. Restarts after manual navigation.
  useEffect(() => {
    if (!isPlaying) return undefined;
    const timer = window.setTimeout(() => {
      setActiveIndex((index) => (index + 1) % total);
    }, AUTOPLAY_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [isPlaying, activeIndex, total]);

  const handleKeyDown = (event) => {
    if (total < 2) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(activeIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(activeIndex + 1);
    }
  };

  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden bg-surface-muted"
      role="group"
      aria-roledescription="carousel"
      aria-label={`${groupName} photos`}
      tabIndex={total > 1 ? 0 : undefined}
      onKeyDown={handleKeyDown}
    >
      {/* Sliding track */}
      <motion.div
        className="flex h-full w-full will-change-transform"
        animate={{ x: `-${activeIndex * 100}%` }}
        transition={reduceMotion ? { duration: 0 } : SLIDE_TRANSITION}
      >
        {slides.map((slide, index) => {
          const src = failedImages[slide.src] ? FALLBACK_IMAGE : slide.src;
          return (
            <div
              key={`${slide.src}-${index}`}
              className="h-full w-full shrink-0"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${total}`}
              aria-hidden={index === activeIndex ? undefined : "true"}
            >
              <img
                src={src}
                alt={slide.alt}
                loading="lazy"
                decoding="async"
                draggable={false}
                onError={() => {
                  if (src !== FALLBACK_IMAGE) {
                    setFailedImages((previous) => ({
                      ...previous,
                      [slide.src]: true,
                    }));
                  }
                }}
                className="h-full w-full object-cover"
              />
            </div>
          );
        })}
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/75 via-transparent to-foreground/10"
      />

      {/* Top row: dots */}
      {total > 1 && (
        <div className="absolute left-4 top-4 flex items-center gap-1.5">
          {slides.map((slide, index) => (
            <button
              key={`${slide.src}-dot-${index}`}
              type="button"
              aria-label={`Show photo ${index + 1} of ${total} for ${groupName}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => goTo(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:transition-none ${
                index === activeIndex
                  ? "w-6 bg-on-brand"
                  : "w-2 bg-on-brand/60 hover:bg-on-brand"
              }`}
            />
          ))}
        </div>
      )}

      {/* Bottom row: caption + controls (fixed height keeps every card identical) */}
      <div className="absolute inset-x-0 bottom-0 flex h-16 items-end justify-between gap-3 p-4">
        <div className="min-w-0">
          {currentImage.illustrative && (
            <span className="mb-1 inline-flex rounded bg-foreground/60 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-on-brand">
              Illustrative
            </span>
          )}
          <div className="h-5 overflow-hidden sm:h-5">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={activeIndex}
                aria-live="polite"
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="truncate text-xs font-semibold leading-5 text-on-brand sm:text-sm"
              >
                {currentImage.caption ?? `${groupName} activities`}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={() => goTo(activeIndex - 1)}
                aria-label={`Previous photo for ${groupName}`}
                className={ROUND_BUTTON}
              >
                <FiChevronLeft size={17} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => goTo(activeIndex + 1)}
                aria-label={`Next photo for ${groupName}`}
                className={ROUND_BUTTON}
              >
                <FiChevronRight size={17} aria-hidden="true" />
              </button>
            </>
          )}
          <span className="ml-0.5 rounded-full bg-foreground/45 px-2.5 py-1.5 text-[10px] font-semibold tabular-nums text-on-brand">
            {activeIndex + 1} / {total}
          </span>
        </div>
      </div>

      {/* Autoplay progress: thin line that fills while hovered */}
      {isPlaying && (
        <motion.div
          key={activeIndex}
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gold"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: AUTOPLAY_DELAY_MS / 1000, ease: "linear" }}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Club card — identical structure & block heights across all cards    */
/* ------------------------------------------------------------------ */
function ClubCard({ group, index, reduceMotion }) {
  const Icon = group.Icon ?? FiUsers;
  const activities = group.activities ?? [];
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.6,
        delay: reduceMotion ? 0 : (index % 2) * 0.1,
        ease: EASE,
      }}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-500 hover:border-brand/40 motion-reduce:transition-none"
    >
      <div className="relative">
        <ClubImageCarousel
          images={group.images}
          groupName={group.name}
          autoplay={hovered}
          reduceMotion={reduceMotion}
        />
        <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl border border-on-brand/25 bg-foreground/35 text-on-brand">
          <Icon size={19} aria-hidden="true" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex items-center justify-between gap-2">
          <p className="truncate text-[10px] font-bold uppercase tracking-[0.13em] text-brand sm:text-[11px]">
            {group.focusArea}
          </p>
          <span className="shrink-0 rounded-full border border-border bg-surface-muted px-2.5 py-1 text-[10px] font-bold tracking-[0.1em] text-muted">
            {group.shortName ?? `0${index + 1}`}
          </span>
        </div>

        <h3 className="line-clamp-2 min-h-[3.25rem] text-lg font-bold leading-snug tracking-tight text-foreground sm:min-h-[3.5rem] sm:text-xl">
          {group.name}
        </h3>

        <p className="mt-3 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-muted">
          {group.description}
        </p>

        <div className="mt-5 border-t border-border pt-4">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.1em] text-foreground">
            What they do
          </p>
          <ul className="flex flex-wrap gap-2">
            {activities.map((activity) => (
              <li
                key={activity}
                className="rounded-md bg-surface-muted px-2.5 py-1.5 text-xs leading-5 text-muted"
              >
                {activity}
              </li>
            ))}
          </ul>
        </div>

        {/* Highlight absorbs any spare height so footers always line up */}
        <div className="mt-5 flex flex-1 flex-col">
          {group.recentHighlight && (
            <div className="flex-1 rounded-xl border border-gold/30 bg-gold-light/45 p-4">
              <p className="mb-2 flex items-center gap-2 text-xs font-bold text-foreground">
                <FiAward
                  size={15}
                  aria-hidden="true"
                  className="shrink-0 text-gold-dark"
                />
                Recent highlight
              </p>
              <p className="text-sm leading-5 text-muted">
                {group.recentHighlight}
              </p>
            </div>
          )}
        </div>

        {/* Footer: coordinator (left) + link (right), fixed height */}
        <div className="mt-5 flex min-h-[3.5rem] items-center justify-between gap-4 border-t border-border pt-4">
          <div className="min-w-0">
            {group.coordinator && (
              <>
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">
                  Coordinator
                </p>
                <p className="mt-0.5 truncate text-sm font-medium text-foreground">
                  {group.coordinator}
                </p>
              </>
            )}
          </div>

          {group.href && (
            <a
              href={group.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand motion-reduce:transition-none"
            >
              {group.linkLabel ?? "View club details"}
              <FiArrowUpRight size={17} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function StudentCommunitiesClubs({
  groups = DEFAULT_GROUPS,
  title = "Find your community.",
  description = "From technical competitions to cultural experiences and community initiatives, explore the student groups that make department life richer.",
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="clubs-communities"
      aria-labelledby="student-communities-title"
      className="relative isolate overflow-hidden bg-background py-14 sm:py-16 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-28 -z-10 h-80 w-80 rounded-full bg-brand-light/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-28 -z-10 h-80 w-80 rounded-full bg-gold-light/55 blur-3xl"
      />

      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 2xl:px-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mb-8 flex flex-col gap-6 border-b border-border pb-7 sm:mb-10 sm:pb-9 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand sm:text-sm">
              <span aria-hidden="true" className="h-px w-7 bg-gold" />
              Student communities
            </p>
            <h2
              id="student-communities-title"
              className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              {title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
              {description}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 self-start rounded-xl border border-border bg-surface px-4 py-3 md:self-auto">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-light text-brand">
              <FiUsers aria-hidden="true" size={19} />
            </span>
            <div>
              <p className="text-xl font-bold leading-none text-foreground tabular-nums">
                {String(groups.length).padStart(2, "0")}
              </p>
              <p className="mt-1 text-xs text-muted">Department groups</p>
            </div>
          </div>
        </motion.div>

        {groups.length > 0 ? (
          /* 1 column on mobile/tablet, 2 columns on desktop → 4 clubs = 2 rows */
          <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
            {groups.map((group, index) => (
              <ClubCard
                key={group.id ?? group.name}
                group={group}
                index={index}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border-strong bg-surface-muted/70 px-5 py-12 text-center sm:px-10 sm:py-16">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-brand/10 bg-brand-light text-brand">
              <FiUsers size={24} aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-lg font-bold text-foreground sm:text-xl">
              No community listings available
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted sm:text-base">
              Add verified department clubs to the groups prop to display their
              cards here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
