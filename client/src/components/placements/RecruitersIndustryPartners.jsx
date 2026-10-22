import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiArrowUpRight,
  FiBriefcase,
  FiCheckCircle,
  FiExternalLink,
  FiGlobe,
  FiBookOpen,
  FiUsers,
} from "react-icons/fi";

const EASE = [0.22, 1, 0.36, 1];

const OFFICIAL_PLACEMENTS_URL =
  "https://engg.dypvp.edu.in/artificial-intelligence-and-data-science-placements.aspx";
const DEPARTMENT_MOU_URL = "https://engg.dypvp.edu.in/AI-List-of-MoU.aspx";
const INSTITUTE_INDUSTRY_URL =
  "https://engg.dypvp.edu.in/major-industrial-interactions.aspx";

// Official company domains used as a logo fallback when a brand mark is not
// available in Simple Icons. Google serves each site's favicon; failed sources
// are skipped before the monogram fallback is shown.
const COMPANY_LOGO_SLUGS = {
  Infosys: "infosys",
  Airtel: "airtel",
  HSBC: "hsbc",
  "Cognizant GenC": "cognizant",
  "LTI Mindtree": "ltimindtree",
  Capgemini: "capgemini",
  IBM: "ibm",
  "Tech Mahindra": "techmahindra",
  "EY GDS": "ey",
  UKG: "ukg",
  "Merkle (Dentsu company)": "dentsu",
  "Marico India Limited": "marico",
  Cognizant: "cognizant",
  MindTree: "ltimindtree",
  Zensar: "zensar",
  Persistent: "persistent",
  "Tata Communications": "tatacommunications",
  "Atlas Copco": "atlascopco",
  Faurecia: "forvia",
  "Vishay Components": "vishay",
};

const COMPANY_DOMAINS = {
  "EdgeVerve (Infosys company)": "edgeverve.com",
  "ACA Global": "acaglobal.com",
  Infosys: "infosys.com",
  Airtel: "airtel.in",
  HSBC: "hsbc.com",
  "Cognizant GenC": "cognizant.com",
  "LTI Mindtree": "ltimindtree.com",
  Capgemini: "capgemini.com",
  IBM: "ibm.com",
  "Tech Mahindra": "techmahindra.com",
  "EY GDS": "ey.com",
  UKG: "ukg.com",
  Vistex: "vistex.com",
  "Avaali Solutions": "avaali.com",
  Mindsprint: "mindsprint.com",
  "Merkle (Dentsu company)": "merkle.com",
  "Forma.ai": "forma.ai",
  "Mahindra Comviva": "comviva.com",
  "Marico India Limited": "marico.com",
  "MASS Technologies": "masstechnologies.co.in",
  "Pixaflip Technologies Pvt. Ltd.": "pixaflip.com",
  "Stellariant Technologies": "stellariant.com",
  Cognizant: "cognizant.com",
  MindTree: "ltimindtree.com",
  Zensar: "zensar.com",
  Persistent: "persistent.com",
  Synechron: "synechron.com",
  "Tata Communications": "tatacommunications.com",
  KPIT: "kpit.com",
  "Atlas Copco": "atlascopco.com",
  "Sigma Electric": "sigmaelectric.com",
  "Kirloskar Pneumatics": "kirloskarpneumatic.com",
  Faurecia: "forvia.com",
  "Vishay Components": "vishay.com",
  "CII Pune": "cii.in",
  "Infostretch Solutions": "infostretch.com",
  "Arise Vishwa Society": "arisevishwasociety.org",
};

