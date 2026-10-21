import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiMail } from "react-icons/fi";
import { LuGraduationCap } from "react-icons/lu";

const HOD = {
  name: "Dr. Shubhangi Vairagar",
  designation: "Head of Department",
  department: "Artificial Intelligence & Data Science",
  qualification: "Ph.D. in Computer Science",
  experience: "Academic experience across institutions since 2006",
  email: "hodainds.engg@dypvp.edu.in",
  profileUrl: "https://engg.dypvp.edu.in/AI-DS-Message-from-HOD-Desk.aspx",
  portrait:
    "https://engg.dypvp.edu.in/assets/img/faculty-img/aids-faculty/Vairagar-Shubhangi.JPG",
};

const EASE = [0.22, 1, 0.36, 1];

export default function HODProfile() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="hod-profile-title"
      className="relative isolate w-full overflow-hidden border-y border-border bg-surface-muted py-10 sm:py-12 lg:py-14"
    >
      {/* Restrained maroon-and-gold pattern, matching the department theme. */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        viewBox="0 0 1440 760"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle
          cx="1300"
          cy="70"
          r="230"
          fill="var(--color-brand-light)"
          opacity="0.48"
        />
        <circle
          cx="65"
          cy="700"
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
        <div className="mb-6 sm:mb-7">
          <div className="mb-3 flex items-center gap-3">
            <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-gold" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand sm:text-xs">
              Department Leadership
            </span>
            <span
              aria-hidden="true"
              className="h-px w-10 bg-border-strong sm:w-16"
            />
          </div>
          <h2
            id="hod-profile-title"
            className="text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            Head of <span className="text-brand">Department</span>
          </h2>
        </div>

        <div className="grid overflow-hidden rounded-2xl border border-border bg-surface shadow-soft lg:grid-cols-[0.78fr_1.22fr]">
          {/* Official portrait */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="relative min-h-[280px] overflow-hidden bg-brand-light sm:min-h-[340px] lg:min-h-[400px]"
          >
            <img
              src={HOD.portrait}
              alt="Dr. Shubhangi Vairagar, Head of the AI and Data Science Department"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-top transition-[filter] duration-700 ease-out hover:brightness-[1.02] motion-reduce:transition-none"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent"
            />

            {/* Corner tab: sits flush in the bottom-left, solid brand colour, no border */}
            <div className="absolute bottom-0 left-0 flex items-stretch overflow-hidden rounded-tr-xl bg-brand text-on-brand">
              <span aria-hidden="true" className="w-1.5 bg-gold" />
              <span className="flex items-center gap-2.5 py-3 pl-4 pr-6 sm:py-3.5 sm:pl-5 sm:pr-8">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rotate-45 bg-gold"
                />
                <span className="text-sm font-semibold tracking-wide sm:text-base">
                  {HOD.designation}
                </span>
              </span>
            </div>
          </motion.div>

          {/* Academic information */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.65,
              delay: reduceMotion ? 0 : 0.08,
              ease: EASE,
            }}
            className="flex min-w-0 flex-col justify-center p-5 sm:p-6 lg:p-8 xl:p-10"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              Artificial Intelligence &amp; Data Science
            </p>

            <h3 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl xl:text-5xl">
              {HOD.name}
            </h3>
            <p className="mt-2 text-base font-medium text-muted sm:text-lg">
              {HOD.designation} <span className="text-border-strong">·</span>{" "}
              Assistant Professor
            </p>

            {/* Qualification */}
            <div className="mt-5 border-y border-border">
              <div className="flex items-start gap-4 py-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand">
                  <LuGraduationCap
                    size={20}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                    Qualification
                  </p>
                  <p className="mt-1.5 text-base font-semibold leading-6 text-foreground">
                    {HOD.qualification}
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm leading-7 text-muted">
              {HOD.experience}. Supporting students through academic guidance,
              research, and practical learning in AI and data science.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <a
                href={`mailto:${HOD.email}`}
                className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-lg border border-border-strong bg-surface px-4 py-2.5 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:transition-none"
              >
                <FiMail size={16} aria-hidden="true" />
                {HOD.email}
              </a>

              <a
                href={HOD.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-on-brand transition-colors duration-300 hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:transition-none sm:self-auto"
              >
                Official profile
                <FiArrowUpRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
