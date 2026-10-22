import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiArrowUpRight,
  FiAward,
  FiCalendar,
  FiChevronRight,
  FiClock,
  FiExternalLink,
  FiMapPin,
} from "react-icons/fi";

const EASE = [0.22, 1, 0.36, 1];
const OFFICIAL_EVENTS_URL =
  "https://engg.dypvp.edu.in/AIDS-activities-and-events.aspx";
const OFFICIAL_ACTIVITIES_URL =
  "https://engg.dypvp.edu.in/artificial-intelligence-and-data-science-activity.aspx";
const FALLBACK_IMAGE =
  "https://engg.dypvp.edu.in/images/AI/AI-activities/data-science-event/Hackathon-1.jpg";

// Sample event history based on the department's published activities.
// Replace image URLs with locally hosted, approved department photographs when possible.
const DEFAULT_EVENTS = [
  {
    id: "nlp-research-directions-2026",
    title: "Emerging Research Directions in Natural Language Processing",
    type: "Expert session",
    dateStart: "2026-08-21",
    dateLabel: "21 August 2026 · 10:30 AM",
    description:
      "An expert session for third-year students exploring emerging research directions in Natural Language Processing.",
    image:
      "https://engg.dypvp.edu.in/img/activities/etc/Expert_Session_99.jpeg",
    imageAlt: "Students attending an expert session in a lecture room",
    detailsUrl: OFFICIAL_EVENTS_URL,
  },
  {
    id: "aiot-workshop-2026",
    title: "AIoT: Building Intelligent Connected Systems",
    type: "Hands-on workshop",
    dateStart: "2026-08-07",
    dateLabel: "7–8 August 2026",
    description:
      "A two-day practical workshop introducing third-year students to Artificial Intelligence of Things and connected intelligent systems.",
    image: "https://engg.dypvp.edu.in/img/activities/etc/Engineering_TE-1.webp",
    imageAlt:
      "Engineering students taking part in a hands-on technical activity",
    detailsUrl: OFFICIAL_EVENTS_URL,
  },
  {
    id: "ai-engineering-bootcamp-2026",
    title:
      "AI Engineering Bootcamp: Building, Deploying, and Scaling AI Solutions",
    type: "Training programme",
    dateStart: "2026-08-06",
    dateLabel: "6–7 August 2026",
    description:
      "A two-day AI training programme for third-year students focused on the engineering lifecycle of AI solutions.",
    image: "https://engg.dypvp.edu.in/img/activities/sdp/sdp-4.webp",
    imageAlt:
      "Students participating in a technical training session in a computer laboratory",
    detailsUrl: OFFICIAL_EVENTS_URL,
  },
  {
    id: "cyber-shield-2026",
    title: "Cyber Shield",
    type: "Guest lecture",
    dateStart: "2026-04-20",
    dateLabel: "20 April 2026",
    description:
      "A guest lecture exploring cyber awareness and digital security for students.",
    image: "https://engg.dypvp.edu.in/img/activities/etc/jyo3.jpg",
    imageAlt: "Guest speaker presenting a digital security topic to students",
    detailsUrl: OFFICIAL_ACTIVITIES_URL,
  },
  {
    id: "gate-awareness-2026",
    title: "Awareness of the GATE Examination",
    type: "Expert session",
    dateStart: "2026-04-17",
    dateLabel: "17 April 2026",
    description:
      "An awareness session for second-year students covering the GATE examination and higher-study preparation.",
    image: "https://engg.dypvp.edu.in/img/activities/AIDS/gate-exam-1.jpeg",
    imageAlt:
      "An instructor addressing students during an academic information session",
    detailsUrl: OFFICIAL_EVENTS_URL,
  },
];

