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

// One font style for every nav link, so sizes and weights never drift apart.
// Active state changes colour only, never weight, so links don't shift width.
const NAV_TEXT = "text-sm font-medium"; // desktop links, dropdown triggers and items, Contact
const NAV_TEXT_MOBILE = "text-base font-medium"; // every mobile row and sub-item

const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
const FOCUS_RING_INSET =
  "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand";

/*
  Show/hide transitions.
  - While OPENING, `visibility` is left out of the transition so the element
    becomes visible (and focusable) immediately.
  - While CLOSING, `visibility` is included so it stays visible until the
    fade-out finishes, then drops out of the tab order.
*/
const MENU_TRANSITION_OPEN =
  "transition-[opacity,translate,scale] duration-200 ease-out";
const MENU_TRANSITION_CLOSE =
  "transition-[opacity,translate,scale,visibility] duration-150 ease-in";

const PANEL_TRANSITION_OPEN =
  "transition-[grid-template-rows,opacity,box-shadow] duration-300 ease-out";
const PANEL_TRANSITION_CLOSE =
  "transition-[grid-template-rows,opacity,box-shadow,visibility] duration-250 ease-in";

const desktopItemClasses = (active) =>
  cn(
    "relative inline-flex h-16 items-center gap-1 whitespace-nowrap px-2.5",
    NAV_TEXT,
    "transition-colors duration-200 motion-reduce:transition-none",
    "after:absolute after:inset-x-2.5 after:bottom-0 after:h-0.5 after:rounded-full after:bg-gold",
    "after:origin-center after:transition-transform after:duration-300 after:ease-out motion-reduce:after:transition-none",
    FOCUS_RING_INSET,
    active
      ? "text-brand after:scale-x-100"
      : "text-foreground hover:text-brand after:scale-x-0 hover:after:scale-x-100",
  );

// Contact button is ALWAYS bg-brand with white text (default, hover, focus, active, mobile).
const contactClasses = (active) =>
  cn(
    "inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md px-5 no-underline",
    NAV_TEXT,
    // The trailing "!" forces white text so no global `a { color }` rule can override it.
    "bg-brand text-on-brand! visited:text-on-brand! hover:text-on-brand! focus:text-on-brand! focus-visible:text-on-brand! active:text-on-brand!",
    "hover:shadow-card",
    "transition-shadow duration-200 ease-out motion-reduce:transition-none",
    FOCUS_RING,
    active && "shadow-card",
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
        "h-4 w-4 shrink-0 transition-transform duration-300 ease-out motion-reduce:transition-none",
        open && "rotate-180",
      )}
    >
      <path d="M5 7.5l5 5 5-5" />
    </svg>
  );
}