const PARTNER_GROUPS = [
  {
    id: "recruiters",
    label: "Recruiters",
    shortLabel: "Recruiters",
    heading: "Companies in placement records",
    description:
      "These companies are named in the department’s published 2024–25 student placement list with an in-campus placement designation.",
    sourceLabel: "Department placement records",
    sourceUrl: OFFICIAL_PLACEMENTS_URL,
    Icon: FiBriefcase,
    note: "This is a selection of names from the published list, not a complete recruiter directory or a promise of future recruitment.",
    partners: [
      {
        name: "EdgeVerve (Infosys company)",
        relation: "In-campus placement · AY 2024–25",
      },
      {
        name: "ACA Global",
        relation: "In-campus placement · AY 2024–25",
      },
      {
        name: "Infosys",
        logoSlug: "infosys",
        relation: "In-campus placement · AY 2024–25",
      },
      {
        name: "Airtel",
        logoSlug: "airtel",
        relation: "In-campus placement · AY 2024–25",
      },
      {
        name: "HSBC",
        logoSlug: "hsbc",
        relation: "In-campus placement · AY 2024–25",
      },
      {
        name: "Cognizant GenC",
        logoSlug: "cognizant",
        relation: "In-campus placement · AY 2024–25",
      },
      {
        name: "LTI Mindtree",
        logoSlug: "ltimindtree",
        relation: "In-campus placement · AY 2024–25",
      },
      {
        name: "Capgemini",
        logoSlug: "capgemini",
        relation: "In-campus placement · AY 2024–25",
      },
      {
        name: "IBM",
        logoSlug: "ibm",
        relation: "In-campus placement · AY 2024–25",
      },
      {
        name: "Tech Mahindra",
        logoSlug: "techmahindra",
        relation: "In-campus placement · AY 2024–25",
      },
      {
        name: "EY GDS",
        logoSlug: "ey",
        relation: "In-campus placement · AY 2024–25",
      },
      {
        name: "UKG",
        logoSlug: "ukg",
        relation: "In-campus placement · AY 2024–25",
      },
      {
        name: "Vistex",
        relation: "In-campus placement · AY 2024–25",
      },
      {
        name: "Avaali Solutions",
        relation: "In-campus placement · AY 2024–25",
      },
      {
        name: "Mindsprint",
        relation: "In-campus placement · AY 2024–25",
      },
    ],
  },
  {
    id: "internships",
    label: "Internship & stipend",
    shortLabel: "Internships",
    heading: "Internship and stipend entries",
    description:
      "These names appear in the department’s placement list with an internship label or a stated stipend amount.",
    sourceLabel: "Department placement records",
    sourceUrl: OFFICIAL_PLACEMENTS_URL,
    Icon: FiBookOpen,
    note: "Amounts are reproduced as shown in the source. The page does not specify a payment period for every stipend entry.",
    partners: [
      {
        name: "ACA Global",
        relation: "Explicitly labelled “Internship” in the 2026 batch list",
      },
      {
        name: "Merkle (Dentsu company)",
        logoSlug: "dentsu",
        relation: "Stipend recorded: ₹20,000",
      },
      {
        name: "Forma.ai",
        relation: "Stipend recorded: ₹40,000",
      },
      {
        name: "Mahindra Comviva",
        relation: "Stipend recorded: ₹25,000",
      },
      {
        name: "Marico India Limited",
        logoSlug: "marico",
        relation: "Stipend recorded: ₹25,000 · AY 2024–25",
      },
    ],
  },
  {
    id: "training",
    label: "Training & MoUs",
    shortLabel: "Training partners",
    heading: "Department MoU and training partners",
    description:
      "The department lists these organisations under industry interactions and MoUs for AI, machine learning, and data science.",
    sourceLabel: "AI & DS MoU details",
    sourceUrl: DEPARTMENT_MOU_URL,
    Icon: FiBookOpen,
    note: "The published MoU description refers to technical training, lab development, sessions, internships, projects, and faculty development; it does not imply that every partner recruits students.",
    partners: [
      {
        name: "MASS Technologies",
        relation: "Department MoU / industry interaction",
      },
      {
        name: "Pixaflip Technologies Pvt. Ltd.",
        relation: "Department MoU; expert session held on 16 February 2026",
      },
      {
        name: "Stellariant Technologies",
        relation: "Department MoU / industry interaction",
      },
    ],
  },
  {
    id: "industry",
    label: "Industry collaborators",
    shortLabel: "Collaborators",
    heading: "Institute-wide industry interactions",
    description:
      "The institute’s industrial-interactions page describes these organisations in connection with activities such as expert lectures, student training, projects, and industry programmes.",
    sourceLabel: "Institute industrial interactions",
    sourceUrl: INSTITUTE_INDUSTRY_URL,
    Icon: FiGlobe,
    note: "These are institute-wide interaction records. A company may also appear in the department placement list; this category describes the separately documented interaction, not a recruitment claim.",
    partners: [
      {
        name: "Cognizant",
        logoSlug: "cognizant",
        relation: "Expert lectures",
      },
      {
        name: "MindTree",
        relation: "Faculty enrichment and expert lectures",
      },
      {
        name: "Capgemini",
        logoSlug: "capgemini",
        relation: "Tech-fest participation, expert lectures, and FDPs",
      },
      {
        name: "Tech Mahindra",
        logoSlug: "techmahindra",
        relation: "Campus Connect programme",
      },
      {
        name: "Zensar",
        logoSlug: "zensar",
        relation: "Employability skills development programme",
      },
      {
        name: "Persistent",
        logoSlug: "persistent",
        relation: "Project support and industrial visits",
      },
      {
        name: "Synechron",
        relation: "Student training and guest lectures",
      },
      {
        name: "Tata Communications",
        logoSlug: "tatacommunications",
        relation: "Train-and-hire model for French language",
      },
      {
        name: "KPIT",
        relation: "Student training and Sparkle event",
      },
      {
        name: "Atlas Copco",
        logoSlug: "atlascopco",
        relation: "Expert lectures",
      },
      {
        name: "Sigma Electric",
        relation: "Finishing-school soft-skills training",
      },
      {
        name: "Kirloskar Pneumatics",
        relation: "Faculty development programme",
      },
      {
        name: "Faurecia",
        relation: "Guest lectures and faculty participation",
      },
      {
        name: "Vishay Components",
        relation: "Faculty development programme",
      },
      {
        name: "CII Pune",
        relation: "Industry interface and finishing-school activities",
      },
      {
        name: "Infostretch Solutions",
        relation: "Expert lectures and faculty development",
      },
    ],
  },
  {
    id: "community",
    label: "Community partners",
    shortLabel: "Community",
    heading: "Community and internship collaboration",
    description:
      "A separate view of community organisations mentioned in department activities, rather than company recruiters.",
    sourceLabel: "Department MoU details",
    sourceUrl: DEPARTMENT_MOU_URL,
    Icon: FiUsers,
    note: "Arise Vishwa Society is described in the department’s record as an MoU and internship-programme-talk collaboration with the ByteMinds student club.",
    partners: [
      {
        name: "Arise Vishwa Society",
        relation: "MoU and internship programme talk · 24 December 2024",
      },
    ],
  },
];

