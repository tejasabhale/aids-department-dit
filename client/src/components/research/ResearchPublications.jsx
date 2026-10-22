import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiBookOpen,
  FiDownload,
  FiExternalLink,
  FiSearch,
  FiX,
} from "react-icons/fi";

/*
 * DEMONSTRATION RECORDS ONLY.
 * Replace these entries with verified department publications before publishing.
 * Add a DOI, publisherUrl, or pdfUrl for each record whenever available.
 */
const SAMPLE_PUBLICATIONS = [
  {
    id: "demo-1",
    title: "Sample publication title: Machine Learning for Image Analysis",
    authors: ["Faculty Author Name", "Co-author Name"],
    affiliation: "Department of Artificial Intelligence & Data Science",
    venue: "Journal or Conference Name",
    year: 2025,
    topic: "Machine Learning",
    doi: "",
    publisherUrl: "",
    pdfUrl: "",
    isSample: true,
  },
  {
    id: "demo-2",
    title: "Sample publication title: Methods for Natural Language Processing",
    authors: ["Faculty Author Name", "Research Collaborator"],
    affiliation: "Department of Artificial Intelligence & Data Science",
    venue: "Journal or Conference Name",
    year: 2024,
    topic: "Natural Language Processing",
    doi: "",
    publisherUrl: "",
    pdfUrl: "",
    isSample: true,
  },
  {
    id: "demo-3",
    title: "Sample publication title: Data-Driven Modelling and Analytics",
    authors: ["Faculty Author Name", "Student Co-author"],
    affiliation: "Department of Artificial Intelligence & Data Science",
    venue: "Journal or Conference Name",
    year: 2023,
    topic: "Data Science",
    doi: "",
    publisherUrl: "",
    pdfUrl: "",
    isSample: true,
  },
];

const EASE = [0.22, 1, 0.36, 1];

function getPaperUrl(publication) {
  if (publication.doi) {
    const doi = String(publication.doi).trim();
    return doi.startsWith("http")
      ? doi
      : `https://doi.org/${doi.replace(/^doi:\s*/i, "")}`;
  }
  return publication.publisherUrl || publication.pdfUrl || "";
}

