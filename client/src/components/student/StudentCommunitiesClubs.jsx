import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiArrowUpRight,
  FiAward,
  FiBookOpen,
  FiCalendar,
  FiCode,
  FiCompass,
  FiSearch,
  FiUsers,
  FiX,
} from "react-icons/fi";

const EASE = [0.22, 1, 0.36, 1];
const EMPTY_GROUPS = [];

const FOCUS_ICONS = {
  coding: FiCode,
  technical: FiCode,
  learning: FiBookOpen,
  research: FiCompass,
  default: FiUsers,
};

function getFocusIcon(focusArea = "") {
  const value = focusArea.toLowerCase();
  if (
    value.includes("cod") ||
    value.includes("program") ||
    value.includes("software")
  ) {
    return FOCUS_ICONS.coding;
  }
  if (
    value.includes("learn") ||
    value.includes("peer") ||
    value.includes("study")
  ) {
    return FOCUS_ICONS.learning;
  }
  if (value.includes("research") || value.includes("innovation")) {
    return FOCUS_ICONS.research;
  }
  if (value.includes("technical") || value.includes("engineering")) {
    return FOCUS_ICONS.technical;
  }
  return FOCUS_ICONS.default;
}

function normalise(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

/**
 * Pass verified department club details through the `groups` prop.
 * Expected shape:
 * {
 *   id: string,
 *   name: string,
 *   focusArea: string,
 *   description?: string,
 *   activities?: string[],
 *   facultyCoordinator?: string,
 *   studentLeads?: string[],
 *   recentHighlights?: string[],
 *   updatedLabel?: string,
 *   href?: string
 * }
 */
export default function StudentCommunitiesClubs({
  groups = EMPTY_GROUPS,
  title = "Find your community.",
  description = "Explore the clubs, technical communities, student chapters, coding groups, and peer-learning initiatives active in the department.",
}) {
  const reduceMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFocus, setActiveFocus] = useState("All groups");

  const focusAreas = useMemo(() => {
    const values = groups
      .map((group) => group.focusArea?.trim())
      .filter(Boolean);
    return ["All groups", ...new Set(values)];
  }, [groups]);

  const filteredGroups = useMemo(() => {
    const query = normalise(searchQuery);
    return groups.filter((group) => {
      const matchesFocus =
        activeFocus === "All groups" || group.focusArea?.trim() === activeFocus;
      const searchableText = [
        group.name,
        group.focusArea,
        group.description,
        ...(group.activities ?? []),
        group.facultyCoordinator,
        ...(group.studentLeads ?? []),
        ...(group.recentHighlights ?? []),
      ]
        .filter(Boolean)
        .join(" ");
      return (
        matchesFocus && (!query || normalise(searchableText).includes(query))
      );
    });
  }, [groups, searchQuery, activeFocus]);

  const hasGroups = groups.length > 0;

  return (
    <section
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
          className="mb-8 flex flex-col gap-6 border-b border-border pb-7 sm:mb-10 sm:pb-9 lg:flex-row lg:items-end lg:justify-between"
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

          <div className="flex shrink-0 items-center gap-3 self-start rounded-xl border border-border bg-surface px-4 py-3 lg:self-auto">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-light text-brand">
              <FiUsers aria-hidden="true" size={19} />
            </span>
            <div>
              <p className="text-xl font-bold leading-none text-foreground tabular-nums">
                {groups.length.toString().padStart(2, "0")}
              </p>
              <p className="mt-1 text-xs text-muted">Verified listings</p>
            </div>
          </div>
        </motion.div>

        <div className="mb-7 space-y-4 sm:mb-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <FiSearch
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                size={18}
              />
              <label className="sr-only" htmlFor="student-community-search">
                Search groups, activities, or focus areas
              </label>
              <input
                id="student-community-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search groups, activities, focus areas..."
                className="min-h-12 w-full rounded-xl border border-border bg-surface py-3 pl-11 pr-11 text-sm text-foreground outline-none transition-colors placeholder:text-muted/80 focus:border-brand focus:ring-2 focus:ring-brand/15"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-muted hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  <FiX size={16} aria-hidden="true" />
                </button>
              )}
            </div>

            {hasGroups && (
              <p className="text-sm text-muted" aria-live="polite">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {filteredGroups.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-foreground">
                  {groups.length}
                </span>{" "}
                groups
              </p>
            )}
          </div>

          {hasGroups && focusAreas.length > 2 && (
            <div
              aria-label="Filter groups by focus area"
              className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]"
            >
              {focusAreas.map((focus) => {
                const isActive = activeFocus === focus;
                return (
                  <button
                    key={focus}
                    type="button"
                    onClick={() => setActiveFocus(focus)}
                    aria-pressed={isActive}
                    className={`min-h-9 shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:text-sm ${
                      isActive
                        ? "border-brand bg-brand text-on-brand"
                        : "border-border bg-surface text-muted hover:border-brand/50 hover:text-brand"
                    }`}
                  >
                    {focus}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {filteredGroups.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
            {filteredGroups.map((group, index) => {
              const FocusIcon = getFocusIcon(group.focusArea);
              const activities = group.activities ?? [];
              const highlights = group.recentHighlights ?? [];
              const cardContent = (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand/10 bg-brand-light text-brand transition-colors duration-300 group-hover:border-brand/20 group-hover:bg-brand group-hover:text-on-brand motion-reduce:transition-none">
                      <FocusIcon size={21} aria-hidden="true" />
                    </span>
                    {group.href && (
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-all duration-300 group-hover:border-brand group-hover:text-brand motion-reduce:transition-none">
                        <FiArrowUpRight size={17} aria-hidden="true" />
                      </span>
                    )}
                  </div>

                  <div className="mt-5">
                    {group.focusArea && (
                      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-brand">
                        {group.focusArea}
                      </p>
                    )}
                    <h3 className="text-xl font-bold leading-snug tracking-tight text-foreground sm:text-[1.35rem]">
                      {group.name}
                    </h3>
                    {group.description && (
                      <p className="mt-3 text-sm leading-6 text-muted">
                        {group.description}
                      </p>
                    )}
                  </div>

                  {activities.length > 0 && (
                    <div className="mt-5 border-t border-border pt-4">
                      <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-foreground">
                        <FiCalendar
                          size={14}
                          aria-hidden="true"
                          className="text-brand"
                        />
                        Activities
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
                  )}

                  {(group.facultyCoordinator ||
                    (group.studentLeads ?? []).length > 0) && (
                    <div className="mt-5 grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
                      {group.facultyCoordinator && (
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
                            Faculty coordinator
                          </p>
                          <p className="mt-1 break-words text-sm font-medium text-foreground">
                            {group.facultyCoordinator}
                          </p>
                        </div>
                      )}
                      {(group.studentLeads ?? []).length > 0 && (
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
                            Student leads
                          </p>
                          <p className="mt-1 break-words text-sm font-medium text-foreground">
                            {group.studentLeads.join(", ")}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {highlights.length > 0 && (
                    <div className="mt-5 rounded-lg border border-gold/30 bg-gold-light/45 p-3.5">
                      <p className="mb-2 flex items-center gap-2 text-xs font-bold text-foreground">
                        <FiAward
                          size={15}
                          aria-hidden="true"
                          className="text-gold-dark"
                        />
                        Recent highlights
                      </p>
                      <ul className="space-y-1.5">
                        {highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="text-sm leading-5 text-muted"
                          >
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {group.updatedLabel && (
                    <p className="mt-4 text-[11px] text-muted">
                      Updated: {group.updatedLabel}
                    </p>
                  )}
                </>
              );

              return (
                <motion.article
                  key={group.id ?? group.name}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.4,
                    delay: reduceMotion ? 0 : Math.min(index * 0.05, 0.2),
                    ease: EASE,
                  }}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-5 transition-colors duration-300 hover:border-brand/35 sm:p-6 motion-reduce:transition-none"
                >
                  {group.href ? (
                    <a
                      href={group.href}
                      className="flex h-full flex-col rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                      aria-label={`Learn more about ${group.name}`}
                    >
                      {cardContent}
                    </a>
                  ) : (
                    cardContent
                  )}
                </motion.article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border-strong bg-surface-muted/70 px-5 py-12 text-center sm:px-10 sm:py-16">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-brand/10 bg-brand-light text-brand">
              <FiUsers size={24} aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-lg font-bold text-foreground sm:text-xl">
              {hasGroups
                ? "No matching groups found"
                : "Community listings coming soon"}
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted sm:text-base">
              {hasGroups
                ? "Try a different search phrase or select another focus area."
                : "Verified club names, focus areas, activities, coordinators, and recent highlights will appear here once the department details are added."}
            </p>
            {hasGroups && (searchQuery || activeFocus !== "All groups") && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveFocus("All groups");
                }}
                className="mt-5 inline-flex min-h-10 items-center justify-center rounded-lg border border-brand px-4 py-2 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-on-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        <p className="mt-6 text-xs leading-5 text-muted">
          Listings should be published only after club names, leadership
          details, and highlights have been verified by the department.
        </p>
      </div>
    </section>
  );
}
