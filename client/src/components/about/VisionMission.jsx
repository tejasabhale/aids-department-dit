import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiEye } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.22, 1, 0.36, 1];

const VISION =
  "To empower students through quality education and holistic growth towards building technically skilled AI&DS professionals.";

const missions = [
  {
    id: "M1",
    title: "Strong technical foundations",
    description:
      "To impart foundational and applied technical knowledge through effective teaching–learning practices.",
  },
  {
    id: "M2",
    title: "Problem-solving and lifelong learning",
    description:
      "To cultivate problem-solving and project development skills and promote lifelong learning among students in Artificial Intelligence and Data Science.",
  },
  {
    id: "M3",
    title: "Holistic and ethical development",
    description:
      "To nurture students with holistic development, ethical values, professionalism, and social responsibility.",
  },
];

export default function VisionMission() {
  const sectionRef = useRef(null);
  const reduce = Boolean(useReducedMotion());

  useEffect(() => {
    if (reduce || !sectionRef.current) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".vm-vision-text",
        { y: 20 },
        {
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        ".vm-rings",
        { rotation: -25 },
        {
          rotation: 25,
          ease: "none",
          transformOrigin: "50% 50%",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        ".vm-vision",
        { clipPath: "inset(16% 0% 0% 0% round 8px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 8px)",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "top 50%",
            scrub: 0.6,
          },
        },
      );

      gsap.fromTo(
        ".vm-rule",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left center",
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            end: "top 15%",
            scrub: 0.5,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduce]);

  const vp = () => ({
    once: false,
    amount: "some",
    margin: "0px 0px -8% 0px",
  });
  const show = (props) => (reduce ? {} : props);

  return (
    <section
      ref={sectionRef}
      id="vision-mission"
      aria-labelledby="vision-mission-heading"
      className="relative isolate w-full overflow-hidden bg-surface-muted pb-12 pt-5 text-foreground sm:pb-14 sm:pt-6 lg:pb-16 lg:pt-7"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-brand"
      />

      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 2xl:px-12">
        {/* Header row */}
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            {/* Animate the eyebrow on mount so it cannot remain invisible if
                an in-view observer misses its initial intersection. */}
            <motion.p
              initial={reduce ? false : { opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="mb-3 flex items-center gap-3 text-sm font-semibold text-gold-dark"
            >
              <span aria-hidden="true" className="h-px w-8 bg-gold" />
              Our purpose and direction
            </motion.p>

            <h2
              id="vision-mission-heading"
              className="text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              {[
                { text: "Guided by purpose.", tone: "text-foreground" },
                { text: "Driven by possibility.", tone: "text-brand" },
              ].map((line, i) => (
                <span key={line.text} className="block overflow-hidden pb-1">
                  <motion.span
                    className={`block ${line.tone}`}
                    initial={reduce ? false : { y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 0.75,
                      ease: EASE,
                      delay: i * 0.1,
                    }}
                  >
                    {line.text}
                  </motion.span>
                </span>
              ))}
            </h2>
          </div>

          <motion.div
            {...show({
              initial: { opacity: 0, y: 14 },
              whileInView: { opacity: 1, y: 0 },
              viewport: vp(),
              transition: { duration: 0.5, ease: EASE, delay: 0.15 },
            })}
          >
            <a
              href="#department-overview"
              className="group inline-flex items-center gap-2 border-b-2 border-gold pb-1 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand"
            >
              Discover our department
              <FiArrowUpRight
                size={17}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </motion.div>
        </div>

        {/* Vision and mission panels */}
        <div className="grid items-stretch gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
          {/* Vision */}
          <article className="vm-vision relative isolate flex flex-col justify-between gap-8 overflow-hidden rounded-lg bg-brand-dark p-6 text-background sm:p-8 lg:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle, color-mix(in srgb, var(--color-gold) 35%, transparent) 1.4px, transparent 1.8px)",
                backgroundSize: "22px 22px",
                WebkitMaskImage:
                  "radial-gradient(ellipse 85% 80% at 100% 0%, #000 0%, transparent 75%)",
                maskImage:
                  "radial-gradient(ellipse 85% 80% at 100% 0%, #000 0%, transparent 75%)",
              }}
            />

            <svg
              aria-hidden="true"
              viewBox="0 0 400 400"
              className="vm-rings pointer-events-none absolute -bottom-28 -right-28 -z-10 h-80 w-80 sm:h-96 sm:w-96"
              fill="none"
              stroke="var(--color-gold)"
            >
              <circle
                cx="200"
                cy="200"
                r="190"
                strokeWidth="1.5"
                opacity="0.28"
              />
              <circle
                cx="200"
                cy="200"
                r="140"
                strokeWidth="1.5"
                opacity="0.22"
                strokeDasharray="4 10"
              />
              <circle
                cx="200"
                cy="200"
                r="90"
                strokeWidth="1.5"
                opacity="0.28"
              />
              <circle
                cx="200"
                cy="10"
                r="5"
                fill="var(--color-gold)"
                stroke="none"
                opacity="0.7"
              />
              <circle
                cx="340"
                cy="200"
                r="4"
                fill="var(--color-gold)"
                stroke="none"
                opacity="0.6"
              />
              <circle
                cx="200"
                cy="290"
                r="4"
                fill="var(--color-gold)"
                stroke="none"
                opacity="0.6"
              />
            </svg>

            <motion.div
              {...show({
                initial: { opacity: 0, y: 18 },
                whileInView: { opacity: 1, y: 0 },
                viewport: vp(),
                transition: { duration: 0.55, ease: EASE },
              })}
              className="flex items-center gap-3"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-gold text-foreground">
                <FiEye size={20} aria-hidden="true" />
              </span>
              <h3 className="text-xl font-bold text-background sm:text-2xl">
                Our vision
              </h3>
            </motion.div>

            <motion.div
              {...show({
                initial: { opacity: 0, y: 24 },
                whileInView: { opacity: 1, y: 0 },
                viewport: vp(),
                transition: { duration: 0.65, ease: EASE, delay: 0.1 },
              })}
            >
              <p className="vm-vision-text text-2xl font-semibold leading-snug tracking-tight text-background sm:text-3xl">
                {VISION}
              </p>
            </motion.div>

            <span aria-hidden="true" className="block h-1 w-12 bg-gold" />
          </article>

          {/* Mission */}
          <div className="flex flex-col">
            <motion.h3
              {...show({
                initial: { opacity: 0, y: 18 },
                whileInView: { opacity: 1, y: 0 },
                viewport: vp(),
                transition: { duration: 0.55, ease: EASE, delay: 0.05 },
              })}
              className="mb-4 text-xl font-bold text-foreground sm:text-2xl"
            >
              Our mission
            </motion.h3>

            <ul className="flex flex-1 flex-col">
              {missions.map((mission, index) => (
                <motion.li
                  key={mission.id}
                  {...show({
                    initial: { opacity: 0, x: 24 },
                    whileInView: { opacity: 1, x: 0 },
                    viewport: vp(),
                    transition: {
                      duration: 0.55,
                      ease: EASE,
                      delay: index * 0.1,
                    },
                  })}
                  className="group relative flex flex-1 items-center gap-4 py-5 sm:gap-5"
                >
                  <span
                    aria-hidden="true"
                    className="vm-rule absolute inset-x-0 top-0 h-px origin-left bg-border-strong"
                  />
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border-strong bg-background text-sm font-bold text-brand transition-colors duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-on-brand sm:h-12 sm:w-12">
                    {mission.id}
                  </span>

                  <div className="min-w-0">
                    <h4 className="text-lg font-semibold leading-snug text-foreground sm:text-xl">
                      {mission.title}
                    </h4>
                    <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
                      {mission.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
