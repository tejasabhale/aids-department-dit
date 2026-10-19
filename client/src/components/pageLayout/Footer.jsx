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

const contactItems = [
  {
    id: "address",
    icon: PIN,
    lines: ["Dr. D. Y. Patil Institute of Technology,", "Pimpri, Pune, Maharashtra"], // joined into one wrapping line
  },
  { id: "email", icon: MAIL, text: "aids@dypiemr.ac.in", href: "mailto:aids@dypiemr.ac.in" },
  { id: "phone", icon: PHONE, text: "+91 00000 00000", href: "tel:+910000000000" },
];

/* ------------------------------------------------------------------ */
/* Shared styles                                                       */
/* ------------------------------------------------------------------ */

// Text link: stays white; a gold underline draws in from the left on hover.
// No scaling and no movement of the text itself.
const LINK =
  "relative inline-block text-on-brand " +
  "after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-gold after:transition-[width] after:duration-300 after:ease-out " +
  "hover:after:w-full focus-visible:after:w-full motion-reduce:transition-none motion-reduce:after:transition-none";

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

const Icon = ({ d, className = "h-4 w-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d={d} />
  </svg>
);

const FooterHeading = ({ children }) => (
  <div className="mb-5">
    <h3 className="text-base font-bold tracking-wide text-on-brand!">{children}</h3>
    <span aria-hidden="true" className="mt-2 block h-0.5 w-10 rounded-full bg-gold" />
  </div>
);

const LinkList = ({ links }) => (
  <ul className="space-y-3 text-sm">
    {links.map((l) => (
      <li key={l.label}>
        <Link to={l.to} className={LINK}>
          {l.label}
        </Link>
      </li>
    ))}
  </ul>
);

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

const Footer = () => {
  const year = new Date().getFullYear();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden bg-brand text-on-brand">
      {/* Soft decorative shapes (purely visual) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-dark/50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-1/4 h-64 w-64 rounded-full bg-brand-dark/30"
      />

      {/* Main */}
      <div className="container-page relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.4fr] lg:gap-10">
        {/* Brand (stacked on mobile and desktop, side by side on tablet) */}
        <div className="sm:col-span-2 md:flex md:items-start md:justify-between md:gap-10 lg:col-span-1 lg:block">
          {/* Identity */}
          <div className="md:max-w-md">
            <Link
              to="/"
              aria-label="AI and Data Science department, home"
              className="group inline-flex items-center gap-3.5 rounded-md"
            >
              <span
                aria-hidden="true"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border-b-4 border-gold bg-on-brand text-xs font-bold tracking-tight text-brand"
              >
                AI&amp;DS
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-base font-bold transition-colors duration-200 group-hover:text-gold motion-reduce:transition-none">
                  Artificial Intelligence
                </span>
                <span className="text-sm font-medium text-on-brand/80">&amp; Data Science</span>
              </span>
            </Link>

            <p className="mt-4 text-sm leading-relaxed text-on-brand/85">
              Building skilled engineers in artificial intelligence, machine learning and
              data science through strong academics, research and industry exposure.
            </p>
          </div>

          {/* Social */}
          <div className="mt-6 md:mt-0 md:shrink-0 lg:mt-6 lg:border-t lg:border-on-brand/15 lg:pt-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-on-brand/70">
              Follow us
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-on-brand/30 text-on-brand transition-colors duration-200 hover:border-gold hover:bg-gold hover:text-brand-dark focus-visible:border-gold focus-visible:bg-gold focus-visible:text-brand-dark motion-reduce:transition-none"
                >
                  <Icon d={s.path} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Quick links */}
        <nav aria-label="Quick links">
          <FooterHeading>Quick Links</FooterHeading>
          <LinkList links={quickLinks} />
        </nav>

        {/* Academics */}
        <nav aria-label="Academics">
          <FooterHeading>Academics</FooterHeading>
          <LinkList links={academicLinks} />
        </nav>

        {/* Contact */}
        <div>
          <FooterHeading>Contact Us</FooterHeading>
          <ul className="space-y-4 text-sm text-on-brand">
            {contactItems.map((item) => (
              <li key={item.id} className="group flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-on-brand/10 text-[var(--color-gold)] transition-colors duration-200 group-hover:bg-[var(--color-gold)] group-hover:text-brand-dark motion-reduce:transition-none"
                >
                  <Icon d={item.icon} />
                </span>

                {item.href ? (
                  <a href={item.href} className={`${LINK} min-w-0 break-words leading-snug`}>
                    {item.text}
                  </a>
                ) : (
                  <address className="min-w-0 break-words not-italic leading-snug">
                    {item.lines.join(" ")}
                  </address>
                )}
              </li>
            ))}
          </ul>

          <Link
            to="/contact"
            className="mt-6 inline-flex items-center rounded-md bg-[var(--color-gold)] px-5 py-2.5 text-sm font-semibold text-brand-dark shadow-soft transition-[background-color,color,box-shadow] duration-200 hover:bg-on-brand hover:text-brand hover:shadow-card focus-visible:bg-on-brand focus-visible:text-brand motion-reduce:transition-none"
          >
            Get in Touch
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-on-brand/15 bg-brand-dark">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-4 text-center text-xs text-on-brand/80 sm:flex-row sm:text-left">
          <p>© {year} Department of Artificial Intelligence &amp; Data Science. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <Link to="/privacy" className={LINK}>
              Privacy Policy
            </Link>
            <Link to="/terms" className={LINK}>
              Terms
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-on-brand/30 text-on-brand transition-colors duration-200 hover:border-gold hover:bg-gold hover:text-brand-dark focus-visible:border-gold focus-visible:bg-gold focus-visible:text-brand-dark motion-reduce:transition-none"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M10 5.5a1 1 0 01.7.3l5 5a1 1 0 01-1.4 1.4L10 7.9l-4.3 4.3a1 1 0 01-1.4-1.4l5-5a1 1 0 01.7-.3z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;