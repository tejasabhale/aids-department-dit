import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

/* logo  = primary source (Simple Icons, brand color)
   domain = used for the fallback logo source (company favicon) */
const COMPANIES = [
  {
    name: "Tata Consultancy Services",
    shortName: "TCS",
    logo: "https://cdn.simpleicons.org/tcs/486AAE",
    domain: "tcs.com",
    website: "https://www.tcs.com/",
  },
  {
    name: "Infosys",
    shortName: "Infosys",
    logo: "https://cdn.simpleicons.org/infosys/007CC3",
    domain: "infosys.com",
    website: "https://www.infosys.com/",
  },
  {
    name: "Accenture",
    shortName: "Accenture",
    logo: "https://cdn.simpleicons.org/accenture/A100FF",
    domain: "accenture.com",
    website: "https://www.accenture.com/",
  },
  {
    name: "Capgemini",
    shortName: "Capgemini",
    logo: "https://cdn.simpleicons.org/capgemini/0070AD",
    domain: "capgemini.com",
    website: "https://www.capgemini.com/",
  },
  {
    name: "Cognizant",
    shortName: "Cognizant",
    logo: "https://cdn.simpleicons.org/cognizant/1A4CA0",
    domain: "cognizant.com",
    website: "https://www.cognizant.com/",
  },
  {
    name: "Wipro",
    shortName: "Wipro",
    logo: "https://cdn.simpleicons.org/wipro/341C53",
    domain: "wipro.com",
    website: "https://www.wipro.com/",
  },
  {
    // Removed from Simple Icons, so it uses the favicon source only
    name: "Microsoft",
    shortName: "Microsoft",
    logo: null,
    domain: "microsoft.com",
    website: "https://www.microsoft.com/",
  },
  {
    name: "IBM",
    shortName: "IBM",
    logo: "https://cdn.simpleicons.org/ibm/1261FE",
    domain: "ibm.com",
    website: "https://www.ibm.com/",
  },
  {
    name: "Deloitte",
    shortName: "Deloitte",
    logo: "https://cdn.simpleicons.org/deloitte/86BC25",
    domain: "deloitte.com",
    website: "https://www.deloitte.com/",
  },
  {
    name: "Amazon",
    shortName: "Amazon",
    logo: "https://cdn.simpleicons.org/amazon/232F3E",
    domain: "amazon.com",
    website: "https://www.amazon.jobs/",
  },
  {
    name: "Google",
    shortName: "Google",
    logo: "https://cdn.simpleicons.org/google/4285F4",
    domain: "google.com",
    website: "https://careers.google.com/",
  },
  {
    name: "NVIDIA",
    shortName: "NVIDIA",
    logo: "https://cdn.simpleicons.org/nvidia/76B900",
    domain: "nvidia.com",
    website: "https://www.nvidia.com/",
  },
];

/* Tries each source in order, then falls back to the company name */
function getLogoSources(company) {
  return [
    company.logo,
    `https://www.google.com/s2/favicons?domain=${company.domain}&sz=128`,
  ].filter(Boolean);
}

function CompanyLogo({ company }) {
  const sources = getLogoSources(company);
  const [index, setIndex] = useState(0);

  if (index >= sources.length) {
    return <span className="recruiter-logo-fallback">{company.shortName}</span>;
  }

  return (
    <img
      key={sources[index]}
      src={sources[index]}
      alt={`${company.name} logo`}
      loading="eager"
      decoding="async"
      draggable="false"
      onError={() => setIndex((i) => i + 1)}
      className="recruiter-company-logo"
    />
  );
}

function CompanyCard({ company, duplicate = false }) {
  return (
    <a
      href={company.website}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={duplicate ? -1 : 0}
      aria-label={`Visit ${company.name} website (opens in a new tab)`}
      className="recruiter-company-card group"
    >
      <span aria-hidden="true" className="recruiter-card-accent" />

      <span className="recruiter-logo-frame">
        <CompanyLogo company={company} />
      </span>

      <span className="recruiter-company-name">{company.name}</span>

      <FiArrowUpRight
        aria-hidden="true"
        className="recruiter-card-link-icon"
        size={15}
      />
    </a>
  );
}