function getInitials(name = "") {
  return name
    .replace(/\(.*?\)/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function PartnerLogo({ partner }) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const domain = partner.domain || COMPANY_DOMAINS[partner.name];

  const logoSlug = partner.logoSlug || COMPANY_LOGO_SLUGS[partner.name];
  const logoSources = [
    partner.logoUrl,
    logoSlug ? `https://cdn.simpleicons.org/${logoSlug}` : null,
    domain
      ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
      : null,
    domain ? `https://icon.horse/icon/${domain}` : null,
  ].filter(Boolean);

  const currentSource = logoSources[sourceIndex];

  if (!currentSource) {
    return (
      <div
        aria-label={`${partner.name} logo unavailable`}
        role="img"
        className="flex h-12 w-full items-center justify-center sm:h-14"
      >
        <span className="flex h-10 min-w-10 items-center justify-center rounded-lg border border-brand/15 bg-brand-light px-2 text-sm font-bold tracking-wide text-brand">
          {getInitials(partner.name)}
        </span>
      </div>
    );
  }

  return (
    <div className="flex h-12 w-full items-center justify-center px-3 sm:h-14 sm:px-4">
      <img
        src={currentSource}
        alt={`${partner.name} logo`}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setSourceIndex((index) => index + 1)}
        className="max-h-9 max-w-[150px] object-contain transition-transform duration-300 ease-out group-hover:scale-[1.06] motion-reduce:transition-none sm:max-h-10"
      />
    </div>
  );
}

function PartnerCard({ partner, index, reduceMotion }) {
  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      whileTap={reduceMotion ? undefined : { y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.32,
        delay: reduceMotion ? 0 : Math.min(index * 0.025, 0.15),
        ease: EASE,
      }}
      className="group relative flex min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-surface p-3 transition-[border-color,background-color] duration-300 hover:border-brand/45 hover:bg-surface sm:p-4 motion-reduce:transition-none"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-400 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
      />

      <div className="flex min-h-[72px] items-center justify-center rounded-lg border border-transparent bg-surface-muted/70 px-2 transition-[background-color,border-color] duration-300 group-hover:border-brand/10 group-hover:bg-brand-light/45 motion-reduce:transition-none">
        <PartnerLogo partner={partner} />
      </div>

      <h4 className="mt-3 text-sm font-semibold leading-5 text-foreground transition-colors duration-300 group-hover:text-brand sm:text-[15px] motion-reduce:transition-none">
        {partner.name}
      </h4>

      <p className="mt-1.5 text-xs leading-5 text-muted">{partner.relation}</p>

      <div
        aria-hidden="true"
        className="mt-3 h-px w-7 bg-gold/70 transition-[width,background-color] duration-300 group-hover:w-12 group-hover:bg-brand motion-reduce:transition-none"
      />
    </motion.article>
  );
}

