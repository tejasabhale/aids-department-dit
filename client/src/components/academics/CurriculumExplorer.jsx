import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FiBookOpen, FiCheck, FiChevronDown, FiDownload } from "react-icons/fi";

/*
 * DEMO CURRICULUM DATA
 * Replace the sample subjects, course codes, credits, and PDF paths with
 * the department's approved curriculum and official syllabus documents.
 *
 * Download behaviour: the button first tries to fetch `syllabusUrl`
 * (e.g. put real files in public/documents/syllabus/semester-1.pdf).
 * If that file is missing, a themed PDF is generated from the data below,
 * so the button always downloads a real .pdf for the selected semester.
 */
const semesters = [
  {
    id: 1,
    label: "Semester 1",
    syllabusUrl: "/documents/syllabus/semester-1.pdf",
    subjects: [
      {
        code: "AIDS101",
        name: "Engineering Mathematics I",
        type: "Theory",
        credits: 4,
      },
      {
        code: "AIDS102",
        name: "Programming Fundamentals",
        type: "Theory",
        credits: 3,
      },
      {
        code: "AIDS103",
        name: "Engineering Physics",
        type: "Theory",
        credits: 3,
      },
      {
        code: "AIDS104L",
        name: "Programming Fundamentals Lab",
        type: "Practical",
        credits: 1,
      },
      {
        code: "AIDS105L",
        name: "Engineering Workshop",
        type: "Practical",
        credits: 1,
      },
    ],
  },
  {
    id: 2,
    label: "Semester 2",
    syllabusUrl: "/documents/syllabus/semester-2.pdf",
    subjects: [
      {
        code: "AIDS201",
        name: "Engineering Mathematics II",
        type: "Theory",
        credits: 4,
      },
      {
        code: "AIDS202",
        name: "Object-Oriented Programming",
        type: "Theory",
        credits: 3,
      },
      {
        code: "AIDS203",
        name: "Basic Electrical Engineering",
        type: "Theory",
        credits: 3,
      },
      {
        code: "AIDS204L",
        name: "Object-Oriented Programming Lab",
        type: "Practical",
        credits: 1,
      },
      {
        code: "AIDS205L",
        name: "Engineering Graphics Lab",
        type: "Practical",
        credits: 1,
      },
    ],
  },
  {
    id: 3,
    label: "Semester 3",
    syllabusUrl: "/documents/syllabus/semester-3.pdf",
    subjects: [
      {
        code: "AIDS301",
        name: "Discrete Mathematics",
        type: "Theory",
        credits: 3,
      },
      {
        code: "AIDS302",
        name: "Data Structures and Algorithms",
        type: "Theory",
        credits: 3,
      },
      {
        code: "AIDS303",
        name: "Digital Logic Design",
        type: "Theory",
        credits: 3,
      },
      {
        code: "AIDS304L",
        name: "Data Structures Lab",
        type: "Practical",
        credits: 1,
      },
      {
        code: "AIDS305L",
        name: "Database Systems Lab",
        type: "Practical",
        credits: 1,
      },
    ],
  },
  {
    id: 4,
    label: "Semester 4",
    syllabusUrl: "/documents/syllabus/semester-4.pdf",
    subjects: [
      {
        code: "AIDS401",
        name: "Probability and Statistics",
        type: "Theory",
        credits: 3,
      },
      {
        code: "AIDS402",
        name: "Database Management Systems",
        type: "Theory",
        credits: 3,
      },
      {
        code: "AIDS403",
        name: "Design and Analysis of Algorithms",
        type: "Theory",
        credits: 3,
      },
      {
        code: "AIDS404L",
        name: "Database Management Systems Lab",
        type: "Practical",
        credits: 1,
      },
      {
        code: "AIDS405L",
        name: "Algorithm Design Lab",
        type: "Practical",
        credits: 1,
      },
    ],
  },
  {
    id: 5,
    label: "Semester 5",
    syllabusUrl: "/documents/syllabus/semester-5.pdf",
    subjects: [
      { code: "AIDS501", name: "Machine Learning", type: "Theory", credits: 3 },
      {
        code: "AIDS502",
        name: "Operating Systems",
        type: "Theory",
        credits: 3,
      },
      {
        code: "AIDS503",
        name: "Computer Networks",
        type: "Theory",
        credits: 3,
      },
      {
        code: "AIDS504L",
        name: "Machine Learning Lab",
        type: "Practical",
        credits: 1,
      },
      {
        code: "AIDS505L",
        name: "Full-Stack Development Lab",
        type: "Practical",
        credits: 1,
      },
    ],
  },
  {
    id: 6,
    label: "Semester 6",
    syllabusUrl: "/documents/syllabus/semester-6.pdf",
    subjects: [
      { code: "AIDS601", name: "Deep Learning", type: "Theory", credits: 3 },
      {
        code: "AIDS602",
        name: "Natural Language Processing",
        type: "Theory",
        credits: 3,
      },
      {
        code: "AIDS603",
        name: "Big Data Analytics",
        type: "Theory",
        credits: 3,
      },
      {
        code: "AIDS604L",
        name: "Deep Learning Lab",
        type: "Practical",
        credits: 1,
      },
      {
        code: "AIDS605L",
        name: "Data Engineering Lab",
        type: "Practical",
        credits: 1,
      },
    ],
  },
  {
    id: 7,
    label: "Semester 7",
    syllabusUrl: "/documents/syllabus/semester-7.pdf",
    subjects: [
      {
        code: "AIDS701",
        name: "Generative Artificial Intelligence",
        type: "Theory",
        credits: 3,
      },
      { code: "AIDS702", name: "Computer Vision", type: "Theory", credits: 3 },
      {
        code: "AIDS703",
        name: "Cloud Computing for AI",
        type: "Theory",
        credits: 3,
      },
      {
        code: "AIDS704L",
        name: "AI Project / Research Work",
        type: "Practical",
        credits: 2,
      },
      {
        code: "AIDS705L",
        name: "Model Deployment Lab",
        type: "Practical",
        credits: 1,
      },
    ],
  },
  {
    id: 8,
    label: "Semester 8",
    syllabusUrl: "/documents/syllabus/semester-8.pdf",
    subjects: [
      {
        code: "AIDS801",
        name: "Responsible and Ethical AI",
        type: "Theory",
        credits: 3,
      },
      {
        code: "AIDS802",
        name: "AI Applications and Strategy",
        type: "Theory",
        credits: 3,
      },
      {
        code: "AIDS803",
        name: "Professional Elective",
        type: "Theory",
        credits: 3,
      },
      {
        code: "AIDS804L",
        name: "Major Project / Internship",
        type: "Practical",
        credits: 6,
      },
    ],
  },
];

