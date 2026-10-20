import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiBookOpen, FiCode, FiCompass } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.22, 1, 0.36, 1];

const features = [
  {
    icon: FiCode,
    title: "Applied learning",
    description:
      "Connect classroom concepts with practical projects, experimentation, and problem-solving.",
  },
  {
    icon: FiBookOpen,
    title: "Research mindset",
    description:
      "Explore emerging ideas in artificial intelligence, data science, and intelligent systems.",
  },
  {
    icon: FiCompass,
    title: "Future readiness",
    description:
      "Build the technical foundation and critical thinking to solve real-world challenges.",
  },
];

const DEFAULT_IMAGES = {
  main: {
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=85",
    alt: "Students and colleagues collaborating around computers",
  },
  left: {
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=85",
    alt: "Students collaborating on a laptop",
  },
  right: {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=85",
    alt: "A team working together on a technical project",
  },
};

const FALLBACK_SRC =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=85";

function Photo({ image, depth, caption, className = "" }) {
  return (
    <figure
      className={`ov-frame relative overflow-hidden rounded-lg bg-background/10 ${className}`}
    >
      <img
        src={image.src}
        alt={image.alt}
        data-depth={depth}
        loading="lazy"
        decoding="async"
        onError={(e) => {
          if (e.currentTarget.src !== FALLBACK_SRC) {
            e.currentTarget.src = FALLBACK_SRC;
          }
        }}
        className="ov-img absolute -top-[9%] left-0 h-[118%] w-full object-cover"
      />

      {caption && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-foreground/80 via-transparent to-transparent"
          />

          <figcaption className="absolute bottom-3 left-4 text-sm font-semibold text-background sm:bottom-4">
            {caption}
          </figcaption>
        </>
      )}
    </figure>
  );
}

export default function DepartmentOverview({ images = DEFAULT_IMAGES }) {
  const sectionRef = useRef(null);
  const reduce = Boolean(useReducedMotion());

  useEffect(() => {
    if (reduce || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Reveal photos as the section enters the viewport.
      gsap.utils.toArray(".ov-frame").forEach((frame, i) => {
        gsap.fromTo(
          frame,
          {
            clipPath: "inset(22% 0% 0% 0% round 8px)",
          },
          {
            clipPath: "inset(0% 0% 0% 0% round 8px)",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top ${96 - i * 6}%`,
              end: `top ${56 - i * 4}%`,
              scrub: 0.6,
            },
          },
        );
      });

      // Images move vertically in opposite directions as the page scrolls.
      gsap.utils.toArray(".ov-img").forEach((img) => {
        const depth = Number(img.dataset.depth || 5);

        gsap.fromTo(
          img,
          { yPercent: depth },
          {
            yPercent: -depth,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      // The divider draws across as the section scrolls into view.
      gsap.fromTo(
        ".ov-rule",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "top 15%",
            scrub: 0.5,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduce]);

  // Reveal animations replay when entering the viewport in either direction.
  const vp = () => ({
    once: false,
    amount: "some",
    margin: "0px 0px -8% 0px",
  });

  const show = (props) => (reduce ? {} : props);

  return (
    <section
      ref={sectionRef}
      id="department-overview"
      aria-labelledby="department-overview-title"
      className="relative isolate w-full overflow-hidden bg-foreground pt-5 pb-8 text-background sm:pt-6 sm:pb-9 lg:pt-7 lg:pb-10"
    >
      {/* Brand accent */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-brand"
      />

      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 2xl:px-12">
        {/* Main content */}
        <div className="grid items-start gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
          {/* Text block */}
          <div className="flex h-fit flex-col gap-4">
            <div>
              <motion.p
                initial={reduce ? false : { opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="mb-2 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-gold sm:text-sm"
              >
                <span aria-hidden="true" className="h-px w-8 bg-gold" />
                Department overview
              </motion.p>

              <h2
                id="department-overview-title"
                className="text-3xl font-bold leading-[1.06] tracking-tight text-background sm:text-4xl lg:text-[2.75rem] xl:text-5xl"
              >
                {["Where data meets", "intelligence."].map((line, i) => (
                  <span key={line} className="block overflow-hidden pb-1">
                    <motion.span
                      className="block"
                      initial={reduce ? false : { y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{
                        duration: 0.75,
                        ease: EASE,
                        delay: reduce ? 0 : i * 0.1,
                      }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h2>
            </div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
              className="relative z-10 max-w-lg space-y-2 text-sm leading-6 text-background/80 sm:text-[0.9375rem] sm:leading-6"
            >
              <p>
                The Department of Artificial Intelligence and Data Science
                brings together computing, analytical thinking, and intelligent
                technologies. Students move beyond theory to explore ideas and
                build solutions for real-world problems.
              </p>

              <p>
                Through practical learning, collaboration, and emerging
                technologies, we prepare the next generation of technology
                professionals.
              </p>
            </motion.div>

            <motion.div
              {...show({
                initial: { opacity: 0, y: 14 },
                whileInView: { opacity: 1, y: 0 },
                viewport: vp(),
                transition: {
                  duration: 0.5,
                  ease: EASE,
                  delay: 0.2,
                },
              })}
            >
              <Link
                to="/academics"
                className="group inline-flex items-center gap-2 rounded-md bg-gold px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                Explore academics
                <FiArrowUpRight
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </motion.div>
          </div>

          {/* Compact image grid */}
          <div className="grid h-[21rem] grid-cols-2 grid-rows-[1.35fr_1fr] gap-2.5 sm:h-[24rem] lg:h-[clamp(19rem,42svh,28rem)]">
            <Photo
              image={images.main}
              depth={4}
              caption="Learn, build, discover"
              className="col-span-2"
            />

            <Photo image={images.left} depth={6} />

            <Photo image={images.right} depth={6} />
          </div>
        </div>

        {/* Department highlights */}
        <div className="mt-6 sm:mt-7">
          <span
            aria-hidden="true"
            className="ov-rule block h-px w-full origin-left bg-background/20"
          />

          <ul className="grid gap-4 pt-4 sm:grid-cols-3 sm:gap-6">
            {features.map(({ icon: Icon, title, description }, i) => (
              <motion.li
                key={title}
                {...show({
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: vp(),
                  transition: {
                    duration: 0.55,
                    ease: EASE,
                    delay: i * 0.1,
                  },
                })}
                className="flex items-start gap-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-background/15 text-gold">
                  <Icon size={18} aria-hidden="true" />
                </span>

                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-background">
                    {title}
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-background/65">
                    {description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
