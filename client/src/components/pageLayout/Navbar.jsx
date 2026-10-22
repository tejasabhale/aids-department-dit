import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

/* ------------------------------------------------------------------ */
/* Navigation data                                                     */
/* ------------------------------------------------------------------ */

const NAV_ITEMS = [
  { id: "home", label: "Home", to: "/", end: true },
  { id: "about", label: "About", to: "/about" },
  { id: "academics", label: "Academics", to: "/academics" },
  { id: "faculty", label: "Faculty", to: "/faculty" },
  { id: "research", label: "Research", to: "/research" },
  { id: "student-life", label: "Student Life", to: "/student-life" },
  { id: "gallery", label: "Gallery", to: "/gallery" },
  { id: "placements", label: "Placements", to: "/placements" },
];

const CONTACT = { label: "Contact", to: "/contact" };

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const cn = (...classes) => classes.filter(Boolean).join(" ");

const NAV_TEXT = "text-sm font-medium";
const NAV_TEXT_MOBILE = "text-base font-medium";

/*
 * Desktop navigation starts at the `lg` breakpoint (64rem / 1024px).
 * Below it, phones AND tablets share the same hamburger menu.
 * Keep DESKTOP_QUERY in sync with Tailwind's `lg`.
 */
const DESKTOP_QUERY = "(min-width: 64rem)";

/*
 * Fluid side gutter shared by the header and the mobile menu rows. It grows
 * with the viewport (matching the hero) and respects device safe areas, so
 * nothing sits under a notch when a phone is turned sideways.
 */
const GUTTER_STYLE = {
  paddingLeft: "max(clamp(1rem, 5vw, 6.25rem), env(safe-area-inset-left))",
  paddingRight: "max(clamp(1rem, 5vw, 6.25rem), env(safe-area-inset-right))",
};

const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const FOCUS_RING_INSET =
  "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand";

const desktopItemClasses = (active) =>
  cn(
    "relative inline-flex h-[4.5rem] items-center whitespace-nowrap px-1.5 xl:px-2 2xl:px-2.5",
    NAV_TEXT,
    "transition-colors duration-200 motion-reduce:transition-none",
    "after:absolute after:inset-x-1.5 xl:after:inset-x-2 2xl:after:inset-x-2.5 after:bottom-0 after:h-0.5 after:rounded-full after:bg-gold",
    "after:origin-center after:transition-transform after:duration-300 after:ease-out",
    "motion-reduce:after:transition-none",
    FOCUS_RING_INSET,
    active
      ? "text-brand after:scale-x-100"
      : "text-foreground hover:text-brand after:scale-x-0 hover:after:scale-x-100",
  );

const contactClasses = (active) =>
  cn(
    "inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md px-4 no-underline xl:px-5",
    NAV_TEXT,
    "bg-brand text-on-brand! visited:text-on-brand! hover:text-on-brand! focus:text-on-brand! focus-visible:text-on-brand! active:text-on-brand!",
    "hover:shadow-card",
    "transition-shadow duration-200 ease-out motion-reduce:transition-none",
    FOCUS_RING,
    active && "shadow-card",
  );

const mobileRowClasses = cn(
  "flex min-h-12 w-full items-center border-b border-border",
  "transition-colors duration-200 motion-reduce:transition-none",
  NAV_TEXT_MOBILE,
);

const mobileRowMotion = (open, index) => ({
  className: cn(
    "motion-reduce:transition-none",
    open
      ? "translate-y-0 opacity-100 transition-[opacity,translate] duration-300 ease-out"
      : "-translate-y-1 opacity-0",
  ),
  style: {
    transitionDelay: open ? `${80 + index * 35}ms` : "0ms",
  },
});

/* ------------------------------------------------------------------ */
/* Menu toggle icon                                                    */
/* ------------------------------------------------------------------ */

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

