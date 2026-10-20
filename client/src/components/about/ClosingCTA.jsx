import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.22, 1, 0.36, 1];

const links = [
  {
    number: "01",
    title: "Explore academic programs",
    to: "/academics",
  },
  {
    number: "02",
    title: "Meet our faculty",
    to: "/faculty",
  },
  {
    number: "03",
    title: "Contact the department",
    to: "/contact",
  },
];

export default function ClosingCTA() {
  const sectionRef = useRef(null);
  const backgroundRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !sectionRef.current || !backgroundRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        backgroundRef.current,
        { yPercent: 12 },
        {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  const reveal = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: {
            duration: 0.65,
            delay,
            ease: EASE,
          },
        };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="closing-cta-heading"
      className="relative isolate w-full overflow-hidden bg-background text-foreground"
    >
      {/* Gold accent line */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px] bg-gold"
      />

      {/* Subtle animated AI&DS background lettering */}
      <div
        ref={backgroundRef}
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 top-8 select-none font-bold leading-none tracking-[-0.09em] text-brand/[0.035]"
      >
        <span className="block text-[clamp(8rem,23vw,21rem)]">AI&amp;DS</span>
      </div>

      <div className="relative mx-auto w-full max-w-[1400px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 2xl:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
          {/* Main CTA */}
          <motion.div {...reveal()}>
            <div className="mb-5 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-gold" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand sm:text-sm">
                Take the next step
              </p>
            </div>

            <h2
              id="closing-cta-heading"
              className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl"
            >
              Your curiosity.
              <br />
              <span className="text-brand">Your next possibility.</span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
              Discover our academic programs, connect with our faculty, and
              explore how Artificial Intelligence and Data Science can shape
              your future.
            </p>

            <Link
              to="/academics"
              className="group mt-7 inline-flex items-center gap-3 rounded-md bg-brand px-5 py-3 text-sm font-semibold text-on-brand transition-colors duration-200 hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              Explore our programs
              <FiArrowUpRight
                size={18}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </motion.div>

          {/* Quick navigation links */}
          <motion.div {...reveal(0.12)} className="border-t border-border">
            {links.map((item) => (
              <Link
                key={item.number}
                to={item.to}
                className="group flex items-center gap-4 border-b border-border py-4 transition-colors sm:py-5"
              >
                <span className="text-xs font-medium tracking-wider text-brand">
                  {item.number}
                </span>

                <span className="flex-1 text-sm font-medium text-foreground transition-colors duration-200 group-hover:text-brand sm:text-base">
                  {item.title}
                </span>

                <FiArrowUpRight
                  size={19}
                  aria-hidden="true"
                  className="shrink-0 text-brand transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Department signature */}
        <motion.div
          {...reveal(0.2)}
          className="mt-10 flex items-center gap-3 border-t border-border pt-5 sm:mt-14"
        >
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gold" />
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted sm:text-xs">
            Artificial Intelligence &amp; Data Science
          </p>
        </motion.div>
      </div>
    </section>
  );
}
