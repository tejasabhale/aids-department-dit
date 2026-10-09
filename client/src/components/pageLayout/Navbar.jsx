import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

/* ------------------------------------------------------------------ */
/* Navigation data (single source of truth for desktop + mobile)       */
/* ------------------------------------------------------------------ */

const NAV_ITEMS = [
  { type: "link", id: "home", label: "Home", to: "/", end: true },
  {
    type: "group",
    id: "about",
    label: "About",
    base: "/about",
    children: [
      { label: "Department Overview", to: "/about" },
      { label: "Vision & Mission", to: "/about/vision-mission" },
      { label: "Infrastructure", to: "/about/infrastructure" },
    ],
  },
  {
    type: "group",
    id: "academics",
    label: "Academics",
    base: "/academics",
    children: [
      { label: "Programs", to: "/academics/programs" },
      { label: "Curriculum", to: "/academics/curriculum" },
      { label: "Academic Calendar", to: "/academics/calendar" },
    ],
  },
  { type: "link", id: "faculty", label: "Faculty", to: "/faculty" },
  {
    type: "group",
    id: "research",
    label: "Research",
    base: "/research",
    children: [
      { label: "Research Areas", to: "/research/areas" },
      { label: "Publications", to: "/research/publications" },
      { label: "Projects", to: "/research/projects" },
    ],
  },
  {
    type: "group",
    id: "student-life",
    label: "Student Life",
    base: "/student-life",
    children: [
      { label: "Student Activities", to: "/student-life/activities" },
      { label: "Clubs & Communities", to: "/student-life/clubs" },
      { label: "Student Resources", to: "/student-life/resources" },
    ],
  },
  { type: "link", id: "events", label: "Events", to: "/events" },
  { type: "link", id: "placements", label: "Placements", to: "/placements" },
];

const CONTACT = { label: "Contact", to: "/contact" };

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const cn = (...classes) => classes.filter(Boolean).join(" ");

const isPathActive = (pathname, base) =>
  pathname === base || pathname.startsWith(`${base}/`);

const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
const FOCUS_RING_INSET =
  "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand";

const desktopItemClasses = (active) =>
  cn(
    "relative inline-flex h-16 items-center gap-1 whitespace-nowrap px-2.5 text-sm font-medium",
    "transition-colors duration-150 motion-reduce:transition-none",
    "after:absolute after:inset-x-2.5 after:bottom-0 after:h-0.5 after:rounded-full after:bg-gold",
    "after:origin-center after:transition-transform after:duration-200 motion-reduce:after:transition-none",
    FOCUS_RING_INSET,
    active
      ? "text-brand after:scale-x-100"
      : "text-foreground hover:text-brand after:scale-x-0 hover:after:scale-x-100",
  );

const contactClasses = (active) =>
  cn(
    "inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md px-5 text-sm font-semibold no-underline",
    // The trailing "!" forces white text so no global `a { color }` rule can override it.
    "bg-brand text-on-brand! visited:text-on-brand! hover:text-on-brand! focus:text-on-brand! focus-visible:text-on-brand! active:text-on-brand!",
    "hover:bg-brand-dark hover:shadow-soft hover:-translate-y-px active:translate-y-0",
    "transition-[background-color,box-shadow,transform] duration-150",
    "motion-reduce:transition-none motion-reduce:hover:transform-none",
    FOCUS_RING,
    active && "bg-brand-dark",
  );

/* ------------------------------------------------------------------ */
/* Icons (lightweight, decorative)                                     */
/* ------------------------------------------------------------------ */

function ChevronIcon({ open }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "h-4 w-4 shrink-0 transition-transform duration-150 motion-reduce:transition-none",
        open && "rotate-180",
      )}
    >
      <path d="M5 7.5l5 5 5-5" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="h-6 w-6"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="h-6 w-6"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Brand                                                               */
/* ------------------------------------------------------------------ */