function formatDate(dateStart) {
  if (!dateStart) return "Date to be announced";

  const date = new Date(`${dateStart}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateStart;

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function EventImage({ src, alt, className = "" }) {
  const [hasError, setHasError] = useState(false);

  return (
    <img
      src={hasError ? FALLBACK_IMAGE : src || FALLBACK_IMAGE}
      alt={alt || "Department event"}
      loading="lazy"
      decoding="async"
      onError={() => {
        if (!hasError) setHasError(true);
      }}
      className={className}
    />
  );
}

function EventType({ children }) {
  return (
    <span className="inline-flex w-fit items-center rounded-full border border-brand/15 bg-brand-light px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-brand sm:text-[11px]">
      {children}
    </span>
  );
}

function UpcomingEventSpotlight({ event, reduceMotion }) {
  if (!event) {
    return (
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative isolate overflow-hidden rounded-2xl border border-border bg-surface-muted"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 -z-10 h-64 w-64 rounded-full bg-gold-light/70 blur-3xl"
        />
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex min-h-64 flex-col justify-between bg-brand p-6 text-on-brand sm:p-8 lg:p-10">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.17em] text-on-brand/80">
              <FiCalendar size={16} aria-hidden="true" />
              Upcoming spotlight
            </div>
            <div className="mt-10">
              <span className="inline-flex items-center rounded-full border border-on-brand/25 bg-on-brand/10 px-3 py-1.5 text-xs font-semibold text-on-brand">
                Schedule to be announced
              </span>
              <h3 className="mt-4 max-w-md text-3xl font-bold leading-tight text-on-brand tracking-tight sm:text-4xl">
                What’s next?
              </h3>
              <p className="mt-3 max-w-md text-sm leading-7 text-on-brand/85 sm:text-base">
                The next confirmed department event will appear here once its
                date and details are published.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start justify-center p-6 sm:p-8 lg:p-10">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/40 bg-gold-light text-gold-dark">
              <FiAward size={22} aria-hidden="true" />
            </span>
            <h4 className="mt-5 text-xl font-bold text-foreground sm:text-2xl">
              Keep an eye on the department calendar
            </h4>
            <p className="mt-3 max-w-xl text-sm leading-7 text-muted sm:text-base">
              Check the official Activities &amp; Events page for newly
              announced workshops, guest lectures, competitions, and seminars.
              No future-dated event is prefilled in this component.
            </p>
            <a
              href={OFFICIAL_EVENTS_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-on-brand transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:transition-none"
            >
              Check official updates
              <FiArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="overflow-hidden rounded-2xl border border-border bg-surface"
    >
      <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative min-h-64 overflow-hidden bg-surface-muted sm:min-h-80 lg:min-h-[430px]">
          <EventImage
            src={event.image}
            alt={event.imageAlt || event.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-foreground/10"
          />
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3 sm:bottom-6 sm:left-6 sm:right-6">
            <EventType>{event.type || "Department event"}</EventType>
            <span className="rounded-full border border-on-brand/25 bg-foreground/40 px-3 py-1.5 text-xs font-semibold text-on-brand backdrop-blur-sm">
              Featured event
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-brand">
            <span aria-hidden="true" className="h-px w-7 bg-gold" />
            Upcoming event
          </p>
          <h3 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
            {event.title}
          </h3>
          {event.description && (
            <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
              {event.description}
            </p>
          )}
          <div className="mt-6 space-y-3 border-y border-border py-5 text-sm text-muted">
            <p className="flex items-start gap-3">
              <FiCalendar
                size={17}
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-brand"
              />
              <span>{event.dateLabel || formatDate(event.dateStart)}</span>
            </p>
            {event.time && (
              <p className="flex items-start gap-3">
                <FiClock
                  size={17}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-brand"
                />
                <span>{event.time}</span>
              </p>
            )}
            {event.venue && (
              <p className="flex items-start gap-3">
                <FiMapPin
                  size={17}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-brand"
                />
                <span>{event.venue}</span>
              </p>
            )}
          </div>
          {event.detailsUrl && (
            <a
              href={event.detailsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-on-brand transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:transition-none"
            >
              View event details
              <FiArrowUpRight size={17} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function EventCard({ event, index, reduceMotion }) {
  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.4,
        delay: reduceMotion ? 0 : Math.min(index * 0.05, 0.2),
        ease: EASE,
      }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-300 hover:border-brand/35 motion-reduce:transition-none"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-muted">
        <EventImage
          src={event.image}
          alt={event.imageAlt || event.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-foreground/45 via-transparent to-transparent"
        />
        <span className="absolute left-4 top-4 rounded-full border border-on-brand/30 bg-foreground/45 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-on-brand backdrop-blur-sm">
          {event.type}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="flex items-center gap-2 text-xs font-semibold text-brand">
          <FiCalendar size={14} aria-hidden="true" />
          {event.dateLabel || formatDate(event.dateStart)}
        </p>

        <h3 className="mt-3 text-lg font-bold leading-snug tracking-tight text-foreground sm:text-xl">
          {event.title}
        </h3>

        {event.description && (
          <p className="mt-3 text-sm leading-6 text-muted">
            {event.description}
          </p>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border pt-5">
          {event.detailsUrl && (
            <a
              href={event.detailsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-8 items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              Event details
              <FiArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}
          {event.resultsUrl && (
            <a
              href={event.resultsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-8 items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              Results
              <FiExternalLink size={14} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function EventsActivities({
  events = DEFAULT_EVENTS,
  featuredEvent = null,
  title = "Ideas in action.",
  description = "Explore the workshops, expert sessions, competitions, training programmes, and student activities that connect classroom learning with real-world practice.",
}) {
  const reduceMotion = useReducedMotion();

  const sortedEvents = useMemo(
    () =>
      [...events].sort((a, b) => {
        const dateA = new Date(a.dateStart || "1970-01-01").getTime();
        const dateB = new Date(b.dateStart || "1970-01-01").getTime();
        return dateB - dateA;
      }),
    [events],
  );

  return (
    <section
      id="student-events"
      aria-labelledby="events-activities-title"
      className="relative isolate overflow-hidden bg-background py-14 sm:py-16 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 top-10 -z-10 h-80 w-80 rounded-full bg-brand-light/55 blur-3xl"
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
              Events &amp; activities
            </p>
            <h2
              id="events-activities-title"
              className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              {title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
              {description}
            </p>
          </div>

          <a
            href={OFFICIAL_EVENTS_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-lg border border-border bg-surface px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:self-auto"
          >
            All official activities
            <FiArrowUpRight size={16} aria-hidden="true" />
          </a>
        </motion.div>

        <div className="mb-12 sm:mb-14">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-7 w-1 rounded-full bg-gold" />
            <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Featured upcoming event
            </h3>
          </div>
          <UpcomingEventSpotlight
            event={featuredEvent}
            reduceMotion={reduceMotion}
          />
        </div>

        <div>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand">
                From the department
              </p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Event archive
              </h3>
            </div>
            <p className="text-sm text-muted">
              {sortedEvents.length} published events · Newest first
            </p>
          </div>

          {sortedEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {sortedEvents.map((event, index) => (
                <EventCard
                  key={event.id ?? `${event.dateStart}-${event.title}`}
                  event={event}
                  index={index}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border-strong bg-surface-muted px-5 py-12 text-center sm:px-10">
              <FiCalendar
                size={26}
                aria-hidden="true"
                className="mx-auto text-brand"
              />
              <h4 className="mt-4 text-lg font-bold text-foreground">
                Events will appear here
              </h4>
              <p className="mt-2 text-sm text-muted">
                Add verified department events to the events prop to populate
                this archive.
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <a
            href={OFFICIAL_ACTIVITIES_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          >
            View activity reports
            <FiChevronRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