/* Shown in the header and footer of the generated PDF. */
const DEPARTMENT_NAME = "Department of Artificial Intelligence & Data Science";

const FILTER_OPTIONS = [
  { value: "All", label: "All subjects" },
  { value: "Theory", label: "Theory" },
  { value: "Practical", label: "Practical" },
];

const EASE = [0.22, 1, 0.36, 1];

/* ---------- PDF helpers ---------- */

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* Resolve a CSS variable (any colour format) to 0-1 RGB for use in the PDF. */
function resolveColor(variable, fallback) {
  try {
    const defined = getComputedStyle(document.documentElement)
      .getPropertyValue(variable)
      .trim();
    if (!defined) return fallback;

    const probe = document.createElement("span");
    probe.style.color = `var(${variable})`;
    probe.style.display = "none";
    document.body.appendChild(probe);
    const computed = getComputedStyle(probe).color;
    probe.remove();

    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.fillStyle = computed;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    if (a === 0) return fallback;
    return [r / 255, g / 255, b / 255];
  } catch {
    return fallback;
  }
}

/*
 * Professional single-page A4 syllabus sheet in the site's theme:
 * brand header band, summary boxes, numbered table with a brand header row
 * and zebra rows, credit-distribution bar, and a document footer.
 * Colours are read from your CSS variables so it always matches the site.
 */
