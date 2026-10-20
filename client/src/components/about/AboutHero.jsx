import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiCheckCircle } from "react-icons/fi";

const EASE = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const rise = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

const pop = {
  hidden: { opacity: 0, y: 28, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: EASE },
  },
};

const drawLine = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.7, ease: EASE },
  },
};

const DEFAULT_IMAGES = {
  arch: {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=85&auto=format&fit=crop",
    alt: "A team working together on a technical project",
  },
  circle: {
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=85&auto=format&fit=crop",
    alt: "Students collaborating on a laptop",
  },
  tile: {
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=85&auto=format&fit=crop",
    alt: "Students and colleagues collaborating around computers",
  },
};



export default function AboutHero({ images = DEFAULT_IMAGES }) {
  const shouldReduceMotion = useReducedMotion();
  const reduce = Boolean(shouldReduceMotion);

  const v = (variants) => (reduce ? undefined : variants);

  return (
    <section
      id="about-hero"
      aria-labelledby="about-hero-title"
      className="relative isolate w-full overflow-hidden bg-background pb-12 pt-28 sm:pb-16 sm:pt-32 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-10 lg:pt-24"
      style={{
        backgroundImage:
          "radial-gradient(circle at 5% 15%, rgb(209 165 80 / 10%), transparent 27%), radial-gradient(circle at 92% 80%, rgb(178 43 47 / 6%), transparent 30%)",
      }}
    >
      {/* Background pattern */}
      <svg
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <circle
          cx="1270"
          cy="130"
          r="240"
          fill="var(--color-brand-light, #f8e9e9)"
          opacity="0.48"
        />
        <circle
          cx="110"
          cy="820"
          r="190"
          fill="var(--color-gold-light, #f8f0df)"
          opacity="0.65"
        />
        <path
          d="M -100 300 C 230 230 470 375 760 300 S 1250 245 1540 320"
          stroke="var(--color-border, #e8e1e1)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M -100 365 C 230 295 470 440 760 365 S 1250 310 1540 385"
          stroke="var(--color-border, #e8e1e1)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.55"
        />
        {Array.from({ length: 20 }).map((_, index) => (
          <circle
            key={index}
            cx={64 + (index % 5) * 30}
            cy={650 + Math.floor(index / 5) * 30}
            r="2"
            fill="var(--color-gold, #d1a550)"
            opacity="0.45"
          />
        ))}
      </svg>

      <motion.div
        variants={v(container)}
        initial={reduce ? false : "hidden"}
        animate={reduce ? undefined : "visible"}
        className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 2xl:px-12"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          {/* Copy */}
          <div>
            <motion.h1
              id="about-hero-title"
              variants={v(rise)}
              className="text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-[4.25rem]"
            >
              Department of{" "}
              <span className="text-brand">
                Artificial Intelligence &amp; Data Science
              </span>
            </motion.h1>

            <motion.p
              variants={v(rise)}
              className="mt-6 max-w-xl border-l-2 border-gold pl-4 text-sm leading-6 text-muted sm:text-base sm:leading-7"
            >
              We teach students to build intelligent systems, from the data
              underneath them to the models and products on top, through
              hands-on projects and close mentoring.
            </motion.p>
          </div>

          {/* Collage */}
          <div className="relative isolate mx-auto aspect-[5/6] w-full max-w-[460px] lg:ml-auto lg:aspect-auto lg:h-[min(58svh,540px)] lg:max-w-[560px]">
            {/* Outlined ring behind the arch */}
            <motion.span
              aria-hidden="true"
              variants={v(pop)}
              className="absolute -right-[4%] -top-[3%] z-0 aspect-square h-[72%] rounded-full border border-gold/40"
            />

            {/* Arch */}
            <motion.div
              variants={v(pop)}
              className="group absolute right-0 top-0 z-10 h-[88%] w-[62%] overflow-hidden rounded-b-3xl rounded-t-[999px] border-[6px] border-white bg-surface-muted shadow-card"
            >
              <img
                src={images.arch.src}
                alt={images.arch.alt}
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
              />
            </motion.div>

            {/* Small tile */}
            <motion.div
              variants={v(pop)}
              className="group absolute left-[4%] top-[8%] z-10 aspect-[4/5] w-[27%] overflow-hidden rounded-2xl border-[5px] border-white bg-surface-muted shadow-card"
            >
              <img
                src={images.tile.src}
                alt={images.tile.alt}
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
              />
            </motion.div>

            {/* Circle */}
            <motion.div
              variants={v(pop)}
              className="group absolute bottom-[10%] left-0 z-20 aspect-square w-[40%] overflow-hidden rounded-full border-[6px] border-white bg-surface-muted shadow-card"
            >
              <img
                src={images.circle.src}
                alt={images.circle.alt}
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
