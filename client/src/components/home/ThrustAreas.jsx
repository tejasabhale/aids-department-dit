import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiCheckCircle, FiCpu, FiDatabase, FiEye } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    number: "01",
    icon: FiCpu,
    label: "Intelligent Systems",
    title: "Generative AI & Large Language Models",
    description:
      "Explore language models, generative systems, and multimodal AI.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Abstract artificial intelligence visualization",
  },
  {
    number: "02",
    icon: FiEye,
    label: "Visual Intelligence",
    title: "Computer Vision",
    description:
      "Build systems that interpret images, video, and the world around them.",
    image:
      "https://images.unsplash.com/photo-1535378620166-273708d44e4c?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Robotics and intelligent technology",
  },
  {
    number: "03",
    icon: FiDatabase,
    label: "Data & Deployment",
    title: "Data Engineering & MLOps",
    description:
      "Design scalable data pipelines and deploy reliable machine-learning systems.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85",
    imageAlt:
      "Server infrastructure representing data engineering and cloud systems",
  },
];

const EASE = [0.22, 1, 0.36, 1];

/* Reveals replay when scrolling down and back up. */
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
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

const drawLine = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.7, ease: EASE },
  },
};

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */

function PillarCard({ pillar, index }) {
  const Icon = pillar.icon;

  return (
    <motion.article
      variants={rise}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-on-brand/10 bg-on-brand/5 p-2 transition-colors duration-500 hover:border-gold/50 motion-reduce:transition-none"
    >
      {/* Inset media */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-foreground lg:aspect-[16/9]">
        <div className="thrust-card-media absolute -inset-y-[6%] inset-x-0">
          <img
            src={pillar.image}
            alt={pillar.imageAlt}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
          />
        </div>

        <span className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/80 text-gold backdrop-blur-sm transition-colors duration-300 group-hover:bg-gold group-hover:text-foreground motion-reduce:transition-none">
          <Icon size={18} aria-hidden="true" />
        </span>

        <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-foreground/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-on-brand backdrop-blur-sm">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-gold"
          />
          {pillar.label}
        </span>
      </div>

      {/* Content */}
      <div className="relative flex flex-1 flex-col px-3 pb-5 pt-4 sm:px-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-bold leading-snug tracking-tight text-on-brand sm:text-xl">
            {pillar.title}
          </h3>

          <span
            aria-hidden="true"
            className="select-none text-4xl font-bold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_color-mix(in_srgb,var(--color-on-brand)_30%,transparent)] [transition-property:color,-webkit-text-stroke-color] duration-500 group-hover:text-gold/15 group-hover:[-webkit-text-stroke-color:var(--color-gold)] motion-reduce:transition-none"
          >
            {pillar.number}
          </span>
        </div>

        <p className="mt-2 max-w-prose text-sm leading-6 text-on-brand/70">
          {pillar.description}
        </p>
      </div>

      {/* Gold underline draws in on hover */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[3px] w-0 bg-gold transition-[width] duration-500 ease-out group-hover:w-full motion-reduce:transition-none"
      />
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function ThrustAreas() {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || shouldReduceMotion) return undefined;

    // Use the single global Lenis instance from SmoothScroll.jsx.
    // This component only manages its own GSAP parallax animations.
    const context = gsap.context(() => {
      gsap.utils.toArray(".thrust-card-media").forEach((element) => {
        gsap.fromTo(
          element,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: element.closest("article") || section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    }, section);

    ScrollTrigger.refresh();

    return () => {
      context.revert();
    };
  }, [shouldReduceMotion]);

  const hasThreeCards = pillars.length <= 3;

  const fadeEdges =
    "radial-gradient(ellipse 90% 85% at 50% 50%, #000 35%, transparent 100%)";

  return (
    <section
      ref={sectionRef}
      id="thrust-areas"
      aria-labelledby="thrust-areas-title"
      className={`thrust-areas-screen relative isolate w-full overflow-hidden bg-foreground py-8 sm:py-10 lg:py-6 ${
        hasThreeCards ? "lg:h-[100svh] lg:min-h-[680px]" : "lg:min-h-[100svh]"
      }`}
    >
      <style>{`
        @media (min-width: 1024px) and (max-height: 740px) {
          .thrust-areas-screen {
            height: auto;
            min-height: 100svh;
          }
        }
      `}</style>

      {/* Subtle light grid fading toward the edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in srgb, var(--color-on-brand) 3%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--color-on-brand) 3%, transparent) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: fadeEdges,
          WebkitMaskImage: fadeEdges,
        }}
      />

      <div className="relative mx-auto flex h-full w-full max-w-[1600px] flex-col justify-center px-4 sm:px-6 lg:px-8 2xl:px-12">
        {/* Header */}
        <motion.div
          variants={shouldReduceMotion ? undefined : container}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ amount: 0.4 }}
          className="grid items-end gap-4 lg:grid-cols-[1.3fr_1fr] lg:gap-12"
        >
          <div>
            <motion.div
              variants={rise}
              className="mb-3 flex items-center gap-3"
            >
              <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-gold" />

              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold sm:text-xs">
                Curricular Pillars
              </span>

              <motion.span
                aria-hidden="true"
                variants={shouldReduceMotion ? undefined : drawLine}
                className="h-px w-12 origin-left bg-on-brand/25 sm:w-20"
              />
            </motion.div>

            <motion.h2
              id="thrust-areas-title"
              variants={rise}
              className="text-2xl font-bold leading-tight tracking-tight text-on-brand sm:text-3xl lg:text-4xl xl:text-[2.65rem]"
            >
              Thrust Areas of{" "}
              <span className="text-gold">Learning &amp; Innovation</span>
            </motion.h2>
          </div>

          <motion.p
            variants={rise}
            className="max-w-xl border-l-2 border-gold pl-4 text-xs leading-5 text-on-brand/70 sm:text-sm sm:leading-6 lg:text-[15px]"
          >
            Explore the domains shaping intelligent applications, visual
            systems, and scalable data engineering.
          </motion.p>
        </motion.div>

        {/* Responsive cards */}
        <motion.div
          variants={shouldReduceMotion ? undefined : container}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ amount: 0.2 }}
          className="mt-6 grid w-full grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:mt-7 lg:grid-cols-3 lg:gap-5"
        >
          {pillars.map((pillar, index) => (
            <PillarCard key={pillar.number} pillar={pillar} index={index} />
          ))}
        </motion.div>

        {/* Closing statement */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ amount: 0.8 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mx-auto mt-5 flex w-full max-w-2xl items-center justify-center gap-3 text-center"
        >
          <span aria-hidden="true" className="h-px flex-1 bg-on-brand/15" />

          <p className="flex items-center gap-2 text-[10px] font-semibold text-on-brand/60 sm:text-xs">
            <FiCheckCircle className="shrink-0 text-gold" aria-hidden="true" />
            Theory. Experimentation. Real-world impact.
          </p>

          <span aria-hidden="true" className="h-px flex-1 bg-on-brand/15" />
        </motion.div>
      </div>
    </section>
  );
}
