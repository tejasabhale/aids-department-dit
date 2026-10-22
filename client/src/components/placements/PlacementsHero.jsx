import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  FiArrowUpRight,
  FiBookOpen,
  FiBriefcase,
  FiChevronLeft,
  FiChevronRight,
  FiTrendingUp,
} from "react-icons/fi";

const EASE = [0.22, 1, 0.36, 1];
const AUTOPLAY_DELAY = 4000;
const FALLBACK_IMAGE =
  "https://engg.dypvp.edu.in/images/placement/Placement-photo/new1/image13.jpg";

const DEFAULT_SLIDES = [
  {
    id: "hd-hyundai",
    src: "https://engg.dypvp.edu.in/images/placement/Placement-photo/new1/HD.jpg",
    alt: "Students attending a company placement presentation at the institute",
    caption: "HD Hyundai Construction Equipment",
  },
  {
    id: "hsbc",
    src: "https://engg.dypvp.edu.in/images/placement/Placement-photo/new1/HSBC.jpg",
    alt: "Company representative speaking with students during a campus session",
    caption: "HSBC",
  },
  {
    id: "ibm",
    src: "https://engg.dypvp.edu.in/images/placement/Placement-photo/new1/IBM.jpg",
    alt: "Students gathered in the institute auditorium for a company session",
    caption: "IBM",
  },
  {
    id: "jll",
    src: "https://engg.dypvp.edu.in/images/placement/Placement-photo/new1/JLL.jpg",
    alt: "Students attending a company presentation in a classroom",
    caption: "JLL",
  },
  {
    id: "ksb",
    src: "https://engg.dypvp.edu.in/images/placement/Placement-photo/new1/KSB.jpg",
    alt: "Students watching a company presentation on a classroom screen",
    caption: "KSB",
  },
  {
    id: "lloyds-group",
    src: "https://engg.dypvp.edu.in/images/placement/Placement-photo/new1/Lloyds-Group.jpg",
    alt: "Students seated during a professional company session",
    caption: "Lloyd's Group",
  },
  {
    id: "nielseniq",
    src: "https://engg.dypvp.edu.in/images/placement/Placement-photo/new1/NielsenIQ.jpg",
    alt: "Students attending a campus recruitment presentation",
    caption: "NielsenIQ",
  },
  {
    id: "publicis-sapient",
    src: "https://engg.dypvp.edu.in/images/placement/Placement-photo/new1/image11.jpg",
    alt: "Company presentation in the institute auditorium",
    caption: "Publicis Sapient",
  },
  {
    id: "placement-presentation",
    src: FALLBACK_IMAGE,
    alt: "Students attending a campus placement presentation",
    caption: "Campus placement presentation",
  },
];

const PLACEMENT_LINKS = [
  {
    label: "Placement Statistics",
    href: "#placement-statistics",
    Icon: FiTrendingUp,
  },
  {
    label: "Recruiters",
    href: "#recruiters",
    Icon: FiBriefcase,
  },
  {
    label: "Career Preparation",
    href: "#career-preparation",
    Icon: FiBookOpen,
  },
];

