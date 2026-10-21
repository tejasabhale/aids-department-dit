import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

/*
 * SAMPLE DIRECTORY DATA
 * Names and details are illustrative, not a verified staff list.
 * Put the official portraits in /public/images/faculty/<id>.jpg
 * (face in the upper half). If a file is missing, a monogram is shown.
 */
const FACULTY = [
  {
    id: "ananya-kulkarni",
    name: "Dr. Ananya Kulkarni",
    designation: "Associate Professor",
    qualification: "Ph.D. in Computer Science",
    specializations: ["Machine Learning", "Deep Learning"],
    image: "/images/faculty/ananya-kulkarni.jpg",
    profileUrl: "/faculty/ananya-kulkarni",
  },
  {
    id: "rahul-deshmukh",
    name: "Dr. Rahul Deshmukh",
    designation: "Assistant Professor",
    qualification: "Ph.D. in Computer Science",
    specializations: ["Computer Vision", "Pattern Recognition"],
    image: "/images/faculty/rahul-deshmukh.jpg",
    profileUrl: "/faculty/rahul-deshmukh",
  },
  {
    id: "meera-iyer",
    name: "Dr. Meera Iyer",
    designation: "Assistant Professor",
    qualification: "Ph.D. in Information Technology",
    specializations: ["Natural Language Processing", "Data Mining"],
    image: "/images/faculty/meera-iyer.jpg",
    profileUrl: "/faculty/meera-iyer",
  },
  {
    id: "arjun-nair",
    name: "Prof. Arjun Nair",
    designation: "Assistant Professor",
    qualification: "M.Tech. in Artificial Intelligence",
    specializations: ["Data Science", "Big Data Analytics"],
    image: "/images/faculty/arjun-nair.jpg",
    profileUrl: "/faculty/arjun-nair",
  },
  {
    id: "sneha-joshi",
    name: "Dr. Sneha Joshi",
    designation: "Assistant Professor",
    qualification: "Ph.D. in Computer Science",
    specializations: ["Software Engineering", "MLOps"],
    image: "/images/faculty/sneha-joshi.jpg",
    profileUrl: "/faculty/sneha-joshi",
  },
  {
    id: "amit-patil",
    name: "Prof. Amit Patil",
    designation: "Assistant Professor",
    qualification: "M.E. in Computer Engineering",
    specializations: ["Algorithms", "Distributed Systems"],
    image: "/images/faculty/amit-patil.jpg",
    profileUrl: "/faculty/amit-patil",
  },
];

const EASE = [0.22, 1, 0.36, 1];

const initialsOf = (name) =>
  name
    .replace(/^(Dr\.|Prof\.)\s*/, "")
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

function FacultyCard({ faculty, index, reduceMotion }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.45,
        delay: reduceMotion ? 0 : (index % 3) * 0.06,
        ease: EASE,
      }}
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-surface transition-[border-color,box-shadow] duration-300 ease-out hover:border-brand/35 hover:shadow-soft motion-reduce:transition-none"
    >
      {/* Photo: same size on every card */}
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-brand-light">
        {!imageFailed ? (
          <img
            src={faculty.image}
            alt={`Portrait of ${faculty.name}`}
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
            className="absolute inset-0 h-full w-full object-cover object-top transition-[filter] duration-500 ease-out group-hover:brightness-[1.04] motion-reduce:transition-none"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center bg-brand-light text-5xl font-bold text-brand"
          >
            {initialsOf(faculty.name)}
          </div>
        )}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gold transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
        />
      </div>

      {/* Body: fixed padding, left aligned, rows line up across cards */}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand">
          {faculty.designation}
        </p>

        <h3 className="mt-2 text-xl font-bold leading-tight tracking-tight text-foreground">
          {faculty.name}
        </h3>

        <p className="mt-1.5 text-sm leading-5 text-muted">
          {faculty.qualification}
        </p>

        <ul
          aria-label="Specializations"
          className="mt-4 flex flex-wrap content-start gap-2"
        >
          {faculty.specializations.map((specialization) => (
            <li
              key={specialization}
              className="rounded-md border border-border bg-surface-muted px-2.5 py-1 text-xs font-medium leading-4 text-foreground"
            >
              {specialization}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5">
          <div className="border-t border-border pt-4">
            <Link
              to={faculty.profileUrl}
              aria-label={`View profile of ${faculty.name}`}
              className="group/link inline-flex min-h-8 items-center gap-1.5 text-sm font-semibold text-brand transition-colors duration-200 hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold motion-reduce:transition-none"
            >
              View profile
              <FiArrowUpRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 motion-reduce:transition-none"
              />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function FacultyDirectory() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="faculty-directory-title"
      className="relative isolate w-full overflow-hidden bg-surface-muted py-14 sm:py-16 lg:py-20"
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        viewBox="0 0 1440 760"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle
          cx="1320"
          cy="55"
          r="210"
          fill="var(--color-brand-light)"
          opacity="0.42"
        />
        <circle
          cx="65"
          cy="710"
          r="165"
          fill="var(--color-gold-light)"
          opacity="0.48"
        />
        <g
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="1"
          opacity="0.035"
        >
          <path d="M-100 210 C190 155 410 260 700 205 S1200 155 1540 210" />
          <path d="M-100 246 C190 191 410 296 700 241 S1200 191 1540 246" />
        </g>
      </svg>

      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 2xl:px-12">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 flex items-center gap-3">
              <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand sm:text-xs">
                Meet the team
              </span>
              <span
                aria-hidden="true"
                className="h-px w-10 bg-border-strong sm:w-16"
              />
            </div>

            <h2
              id="faculty-directory-title"
              className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Faculty <span className="text-brand">Directory</span>
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">
              Meet the educators and researchers supporting learning,
              innovation, and discovery.
            </p>
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            {FACULTY.length} faculty members
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {FACULTY.map((faculty, index) => (
            <FacultyCard
              key={faculty.id}
              faculty={faculty}
              index={index}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
