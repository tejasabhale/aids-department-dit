import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const rise = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const DEFAULT_BG = {
  src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80&auto=format&fit=crop",
};

export default function AboutHero({ backgroundImage = DEFAULT_BG }) {
  const shouldReduceMotion = useReducedMotion();
  const reduce = Boolean(shouldReduceMotion);
  const v = (variants) => (reduce ? undefined : variants);

  return (
    <section
      id="about-hero"
      aria-labelledby="about-hero-title"
      className="relative isolate flex w-full items-center justify-center overflow-hidden bg-background px-4 pb-28 pt-24 sm:px-6 sm:pb-32 sm:pt-28 lg:min-h-[90svh] lg:px-8 lg:pb-36 lg:pt-28"
    >
      {/* Background image (low opacity, decorative) */}
      <img
        src={backgroundImage.src}
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        className="pointer-events-none absolute inset-0 -z-30 h-full w-full object-cover opacity-[0.12] sm:opacity-[0.14]"
      />

      {/* Soft gold glow + fade so text stays readable */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgb(209 165 80 / 14%), transparent 45%), linear-gradient(to bottom, transparent 60%, var(--color-background, #fff) 100%)",
        }}
      />

      {/* Background pattern: a light diamond lattice that fades toward the text */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 80% at 50% 50%, transparent 20%, #000 100%)",
          maskImage:
            "radial-gradient(ellipse 85% 80% at 50% 50%, transparent 20%, #000 100%)",
        }}
      >
        <defs>
          <pattern
            id="about-hero-lattice"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 24 0 L 48 24 L 24 48 L 0 24 Z"
              fill="none"
              stroke="var(--color-gold, #d1a550)"
              strokeWidth="1"
              opacity="0.35"
            />
            <circle
              cx="24"
              cy="24"
              r="1.5"
              fill="var(--color-brand, #b22b2f)"
              opacity="0.3"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#about-hero-lattice)" />
      </svg>

      <motion.div
        variants={v(container)}
        initial={reduce ? false : "hidden"}
        animate={reduce ? undefined : "visible"}
        className="relative mx-auto flex w-full max-w-4xl flex-col items-center text-center"
      >
        {/* Ornament */}
        <motion.div
          variants={v(rise)}
          aria-hidden="true"
          className="mb-6 flex items-center gap-3 sm:mb-8"
        >
          <span className="h-px w-10 bg-gold sm:w-16" />
          <span className="h-2 w-2 rotate-45 bg-brand" />
          <span className="h-px w-10 bg-gold sm:w-16" />
        </motion.div>

        <motion.h1
          id="about-hero-title"
          variants={v(rise)}
          className="break-words font-serif font-bold leading-[1.1] tracking-tight text-foreground"
        >
          <span
            className="mb-3 block font-sans text-base font-semibold tracking-normal sm:mb-4 sm:text-lg"
            style={{
              color: "color-mix(in srgb, var(--color-gold, #d1a550) 78%, #000)",
            }}
          >
            Department of
          </span>
          <span className="block text-balance text-[clamp(2rem,1.2rem+4vw,4.25rem)]">
            <span className="text-foreground">Artificial Intelligence</span>{" "}
            <span className="text-brand">&amp; Data Science</span>
          </span>
        </motion.h1>

        <motion.p
          variants={v(rise)}
          className="mt-6 max-w-xl text-sm leading-6 text-foreground/80 sm:mt-8 sm:max-w-2xl sm:text-base sm:leading-7 lg:text-lg lg:leading-8"
        >
          We teach students to build intelligent systems, from the data
          underneath them to the models and products on top, through hands-on
          projects and close mentoring.
        </motion.p>
      </motion.div>
    </section>
  );
}
