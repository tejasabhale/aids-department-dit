import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FiArrowUpRight,
  FiChevronLeft,
  FiChevronRight,
  FiImage,
  FiPlay,
  FiX,
} from "react-icons/fi";

const EASE = [0.22, 1, 0.36, 1];

const OFFICIAL_GALLERY_URL =
  "https://engg.dypvp.edu.in/AIDS-activities-and-events.aspx";
const OFFICIAL_ACTIVITY_REPORTS_URL =
  "https://engg.dypvp.edu.in/artificial-intelligence-and-data-science-activity.aspx";

const IMG = "https://engg.dypvp.edu.in/img/activities/";

// Add approved videos with: mediaType: "video", videoUrl, (optional) videoMimeType.
const DEFAULT_GALLERY_ITEMS = [
  {
    id: "nlp-expert-session-1",
    title: "Emerging Research Directions in Natural Language Processing",
    category: "Technical Events",
    date: "21 August 2026",
    image: `${IMG}etc/Expert_Session_99.jpeg`,
    alt: "AI and data science students attending an expert session",
    sourceUrl: OFFICIAL_GALLERY_URL,
    size: "wide",
  },
  {
    id: "nlp-expert-session-2",
    title: "Expert Session with Faculty and Students",
    category: "Technical Events",
    date: "21 August 2026",
    image: `${IMG}etc/Expert_Session_100.jpeg`,
    alt: "Department participants at an expert session",
    sourceUrl: OFFICIAL_GALLERY_URL,
    size: "standard",
  },
  {
    id: "aiot-workshop",
    title: "AIoT: Building Intelligent Connected Systems",
    category: "Workshops",
    date: "7–8 August 2026",
    image: `${IMG}etc/Engineering_TE-1.webp`,
    alt: "Students taking part in a hands-on computer laboratory activity",
    sourceUrl: OFFICIAL_GALLERY_URL,
    size: "tall",
  },
  {
    id: "cyber-shield-1",
    title: "Cyber Shield — Guest Lecture",
    category: "Technical Events",
    date: "20 April 2026",
    image: `${IMG}etc/jyo3.jpg`,
    alt: "Guest speaker presenting a cyber security topic to students",
    sourceUrl: OFFICIAL_GALLERY_URL,
    size: "standard",
  },
  {
    id: "cyber-shield-2",
    title: "Cyber Shield — Student Session",
    category: "Classroom & Learning",
    date: "20 April 2026",
    image: `${IMG}etc/jyotsna2.jpg`,
    alt: "Students attending a classroom session on digital security",
    sourceUrl: OFFICIAL_GALLERY_URL,
    size: "standard",
  },
  {
    id: "gate-awareness-1",
    title: "GATE Examination Awareness Session",
    category: "Classroom & Learning",
    date: "17 April 2026",
    image: `${IMG}AIDS/gate-exam-1.jpeg`,
    alt: "Students attending the GATE examination awareness session",
    sourceUrl: OFFICIAL_GALLERY_URL,
    size: "standard",
  },
  {
    id: "gate-awareness-2",
    title: "GATE Examination Awareness Session",
    category: "Classroom & Learning",
    date: "17 April 2026",
    image: `${IMG}AIDS/gate-exam-2.jpeg`,
    alt: "Instructor addressing students during the GATE awareness session",
    sourceUrl: OFFICIAL_GALLERY_URL,
    size: "wide",
  },
  {
    id: "neural-network-talk",
    title: "Artificial Neural Network: Theory to Industry Mapping",
    category: "Technical Events",
    date: "17 April 2026",
    image: `${IMG}AIDS/neural-network.jpeg`,
    alt: "Expert explaining artificial neural networks during a department session",
    sourceUrl: OFFICIAL_GALLERY_URL,
    size: "standard",
  },
  {
    id: "neural-network-talk-2",
    title: "Artificial Neural Network Expert Session",
    category: "Technical Events",
    date: "17 April 2026",
    image: `${IMG}etc/Expert-Session-1.jpeg`,
    alt: "Students attending a technical expert session",
    sourceUrl: OFFICIAL_GALLERY_URL,
    size: "standard",
  },
  {
    id: "student-project-exhibition-1",
    title: "Student Project Demonstration",
    category: "Projects & Competitions",
    date: "Department project activity",
    image: `${IMG}etc/SNI-1.jpeg`,
    alt: "Students and faculty gathered during a department project activity",
    sourceUrl: OFFICIAL_GALLERY_URL,
    size: "tall",
  },
  {
    id: "student-project-exhibition-2",
    title: "Students Presenting Their Project",
    category: "Projects & Competitions",
    date: "Department project activity",
    image: `${IMG}etc/SNI-2.jpeg`,
    alt: "Students discussing a project demonstration with faculty",
    sourceUrl: OFFICIAL_GALLERY_URL,
    size: "standard",
  },
  {
    id: "cyber-sentry-1",
    title: "Cyber Sentry Reel-Making Competition",
    category: "Projects & Competitions",
    date: "18 April 2026",
    image: `${IMG}etc/cyber1.jpeg`,
    alt: "Students and faculty gathered for a cyber security activity",
    sourceUrl: OFFICIAL_ACTIVITY_REPORTS_URL,
    size: "wide",
  },
  {
    id: "cyber-sentry-2",
    title: "Cyber Sentry — Student Participation",
    category: "Projects & Competitions",
    date: "18 April 2026",
    image: `${IMG}etc/cyber2.jpeg`,
    alt: "Student participating in a cyber security activity with a faculty member",
    sourceUrl: OFFICIAL_ACTIVITY_REPORTS_URL,
    size: "standard",
  },
  {
    id: "edsi-industry-tools-1",
    title: "Industry 4.0 Tools for AI Workshop",
    category: "Workshops",
    date: "25 March 2026",
    image: `${IMG}etc/EDSI-3.jpg`,
    alt: "Students participating in a department technical workshop",
    sourceUrl: OFFICIAL_GALLERY_URL,
    size: "standard",
  },
  {
    id: "edsi-industry-tools-2",
    title: "Hands-on Learning in the Laboratory",
    category: "Classroom & Learning",
    date: "Department learning activity",
    image: `${IMG}etc/edsi4.jpg`,
    alt: "Students and faculty in a computer laboratory",
    sourceUrl: OFFICIAL_GALLERY_URL,
    size: "standard",
  },
  {
    id: "poster-presentation",
    title: "Student Project Poster Presentation",
    category: "Projects & Competitions",
    date: "28–29 October 2025",
    image: `${IMG}etc/poster-2.jpg`,
    alt: "Students presenting a project to faculty members",
    sourceUrl: OFFICIAL_GALLERY_URL,
    size: "tall",
  },
  {
    id: "ai-research-guest-session-1",
    title: "AI-Driven Research and Innovation",
    category: "Technical Events",
    date: "28 January 2026",
    image: `${IMG}etc/chingchang1.jpeg`,
    alt: "Speaker being welcomed during a department expert session",
    sourceUrl: OFFICIAL_GALLERY_URL,
    size: "standard",
  },
  {
    id: "ai-research-guest-session-2",
    title: "AI-Driven Research — Department Participants",
    category: "Technical Events",
    date: "28 January 2026",
    image: `${IMG}etc/chingchang2.jpeg`,
    alt: "Faculty and attendees at a department expert session",
    sourceUrl: OFFICIAL_GALLERY_URL,
    size: "wide",
  },
  {
    id: "aiot-group-visit",
    title: "Educational Visit",
    category: "Classroom & Learning",
    date: "Department visit",
    image: `${IMG}AIDS/industrial-visit-1.png`,
    alt: "AI and data science students at an educational visit",
    sourceUrl: OFFICIAL_GALLERY_URL,
    size: "standard",
  },
  {
    id: "aiot-visit-centre",
    title: "Visit to a Centre of Excellence for AI",
    category: "Classroom & Learning",
    date: "Department visit",
    image: `${IMG}AIDS/industrial-visit-2.jpeg`,
    alt: "Students viewing the Centre of Excellence for Artificial Intelligence",
    sourceUrl: OFFICIAL_GALLERY_URL,
    size: "standard",
  },
];

