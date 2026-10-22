import React, { useCallback, useEffect, useRef, useState } from "react";

const unsplash = (id, width) =>
  `https://images.unsplash.com/${id}?w=${width}&q=85&auto=format&fit=crop`;

const IMAGE_WIDTHS = [640, 960, 1280, 1800];

const HERO_IMAGES = [
  {
    id: "photo-1516321318423-f06f85e504b3",
    alt: "Students collaborating on a laptop during a technology project",
  },
  {
    id: "photo-1522071820081-009f0129c71c",
    alt: "A team working together on a technical project",
  },
  {
    id: "photo-1519389950473-47ba0277781c",
    alt: "Students and colleagues collaborating around computers",
  },
].map((image) => ({
  ...image,
  src: unsplash(image.id, 1280),
  srcSet: IMAGE_WIDTHS.map((w) => `${unsplash(image.id, w)} ${w}w`).join(", "),
}));

const IMAGE_SIZES = "(max-width: 900px) 100vw, 50vw";
const SWIPE_THRESHOLD = 40;

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const update = (event) => setMatches(event.matches);

    setMatches(mediaQuery.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", update);
    } else {
      mediaQuery.addListener(update);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", update);
      } else {
        mediaQuery.removeListener(update);
      }
    };
  }, [query]);

  return matches;
}