function Brand() {
  return (
    <Link
      to="/"
      aria-label="Artificial Intelligence and Data Science department, home"
      className={cn(
        "flex shrink-0 items-center gap-2.5 rounded-md",
        FOCUS_RING,
      )}
    >
      <span
        aria-hidden="true"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border-b-4 border-gold bg-brand text-[11px] font-bold tracking-tight text-on-brand"
      >
        AI&amp;DS
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[15px] font-semibold text-foreground">
          Artificial Intelligence
        </span>
        <span className="text-[13px] font-medium text-brand">
          &amp; Data Science
        </span>
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop dropdown (opens on click / keyboard only, never on hover)   */
/* ------------------------------------------------------------------ */

function DesktopDropdown({ item, isOpen, isActive, onToggle, onClose }) {
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const pendingFocus = useRef(false);
  const menuId = `desktop-menu-${item.id}`;

  // Move focus into the menu after it opens via keyboard.
  useEffect(() => {
    if (isOpen && pendingFocus.current) {
      menuRef.current?.querySelector("a")?.focus();
    }
    pendingFocus.current = false;
  }, [isOpen]);

  const handleTriggerKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (isOpen) {
        menuRef.current?.querySelector("a")?.focus();
      } else {
        pendingFocus.current = true;
        onToggle();
      }
    }
  };

  const handleMenuKeyDown = (e) => {
    const links = Array.from(menuRef.current?.querySelectorAll("a") ?? []);
    if (!links.length) return;
    const index = links.indexOf(document.activeElement);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      links[(index + 1) % links.length].focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      links[(index - 1 + links.length) % links.length].focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      links[0].focus();
    } else if (e.key === "End") {
      e.preventDefault();
      links[links.length - 1].focus();
    }
  };

  const handleWrapperKeyDown = (e) => {
    // The document-level handler closes the menu; here we return focus.
    if (e.key === "Escape" && isOpen) triggerRef.current?.focus();
  };

  const handleBlur = (e) => {
    // Close when focus moves to another element outside this dropdown.
    if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) {
      onClose();
    }
  };

  return (
    <li
      className="relative"
      onKeyDown={handleWrapperKeyDown}
      onBlur={handleBlur}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={onToggle}
        onKeyDown={handleTriggerKeyDown}
        className={cn(desktopItemClasses(isActive || isOpen), "cursor-pointer")}
      >
        {item.label}
        <ChevronIcon open={isOpen} />
      </button>

      {isOpen && (
        <ul
          id={menuId}
          ref={menuRef}
          onKeyDown={handleMenuKeyDown}
          // Floating card: 8px below the bar so it never touches the trigger
          // underline or the header border. No gold top line.
          className="absolute left-0 top-full z-50 mt-2 w-64 rounded-lg border border-border bg-surface p-1.5 shadow-card"
        >
          {item.children.map((child) => (
            <li key={child.to}>
              <NavLink
                to={child.to}
                end
                onClick={onClose}
                className={({ isActive: childActive }) =>
                  cn(
                    "flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium no-underline",
                    "transition-colors duration-150 motion-reduce:transition-none",
                    FOCUS_RING_INSET,
                    // Hover and keyboard focus: solid red row, forced white text.
                    "hover:bg-brand hover:text-on-brand! focus-visible:bg-brand focus-visible:text-on-brand!",
                    childActive
                      ? "bg-brand-light font-semibold text-brand"
                      : "text-foreground",
                  )
                }
              >
                {({ isActive: childActive }) => (
                  <>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "h-1.5 w-1.5 shrink-0 rounded-full",
                        childActive ? "bg-gold" : "bg-transparent",
                      )}
                    />
                    <span>{child.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile pieces                                                       */
/* ------------------------------------------------------------------ */

const mobileRowClasses =
  "flex min-h-12 w-full items-center border-b border-border px-4 text-base font-medium transition-colors motion-reduce:transition-none";

function MobileGroup({ item, isActive, isExpanded, onToggle }) {
  const panelId = `mobile-menu-${item.id}`;

  return (
    <li>
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls={panelId}
        onClick={onToggle}
        className={cn(
          mobileRowClasses,
          "cursor-pointer justify-between text-left",
          FOCUS_RING_INSET,
          isActive || isExpanded ? "text-brand" : "text-foreground",
        )}
      >
        <span>{item.label}</span>
        <ChevronIcon open={isExpanded} />
      </button>

      {isExpanded && (
        <ul id={panelId} className="border-b border-border bg-surface-muted">
          {item.children.map((child) => (
            <li key={child.to}>
              <NavLink
                to={child.to}
                end
                className={({ isActive: childActive }) =>
                  cn(
                    "flex min-h-12 items-center border-l-4 py-2 pl-8 pr-4 text-[15px] font-medium no-underline",
                    "transition-colors motion-reduce:transition-none",
                    FOCUS_RING_INSET,
                    "active:bg-brand active:text-on-brand!",
                    childActive
                      ? "border-l-gold bg-brand-light font-semibold text-brand"
                      : "border-l-transparent text-foreground",
                  )
                }
              >
                {child.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Navbar                                                              */
/* ------------------------------------------------------------------ */

export default function Navbar() {
  const { pathname } = useLocation();
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const toggleRef = useRef(null);

  const activeGroupId =
    NAV_ITEMS.find(
      (item) => item.type === "group" && isPathActive(pathname, item.base),
    )?.id ?? null;

  // Close everything after any route change.
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  // Subtle shadow once the page has scrolled.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 4);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns / mobile menu on outside pointer press.
  useEffect(() => {
    const handlePointerDown = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  // Close when keyboard focus leaves the navbar entirely.
  useEffect(() => {
    const handleFocusIn = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("focusin", handleFocusIn);
    return () => document.removeEventListener("focusin", handleFocusIn);
  }, []);

  // Escape closes dropdowns and the mobile menu.
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key !== "Escape") return;
      setOpenMenu(null);
      if (mobileOpen) {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  // Reset the mobile menu when the viewport reaches the desktop breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 80rem)");
    const handleChange = (e) => {
      if (e.matches) setMobileOpen(false);
    };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  const toggleMobile = () => {
    setMobileOpen((open) => {
      if (!open) setMobileExpanded(activeGroupId);
      return !open;
    });
  };

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 border-b border-border bg-surface transition-shadow motion-reduce:transition-none",
        scrolled && "shadow-soft",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Brand />

        {/* Desktop navigation */}
        <nav aria-label="Main navigation" className="hidden xl:block">
          <ul className="flex items-center gap-0.5 2xl:gap-1">
            {NAV_ITEMS.map((item) =>
              item.type === "group" ? (
                <DesktopDropdown
                  key={item.id}
                  item={item}
                  isOpen={openMenu === item.id}
                  isActive={isPathActive(pathname, item.base)}
                  onToggle={() =>
                    setOpenMenu((current) =>
                      current === item.id ? null : item.id,
                    )
                  }
                  onClose={() => setOpenMenu(null)}
                />
              ) : (
                <li key={item.id}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={() => setOpenMenu(null)}
                    className={({ isActive }) => desktopItemClasses(isActive)}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ),
            )}
            <li className="ml-3 2xl:ml-4">
              <NavLink
                to={CONTACT.to}
                onClick={() => setOpenMenu(null)}
                className={({ isActive }) => contactClasses(isActive)}
              >
                {CONTACT.label}
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Mobile / tablet toggle */}
        <button
          ref={toggleRef}
          type="button"
          aria-label={mobileOpen ? "Close main menu" : "Open main menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={toggleMobile}
          className={cn(
            "inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-md border border-border text-foreground xl:hidden",
            "transition-colors hover:border-border-strong hover:text-brand motion-reduce:transition-none",
            FOCUS_RING,
          )}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile / tablet panel */}
      {mobileOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-b border-border bg-surface shadow-card xl:hidden"
        >
          <ul className="border-t border-border">
            {NAV_ITEMS.map((item) =>
              item.type === "group" ? (
                <MobileGroup
                  key={item.id}
                  item={item}
                  isActive={isPathActive(pathname, item.base)}
                  isExpanded={mobileExpanded === item.id}
                  onToggle={() =>
                    setMobileExpanded((current) =>
                      current === item.id ? null : item.id,
                    )
                  }
                />
              ) : (
                <li key={item.id}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      cn(
                        mobileRowClasses,
                        "border-l-4 no-underline",
                        FOCUS_RING_INSET,
                        "active:bg-brand active:text-on-brand!",
                        isActive
                          ? "border-l-gold bg-brand-light text-brand"
                          : "border-l-transparent text-foreground",
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>

          <div className="p-4">
            <NavLink
              to={CONTACT.to}
              className={({ isActive }) =>
                cn(contactClasses(isActive), "h-12 w-full text-base")
              }
            >
              {CONTACT.label}
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  );
}