// Mobile = 2 cols, sm = 3, lg = 4, 2xl = 5. "wide" spans 2 cols.
const TILE_CLASSES = {
  wide: "col-span-2 row-span-2",
  tall: "row-span-2",
  standard: "row-span-1",
};

/* ------------------------------------------------------------------ */
/* Image with skeleton, fade-in and graceful fallback                  */
/* ------------------------------------------------------------------ */
const GalleryImage = memo(function GalleryImage({
  src,
  alt,
  className = "",
  priority = false,
}) {
  const [status, setStatus] = useState("loading");
  const ref = useRef(null);

  useEffect(() => {
    setStatus("loading");
  }, [src]);

  // Cached images can finish loading before React attaches onLoad.
  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth > 0) setStatus("loaded");
  }, [src]);

  if (status === "failed" || !src) {
    return (
      <div
        role="img"
        aria-label={alt || "Photo unavailable"}
        className={`flex aspect-video items-center justify-center bg-surface-muted text-brand ${className}`}
      >
        <FiImage size={28} aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      ref={ref}
      src={src}
      alt={alt || "Department photo"}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onLoad={() => setStatus("loaded")}
      onError={() => setStatus("failed")}
      className={`transition-[opacity,scale] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[scale] motion-reduce:transition-none ${
        status === "loaded" ? "opacity-100" : "opacity-0"
      } ${className}`}
    />
  );
});

