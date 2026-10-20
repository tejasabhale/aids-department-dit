import React from "react";
import { Link } from "react-router-dom";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Faculty", to: "/faculty" },
  { label: "Research", to: "/research" },
  { label: "Student Life", to: "/student-life" },
  { label: "Events", to: "/events" },
];

const academicLinks = [
  { label: "B.E. Programme", to: "/academics" },
  { label: "Syllabus", to: "/academics/syllabus" },
  { label: "Time Table", to: "/academics/timetable" },
  { label: "Labs & Facilities", to: "/academics/labs" },
  { label: "Placements", to: "/placements" },
];

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    path: "M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9.75h4V21H3zM9.75 9.75h3.83v1.54h.05c.53-1 1.84-2.06 3.78-2.06 4.04 0 4.79 2.66 4.79 6.12V21h-4v-4.88c0-1.16-.02-2.66-1.62-2.66-1.62 0-1.87 1.27-1.87 2.57V21h-4z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    path: "M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3.5A4.5 4.5 0 1112 16.5a4.5 4.5 0 010-9zm0 2A2.5 2.5 0 1012 14.5a2.5 2.5 0 000-5zM17.5 6a1 1 0 110 2 1 1 0 010-2z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/",
    path: "M21.6 7.2a2.5 2.5 0 00-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 002.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 001.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 001.76-1.77C22 15.2 22 12 22 12s0-3.2-.4-4.8zM10 15V9l5.2 3z",
  },
];

const PIN =
  "M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z";

const MAIL =
  "M2 5.5A2.5 2.5 0 014.5 3h15A2.5 2.5 0 0122 5.5v13a2.5 2.5 0 01-2.5 2.5h-15A2.5 2.5 0 012 18.5zm3 .3v.2l7 5 7-5v-.2zm14 3.2l-7 5-7-5v9.5h14z";

const PHONE =
  "M6.6 10.8a15.5 15.5 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.6a1 1 0 01-.25 1z";

/* TODO: replace with the real department number */
const PHONE_DISPLAY = "+91 00000 00000";
const PHONE_TEL = "+910000000000";

const MAP_QUERY = encodeURIComponent(
  "Dr. D. Y. Patil Institute of Technology, Pimpri, Pune, Maharashtra",
);

const contactItems = [
  {
    id: "address",
    icon: PIN,
    label: "Open our location in Google Maps",
    lines: [
      "Dr. D. Y. Patil Institute of Technology,",
      "Pimpri, Pune, Maharashtra",
    ],
    href: `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`,
    external: true,
  },
  {
    id: "email",
    icon: MAIL,
    label: "Send us an email",
    lines: ["aids@dypiemr.ac.in"],
    href: "mailto:aids@dypiemr.ac.in",
  },
  {
    id: "phone",
    icon: PHONE,
    label: "Call the department",
    lines: [PHONE_DISPLAY],
    href: `tel:${PHONE_TEL}`,
  },
];

/* ------------------------------------------------------------------ */
/* Shared styles                                                       */
/* ------------------------------------------------------------------ */

const LINK =
  "relative inline-block text-white/80 " +
  "transition-colors duration-200 hover:text-gold " +
  "after:absolute after:-bottom-1 after:left-0 after:h-0.5 " +
  "after:w-0 after:rounded-full after:bg-gold " +
  "after:transition-[width] after:duration-300 " +
  "hover:after:w-full focus-visible:after:w-full " +
  "motion-reduce:transition-none motion-reduce:after:transition-none";

const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold";

/* Uniform sizes used across the whole footer */
const ICON_BOX = "h-10 w-10";
const ROW_HEIGHT = "min-h-10";

/* ------------------------------------------------------------------ */
/* Small components                                                    */
/* ------------------------------------------------------------------ */