export default function RecruitersCarousel() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="recruiters-title"
      className="recruiters-section relative isolate w-full overflow-hidden border-y border-border bg-background py-14 sm:py-16 lg:py-20"
    >
      <style>{`
        .recruiters-section {
          --recruiter-card-width: 188px;
          --recruiter-card-gap: 16px;
        }

        .recruiters-marquee {
          width: 100%;
          overflow: hidden;
          mask-image: linear-gradient(
            to right,
            transparent,
            var(--color-foreground) 5%,
            var(--color-foreground) 95%,
            transparent
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            var(--color-foreground) 5%,
            var(--color-foreground) 95%,
            transparent
          );
        }

        .recruiters-track {
          display: flex;
          width: max-content;
          animation: recruiters-infinite-scroll 48s linear infinite;
          will-change: transform;
        }

        .recruiters-marquee:hover .recruiters-track,
        .recruiters-marquee:focus-within .recruiters-track {
          animation-play-state: paused;
        }

        .recruiters-track.is-static {
          animation: none;
          will-change: auto;
        }

        .recruiters-group {
          display: flex;
          flex: 0 0 auto;
          gap: var(--recruiter-card-gap);
          padding-right: var(--recruiter-card-gap);
        }

        .recruiters-group > div {
          flex: 0 0 auto;
        }

        .recruiter-company-card {
          position: relative;
          display: flex;
          width: var(--recruiter-card-width);
          height: 148px;
          flex: 0 0 var(--recruiter-card-width);
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border: 1px solid var(--color-border);
          border-radius: 14px;
          background: var(--color-surface);
          padding: 18px 14px 16px;
          text-align: center;
          text-decoration: none;
          transition:
            border-color 320ms ease,
            background-color 320ms ease,
            box-shadow 320ms ease;
        }

        .recruiter-company-card:hover {
          border-color: var(--color-gold);
          background: var(--color-surface-muted);
          box-shadow: var(--shadow-soft);
        }

        .recruiter-company-card:focus-visible {
          outline: 2px solid var(--color-gold);
          outline-offset: 4px;
        }

        .recruiter-card-accent {
          position: absolute;
          inset: 0 auto auto 0;
          width: 100%;
          height: 3px;
          background: var(--color-gold);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .recruiter-company-card:hover .recruiter-card-accent,
        .recruiter-company-card:focus-visible .recruiter-card-accent {
          transform: scaleX(1);
        }

        .recruiter-logo-frame {
          display: flex;
          width: 100%;
          height: 70px;
          align-items: center;
          justify-content: center;
        }

        /* Fixed width and height so SVG logos with no intrinsic size
           can never collapse to 0px. object-fit keeps the proportions. */
        .recruiter-company-logo {
          display: block;
          width: 78%;
          height: 48px;
          object-fit: contain;
          object-position: center;
          transition: filter 300ms ease;
        }

        .recruiter-company-card:hover .recruiter-company-logo {
          filter: saturate(1.08);
        }

        .recruiter-logo-fallback {
          display: inline-flex;
          min-height: 40px;
          max-width: 90%;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: var(--color-brand-light);
          padding: 8px 12px;
          color: var(--color-brand);
          font-size: 13px;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .recruiter-company-name {
          max-width: 100%;
          margin-top: 10px;
          overflow: hidden;
          color: var(--color-foreground);
          font-size: 12px;
          font-weight: 600;
          line-height: 1.35;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .recruiter-card-link-icon {
          position: absolute;
          right: 10px;
          bottom: 10px;
          color: var(--color-muted);
          opacity: 0;
          transition: color 250ms ease, opacity 250ms ease;
        }

        .recruiter-company-card:hover .recruiter-card-link-icon,
        .recruiter-company-card:focus-visible .recruiter-card-link-icon {
          color: var(--color-brand);
          opacity: 1;
        }

        @keyframes recruiters-infinite-scroll {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @media (min-width: 640px) {
          .recruiters-section {
            --recruiter-card-width: 205px;
            --recruiter-card-gap: 18px;
          }

          .recruiter-company-card {
            height: 158px;
          }

          .recruiter-logo-frame {
            height: 78px;
          }

          .recruiter-company-logo {
            height: 52px;
          }

          .recruiter-company-name {
            font-size: 13px;
          }
        }

        @media (min-width: 1280px) {
          .recruiters-section {
            --recruiter-card-width: 218px;
            --recruiter-card-gap: 20px;
          }

          .recruiter-company-card {
            height: 164px;
          }

          .recruiter-logo-frame {
            height: 82px;
          }

          .recruiter-company-logo {
            height: 56px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .recruiters-track {
            animation: none !important;
          }

          .recruiter-company-card,
          .recruiter-card-accent,
          .recruiter-company-logo,
          .recruiter-card-link-icon {
            transition: none !important;
          }
        }
      `}</style>

      {/* Subtle background pattern */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        viewBox="0 0 1440 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle
          cx="1280"
          cy="42"
          r="220"
          fill="var(--color-brand-light)"
          opacity="0.55"
        />

        <circle
          cx="100"
          cy="575"
          r="185"
          fill="var(--color-gold-light)"
          opacity="0.65"
        />

        <g
          fill="none"
          stroke="var(--color-border-strong)"
          strokeWidth="1.3"
          opacity="0.5"
        >
          <path d="M-100 190 C180 135 400 235 680 180 S1190 135 1540 190" />
          <path d="M-100 225 C180 170 400 270 680 215 S1190 170 1540 225" />
        </g>

        <g fill="var(--color-gold)" opacity="0.38">
          {Array.from({ length: 18 }, (_, i) => (
            <circle
              key={i}
              cx={55 + (i % 6) * 30}
              cy={390 + Math.floor(i / 6) * 30}
              r="2"
            />
          ))}
        </g>
      </svg>

      <div className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 2xl:px-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            <h2
              id="recruiters-title"
              className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Recruiting <span className="text-brand">Companies</span>
            </h2>

            <span
              aria-hidden="true"
              className="mt-4 block h-[3px] w-14 rounded-full bg-gold"
            />
          </div>

          <p className="max-w-sm text-sm leading-6 text-muted sm:text-right">
            Technology, consulting, cloud and data.
          </p>
        </motion.div>

        <div
          className="recruiters-marquee"
          style={
            reduceMotion
              ? {
                  overflowX: "auto",
                  maskImage: "none",
                  WebkitMaskImage: "none",
                }
              : undefined
          }
          role="region"
          aria-roledescription="carousel"
          aria-label="Recruiting company logos"
        >
          <div
            className={`recruiters-track ${reduceMotion ? "is-static" : ""}`}
          >
            <div
              className="recruiters-group"
              role="list"
              aria-label="Companies"
            >
              {COMPANIES.map((company) => (
                <div key={company.name} role="listitem">
                  <CompanyCard company={company} />
                </div>
              ))}
            </div>

            {!reduceMotion && (
              <div className="recruiters-group" role="list" aria-hidden="true">
                {COMPANIES.map((company) => (
                  <div key={`duplicate-${company.name}`} role="listitem">
                    <CompanyCard company={company} duplicate />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <p className="text-xs text-muted">
            Hover or focus to pause the motion.
          </p>

          <span
            className="h-px w-12 shrink-0 bg-border-strong sm:w-20"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
