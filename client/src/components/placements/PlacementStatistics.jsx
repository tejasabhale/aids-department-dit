import { motion, useReducedMotion } from "framer-motion";
import {
  FiArrowUpRight,
  FiAward,
  FiBarChart2,
  FiCalendar,
  FiDollarSign,
  FiUsers,
} from "react-icons/fi";

const EASE = [0.22, 1, 0.36, 1];

const OFFICIAL_DISCLOSURE_URL =
  "https://engg.dypvp.edu.in/DownloadS3File.aspx?file=Mandatory-Disclosure-2026";
const DEPARTMENT_PLACEMENTS_URL =
  "https://engg.dypvp.edu.in/artificial-intelligence-and-data-science-placements.aspx";

// Verified institute figures for AY 2024–25. Metrics not published by the
// cited sources remain unavailable instead of being inferred.
const DEFAULT_STATISTICS = {
  academicYear: "2024–25",
  batchLabel: "AI & Data Science",
  metrics: [
    {
      id: "eligible",
      label: "Eligible students",
      value: null,
      displayValue: "Not published",
      note: "The cited disclosure does not provide an eligible-student count.",
      Icon: FiUsers,
      kind: "count",
    },
    {
      id: "placed",
      label: "Students placed",
      value: 227,
      displayValue: "227",
      note: "Campus placements reported for this academic year.",
      Icon: FiUsers,
      kind: "count",
    },
    {
      id: "placement-rate",
      label: "Placement rate",
      value: null,
      displayValue: "Not published",
      note: "Cannot be calculated reliably without the eligible-student count.",
      Icon: FiBarChart2,
      kind: "percentage",
    },
    {
      id: "highest",
      label: "Highest package",
      value: 45,
      displayValue: "₹45 LPA*",
      note: "Maximum reported in the institute's mandatory disclosure.",
      Icon: FiAward,
      kind: "salary",
    },
    {
      id: "average",
      label: "Average package",
      value: 5,
      displayValue: "₹5 LPA",
      note: "Average package figure reported by the institute.",
      Icon: FiDollarSign,
      kind: "salary",
    },
    {
      id: "median",
      label: "Median package",
      value: null,
      displayValue: "Not published",
      note: "No median package is provided in the cited disclosure.",
      Icon: FiBarChart2,
      kind: "salary",
    },
  ],
  minimumPackage: 4,
  sourceLabel: "Institute mandatory disclosure",
  sourceUrl: OFFICIAL_DISCLOSURE_URL,
  verificationNote:
    "The institute's mandatory disclosure reports ₹45 LPA as the maximum, while the department's individual 2024–25 placement list shows an off-campus offer of ₹36 LPA as the highest clearly displayed entry. Confirm the maximum with the placement cell before publishing.",
};

const PRIMARY_METRIC_IDS = ["placed", "highest", "average"];

function MetricValue({ metric, featured = false }) {
  const unavailable = metric.value === null || metric.value === undefined;

  return (
    <>
      <p
        className={`mt-5 font-semibold leading-none tracking-tight tabular-nums ${
          unavailable
            ? "text-lg text-muted sm:text-xl"
            : featured
              ? "text-4xl text-foreground sm:text-5xl"
              : "text-3xl text-foreground sm:text-4xl"
        }`}
      >
        {metric.displayValue ?? String(metric.value)}
      </p>
      {metric.kind === "salary" && !unavailable && (
        <p className="mt-2 text-xs font-medium text-brand">
          Reported package · lakhs per annum
        </p>
      )}
    </>
  );
}

function PrimaryMetricCard({ metric, index, reduceMotion }) {
  const Icon = metric.Icon || FiBarChart2;
  const featured = metric.id === "highest";

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.42,
        delay: reduceMotion ? 0 : index * 0.06,
        ease: EASE,
      }}
      className={`relative flex min-h-[190px] flex-col overflow-hidden rounded-xl border p-5 transition-colors duration-300 sm:min-h-[205px] sm:p-6 ${
        featured
          ? "border-brand/25 bg-brand-light/45"
          : "border-border bg-background hover:border-brand/30"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium leading-5 text-muted sm:text-[15px]">
          {metric.label}
        </p>
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
            featured ? "bg-brand text-on-brand" : "bg-surface-muted text-brand"
          }`}
        >
          <Icon size={17} aria-hidden="true" />
        </span>
      </div>

      <MetricValue metric={metric} featured={featured} />
      <p className="mt-auto pt-4 text-xs leading-5 text-muted">{metric.note}</p>
    </motion.article>
  );
}

function SupportingMetric({ metric, index, reduceMotion }) {
  const Icon = metric.Icon || FiBarChart2;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.35,
        delay: reduceMotion ? 0 : index * 0.05,
        ease: EASE,
      }}
      className="flex min-w-0 items-start gap-3 border-t border-border py-4 sm:px-3"
    >
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-brand">
        <Icon size={16} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{metric.label}</p>
        <p className="mt-1 text-sm font-semibold text-muted">
          {metric.displayValue ??
            (metric.value == null ? "Not published" : String(metric.value))}
        </p>
        <p className="mt-1 text-xs leading-5 text-muted">{metric.note}</p>
      </div>
    </motion.div>
  );
}

export default function PlacementStatistics({
  statistics = DEFAULT_STATISTICS,
  title = "Placement outcomes",
  description = "Published placement figures for the AI & Data Science department, with reporting period and source details clearly identified.",
}) {
  const reduceMotion = useReducedMotion();
  const metrics = statistics.metrics ?? [];
  const primaryMetrics = PRIMARY_METRIC_IDS.map((id) =>
    metrics.find((metric) => metric.id === id),
  ).filter(Boolean);
  const supportingMetrics = metrics.filter(
    (metric) => !PRIMARY_METRIC_IDS.includes(metric.id),
  );

  return (
    <section
      id="placement-statistics"
      aria-labelledby="placement-statistics-title"
      className="relative isolate overflow-hidden bg-surface-muted py-12 sm:py-14 lg:py-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-brand-light/55 blur-3xl"
      />

      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 2xl:px-12">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="mb-7 flex flex-col gap-4 border-b border-border pb-6 sm:mb-8 sm:pb-7 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <p className="mb-2 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-brand sm:text-xs">
              <span aria-hidden="true" className="h-px w-6 bg-gold" />
              Placement statistics
            </p>
            <h2
              id="placement-statistics-title"
              className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]"
            >
              {title}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted sm:leading-7">
              {description}
            </p>
          </div>
        </motion.header>

        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-sm font-semibold text-foreground sm:text-base">
            {statistics.batchLabel}
          </h3>
          <p className="text-xs text-muted">
            Figures as reported by the institute
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 min-[520px]:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {primaryMetrics.map((metric, index) => (
            <PrimaryMetricCard
              key={metric.id}
              metric={metric}
              index={index}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