function Brand({ onHomeClick }) {
  return (
    <Link
      to="/"
      onClick={onHomeClick}
      aria-label="Artificial Intelligence and Data Science department, home"
      className={cn(
        "group flex min-w-0 shrink items-center gap-2.5 rounded-md sm:gap-3.5",
        FOCUS_RING,
      )}
    >
      <img
        className="h-11 w-11 shrink-0 rounded-md object-contain sm:h-14 sm:w-14"
        src="/logo/logo.png"
        alt=""
        width="56"
        height="56"
      />

      {/* Divider separates the logo from the department name */}
      <span
        aria-hidden="true"
        className="hidden h-10 w-px shrink-0 bg-border-strong sm:block"
      />

      <span className="flex min-w-0 flex-col justify-center">
        <span className="truncate text-[15px] font-bold leading-tight tracking-tight text-foreground sm:text-[17px] lg:text-base xl:text-lg">
          Artificial Intelligence
        </span>

        <span className="truncate text-[12.5px] font-semibold leading-tight text-brand sm:text-sm xl:text-[15px]">
          &amp; Data Science
        </span>
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Navbar                                                              */
/* ------------------------------------------------------------------ */

export default function Navbar() {
  const { pathname } = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const headerRef = useRef(null);
  const toggleRef = useRef(null);

  // Close the mobile menu after navigation.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Add a subtle shadow when the page is scrolled.
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 4);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close the mobile menu when clicking outside the navbar.
  useEffect(() => {
    const handlePointerDown = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  // Close the mobile menu when keyboard focus leaves the navbar.
  useEffect(() => {
    const handleFocusIn = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("focusin", handleFocusIn);

    return () => {
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, []);

  // Close the mobile menu with Escape.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  // Close the mobile menu when switching to the desktop layout.
  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_QUERY);

    const handleChange = (event) => {
      if (event.matches) {
        setMobileOpen(false);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  const toggleMobile = () => {
    setMobileOpen((open) => !open);
  };

  // Clicking the current navigation link should still return to the top.
  const handleNavClick = (to) => {
    setMobileOpen(false);

    if (pathname !== to) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (window.lenis) {
      window.lenis.scrollTo(0, {
        immediate: reduceMotion,
        duration: reduceMotion ? 0 : 0.8,
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    }
  };

  const contactMotion = mobileRowMotion(mobileOpen, NAV_ITEMS.length);

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 border-b bg-surface",
        "transition-[box-shadow,border-color] duration-300",
        "motion-reduce:transition-none",
        scrolled ? "border-border shadow-soft" : "border-border",
      )}
    >
      <div
        className="mx-auto flex h-[4.5rem] w-full max-w-[1760px] items-center justify-between gap-3 sm:gap-4"
        style={GUTTER_STYLE}
      >
        <Brand onHomeClick={() => handleNavClick("/")} />

        {/* Desktop navigation (lg and up) */}
        <nav aria-label="Main navigation" className="hidden shrink-0 lg:block">
          <ul className="flex items-center gap-0.5 2xl:gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  onClick={() => handleNavClick(item.to)}
                  className={({ isActive }) => desktopItemClasses(isActive)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}

            <li className="ml-2 xl:ml-3 2xl:ml-4">
              <NavLink
                to={CONTACT.to}
                onClick={() => handleNavClick(CONTACT.to)}
                className={({ isActive }) => contactClasses(isActive)}
              >
                {CONTACT.label}
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Hamburger toggle (phones and tablets) */}
        <button
          ref={toggleRef}
          type="button"
          aria-label={mobileOpen ? "Close main menu" : "Open main menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={toggleMobile}
          className={cn(
            "inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-md border border-border text-foreground lg:hidden",
            "transition-colors duration-200 hover:border-border-strong hover:text-brand",
            "motion-reduce:transition-none",
            FOCUS_RING,
          )}
        >
          <MenuToggleIcon open={mobileOpen} />
        </button>
      </div>

      {/* Mobile / tablet navigation: regular links */}
      <div
        id="mobile-menu"
        className={cn(
          "absolute inset-x-0 top-full grid bg-surface lg:hidden",
          "motion-reduce:transition-none",
          mobileOpen
            ? "visible grid-rows-[1fr] opacity-100 shadow-card transition-[grid-template-rows,opacity,box-shadow] duration-300 ease-out"
            : "invisible grid-rows-[0fr] opacity-0 shadow-none transition-[grid-template-rows,opacity,box-shadow,visibility] duration-250 ease-in",
        )}
      >
        <nav aria-label="Mobile navigation" className="min-h-0 overflow-hidden">
          {/* Scrolls on short screens (e.g. phones in landscape). */}
          <div className="max-h-[calc(100vh-4.5rem)] max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain border-b border-border">
            <ul className="border-t border-border">
              {NAV_ITEMS.map((item, index) => {
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
                      onClick={() => handleNavClick(item.to)}
                      style={GUTTER_STYLE}
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

            {/* Contact link */}
            <div
              className={cn("py-4", contactMotion.className)}
              style={{ ...GUTTER_STYLE, ...contactMotion.style }}
            >
              <NavLink
                to={CONTACT.to}
                onClick={() => handleNavClick(CONTACT.to)}
                className={({ isActive }) =>
                  cn(
                    contactClasses(isActive),
                    "h-12 w-full sm:w-auto sm:min-w-48 sm:px-8",
                    NAV_TEXT_MOBILE,
                  )
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