function buildSyllabusPdf(semester) {
  const C = {
    brand: resolveColor("--color-brand", [0.48, 0.12, 0.17]),
    gold: resolveColor("--color-gold", [0.79, 0.64, 0.15]),
    ink: resolveColor("--color-foreground", [0.1, 0.1, 0.12]),
    muted: resolveColor("--color-muted", [0.42, 0.42, 0.45]),
    line: resolveColor("--color-border", [0.88, 0.86, 0.84]),
    soft: resolveColor("--color-surface-muted", [0.97, 0.95, 0.93]),
    white: [1, 1, 1],
  };

  const esc = (value) => String(value).replace(/[\\()]/g, "\\$&");
  const rgb = (c) => c.map((v) => v.toFixed(3)).join(" ");
  const fill = (c) => `${rgb(c)} rg\n`;
  const stroke = (c) => `${rgb(c)} RG\n`;
  const rect = (x, y, w, h, c) => `${fill(c)}${x} ${y} ${w} ${h} re f\n`;
  const hline = (x1, x2, y, w, c) =>
    `${stroke(c)}${w} w ${x1} ${y} m ${x2} ${y} l S\n`;
  const diamond = (cx, cy, r, c) =>
    `${fill(c)}${cx} ${cy + r} m ${cx + r} ${cy} l ${cx} ${cy - r} l ${cx - r} ${cy} l h f\n`;
  const text = (font, size, x, y, value, c) =>
    `${fill(c)}BT /${font} ${size} Tf ${x} ${y} Td (${esc(value)}) Tj ET\n`;

  // Approximate Helvetica widths, good enough for right-aligning short text.
  const widthOf = (value, size, bold = false) =>
    [...String(value)].reduce((total, ch) => {
      let em = bold ? 0.56 : 0.5;
      if (ch === " ") em = 0.278;
      else if (/[0-9]/.test(ch)) em = 0.556;
      else if (/[A-Z]/.test(ch)) em = bold ? 0.72 : 0.67;
      else if (/[ilj.,:;|'!]/.test(ch)) em = 0.26;
      return total + em * size;
    }, 0);
  const fit = (value, max) =>
    String(value).length > max
      ? `${String(value).slice(0, max - 3)}...`
      : value;

  const left = 48;
  const right = 547;
  const width = right - left;

  const subjects = semester.subjects;
  const theorySubjects = subjects.filter((s) => s.type === "Theory");
  const practicalSubjects = subjects.filter((s) => s.type === "Practical");
  const sum = (list) => list.reduce((t, s) => t + s.credits, 0);
  const theoryCredits = sum(theorySubjects);
  const practicalCredits = sum(practicalSubjects);
  const totalCredits = theoryCredits + practicalCredits;

  let content = "";

  /* Header band */
  content += rect(0, 772, 595, 70, C.brand);
  content += rect(0, 769, 595, 3, C.gold);
  content += diamond(left + 4, 825, 3.5, C.gold);
  content += text("F2", 8, left + 14, 822, "ACADEMIC RESOURCES", C.gold);
  content += text("F2", 15, left, 797, DEPARTMENT_NAME, C.white);
  const tag = "CURRICULUM & SYLLABUS";
  content += text("F2", 8, right - widthOf(tag, 8, true), 822, tag, C.gold);

  /* Title block */
  content += text("F2", 24, left, 728, semester.label, C.ink);
  content += text(
    "F1",
    10,
    left,
    709,
    "Course structure and credit distribution",
    C.muted,
  );

  /* Summary boxes */
  const boxes = [
    ["SEMESTER", `${semester.id} of 8`, C.ink],
    ["SUBJECTS", String(subjects.length), C.ink],
    [
      "THEORY / PRACTICAL",
      `${theorySubjects.length} / ${practicalSubjects.length}`,
      C.ink,
    ],
    ["TOTAL CREDITS", String(totalCredits), C.brand],
  ];
  const gap = 10;
  const boxW = (width - gap * 3) / 4;
  const boxTop = 684;
  const boxH = 52;
  boxes.forEach(([label, value, color], i) => {
    const x = left + i * (boxW + gap);
    content += rect(x, boxTop - boxH, boxW, boxH, C.soft);
    content += rect(x, boxTop - boxH, 3, boxH, C.gold);
    content += text("F2", 7, x + 14, boxTop - 18, label, C.muted);
    content += text("F2", 17, x + 14, boxTop - 41, value, color);
  });

  /* Table header */
  const colNo = left + 12;
  const colCode = left + 42;
  const colName = left + 130;
  const colType = 400;
  const creditsRight = right - 14;
  const headTop = boxTop - boxH - 24;
  const headH = 26;
  content += rect(left, headTop - headH, width, headH, C.brand);
  const headBase = headTop - 17;
  content += text("F2", 7.5, colNo, headBase, "NO.", C.white);
  content += text("F2", 7.5, colCode, headBase, "COURSE CODE", C.white);
  content += text("F2", 7.5, colName, headBase, "SUBJECT", C.white);
  content += text("F2", 7.5, colType, headBase, "TYPE", C.white);
  content += text(
    "F2",
    7.5,
    creditsRight - widthOf("CREDITS", 7.5, true),
    headBase,
    "CREDITS",
    C.white,
  );

  /* Rows */
  const rowH = 30;
  let rowTop = headTop - headH;
  subjects.forEach((subject, index) => {
    if (index % 2 === 1)
      content += rect(left, rowTop - rowH, width, rowH, C.soft);
    const base = rowTop - 19;
    content += text(
      "F1",
      9,
      colNo,
      base,
      String(index + 1).padStart(2, "0"),
      C.muted,
    );
    content += text("F2", 9.5, colCode, base, subject.code, C.brand);
    content += text("F1", 10.5, colName, base, fit(subject.name, 40), C.ink);
    content += diamond(
      colType + 3,
      base + 3.2,
      3,
      subject.type === "Practical" ? C.gold : C.brand,
    );
    content += text("F1", 9.5, colType + 12, base, subject.type, C.ink);
    content += text(
      "F2",
      10.5,
      creditsRight - widthOf(subject.credits, 10.5, true),
      base,
      subject.credits,
      C.ink,
    );
    rowTop -= rowH;
    content += hline(left, right, rowTop, 0.5, C.line);
  });

  /* Total row */
  const totalH = 32;
  content += hline(left, right, rowTop, 1.5, C.gold);
  content += text("F2", 10.5, colName, rowTop - 20, "Total credits", C.ink);
  content += text(
    "F2",
    13,
    creditsRight - widthOf(totalCredits, 13, true),
    rowTop - 21,
    totalCredits,
    C.brand,
  );
  content += hline(left, right, rowTop - totalH, 1.2, C.brand);

  /* Credit distribution */
  let y = rowTop - totalH - 34;
  content += text("F2", 8, left, y, "CREDIT DISTRIBUTION", C.muted);
  y -= 18;
  const barH = 10;
  const theoryW = totalCredits ? (width * theoryCredits) / totalCredits : width;
  content += rect(left, y, width, barH, C.line);
  if (theoryW > 0) content += rect(left, y, theoryW, barH, C.brand);
  if (practicalCredits > 0)
    content += rect(left + theoryW, y, width - theoryW, barH, C.gold);

  y -= 20;
  const pct = (n) => (totalCredits ? Math.round((n / totalCredits) * 100) : 0);
  content += diamond(left + 4, y + 3, 3, C.brand);
  content += text(
    "F1",
    9,
    left + 14,
    y,
    `Theory: ${theoryCredits} credits (${pct(theoryCredits)}%)`,
    C.ink,
  );
  content += diamond(left + 190, y + 3, 3, C.gold);
  content += text(
    "F1",
    9,
    left + 200,
    y,
    `Practical: ${practicalCredits} credits (${pct(practicalCredits)}%)`,
    C.ink,
  );

  /* Notes */
  y -= 34;
  content += text("F2", 8, left, y, "NOTES", C.muted);
  y -= 15;
  content += text(
    "F1",
    9,
    left,
    y,
    "Theory courses are delivered through classroom instruction and assessed per the examination scheme.",
    C.muted,
  );
  y -= 13;
  content += text(
    "F1",
    9,
    left,
    y,
    "Practical courses cover laboratory, project, or internship work. Credits shown are per semester.",
    C.muted,
  );

  /* Footer */
  content += hline(left, right, 66, 0.8, C.gold);
  content += text(
    "F2",
    8,
    left,
    51,
    `${DEPARTMENT_NAME}  |  Curriculum & Syllabus`,
    C.brand,
  );
  const pageLabel = "Page 1 of 1";
  content += text(
    "F1",
    8,
    right - widthOf(pageLabel, 8),
    51,
    pageLabel,
    C.muted,
  );
  content += text(
    "F1",
    7.5,
    left,
    38,
    `Generated on ${new Date().toISOString().slice(0, 10)}. Refer to the official department syllabus for complete details.`,
    C.muted,
  );

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>",
    `<< /Length ${content.length} >>\nstream\n${content}endstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [];
  objects.forEach((body, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return new Blob([pdf], { type: "application/pdf" });
}

async function downloadSyllabus(semester) {
  const filename = `semester-${semester.id}-syllabus.pdf`;

  try {
    const response = await fetch(semester.syllabusUrl);
    const contentType = response.headers.get("content-type") || "";
    // A missing file on an SPA often returns index.html with 200, so check type.
    if (response.ok && contentType.includes("pdf")) {
      triggerDownload(await response.blob(), filename);
      return;
    }
  } catch {
    /* fall through to generated PDF */
  }

  triggerDownload(buildSyllabusPdf(semester), filename);
}

/* ---------- Components ---------- */

function TypeDot({ type }) {
  return (
    <span
      aria-hidden="true"
      className={`h-2 w-2 shrink-0 rounded-full ${
        type === "Practical"
          ? "bg-gold"
          : type === "Theory"
            ? "bg-brand"
            : "bg-border-strong"
      }`}
    />
  );
}

/* Custom dropdown that matches the site's styling (replaces native <select>). */
function TypeFilter({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const optionRefs = useRef([]);
  const selected =
    FILTER_OPTIONS.find((option) => option.value === value) ??
    FILTER_OPTIONS[0];

  useEffect(() => {
    if (!open) return undefined;
    const handlePointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const index = FILTER_OPTIONS.findIndex((option) => option.value === value);
    optionRefs.current[index < 0 ? 0 : index]?.focus();
  }, [open, value]);

  const close = (returnFocus = true) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  };

  const handleListKeyDown = (event, index) => {
    const last = FILTER_OPTIONS.length - 1;
    let next = null;
    if (event.key === "ArrowDown") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowUp") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    } else if (event.key === "Tab") {
      setOpen(false);
      return;
    } else return;

    event.preventDefault();
    optionRefs.current[next]?.focus();
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Filter subjects by type. Selected: ${selected.label}`}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
          }
        }}
        className={`inline-flex min-h-9 min-w-[10.5rem] items-center justify-between gap-3 rounded-lg border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground transition-[border-color,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:transition-none ${
          open
            ? "border-brand ring-2 ring-brand/10"
            : "border-border-strong hover:border-brand"
        }`}
      >
        <span className="inline-flex items-center gap-2">
          <TypeDot type={selected.value} />
          {selected.label}
        </span>
        <FiChevronDown
          size={15}
          aria-hidden="true"
          className={`text-muted transition-transform duration-200 motion-reduce:transition-none ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Subject type"
          className="absolute right-0 z-20 mt-2 w-full min-w-[10.5rem] overflow-hidden rounded-xl border border-border bg-surface p-1 shadow-soft"
        >
          {FILTER_OPTIONS.map((option, index) => {
            const isSelected = option.value === value;
            return (
              <li key={option.value} role="presentation">
                <button
                  ref={(node) => {
                    optionRefs.current[index] = node;
                  }}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option.value);
                    close();
                  }}
                  onKeyDown={(event) => handleListKeyDown(event, index)}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-xs font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold motion-reduce:transition-none ${
                    isSelected
                      ? "bg-surface-muted text-brand"
                      : "text-foreground hover:bg-surface-muted"
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    <TypeDot type={option.value} />
                    {option.label}
                  </span>
                  {isSelected && (
                    <FiCheck
                      size={14}
                      aria-hidden="true"
                      className="text-brand"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function CurriculumExplorer() {
  const [activeSemester, setActiveSemester] = useState(1);
  const [subjectType, setSubjectType] = useState("All");
  const [downloading, setDownloading] = useState(false);
  const reduceMotion = useReducedMotion();
  const currentSemester =
    semesters.find((semester) => semester.id === activeSemester) ??
    semesters[0];
  const filteredSubjects = currentSemester.subjects.filter(
    (subject) => subjectType === "All" || subject.type === subjectType,
  );
  const totalCredits = filteredSubjects.reduce(
    (total, subject) => total + subject.credits,
    0,
  );
  const theoryCount = currentSemester.subjects.filter(
    (subject) => subject.type === "Theory",
  ).length;
  const practicalCount = currentSemester.subjects.length - theoryCount;
  const semesterCredits = currentSemester.subjects.reduce(
    (total, subject) => total + subject.credits,
    0,
  );

  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      await downloadSyllabus(currentSemester);
    } finally {
      setDownloading(false);
    }
  };

  const handleTabKeyDown = (event, semesterId) => {
    let nextId = semesterId;
    if (event.key === "ArrowRight")
      nextId = semesterId === 8 ? 1 : semesterId + 1;
    else if (event.key === "ArrowLeft")
      nextId = semesterId === 1 ? 8 : semesterId - 1;
    else if (event.key === "Home") nextId = 1;
    else if (event.key === "End") nextId = 8;
    else return;

    event.preventDefault();
    setActiveSemester(nextId);
    document.getElementById(`curriculum-tab-${nextId}`)?.focus();
  };

  return (
    <section
      aria-labelledby="curriculum-explorer-title"
      className="w-full border-y border-border bg-surface-muted py-12 sm:py-14 lg:py-16"
    >
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 2xl:px-12">
        {/* Section heading */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-3xl">
            <div className="mb-3 flex items-center gap-3">
              <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand sm:text-xs">
                Academic Resources
              </span>
              <span
                aria-hidden="true"
                className="h-px w-10 bg-border-strong sm:w-16"
              />
            </div>

            <h2
              id="curriculum-explorer-title"
              className="text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl"
            >
              Curriculum <span className="text-brand">&amp; Syllabus</span>
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base">
              Browse semester-wise subjects, course codes, credits, and
              practical work.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2 text-xs text-muted sm:text-sm">
            <FiBookOpen className="text-brand" size={17} aria-hidden="true" />
            <span>8 semesters</span>
          </div>
        </motion.div>

        {/* Semester tabs */}
        <div
          className="mt-7 border-b border-border"
          role="tablist"
          aria-label="Choose semester"
        >
          <div className="flex gap-1 overflow-x-auto pb-px scrollbar-thin">
            {semesters.map((semester) => {
              const selected = activeSemester === semester.id;
              return (
                <button
                  key={semester.id}
                  id={`curriculum-tab-${semester.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="curriculum-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveSemester(semester.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, semester.id)}
                  className={`relative min-w-fit whitespace-nowrap px-4 py-3 text-xs font-semibold transition-colors duration-200 sm:px-5 sm:text-sm ${
                    selected ? "text-brand" : "text-muted hover:text-foreground"
                  } focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold motion-reduce:transition-none`}
                >
                  {semester.label}
                  {selected && (
                    <motion.span
                      layoutId="curriculum-active-tab"
                      className="absolute inset-x-3 bottom-0 h-[3px] rounded-t-full bg-brand"
                      transition={{
                        duration: reduceMotion ? 0 : 0.25,
                        ease: EASE,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Subject table panel */}
        <motion.div
          key={activeSemester}
          id="curriculum-panel"
          role="tabpanel"
          aria-labelledby={`curriculum-tab-${activeSemester}`}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE }}
          className="mt-5 rounded-xl border border-border bg-surface shadow-soft"
        >
          {/* Title + controls */}
          <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
            <div>
              <h3 className="text-base font-bold text-foreground sm:text-lg">
                {currentSemester.label}
              </h3>
              <p className="mt-1 text-xs text-muted">
                Course structure and credit distribution
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <TypeFilter value={subjectType} onChange={setSubjectType} />

              <button
                type="button"
                onClick={handleDownload}
                disabled={downloading}
                className="inline-flex min-h-9 items-center justify-center gap-2 rounded-lg bg-brand px-3.5 py-2 text-xs font-semibold text-on-brand transition-colors duration-200 hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:cursor-wait disabled:opacity-70 motion-reduce:transition-none"
              >
                <FiDownload size={15} aria-hidden="true" />
                {downloading ? "Preparing..." : "Download syllabus"}
              </button>
            </div>
          </div>

          {/* Summary strip */}
          <dl className="grid grid-cols-2 gap-px border-y border-border bg-border sm:grid-cols-4">
            {[
              { label: "Subjects", value: currentSemester.subjects.length },
              { label: "Theory", value: theoryCount },
              { label: "Practical", value: practicalCount },
              { label: "Total credits", value: semesterCredits, accent: true },
            ].map((stat) => (
              <div key={stat.label} className="bg-surface px-4 py-3.5 sm:px-6">
                <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                  {stat.label}
                </dt>
                <dd
                  className={`mt-1 text-xl font-bold tabular-nums ${
                    stat.accent ? "text-brand" : "text-foreground"
                  }`}
                >
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          {/* Table */}
          <div className="overflow-x-auto rounded-b-xl">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">
                {currentSemester.label} subjects, course codes, types and
                credits
              </caption>
              <thead>
                <tr className="border-b border-border-strong bg-surface-muted text-[10px] font-bold uppercase tracking-[0.14em] text-muted sm:text-[11px]">
                  <th scope="col" className="w-16 px-4 py-3.5 sm:pl-6">
                    No.
                  </th>
                  <th scope="col" className="px-4 py-3.5">
                    Course Code
                  </th>
                  <th scope="col" className="px-4 py-3.5">
                    Subject
                  </th>
                  <th scope="col" className="px-4 py-3.5">
                    Type
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-right sm:pr-6">
                    Credits
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredSubjects.map((subject, index) => (
                  <tr
                    key={subject.code}
                    className="group transition-colors duration-150 hover:bg-surface-muted/70 motion-reduce:transition-none"
                  >
                    <td className="relative w-16 px-4 py-4 text-xs font-medium tabular-nums text-muted sm:pl-6">
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-0 left-0 w-[3px] bg-gold opacity-0 transition-opacity duration-150 group-hover:opacity-100 motion-reduce:transition-none"
                      />
                      {String(index + 1).padStart(2, "0")}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 font-mono text-xs font-semibold text-brand">
                      {subject.code}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-foreground">
                      {subject.name}
                    </td>
                    <td className="px-4 py-4">
                      {/* Plain label: small colour marker + text, no background or border */}
                      <span className="inline-flex items-center gap-2 text-xs font-semibold text-foreground">
                        <TypeDot type={subject.type} />
                        {subject.type}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right text-sm font-semibold tabular-nums text-foreground sm:pr-6">
                      {subject.credits}
                    </td>
                  </tr>
                ))}
                {filteredSubjects.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-10 text-center text-sm text-muted"
                    >
                      No subjects match this filter.
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gold bg-surface-muted">
                  <td
                    colSpan={4}
                    className="px-4 py-4 text-sm font-semibold text-foreground sm:pl-6"
                  >
                    {subjectType === "All"
                      ? "Total credits"
                      : `Credits shown (${subjectType.toLowerCase()})`}
                  </td>
                  <td className="px-4 py-4 text-right text-base font-bold tabular-nums text-brand sm:pr-6">
                    {totalCredits}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