export default function RecruitersIndustryPartners() {
  const reduceMotion = useReducedMotion();
  const [activeGroupId, setActiveGroupId] = useState("recruiters");
  const activeGroup =
    PARTNER_GROUPS.find((group) => group.id === activeGroupId) ??
    PARTNER_GROUPS[0];
  const GroupIcon = activeGroup.Icon;

  return (
    <section
      id="recruiters"
      aria-labelledby="recruiters-industry-title"
      className="relative isolate overflow-hidden bg-surface-muted py-14 sm:py-16 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-20 -z-10 h-72 w-72 rounded-full bg-brand-light/55 blur-3xl"
      />

      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 2xl:px-12">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.48, ease: EASE }}
          className="mb-8 flex flex-col gap-5 border-b border-border pb-7 sm:mb-9 sm:pb-8 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.17em] text-brand sm:text-sm">
              <span aria-hidden="true" className="h-px w-7 bg-gold" />
              Recruiters &amp; industry partners
            </p>

            <h2
              id="recruiters-industry-title"
              className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Connections with purpose.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
              Explore the companies named in department placement records and
              the separate organisations involved in training, MoUs, and
              industry interaction.
            </p>
          </div>

          <a
            href={OFFICIAL_PLACEMENTS_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:self-auto"
          >
            Official placement list
            <FiArrowUpRight size={16} aria-hidden="true" />
          </a>
        </motion.header>

        <div
          role="tablist"
          aria-label="Partner relationship categories"
          className="mb-6 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:thin]"
        >
          {PARTNER_GROUPS.map((group) => {
            const isActive = group.id === activeGroupId;
            const Icon = group.Icon;

            return (
              <button
                key={group.id}
                id={`partner-tab-${group.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="partner-directory-panel"
                onClick={() => setActiveGroupId(group.id)}
                onKeyDown={(event) => {
                  const tabs = Array.from(
                    event.currentTarget.parentElement.querySelectorAll(
                      '[role="tab"]',
                    ),
                  );
                  const currentPosition = tabs.indexOf(event.currentTarget);
                  let nextPosition = currentPosition;

                  if (event.key === "ArrowRight") {
                    nextPosition = (currentPosition + 1) % tabs.length;
                  } else if (event.key === "ArrowLeft") {
                    nextPosition =
                      (currentPosition - 1 + tabs.length) % tabs.length;
                  } else if (event.key === "Home") {
                    nextPosition = 0;
                  } else if (event.key === "End") {
                    nextPosition = tabs.length - 1;
                  } else {
                    return;
                  }

                  event.preventDefault();
                  const nextTab = tabs[nextPosition];
                  setActiveGroupId(nextTab.id.replace("partner-tab-", ""));
                  nextTab.focus();
                }}
                className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-lg border px-3.5 py-2.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:text-sm ${
                  isActive
                    ? "border-brand bg-brand text-on-brand"
                    : "border-border bg-surface text-muted hover:border-brand/40 hover:text-brand"
                }`}
              >
                <Icon size={15} aria-hidden="true" />
                {group.shortLabel}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] tabular-nums ${
                    isActive
                      ? "bg-on-brand/15 text-on-brand"
                      : "bg-surface-muted text-muted"
                  }`}
                >
                  {group.partners.length}
                </span>
              </button>
            );
          })}
        </div>

        <div
          id="partner-directory-panel"
          role="tabpanel"
          aria-labelledby={`partner-tab-${activeGroup.id}`}
          tabIndex={0}
          className="min-w-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          <motion.div
            key={activeGroup.id}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.32, ease: EASE }}
          >
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 text-brand">
                  <GroupIcon size={18} aria-hidden="true" />
                  <p className="text-xs font-bold uppercase tracking-[0.12em] sm:text-sm">
                    {activeGroup.label}
                  </p>
                </div>
                <h3 className="mt-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  {activeGroup.heading}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                  {activeGroup.description}
                </p>
              </div>

              <a
                href={activeGroup.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-9 shrink-0 items-center gap-2 self-start text-sm font-semibold text-brand transition-colors hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:self-auto"
              >
                {activeGroup.sourceLabel}
                <FiExternalLink size={14} aria-hidden="true" />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {activeGroup.partners.map((partner, index) => (
                <PartnerCard
                  key={`${activeGroup.id}-${partner.name}`}
                  partner={partner}
                  index={index}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>

            <div className="mt-5 flex items-start gap-2.5 rounded-lg border border-border bg-surface/80 px-3.5 py-3 sm:px-4">
              <FiCheckCircle
                size={16}
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-brand"
              />
              <p className="text-xs leading-5 text-muted">{activeGroup.note}</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
         
          <a
            href={INSTITUTE_INDUSTRY_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-8 shrink-0 items-center gap-2 text-xs font-semibold text-muted transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          >
            Institute industry-interaction records
            <FiArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
