import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiMail } from "react-icons/fi";

const HOD_MESSAGE = {
  name: "Dr. Shubhangi Vairagar",
  designation: "Head of the Department",
  department: "Artificial Intelligence & Data Science",
  email: "hodainds.engg@dypvp.edu.in",
  portrait:
    "https://engg.dypvp.edu.in/assets/img/faculty-img/aids-faculty/Vairagar-Shubhangi.JPG",
  officialMessageUrl:
    "https://engg.dypvp.edu.in/AI-DS-Message-from-HoD-Desk.aspx",
  // Homepage-friendly adaptation of the institute's published HOD message;
  // this is not a verbatim quotation. Obtain approval before publishing.
  paragraphs: [
    "Welcome to the Department of Artificial Intelligence and Data Science. As this field continues to evolve, our aim is to give students a strong academic foundation, practical skills, and the confidence to approach new challenges with curiosity.",
    "Through research, industry collaboration, seminars, and project-based learning, we encourage every student to turn knowledge into meaningful work. I invite you to connect with our faculty, take part in the opportunities around you, and help build a learning community grounded in collaboration and innovation.",
  ],
};

const EASE = [0.22, 1, 0.36, 1];

export default function HODMessage() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="hod-message-title"
      className="relative isolate w-full overflow-hidden border-y border-border bg-surface-muted py-12 sm:py-16 lg:py-20"
    >
      {/* Subtle maroon-and-gold pattern, matching the department theme */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        viewBox="0 0 1440 760"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle
          cx="1310"
          cy="55"
          r="220"
          fill="var(--color-brand-light)"
          opacity="0.48"
        />
        <circle
          cx="65"
          cy="710"
          r="175"
          fill="var(--color-gold-light)"
          opacity="0.58"
        />
        <g
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="1"
          opacity="0.045"
        >
          <path d="M-100 210 C190 155 410 260 700 205 S1200 155 1540 210" />
          <path d="M-100 246 C190 191 410 296 700 241 S1200 191 1540 246" />
        </g>
      </svg>

      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 2xl:px-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mb-7 sm:mb-9"
        >
          <div className="mb-3 flex items-center gap-3">
            <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-gold" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand sm:text-xs">
              From the HOD's Desk
            </span>
            <span
              aria-hidden="true"
              className="h-px w-10 bg-border-strong sm:w-16"
            />
          </div>

          <h2
            id="hod-message-title"
            className="text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            A message from our{" "}
            <span className="text-brand">Head of Department</span>
          </h2>
        </motion.div>

        <div className="grid overflow-hidden rounded-2xl border border-border bg-surface shadow-soft lg:grid-cols-[0.72fr_1.28fr]">
          {/* Portrait */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -14 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative min-h-[310px] overflow-hidden bg-brand-light sm:min-h-[380px] lg:min-h-[440px]"
          >
            <img
              src={HOD_MESSAGE.portrait}
              alt={`Portrait of ${HOD_MESSAGE.name}`}
              loading="lazy"
              decoding="async"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-foreground/65 via-transparent to-brand/5"
            />
            <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-on-brand/30 bg-foreground/65 px-3.5 py-2 text-xs font-semibold text-on-brand backdrop-blur-sm">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-gold"
                />
                Department Leadership
              </span>
            </div>
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-1 w-full bg-gold"
            />
          </motion.div>

          {/* Message */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.6,
              delay: reduceMotion ? 0 : 0.08,
              ease: EASE,
            }}
            className="flex min-w-0 flex-col justify-center p-5 sm:p-8 lg:p-10 xl:p-12"
          >
            <span
              aria-hidden="true"
              className="mb-4 block font-serif text-6xl leading-none text-gold"
            >
              “
            </span>

            <div className="space-y-4 text-sm leading-7 text-muted sm:text-base sm:leading-8">
              {HOD_MESSAGE.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-7 border-t border-border pt-5 sm:mt-8 sm:flex sm:items-end sm:justify-between sm:gap-5">
              <div>
                <p className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
                  {HOD_MESSAGE.name}
                </p>
                <p className="mt-1 text-sm font-medium text-brand">
                  {HOD_MESSAGE.designation}
                </p>
                <p className="text-xs leading-5 text-muted">
                  {HOD_MESSAGE.department}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-0 sm:justify-end">
                <a
                  href={`mailto:${HOD_MESSAGE.email}`}
                  aria-label={`Email ${HOD_MESSAGE.name}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border-strong bg-surface text-brand transition-colors duration-200 hover:border-brand hover:bg-brand hover:text-on-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:transition-none"
                >
                  <FiMail size={17} aria-hidden="true" />
                </a>
                <a
                  href={HOD_MESSAGE.officialMessageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-10 items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-on-brand transition-colors duration-200 hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:transition-none"
                >
                  Read full message
                  <FiArrowUpRight
                    size={15}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                  />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