export default function Hero() {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  // Tilt only makes sense with a real mouse; touch screens skip it.
  const canTilt = useMediaQuery("(hover: hover) and (pointer: fine)");

  const [mounted, setMounted] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const stageRef = useRef(null);
  const touchStartX = useRef(null);

  const tiltEnabled = canTilt && !reducedMotion;

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (reducedMotion || paused) return undefined;

    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % HERO_IMAGES.length);
    }, 5500);

    return () => window.clearInterval(interval);
  }, [reducedMotion, paused, activeImage]);

  const showPreviousImage = useCallback(() => {
    setActiveImage(
      (current) => (current - 1 + HERO_IMAGES.length) % HERO_IMAGES.length,
    );
  }, []);

  const showNextImage = useCallback(() => {
    setActiveImage((current) => (current + 1) % HERO_IMAGES.length);
  }, []);

  function handlePointerMove(event) {
    if (!tiltEnabled || !stageRef.current) return;

    const bounds = stageRef.current.getBoundingClientRect();
    const pointerX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const pointerY = (event.clientY - bounds.top) / bounds.height - 0.5;

    setTilt({ x: pointerX * 5, y: pointerY * 5 });
  }

  function resetTilt() {
    setTilt({ x: 0, y: 0 });
    setPaused(false);
  }

  function handleTouchStart(event) {
    touchStartX.current = event.touches[0].clientX;
    setPaused(true);
  }

  function handleTouchEnd(event) {
    if (touchStartX.current === null) return;

    const delta = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    setPaused(false);

    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    if (delta > 0) showPreviousImage();
    else showNextImage();
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowLeft") showPreviousImage();
    if (event.key === "ArrowRight") showNextImage();
  }

  return (
    <section
      className={`ads-hero ${mounted ? "ads-hero--mounted" : ""} ${
        reducedMotion ? "ads-hero--reduced-motion" : ""
      }`}
      aria-labelledby="ads-hero-title"
    >
      <style>{`
        .ads-hero {
          --hero-primary: var(--brand-primary, #b22b2f);
          --hero-primary-hover: var(--brand-primary-hover, #922226);
          --hero-primary-soft: var(--brand-primary-soft, #f8e9e9);
          --hero-accent: var(--brand-accent, #d1a550);
          --hero-accent-soft: var(--brand-accent-soft, #f8f0df);
          --hero-background: var(--app-background, #ffffff);
          --hero-surface-muted: var(--app-surface-muted, #faf7f5);
          --hero-text: var(--app-text, #272323);
          --hero-muted: var(--app-text-muted, #6b6262);
          --hero-border: var(--app-border, #e8e1e1);

          /* Set --navbar-height on a parent if you have a fixed/sticky navbar. */
          --hero-offset: var(--navbar-height, 0px);
          --hero-gutter: clamp(20px, 5vw, 100px);

          position: relative;
          isolation: isolate;
          display: flex;
          align-items: center;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          min-height: calc(100vh - var(--hero-offset));
          min-height: calc(100svh - var(--hero-offset));
          overflow: hidden;
          padding-block: clamp(28px, 6svh, 80px);
          color: var(--hero-text);
          background:
            radial-gradient(circle at 5% 15%, rgb(209 165 80 / 10%), transparent 27%),
            radial-gradient(circle at 92% 80%, rgb(178 43 47 / 6%), transparent 30%),
            var(--hero-background);
          font-family: var(--font-sans, "Inter", "Segoe UI", Arial, sans-serif);
          -webkit-text-size-adjust: 100%;
          text-size-adjust: 100%;
        }

        .ads-hero *,
        .ads-hero *::before,
        .ads-hero *::after {
          box-sizing: border-box;
        }

        .ads-hero__decoration {
          position: absolute;
          inset: 0;
          z-index: -1;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .ads-hero__orb {
          position: absolute;
          z-index: -1;
          width: clamp(200px, 24vw, 420px);
          aspect-ratio: 1;
          border: 1px solid rgb(209 165 80 / 23%);
          border-radius: 50%;
          pointer-events: none;
        }

        .ads-hero__orb--top {
          top: -230px;
          right: 13%;
        }

        .ads-hero__orb--bottom {
          bottom: -250px;
          left: -120px;
          width: clamp(240px, 28vw, 480px);
          border-color: rgb(178 43 47 / 12%);
        }

        /* ---------- Layout: two columns by default ---------- */
        .ads-hero__grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          align-items: center;
          gap: clamp(28px, 4.5vw, 96px);
          width: 100%;
          max-width: 1760px;
          margin-inline: auto;
          padding-inline: var(--hero-gutter);
          padding-left: max(var(--hero-gutter), env(safe-area-inset-left));
          padding-right: max(var(--hero-gutter), env(safe-area-inset-right));
        }

        .ads-hero__copy {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          min-width: 0;
          max-width: 760px;
        }

        .ads-hero__reveal {
          opacity: 0;
          transform: translateY(16px);
          transition:
            opacity 650ms cubic-bezier(.16,.84,.44,1),
            transform 650ms cubic-bezier(.16,.84,.44,1);
        }

        .ads-hero--mounted .ads-hero__reveal {
          opacity: 1;
          transform: translateY(0);
        }

        .ads-hero__reveal--1 { transition-delay: 40ms; }
        .ads-hero__reveal--2 { transition-delay: 130ms; }
        .ads-hero__reveal--3 { transition-delay: 220ms; }
        .ads-hero__reveal--4 { transition-delay: 310ms; }

        /* ---------- Fluid typography ---------- */
        .ads-hero__title {
          margin: 0 0 clamp(14px, 2.4svh, 28px);
          color: var(--hero-text);
          font-size: clamp(2rem, 1.1rem + 3.7vw, 5.6rem);
          font-weight: 750;
          letter-spacing: -0.05em;
          line-height: 1.04;
          text-wrap: balance;
          overflow-wrap: break-word;
        }

        .ads-hero__title span {
          color: var(--hero-primary);
        }

        .ads-hero__description {
          max-width: 36em;
          margin: 0 0 clamp(20px, 3.2svh, 36px);
          color: var(--hero-muted);
          font-size: clamp(0.94rem, 0.85rem + 0.4vw, 1.2rem);
          line-height: 1.65;
        }

        .ads-hero__focus-areas {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px 22px;
          color: var(--hero-muted);
          font-size: clamp(12px, 0.75rem + 0.15vw, 14px);
          font-weight: 600;
        }

        .ads-hero__focus-item {
          display: inline-flex;
          align-items: center;
          gap: 9px;
        }

        .ads-hero__focus-item::before {
          width: 6px;
          height: 6px;
          flex: 0 0 6px;
          border-radius: 50%;
          background: var(--hero-accent);
          content: "";
        }

        /* ---------- Visual / carousel ---------- */
        .ads-hero__visual {
          position: relative;
          width: 100%;
          min-width: 0;
          opacity: 0;
          transform: translateY(18px) scale(0.985);
          transition:
            opacity 800ms cubic-bezier(.16,.84,.44,1) 150ms,
            transform 800ms cubic-bezier(.16,.84,.44,1) 150ms;
        }

        .ads-hero--mounted .ads-hero__visual {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .ads-hero__image-frame {
          position: relative;
          width: 100%;
          height: clamp(320px, 68svh, 760px);
          overflow: hidden;
          border: clamp(4px, 0.5vw, 7px) solid #ffffff;
          border-radius: clamp(14px, 1.4vw, 22px);
          background: var(--hero-surface-muted);
          box-shadow: 0 22px 54px rgb(39 35 35 / 14%), 0 2px 8px rgb(39 35 35 / 5%);
          touch-action: pan-y;
          will-change: transform;
          transition: transform 220ms ease-out;
        }

        .ads-hero__image-layer {
          position: absolute;
          inset: 0;
          display: block;
          width: 100%;
          height: 100%;
          background-color: #eee8e4;
          object-fit: cover;
          object-position: center;
          opacity: 0;
          transform: scale(1.015);
          transition: opacity 850ms ease, transform 5.5s linear;
          user-select: none;
          -webkit-user-drag: none;
        }

        .ads-hero__image-layer--active {
          opacity: 1;
          transform: scale(1.09);
        }

        .ads-hero__image-shade {
          position: absolute;
          inset: 35% 0 0;
          z-index: 1;
          background: linear-gradient(180deg, transparent, rgb(25 18 18 / 62%));
          pointer-events: none;
        }

        .ads-hero__image-caption {
          position: absolute;
          z-index: 2;
          right: clamp(14px, 2vw, 32px);
          bottom: clamp(38px, 4.4vw, 58px);
          left: clamp(14px, 2vw, 32px);
          color: #ffffff;
          pointer-events: none;
        }

        .ads-hero__image-caption small {
          display: block;
          margin-bottom: 5px;
          color: rgb(255 255 255 / 86%);
          font-size: clamp(8px, 0.55rem + 0.15vw, 11px);
          font-weight: 650;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .ads-hero__image-caption strong {
          display: block;
          max-width: 560px;
          font-size: clamp(14px, 0.7rem + 0.9vw, 26px);
          font-weight: 650;
          letter-spacing: -0.025em;
          line-height: 1.25;
          text-wrap: balance;
        }

        .ads-hero__carousel-button {
          position: absolute;
          z-index: 5;
          top: 50%;
          display: grid;
          width: clamp(34px, 3vw, 44px);
          height: clamp(34px, 3vw, 44px);
          place-items: center;
          padding: 0;
          transform: translateY(-50%);
          border: 1px solid rgb(255 255 255 / 75%);
          border-radius: 50%;
          background: rgb(255 255 255 / 95%);
          color: var(--hero-text);
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          transition: background-color 160ms ease, color 160ms ease, border-color 160ms ease;
        }

        .ads-hero__carousel-button svg {
          display: block;
          width: 55%;
          height: 55%;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .ads-hero__carousel-button:hover {
          border-color: var(--hero-primary);
          background: var(--hero-primary);
          color: #ffffff;
        }

        .ads-hero__carousel-button:focus-visible,
        .ads-hero__dot:focus-visible {
          outline: 3px solid var(--hero-accent);
          outline-offset: 3px;
        }

        .ads-hero__carousel-button--previous { left: clamp(10px, 1.8vw, 24px); }
        .ads-hero__carousel-button--next { right: clamp(10px, 1.8vw, 24px); }

        .ads-hero__dots {
          position: absolute;
          z-index: 5;
          right: 0;
          bottom: clamp(10px, 1.2vw, 16px);
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 4px;
        }

        /* The visible dot is small, but the tap target is at least 24px wide. */
        .ads-hero__dot {
          position: relative;
          width: 24px;
          height: 24px;
          padding: 0;
          border: 0;
          background: transparent;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        .ads-hero__dot::after {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 7px;
          height: 7px;
          transform: translate(-50%, -50%);
          border-radius: 99px;
          background: rgb(255 255 255 / 72%);
          content: "";
          transition: width 200ms ease, background-color 200ms ease;
        }

        .ads-hero__dot--active::after {
          width: 22px;
          background: var(--hero-accent);
        }

        .ads-hero__visual-accent {
          position: absolute;
          z-index: -1;
          top: -17px;
          right: -17px;
          width: 42%;
          height: 48%;
          border-top: 3px solid var(--hero-accent);
          border-right: 3px solid var(--hero-accent);
          border-top-right-radius: 20px;
          pointer-events: none;
        }

        .ads-hero--reduced-motion .ads-hero__reveal,
        .ads-hero--reduced-motion .ads-hero__visual,
        .ads-hero--reduced-motion .ads-hero__image-layer,
        .ads-hero--reduced-motion .ads-hero__image-frame,
        .ads-hero--reduced-motion .ads-hero__dot::after {
          transition-duration: 0.01ms;
          transition-delay: 0ms;
          transform: none;
        }

        /* ---------- Ultra-wide / 4K ---------- */
        @media (min-width: 1920px) {
          .ads-hero__copy { max-width: 860px; }
          .ads-hero__image-frame { height: clamp(520px, 66svh, 860px); }
        }

        /* ---------- Small laptops / large tablets landscape ---------- */
        @media (max-width: 1180px) {
          .ads-hero__grid {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: clamp(20px, 3vw, 40px);
          }

          .ads-hero__image-frame {
            height: clamp(320px, 60svh, 560px);
          }
        }

        /* ---------- Tablets portrait and below: stack ---------- */
        @media (max-width: 900px) {
          .ads-hero {
            align-items: flex-start;
            padding-block: clamp(24px, 5svh, 48px) clamp(28px, 5svh, 48px);
          }

          .ads-hero__grid {
            grid-template-columns: minmax(0, 1fr);
            align-items: start;
            gap: clamp(24px, 4svh, 40px);
          }

          .ads-hero__copy {
            max-width: 680px;
          }

          .ads-hero__title {
            font-size: clamp(2rem, 1.2rem + 4.6vw, 3.6rem);
          }

          .ads-hero__visual {
            max-width: 760px;
          }

          .ads-hero__image-frame {
            height: auto;
            aspect-ratio: 16 / 11;
          }

          .ads-hero__visual-accent {
            top: -10px;
            right: -10px;
            border-width: 2px;
          }
        }

        /* ---------- Phones ---------- */
        @media (max-width: 560px) {
          .ads-hero__image-frame {
            aspect-ratio: 4 / 4.2;
          }

          .ads-hero__carousel-button--previous { left: 8px; }
          .ads-hero__carousel-button--next { right: 8px; }
        }

        @media (max-width: 360px) {
          .ads-hero {
            --hero-gutter: 16px;
          }

          .ads-hero__title {
            letter-spacing: -0.04em;
          }

          .ads-hero__focus-areas {
            gap: 6px 14px;
          }
        }

        /* ---------- Short landscape screens (phones on their side) ---------- */
        @media (max-height: 520px) and (orientation: landscape) and (max-width: 1000px) {
          .ads-hero {
            align-items: center;
            padding-block: 16px;
          }

          .ads-hero__grid {
            grid-template-columns: minmax(0, 1fr) minmax(0, 0.9fr);
            align-items: center;
            gap: 20px;
          }

          .ads-hero__title {
            margin-bottom: 8px;
            font-size: clamp(1.5rem, 4.4vw, 2.3rem);
          }

          .ads-hero__description {
            margin-bottom: 12px;
            font-size: 12px;
            line-height: 1.45;
          }

          .ads-hero__visual {
            max-width: none;
          }

          .ads-hero__image-frame {
            height: clamp(200px, 76svh, 360px);
            aspect-ratio: auto;
          }
        }

        /* Short desktop windows */
        @media (max-height: 680px) and (min-width: 901px) {
          .ads-hero {
            padding-block: 20px;
          }

          .ads-hero__image-frame {
            height: clamp(300px, 70svh, 440px);
          }
        }
      `}</style>

      <svg
        className="ads-hero__decoration"
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

      <div className="ads-hero__orb ads-hero__orb--top" aria-hidden="true" />
      <div className="ads-hero__orb ads-hero__orb--bottom" aria-hidden="true" />

      <div className="ads-hero__grid">
        <div className="ads-hero__copy">
          <h1
            id="ads-hero-title"
            className="ads-hero__reveal ads-hero__reveal--1 ads-hero__title"
          >
            Turning ideas into <span>intelligent solutions.</span>
          </h1>

          <p className="ads-hero__reveal ads-hero__reveal--2 ads-hero__description">
            Explore the future of AI and data science. Build strong foundations,
            work on meaningful projects, and develop the skills to solve
            real-world problems with technology.
          </p>

          <div
            className="ads-hero__reveal ads-hero__reveal--4 ads-hero__focus-areas"
            aria-label="Department focus areas"
          >
            <span className="ads-hero__focus-item">
              Artificial Intelligence
            </span>
            <span className="ads-hero__focus-item">Data Science</span>
            <span className="ads-hero__focus-item">
              Research &amp; Innovation
            </span>
          </div>
        </div>

        <div className="ads-hero__visual">
          <div className="ads-hero__visual-accent" aria-hidden="true" />
          <div
            className="ads-hero__image-frame"
            ref={stageRef}
            onMouseEnter={() => setPaused(true)}
            onMouseMove={handlePointerMove}
            onMouseLeave={resetTilt}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={() => {
              touchStartX.current = null;
              setPaused(false);
            }}
            onKeyDown={handleKeyDown}
            style={{
              transform: tiltEnabled
                ? `perspective(1200px) rotateX(${-tilt.y * 0.18}deg) rotateY(${tilt.x * 0.18}deg)`
                : undefined,
            }}
            role="group"
            aria-roledescription="carousel"
            aria-label="Department and technology highlights"
          >
            {HERO_IMAGES.map((image, index) => (
              <img
                key={image.id}
                className={`ads-hero__image-layer ${
                  index === activeImage ? "ads-hero__image-layer--active" : ""
                }`}
                src={image.src}
                srcSet={image.srcSet}
                sizes={IMAGE_SIZES}
                alt={image.alt}
                width="1280"
                height="853"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding="async"
                draggable="false"
                aria-hidden={index !== activeImage}
              />
            ))}

            <div className="ads-hero__image-shade" aria-hidden="true" />

            <div className="ads-hero__image-caption" aria-live="polite">
              <small>Ideas meet intelligence</small>
              <strong>Explore. Experiment. Engineer what’s next.</strong>
            </div>

            <button
              className="ads-hero__carousel-button ads-hero__carousel-button--previous"
              type="button"
              onClick={showPreviousImage}
              aria-label="Show previous image"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              className="ads-hero__carousel-button ads-hero__carousel-button--next"
              type="button"
              onClick={showNextImage}
              aria-label="Show next image"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            <div
              className="ads-hero__dots"
              role="group"
              aria-label="Choose a hero image"
            >
              {HERO_IMAGES.map((image, index) => (
                <button
                  key={image.id}
                  className={`ads-hero__dot ${
                    index === activeImage ? "ads-hero__dot--active" : ""
                  }`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`Show image ${index + 1}`}
                  aria-pressed={index === activeImage}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