// Hamburger that morphs into a close (X) icon.
function MenuToggleIcon({ open }) {
  const bar =
    "absolute left-1 right-1 h-0.5 rounded-full bg-current transition-all duration-300 ease-out motion-reduce:transition-none";
  return (
    <span aria-hidden="true" className="relative block h-6 w-6">
      <span className={cn(bar, open ? "top-[11px] rotate-45" : "top-[5px]")} />
      <span className={cn(bar, "top-[11px]", open && "scale-x-0 opacity-0")} />
      <span
        className={cn(bar, open ? "top-[11px] -rotate-45" : "top-[17px]")}
      />
    </span>
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
        "group flex shrink-0 items-center gap-2.5 rounded-md",
        FOCUS_RING,
      )}
    >
      <span
        aria-hidden="true"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border-b-4 border-gold bg-brand text-[11px] font-bold tracking-tight text-on-brand transition-transform duration-300 ease-out group-hover:-rotate-3 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:transform-none"
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

      {/*
        Always rendered so it can animate in AND out. While closed it is
        `invisible`, so it cannot be tabbed to or read by screen readers.
        Floating card, 8px below the bar. No gold top line.
      */}
      <ul
        id={menuId}
        ref={menuRef}
        onKeyDown={handleMenuKeyDown}
        className={cn(
          "absolute left-0 top-full z-50 mt-2 w-64 origin-top-left rounded-lg border border-border bg-surface p-1.5 shadow-card",
          "motion-reduce:transition-none",
          isOpen
            ? cn(
                MENU_TRANSITION_OPEN,
                "visible translate-y-0 scale-100 opacity-100",
              )
            : cn(
                MENU_TRANSITION_CLOSE,
                "pointer-events-none invisible -translate-y-2 scale-95 opacity-0",
              ),
        )}
      >
        {item.children.map((child, index) => (
          <li
            key={child.to}
            className={cn(
              "motion-reduce:transition-none",
              isOpen
                ? "translate-y-0 opacity-100 transition-[opacity,translate] duration-300 ease-out"
                : "translate-y-1 opacity-0",
            )}
            // Items cascade in one after another when the menu opens.
            style={{ transitionDelay: isOpen ? `${70 + index * 45}ms` : "0ms" }}
          >
            <NavLink
              to={child.to}
              end
              onClick={onClose}
              className={({ isActive: childActive }) =>
                cn(
                  "group flex items-center gap-2.5 rounded-md px-3 py-2.5 no-underline",
                  NAV_TEXT,
                  "transition-colors duration-200 motion-reduce:transition-none",
                  FOCUS_RING_INSET,
                  // Hover and keyboard focus: solid red row, forced white text.
                  "hover:bg-brand hover:text-on-brand! focus-visible:bg-brand focus-visible:text-on-brand!",
                  childActive ? "bg-brand-light text-brand" : "text-foreground",
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
                  <span className="transition-transform duration-200 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
                    {child.label}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile pieces                                                       */
/* ------------------------------------------------------------------ */

const mobileRowClasses = cn(
  "flex min-h-12 w-full items-center border-b border-border px-4 transition-colors duration-200 motion-reduce:transition-none",
  NAV_TEXT_MOBILE,
);

// Rows fade/slide in one by one when the mobile panel opens.
const mobileRowMotion = (open, index) => ({
  className: cn(
    "motion-reduce:transition-none",
    open
      ? "translate-y-0 opacity-100 transition-[opacity,translate] duration-300 ease-out"
      : "-translate-y-1 opacity-0",
  ),
  style: { transitionDelay: open ? `${80 + index * 35}ms` : "0ms" },
});

function MobileGroup({
  item,
  index,
  panelOpen,
  isActive,
  isExpanded,
  onToggle,
}) {
  const panelId = `mobile-menu-${item.id}`;
  const motion = mobileRowMotion(panelOpen, index);

  return (
    <li className={motion.className} style={motion.style}>
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

      {/* Smooth height animation via grid rows (0fr -> 1fr). */}
      <div
        id={panelId}
        className={cn(
          "grid motion-reduce:transition-none",
          isExpanded
            ? "grid-rows-[1fr] visible opacity-100 transition-[grid-template-rows,opacity] duration-300 ease-out"
            : "grid-rows-[0fr] invisible opacity-0 transition-[grid-template-rows,opacity,visibility] duration-250 ease-in",
        )}
      >
        <ul className="min-h-0 overflow-hidden bg-surface-muted">
          {item.children.map((child, i) => (
            <li
              key={child.to}
              className={cn(
                i === item.children.length - 1 && "border-b border-border",
              )}
            >
              <NavLink
                to={child.to}
                end
                className={({ isActive: childActive }) =>
                  cn(
                    "flex min-h-12 items-center border-l-4 py-2 pl-8 pr-4 no-underline",
                    NAV_TEXT_MOBILE,
                    "transition-colors duration-200 motion-reduce:transition-none",
                    FOCUS_RING_INSET,
                    "active:bg-brand active:text-on-brand!",
                    childActive
                      ? "border-l-gold bg-brand-light text-brand"
                      : "border-l-transparent text-foreground",
                  )
                }
              >
                {child.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
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
    if (!mobileOpen) setMobileExpanded(activeGroupId);
    setMobileOpen((open) => !open);
  };

  const contactMotion = mobileRowMotion(mobileOpen, NAV_ITEMS.length);

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 border-b bg-surface transition-[box-shadow,border-color] duration-300 motion-reduce:transition-none",
        scrolled ? "border-border shadow-soft" : "border-border",
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
            "transition-colors duration-200 hover:border-border-strong hover:text-brand motion-reduce:transition-none",
            FOCUS_RING,
          )}
        >
          <MenuToggleIcon open={mobileOpen} />
        </button>
      </div>

      {/*
        Mobile / tablet panel: always rendered so it can slide open and closed.
        Height animates with grid rows (0fr -> 1fr); `invisible` while closed
        keeps it out of the tab order.
      */}
      <div
        id="mobile-menu"
        className={cn(
          "absolute inset-x-0 top-full grid bg-surface xl:hidden motion-reduce:transition-none",
          mobileOpen
            ? cn(
                PANEL_TRANSITION_OPEN,
                "visible grid-rows-[1fr] opacity-100 shadow-card",
              )
            : cn(
                PANEL_TRANSITION_CLOSE,
                "invisible grid-rows-[0fr] opacity-0 shadow-none",
              ),
        )}
      >
        <nav aria-label="Mobile navigation" className="min-h-0 overflow-hidden">
          <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-b border-border">
            <ul className="border-t border-border">
              {NAV_ITEMS.map((item, index) => {
                if (item.type === "group") {
                  return (
                    <MobileGroup
                      key={item.id}
                      item={item}
                      index={index}
                      panelOpen={mobileOpen}
                      isActive={isPathActive(pathname, item.base)}
                      isExpanded={mobileExpanded === item.id}
                      onToggle={() =>
                        setMobileExpanded((current) =>
                          current === item.id ? null : item.id,
                        )
                      }
                    />
                  );
                }
                const motion = mobileRowMotion(mobileOpen, index);
                return (
                  <li
                    key={item.id}
                    className={motion.className}
                    style={motion.style}
                  >
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
                );
              })}
            </ul>

            <div
              className={cn("p-4", contactMotion.className)}
              style={contactMotion.style}
            >
              <NavLink
                to={CONTACT.to}
                className={({ isActive }) =>
                  cn(contactClasses(isActive), "h-12 w-full", NAV_TEXT_MOBILE)
                }
              >
                {CONTACT.label}
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