export default function PlacementsHero({
  slides = DEFAULT_SLIDES,
  imageSrc,
  imageAlt = "Students attending a campus placement session at DYPIT Pimpri",
  title = "From Campus to Career",
  description = "Industry exposure, career preparation, and opportunities to connect with recruiters.",
}) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState({});
  const [fallbackFailed, setFallbackFailed] = useState(false);

  const carouselSlides = useMemo(
    () =>
      imageSrc
        ? [
            {
              id: "custom-placement-image",
              src: imageSrc,
              alt: imageAlt,
              caption: "Campus placements",
            },
            ...slides.filter((slide) => slide.src !== imageSrc),
          ]
        : slides,
    [imageSrc, imageAlt, slides],
  );
  const safeSlides = carouselSlides.length ? carouselSlides : DEFAULT_SLIDES;
  const currentIndex = activeIndex % safeSlides.length;
  const currentSlide = safeSlides[currentIndex];
  const imageHasFailed = Boolean(failedImages[currentSlide.src]);
  const displayedSrc = imageHasFailed ? FALLBACK_IMAGE : currentSlide.src;
  const shouldShowImage = !(imageHasFailed && fallbackFailed);

  useEffect(() => {
    if (reduceMotion || safeSlides.length < 2) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % safeSlides.length);
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(timer);
  }, [reduceMotion, safeSlides.length, currentIndex]);

  // Preload only the next slide so the crossfade does not reveal an empty frame.
  useEffect(() => {
    if (safeSlides.length < 2) return undefined;
    const nextSlide = safeSlides[(currentIndex + 1) % safeSlides.length];
    if (!nextSlide?.src || failedImages[nextSlide.src]) return undefined;

    const preload = new window.Image();
    preload.src = nextSlide.src;
    return () => {
      preload.onload = null;
      preload.onerror = null;
    };
  }, [currentIndex, safeSlides, failedImages]);

  const goToSlide = (index) => {
    setActiveIndex((index + safeSlides.length) % safeSlides.length);
  };

  const handleImageError = (src) => {
    if (src === FALLBACK_IMAGE) {
      setFallbackFailed(true);
      setFailedImages((previous) => ({
        ...previous,
        [currentSlide.src]: true,
      }));
      return;
    }
    setFailedImages((previous) => ({ ...previous, [currentSlide.src]: true }));
  };

  return (
    <section
      aria-label="Placements at the AI and Data Science department"
      className="relative isolate w-full overflow-hidden bg-foreground"
      style={{ height: "100svh", backgroundColor: "var(--color-foreground)" }}
    >
      {/* Crossfading photo layers */}
      <div
        className="absolute inset-0"
        aria-label="Campus placement photographs"
        aria-roledescription="carousel"
      >
        {shouldShowImage ? (
          <AnimatePresence initial={false} mode="sync">
            <motion.img
              key={currentSlide.id}
              src={displayedSrc}
              alt={currentSlide.alt || imageAlt}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              initial={reduceMotion ? false : { opacity: 0, scale: 1.045 }}
              animate={{ opacity: 1, scale: reduceMotion ? 1 : 1.015 }}
              exit={
                reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.025 }
              }
              transition={{
                opacity: {
                  duration: reduceMotion ? 0 : 1.15,
                  ease: "easeInOut",
                },
                scale: {
                  duration: reduceMotion ? 0 : AUTOPLAY_DELAY / 1000,
                  ease: "linear",
                },
              }}
              onError={() => handleImageError(displayedSrc)}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </AnimatePresence>
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-brand-dark via-foreground to-foreground"
          />
        )}

        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, color-mix(in srgb, var(--color-foreground) 86%, transparent) 0%, color-mix(in srgb, var(--color-foreground) 68%, transparent) 40%, color-mix(in srgb, var(--color-foreground) 22%, transparent) 100%), linear-gradient(0deg, color-mix(in srgb, var(--color-foreground) 84%, transparent) 0%, transparent 53%, color-mix(in srgb, var(--color-foreground) 30%, transparent) 100%), linear-gradient(120deg, color-mix(in srgb, var(--color-brand-dark) 28%, transparent), transparent 58%)",
          }}
        />
      </div>

      <div className="relative z-20 mx-auto flex h-full w-full max-w-none flex-col px-4 pb-4 pt-5 sm:px-7 sm:pb-6 sm:pt-6 lg:px-12 lg:pb-7 lg:pt-8 xl:px-16">
        {/* Small department marker and unobtrusive carousel controls */}
        <div className="flex shrink-0 items-center justify-between gap-3">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="flex items-center gap-3"
          >
            <span
              aria-hidden="true"
              className="h-2 w-2 shrink-0 rounded-full bg-gold"
            />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-brand/90 sm:text-xs">
                AI &amp; Data Science
              </p>
              <p className="mt-0.5 text-xs text-on-brand/65 sm:text-sm">
                Training &amp; placements
              </p>
            </div>
          </motion.div>

          {safeSlides.length > 1 && (
            <div className="flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                onClick={() => goToSlide(currentIndex - 1)}
                aria-label="Previous placement photograph"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-on-brand/35 bg-foreground/25 text-on-brand backdrop-blur-sm transition-[background-color,border-color,color] duration-300 hover:border-gold hover:bg-foreground/50 hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:transition-none sm:h-10 sm:w-10"
              >
                <FiChevronLeft size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => goToSlide(currentIndex + 1)}
                aria-label="Next placement photograph"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-on-brand/35 bg-foreground/25 text-on-brand backdrop-blur-sm transition-[background-color,border-color,color] duration-300 hover:border-gold hover:bg-foreground/50 hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:transition-none sm:h-10 sm:w-10"
              >
                <FiChevronRight size={18} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        {/* Editorial text alignment: left aligned, centered within the viewport */}
        <div className="flex min-h-0 flex-1 items-center py-5 sm:py-8">
          <motion.div
            initial={
              reduceMotion ? false : { opacity: 0, y: 22, filter: "blur(5px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: reduceMotion ? 0 : 0.9,
              delay: reduceMotion ? 0 : 0.12,
              ease: EASE,
            }}
            className="w-full max-w-4xl -translate-y-1 sm:-translate-y-2"
          >
            <p
              className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.16em] sm:mb-3 sm:text-[11px]"
              style={{ color: "var(--color-brand-light)" }}
            >
              Building professional futures
            </p>

            <h1
              id="placements-hero-title"
              className="max-w-[13ch] text-balance text-4xl font-bold leading-[1.02] tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem]"
            >
              {title === "From Campus to Career" ? (
                <>
                  <span style={{ color: "var(--color-on-brand)" }}>
                    From Campus
                  </span>
                  <br />
                  <span style={{ color: "var(--color-gold)" }}>to Career</span>
                </>
              ) : (
                <span style={{ color: "var(--color-on-brand)" }}>{title}</span>
              )}
            </h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.65,
                delay: reduceMotion ? 0 : 0.24,
                ease: EASE,
              }}
              className="mt-3 max-w-md text-xs leading-5 sm:mt-4 sm:text-sm sm:leading-6 lg:text-base lg:leading-7"
              style={{
                color:
                  "color-mix(in srgb, var(--color-on-brand) 86%, transparent)",
              }}
            >
              {description}
            </motion.p>
          </motion.div>
        </div>

        {/* Caption and section links only; no breadcrumb or CTA buttons */}
        <div className="shrink-0">
          <div className="mb-3 flex items-center justify-between gap-4 sm:mb-4">
            <motion.p
              key={currentSlide.id + "-caption"}
              initial={reduceMotion ? false : { opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE }}
              className="min-w-0 truncate text-[10px] font-medium tracking-wide sm:text-xs"
              style={{
                color:
                  "color-mix(in srgb, var(--color-on-brand) 78%, transparent)",
              }}
              aria-live="off"
            >
              {currentSlide.caption}
            </motion.p>

            <div
              className="flex shrink-0 items-center gap-1.5"
              aria-label={`Photograph ${currentIndex + 1} of ${safeSlides.length}`}
            >
              {safeSlides.map((slide, index) => (
                <button
                  key={slide.id || slide.src}
                  type="button"
                  onClick={() => goToSlide(index)}
                  aria-label={`Show photograph ${index + 1}: ${slide.caption}`}
                  aria-current={index === currentIndex ? "true" : undefined}
                  className={`h-1.5 rounded-full transition-[width,background-color] duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:transition-none ${
                    index === currentIndex
                      ? "w-6 bg-gold"
                      : "w-1.5 bg-on-brand/55 hover:bg-on-brand"
                  }`}
                />
              ))}
            </div>
          </div>

          <nav
            aria-label="Placement page sections"
            className="border-t border-on-brand/20 pt-3 sm:pt-4"
          >
            <ul className="grid grid-cols-3 gap-2 sm:gap-3">
              {PLACEMENT_LINKS.map(({ label, href, Icon }, index) => (
                <motion.li
                  key={href}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.55,
                    delay: reduceMotion ? 0 : 0.18 + index * 0.08,
                    ease: EASE,
                  }}
                >
                  <a
                    href={href}
                    className="group/link flex min-h-11 items-center justify-between gap-2 rounded-md border border-on-brand/20 px-2.5 py-2.5 text-[10px] font-semibold leading-tight text-on-brand/90 backdrop-blur-sm transition-[background-color,border-color,color] duration-300 hover:border-gold/70 hover:bg-foreground/35 hover:text-on-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:transition-none sm:min-h-[50px] sm:px-4 sm:text-sm"
                    style={{
                      backgroundColor:
                        "color-mix(in srgb, var(--color-foreground) 28%, transparent)",
                    }}
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <Icon
                        size={16}
                        aria-hidden="true"
                        className="shrink-0"
                        style={{ color: "var(--color-gold)" }}
                      />
                      <span className="min-w-0">{label}</span>
                    </span>
                    <FiArrowUpRight
                      size={14}
                      aria-hidden="true"
                      className="hidden shrink-0 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 sm:block motion-reduce:transition-none"
                    />
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