function Icon({ d, className = "h-4 w-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

function FooterHeading({ children }) {
  return (
    <div className="mb-5">
      <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">
        {children}
      </h3>
      <span
        aria-hidden="true"
        className="mt-3 block h-0.5 w-10 rounded-full bg-gold"
      />
    </div>
  );
}

function LinkList({ links }) {
  return (
    <ul className="text-sm">
      {links.map((link) => (
        <li key={link.label} className={`flex items-center ${ROW_HEIGHT}`}>
          <Link to={link.to} className={`${LINK} ${FOCUS_RING}`}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <footer className="bg-foreground text-white">
      {/* Main footer */}
      <div className="container-page grid grid-cols-1 items-start gap-x-10 gap-y-12 py-14 sm:grid-cols-2 sm:py-16 lg:grid-cols-[1.5fr_0.8fr_1fr_1.25fr] lg:gap-x-12 lg:py-20">
        {/* Department identity */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Link
            to="/"
            aria-label="AI and Data Science department home"
            className={`group inline-flex items-center gap-3 rounded-md ${FOCUS_RING}`}
          >
            <img
              src="/logo/logo.png"
              alt="Department logo"
              className="h-10 w-10 shrink-0 rounded-md object-contain"
            />

            <span className="flex flex-col leading-tight">
              <span className="text-[15px] font-semibold tracking-tight text-white">
                Artificial Intelligence
              </span>
              <span className="mt-1 text-[13px] font-medium text-gold">
                &amp; Data Science
              </span>
            </span>
          </Link>

          <p className="mt-5 max-w-sm text-sm leading-7 text-white/70">
            Developing future-ready engineers through strong academics,
            innovative research, practical learning, and meaningful industry
            collaboration.
          </p>

          {/* Social links */}
          <div className="mt-7">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
              Connect with us
            </p>

            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`flex ${ICON_BOX} items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/80 transition-colors duration-200 hover:border-gold hover:bg-gold hover:text-foreground ${FOCUS_RING} motion-reduce:transition-none`}
                >
                  <Icon d={social.path} className="h-[17px] w-[17px]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Quick links */}
        <nav aria-label="Footer quick links">
          <FooterHeading>Quick Links</FooterHeading>
          <LinkList links={quickLinks} />
        </nav>

        {/* Academic links */}
        <nav aria-label="Academic links">
          <FooterHeading>Academics</FooterHeading>
          <LinkList links={academicLinks} />
        </nav>

        {/* Contact information */}
        <div>
          <FooterHeading>Contact Us</FooterHeading>

          <ul className="space-y-4 text-sm">
            {contactItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  aria-label={item.label}
                  {...(item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={`group flex min-h-12 items-center gap-3 rounded-md ${FOCUS_RING}`}
                >
                  <span
                    className={`flex ${ICON_BOX} shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-gold transition-colors duration-200 group-hover:border-gold/40 group-hover:bg-brand motion-reduce:transition-none`}
                  >
                    <Icon d={item.icon} />
                  </span>

                  <span className="min-w-0 break-words leading-relaxed text-white/75 transition-colors duration-200 group-hover:text-gold motion-reduce:transition-none">
                    {item.lines.map((line, i) => (
                      <React.Fragment key={line}>
                        {line}
                        {i < item.lines.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <Link
            to="/contact"
            className={`mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-gold px-5 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-white ${FOCUS_RING} motion-reduce:transition-none`}
          >
            Get in Touch
            <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
              <path
                d="M5 15L15 5M6 5h9v9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-black/15">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-5 text-center sm:flex-row sm:text-left">
          <p className="text-xs leading-relaxed text-white/55">
            © {year} Department of Artificial Intelligence &amp; Data Science.
            All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <Link to="/privacy" className={`${LINK} ${FOCUS_RING} text-xs`}>
              Privacy Policy
            </Link>

            <Link to="/terms" className={`${LINK} ${FOCUS_RING} text-xs`}>
              Terms
            </Link>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className={`flex ${ICON_BOX} items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors duration-200 hover:border-gold hover:bg-gold hover:text-foreground ${FOCUS_RING} motion-reduce:transition-none`}
            >
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M10 5.5a1 1 0 01.7.3l5 5a1 1 0 01-1.4 1.4L10 7.9l-4.3 4.3a1 1 0 01-1.4-1.4l5-5a1 1 0 01.7-.3z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
