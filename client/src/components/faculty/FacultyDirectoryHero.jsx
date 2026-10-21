import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { FiChevronRight, FiHome, FiSearch, FiUsers, FiX } from "react-icons/fi";

const EASE = [0.22, 1, 0.36, 1];

// Photo by Vitaly Gariev on Unsplash (free under the Unsplash License).
// Swap for a real photo of your department via the imageSrc prop when you have one.
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1758270704296-a59b8f4e7dda?fm=jpg&q=70&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0";
const DEFAULT_ALT =
  "A professor lecturing to students in a university lecture hall";

/**
 * Compact faculty directory header.
 *
 * Props:
 * - facultyCount: optional verified faculty count. Omit when unverified.
 * - searchTerm: optional controlled search value.
 * - onSearchChange: optional callback called whenever the search changes.
 * - imageSrc: optional hero image URL. Falls back to a simple icon badge if it fails to load.
 * - imageAlt: alt text for the image. Leave empty if purely decorative.
 */
export default function FacultyDirectoryHero({
  facultyCount,
  searchTerm,
  onSearchChange,
  imageSrc = DEFAULT_IMAGE,
  imageAlt = DEFAULT_ALT,
}) {
  const [internalSearch, setInternalSearch] = useState("");
  const [imageFailed, setImageFailed] = useState(false);
  const reduceMotion = useReducedMotion();
  const isControlled = typeof searchTerm === "string";
  const searchValue = isControlled ? searchTerm : internalSearch;

  const handleSearchChange = (event) => {
    const nextValue = event.target.value;
    if (!isControlled) setInternalSearch(nextValue);
    onSearchChange?.(nextValue);
  };

  const clearSearch = () => {
    if (!isControlled) setInternalSearch("");
    onSearchChange?.("");
  };

  return (
    <section
      aria-labelledby="faculty-directory-title"
      className="relative isolate w-full overflow-hidden border-b border-border bg-surface-muted"
    >
      {/* Quiet maroon-and-gold pattern, consistent with the rest of the site. */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        viewBox="0 0 1440 430"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle
          cx="1320"
          cy="25"
          r="215"
          fill="var(--color-brand-light)"
          opacity="0.58"
        />
        <circle
          cx="95"
          cy="420"
          r="155"
          fill="var(--color-gold-light)"
          opacity="0.58"
        />
        <g
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="1"
          opacity="0.045"
        >
          <path d="M-100 135 C190 80 410 185 700 130 S1200 80 1540 135" />
          <path d="M-100 165 C190 110 410 215 700 160 S1200 110 1540 165" />
        </g>
      </svg>

      <div className="mx-auto grid w-full max-w-[1500px] grid-cols-1 items-center gap-7 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12 lg:px-8 lg:py-12 2xl:px-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="min-w-0"
        >
          <div className="mb-3 flex items-center gap-3">
            <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-gold" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand sm:text-xs">
              People behind the learning
            </span>
            <span
              aria-hidden="true"
              className="h-px w-10 bg-border-strong sm:w-16"
            />
          </div>

          <div className="flex flex-wrap items-end gap-x-5 gap-y-2">
            <h1
              id="faculty-directory-title"
              className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Our Faculty<span className="text-brand">.</span>
            </h1>

            {Number.isFinite(facultyCount) && facultyCount >= 0 && (
              <div className="mb-1 inline-flex items-center gap-2 rounded-full border border-border bg-surface/85 px-3 py-1.5 text-xs font-semibold text-muted">
                <FiUsers size={14} className="text-brand" aria-hidden="true" />
                <span>
                  {facultyCount}{" "}
                  {facultyCount === 1 ? "faculty member" : "faculty members"}
                </span>
              </div>
            )}
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">
            Meet the academic team guiding learning, research, and innovation in
            Artificial Intelligence and Data Science.
          </p>

          <div className="mt-6 max-w-xl">
            <label
              htmlFor="faculty-search"
              className="mb-2 block text-xs font-semibold text-foreground sm:text-sm"
            >
              Find a faculty member
            </label>
            <div className="group flex min-h-12 items-center gap-3 rounded-xl border border-border-strong bg-surface px-4 transition-[border-color,box-shadow] duration-300 focus-within:border-brand focus-within:shadow-[0_0_0_3px_rgb(178_43_47_/_8%)]">
              <FiSearch
                size={18}
                aria-hidden="true"
                className="shrink-0 text-muted transition-colors duration-200 group-focus-within:text-brand"
              />
              <input
                id="faculty-search"
                type="search"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Search by name, designation, or research area"
                autoComplete="off"
                className="min-w-0 flex-1 border-0 bg-transparent py-3 text-sm text-foreground outline-none placeholder:text-muted/75 focus:border-0 focus:outline-none focus:ring-0"
              />
              {searchValue && (
                <button
                  type="button"
                  onClick={clearSearch}
                  aria-label="Clear faculty search"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted transition-colors duration-200 hover:bg-brand-light hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:transition-none"
                >
                  <FiX size={15} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Right side: framed photo, with an icon badge as fallback. */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 12 }}
          animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          transition={{
            duration: 0.6,
            delay: reduceMotion ? 0 : 0.08,
            ease: EASE,
          }}
          className="relative hidden lg:block"
        >
          {imageSrc && !imageFailed ? (
            <div className="relative h-64 w-72 xl:h-80 xl:w-96">
              {/* Offset gold frame */}
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] border border-gold/60"
              />
              <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-border bg-surface shadow-soft">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  loading="eager"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={() => setImageFailed(true)}
                  className="h-full w-full object-cover"
                />
                {/* Soft maroon tint to blend with the site palette */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-brand/25 via-transparent to-transparent"
                />
              </div>
              <span
                aria-hidden="true"
                className="absolute -left-2 -top-2 h-4 w-4 rotate-45 bg-gold"
              />
            </div>
          ) : (
            <div
              aria-hidden="true"
              className="relative flex h-44 w-44 items-center justify-center"
            >
              <div className="absolute inset-2 rounded-full border border-brand/15" />
              <div className="absolute inset-6 rounded-full border border-dashed border-gold/45" />
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-brand/10 bg-surface text-brand shadow-soft">
                <FiUsers size={38} strokeWidth={1.25} />
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