function PublicationRow({ publication, index, reduceMotion }) {
  const paperUrl = getPaperUrl(publication);

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.42,
        delay: reduceMotion ? 0 : Math.min(index * 0.045, 0.18),
        ease: EASE,
      }}
      className="group grid min-w-0 gap-3 border-b border-border px-4 py-5 last:border-b-0 transition-colors duration-200 hover:bg-surface-muted/80 sm:px-5 lg:grid-cols-[minmax(0,1fr)_190px] lg:gap-6 lg:px-6"
    >
      <div className="min-w-0">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-md border border-brand/15 bg-brand-light px-2 py-1 text-[10px] font-semibold text-brand-dark">
            {publication.topic || "Research"}
          </span>
          <span className="text-xs font-semibold tabular-nums text-muted">
            {publication.year || "Year not listed"}
          </span>
          {publication.isSample && (
            <span className="rounded-md border border-gold/30 bg-gold-light px-2 py-1 text-[10px] font-semibold text-gold-dark">
              Sample data
            </span>
          )}
        </div>

        <h3 className="text-base font-bold leading-snug text-foreground transition-colors duration-200 group-hover:text-brand sm:text-lg">
          {publication.title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-muted">
          {(publication.authors || []).join(", ") || "Authors not listed"}
        </p>

        {publication.affiliation && (
          <p className="mt-1 text-xs leading-5 text-muted/90">
            {publication.affiliation}
          </p>
        )}

        <p className="mt-2 text-sm font-medium text-foreground/80">
          {publication.venue || "Publication venue not listed"}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-3 lg:flex-col lg:items-start lg:justify-center lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
        {publication.doi ? (
          <a
            href={getPaperUrl({ doi: publication.doi })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand transition-colors hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            DOI <FiExternalLink size={13} aria-hidden="true" />
          </a>
        ) : null}

        {publication.publisherUrl ? (
          <a
            href={publication.publisherUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand transition-colors hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            Publisher page <FiExternalLink size={13} aria-hidden="true" />
          </a>
        ) : null}

        {publication.pdfUrl ? (
          <a
            href={publication.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand transition-colors hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            PDF <FiDownload size={13} aria-hidden="true" />
          </a>
        ) : null}

        {!paperUrl && !publication.publisherUrl && !publication.pdfUrl && (
          <span className="text-xs text-muted">
            Publication link to be added
          </span>
        )}
      </div>
    </motion.article>
  );
}

export default function ResearchPublications({
  publications = SAMPLE_PUBLICATIONS,
}) {
  const [yearFilter, setYearFilter] = useState("all");
  const [topicSearch, setTopicSearch] = useState("");
  const reduceMotion = useReducedMotion();

  const safePublications = Array.isArray(publications) ? publications : [];
  const years = useMemo(
    () =>
      [
        ...new Set(safePublications.map((paper) => paper.year).filter(Boolean)),
      ].sort((a, b) => b - a),
    [safePublications],
  );

  const filteredPublications = useMemo(() => {
    const query = topicSearch.trim().toLowerCase();
    return safePublications
      .filter((paper) => {
        const matchesYear =
          yearFilter === "all" || String(paper.year) === yearFilter;
        const searchable = [
          paper.title,
          paper.topic,
          paper.venue,
          paper.affiliation,
          ...(paper.authors || []),
        ]
          .join(" ")
          .toLowerCase();
        return matchesYear && (!query || searchable.includes(query));
      })
      .sort((a, b) => (b.year || 0) - (a.year || 0));
  }, [safePublications, yearFilter, topicSearch]);

  const hasSampleRecords = filteredPublications.some((paper) => paper.isSample);

  return (
    <section
      aria-labelledby="research-publications-title"
      className="relative isolate w-full overflow-hidden border-y border-border bg-surface-muted py-12 sm:py-14 lg:py-16"
    >
      {/* Light maroon-and-gold background pattern */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle
          cx="1320"
          cy="50"
          r="210"
          fill="var(--color-brand-light)"
          opacity="0.42"
        />
        <circle
          cx="70"
          cy="750"
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

      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8 2xl:px-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-7 flex flex-col gap-5 sm:mb-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <div className="mb-3 flex items-center gap-3">
              <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand sm:text-xs">
                Research &amp; Scholarship
              </span>
              <span
                aria-hidden="true"
                className="h-px w-10 bg-border-strong sm:w-16"
              />
            </div>
            <h2
              id="research-publications-title"
              className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Research <span className="text-brand">Publications</span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">
              Browse scholarly work by publication year, topic, author, or
              venue.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-muted sm:text-sm">
            <span className="inline-flex items-center gap-2">
              <FiBookOpen size={16} className="text-brand" aria-hidden="true" />
              {filteredPublications.length}{" "}
              {filteredPublications.length === 1 ? "record" : "records"}
            </span>
          </div>
        </motion.div>

        {/* Search and year filters */}
        <div className="mb-4 flex flex-col gap-3 rounded-xl border border-border bg-surface p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
          <div className="flex min-h-11 min-w-0 flex-1 items-center gap-2.5 rounded-lg border border-border-strong bg-surface px-3.5 transition-colors duration-200 focus-within:border-brand">
            <FiSearch
              size={17}
              aria-hidden="true"
              className="shrink-0 text-muted"
            />
            <label htmlFor="publication-topic-search" className="sr-only">
              Search publications by topic, title, author, or venue
            </label>
            <input
              id="publication-topic-search"
              type="search"
              value={topicSearch}
              onChange={(event) => setTopicSearch(event.target.value)}
              placeholder="Search title, topic, author, or journal"
              className="min-w-0 flex-1 border-0 bg-transparent py-2 text-sm text-foreground outline-none placeholder:text-muted/75 focus:border-0 focus:outline-none focus:ring-0"
            />
            {topicSearch && (
              <button
                type="button"
                onClick={() => setTopicSearch("")}
                aria-label="Clear publication search"
                className="rounded p-1 text-muted hover:text-brand focus-visible:outline-2 focus-visible:outline-gold"
              >
                <FiX size={15} aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 sm:shrink-0">
            <label
              htmlFor="publication-year-filter"
              className="text-xs font-semibold text-foreground"
            >
              Year
            </label>
            <select
              id="publication-year-filter"
              value={yearFilter}
              onChange={(event) => setYearFilter(event.target.value)}
              className="min-h-11 min-w-32 flex-1 rounded-lg border border-border-strong bg-surface px-3 py-2 text-sm text-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/10 sm:flex-none"
            >
              <option value="all">All years</option>
              {years.map((year) => (
                <option key={year} value={String(year)}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {hasSampleRecords && (
          <div className="mb-4 border-l-2 border-gold bg-gold-light/70 px-4 py-3 text-xs leading-5 text-gold-dark">
            These are demonstration records, not verified publications. Replace
            them with official titles, authors, venues, years, and paper links
            before publishing.
          </div>
        )}

        {/* Plain publication list, not decorative cards */}
        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          <div className="hidden grid-cols-[minmax(0,1fr)_190px] items-center border-b border-border bg-surface-muted px-6 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-muted lg:grid">
            <span>Publication details</span>
            <span className="border-l border-border pl-5">Paper links</span>
          </div>

          {filteredPublications.length > 0 ? (
            <div>
              {filteredPublications.map((publication, index) => (
                <PublicationRow
                  key={
                    publication.id ||
                    `${publication.title}-${publication.year}-${index}`
                  }
                  publication={publication}
                  index={index}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          ) : (
            <div className="px-5 py-12 text-center sm:py-16">
              <FiBookOpen
                size={25}
                aria-hidden="true"
                className="mx-auto text-brand/60"
              />
              <h3 className="mt-3 text-base font-semibold text-foreground">
                No publications found
              </h3>
              <p className="mt-1 text-sm text-muted">
                Try another year or search term, or add verified publication
                records to the data source.
              </p>
              {(topicSearch || yearFilter !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setTopicSearch("");
                    setYearFilter("all");
                  }}
                  className="mt-4 text-sm font-semibold text-brand hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