/* ------------------------------------------------------------------ */
/* Lightbox                                                            */
/* ------------------------------------------------------------------ */
function Lightbox({ items, index, onClose, onChange, reduceMotion }) {
  const [direction, setDirection] = useState(0);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  const count = items.length;
  const item = items[index];
  const isVideo = item?.mediaType === "video" && item?.videoUrl;
  const canNavigate = count > 1;
  const distance = reduceMotion ? 0 : 48;

  const go = useCallback(
    (delta) => {
      if (!canNavigate) return;
      setDirection(delta);
      onChange((index + delta + count) % count);
    },
    [canNavigate, count, index, onChange],
  );

  // Lock scroll, focus the close button, restore focus afterwards.
  useEffect(() => {
    const opener = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      opener?.focus?.();
    };
  }, []);

  // Keyboard: Esc, arrows, and a simple focus trap.
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") return onClose();
      if (event.key === "ArrowRight") return go(1);
      if (event.key === "ArrowLeft") return go(-1);

      if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll(
          "button, a[href], video[controls]",
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [go, onClose]);

  // Preload neighbours so next/prev feels instant.
  useEffect(() => {
    if (!canNavigate) return;
    [1, -1].forEach((delta) => {
      const neighbour = items[(index + delta + count) % count];
      if (neighbour?.image) new Image().src = neighbour.image;
    });
  }, [canNavigate, count, index, items]);

  const handleBackdrop = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  const slide = {
    enter: (d) => ({
      opacity: 0,
      x: d * distance,
      scale: reduceMotion ? 1 : 0.98,
    }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (d) => ({
      opacity: 0,
      x: d * -distance,
      scale: reduceMotion ? 1 : 0.98,
    }),
  };

  const arrowClass =
    "absolute top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-on-brand/25 bg-foreground/60 text-on-brand transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:h-12 sm:w-12";

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.22, ease: EASE }}
      onMouseDown={handleBackdrop}
      className="fixed inset-0 z-[100] flex flex-col bg-foreground/95 pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]"
    >
      {/* Top bar: counter + visible close button */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <p
          className="text-sm font-medium tabular-nums text-on-brand/70"
          aria-live="polite"
        >
          {index + 1} / {count}
        </p>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close viewer"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-brand px-4 text-sm font-semibold text-on-brand transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <FiX size={18} aria-hidden="true" />
          Close
        </button>
      </div>

      {/* Media */}
      <div
        onMouseDown={handleBackdrop}
        className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-20"
      >
        {canNavigate && (
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous"
            className={`${arrowClass} left-2 sm:left-5`}
          >
            <FiChevronLeft size={22} aria-hidden="true" />
          </button>
        )}

        <div className="relative h-full w-full max-w-6xl">
          <AnimatePresence initial={false} mode="popLayout" custom={direction}>
            <motion.div
              key={item.id}
              custom={direction}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: reduceMotion ? 0 : 0.32, ease: EASE }}
              drag={canNavigate && !isVideo ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info) => {
                const swiped =
                  Math.abs(info.offset.x) > 80 ||
                  Math.abs(info.velocity.x) > 500;
                if (swiped) go(info.offset.x < 0 ? 1 : -1);
              }}
              className="h-full w-full touch-pan-y"
            >
              {isVideo ? (
                <video
                  controls
                  autoPlay
                  playsInline
                  poster={item.image || undefined}
                  className="h-full w-full rounded-lg bg-foreground object-contain"
                >
                  <source
                    src={item.videoUrl}
                    type={item.videoMimeType || "video/mp4"}
                  />
                </video>
              ) : (
                <GalleryImage
                  src={item.image}
                  alt={item.alt || item.title}
                  priority
                  className="h-full w-full select-none rounded-lg object-contain"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {canNavigate && (
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next"
            className={`${arrowClass} right-2 sm:right-5`}
          >
            <FiChevronRight size={22} aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Caption */}
      <div className="px-4 pb-4 pt-3 text-center sm:pb-6">
        <p className="mx-auto line-clamp-2 max-w-3xl text-sm font-semibold text-on-brand sm:text-base">
          {item.title}
        </p>
        {item.date && (
          <p className="mt-1 text-xs text-on-brand/70 sm:text-sm">
            {item.date}
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Tile                                                                */
/* ------------------------------------------------------------------ */
const Tile = memo(function Tile({ item, index, onOpen, reduceMotion }) {
  const isVideo = item.mediaType === "video";
  const tileSize = TILE_CLASSES[item.size] || TILE_CLASSES.standard;
  const isWide = item.size === "wide";

  return (
    <motion.button
      type="button"
      layout={reduceMotion ? false : "position"}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
      exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.4,
        delay: reduceMotion ? 0 : Math.min((index % 8) * 0.04, 0.24),
        ease: EASE,
      }}
      onClick={() => onOpen(index)}
      aria-label={`Open ${isVideo ? "video" : "photo"}: ${item.title}`}
      className={`group relative min-w-0 overflow-hidden rounded-xl border border-border bg-surface-muted text-left transition-[border-color,box-shadow,scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-brand/40 hover:shadow-card active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand motion-reduce:transition-none ${tileSize}`}
    >
      {isVideo && !item.image ? (
        <div className="absolute inset-0 bg-brand-dark" />
      ) : (
        <GalleryImage
          src={item.image}
          alt={item.alt || item.title}
          className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 motion-reduce:group-hover:scale-100"
        />
      )}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/0 to-foreground/0"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-foreground/0 opacity-0 transition-opacity duration-500 ease-out group-hover:bg-foreground/25 group-hover:opacity-100 motion-reduce:transition-none"
      />

      {isVideo && (
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-on-brand shadow-card transition-transform duration-300 group-hover:scale-110"
        >
          <FiPlay size={18} />
        </span>
      )}

      <p
        className={`absolute inset-x-0 bottom-0 line-clamp-2 translate-y-1 p-3 text-xs font-semibold leading-5 text-on-brand transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 motion-reduce:transition-none sm:p-4 sm:text-sm ${
          isWide ? "lg:text-base lg:leading-6" : ""
        }`}
      >
        {item.title}
      </p>
    </motion.button>
  );
});

/* ------------------------------------------------------------------ */
/* Gallery                                                             */
/* ------------------------------------------------------------------ */
export default function PhotoVideoGallery({
  items = DEFAULT_GALLERY_ITEMS,
  title = "Gallery",
  description = "Events, workshops and projects.",
}) {
  const reduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState(null);

  const categories = useMemo(() => {
    const values = [
      ...new Set(items.map((item) => item.category).filter(Boolean)),
    ].filter((value) => value !== "Videos");
    const result = ["All", ...values];
    if (items.some((item) => item.mediaType === "video")) result.push("Videos");
    return result;
  }, [items]);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return items;
    if (activeCategory === "Videos") {
      return items.filter((item) => item.mediaType === "video");
    }
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  const openLightbox = useCallback((index) => setActiveIndex(index), []);
  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  return (
    <section
      id="photo-video-gallery"
      aria-labelledby="photo-video-gallery-title"
      className="bg-background py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 2xl:px-12">
        {/* Header */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <h2
              id="photo-video-gallery-title"
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              {title}
            </h2>
            <p className="mt-2 text-sm text-muted sm:text-base">
              {description}
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm font-semibold">
            <a
              href={OFFICIAL_ACTIVITY_REPORTS_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 text-muted transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              Reports
              <FiArrowUpRight size={15} aria-hidden="true" />
            </a>
            <a
              href={OFFICIAL_GALLERY_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-border bg-surface px-4 text-foreground transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              Archive
              <FiArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="mb-5 flex items-center justify-between gap-4 sm:mb-6">
          <div
            role="group"
            aria-label="Filter by category"
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((category) => {
              const selected = activeCategory === category;

              return (
                <button
                  type="button"
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={selected}
                  className={`relative min-h-10 shrink-0 rounded-full border px-4 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:text-sm ${
                    selected
                      ? "border-brand text-on-brand"
                      : "border-border bg-surface text-muted hover:border-brand/40 hover:text-brand"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="gallery-active-chip"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { duration: 0.35, ease: EASE }
                      }
                      className="absolute inset-0 rounded-full bg-brand"
                    />
                  )}
                  <span className="relative">{category}</span>
                </button>
              );
            })}
          </div>

          <p
            className="hidden shrink-0 text-sm font-medium tabular-nums text-muted sm:block"
            aria-live="polite"
          >
            {filteredItems.length}
            <span className="sr-only"> items</span>
          </p>
        </div>

        {/* Grid */}
        {filteredItems.length > 0 ? (
          <motion.div
            layout={reduceMotion ? false : "position"}
            className="grid grid-flow-dense auto-rows-[34vw] grid-cols-2 gap-2.5 sm:auto-rows-[22vw] sm:grid-cols-3 sm:gap-4 lg:auto-rows-[165px] lg:grid-cols-4 lg:gap-5 xl:auto-rows-[185px] 2xl:auto-rows-[190px] 2xl:grid-cols-5"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredItems.map((item, index) => (
                <Tile
                  key={item.id || `${item.title}-${index}`}
                  item={item}
                  index={index}
                  onOpen={openLightbox}
                  reduceMotion={reduceMotion}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border-strong bg-surface-muted px-5 py-12 text-center sm:py-16">
            <FiImage
              size={28}
              aria-hidden="true"
              className="mx-auto text-brand"
            />
            <p className="mt-3 text-base font-bold text-foreground">
              Nothing here yet
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory("All")}
              className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-brand px-5 text-sm font-semibold text-on-brand transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              Show all
            </button>
          </div>
        )}
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {activeIndex !== null && filteredItems[activeIndex] && (
              <Lightbox
                key="gallery-lightbox"
                items={filteredItems}
                index={activeIndex}
                onClose={closeLightbox}
                onChange={setActiveIndex}
                reduceMotion={reduceMotion}
              />
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
