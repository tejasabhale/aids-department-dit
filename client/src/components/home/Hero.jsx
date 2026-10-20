import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const HERO_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1800&q=90&auto=format&fit=crop",
    alt: "Students collaborating on a laptop during a technology project",
  },
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1800&q=90&auto=format&fit=crop",
    alt: "A team working together on a technical project",
  },
  {
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1800&q=90&auto=format&fit=crop",
    alt: "Students and colleagues collaborating around computers",
  },
];

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = (event) => setReducedMotion(event.matches);

    setReducedMotion(mediaQuery.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updatePreference);
    } else {
      mediaQuery.addListener(updatePreference);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", updatePreference);
      } else {
        mediaQuery.removeListener(updatePreference);
      }
    };
  }, []);

  return reducedMotion;
}

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const stageRef = useRef(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % HERO_IMAGES.length);
    }, 5500);

    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  function handlePointerMove(event) {
    if (reducedMotion || !stageRef.current) return;

    const bounds = stageRef.current.getBoundingClientRect();
    const pointerX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const pointerY = (event.clientY - bounds.top) / bounds.height - 0.5;

    setTilt({ x: pointerX * 5, y: pointerY * 5 });
  }

  function resetTilt() {
    setTilt({ x: 0, y: 0 });
  }

  function showPreviousImage() {
    setActiveImage(
      (current) => (current - 1 + HERO_IMAGES.length) % HERO_IMAGES.length,
    );
  }

  function showNextImage() {
    setActiveImage((current) => (current + 1) % HERO_IMAGES.length);
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

          position: relative;
          isolation: isolate;
          display: flex;
          align-items: center;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          height: 100vh;
          height: 100svh;
          min-height: 0;
          overflow: hidden;
          padding-block: clamp(12px, 2svh, 26px);
          color: var(--hero-text);
          background:
            radial-gradient(circle at 5% 15%, rgb(209 165 80 / 10%), transparent 27%),
            radial-gradient(circle at 92% 80%, rgb(178 43 47 / 6%), transparent 30%),
            var(--hero-background);
          font-family: var(--font-sans, "Inter", "Segoe UI", Arial, sans-serif);
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
          width: 330px;
          height: 330px;
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
          width: 390px;
          height: 390px;
          border-color: rgb(178 43 47 / 12%);
        }

        /* Full-width layout: left column gets slightly more room for larger text. */
        .ads-hero__grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          align-items: center;
          gap: clamp(28px, 4.5vw, 80px);
          width: 100%;
          height: 100%;
          min-height: 0;
          margin: 0;
          padding-inline: clamp(24px, 6vw, 100px);
        }

        /* Copy is vertically centered and left-aligned with the page gutter. */
        .ads-hero__copy {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          min-width: 0;
          max-width: 720px;
          padding-block: 8px;
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

        .ads-hero__title {
          margin: 0 0 clamp(16px, 2.6svh, 26px);
          color: var(--hero-text);
          font-size: clamp(2.9rem, 5.5vw, 5.8rem);
          font-weight: 750;
          letter-spacing: -0.055em;
          line-height: 1.02;
          text-wrap: balance;
        }

        .ads-hero__title span {
          color: var(--hero-primary);
        }

        .ads-hero__description {
          max-width: 580px;
          margin: 0 0 clamp(22px, 3.4svh, 34px);
          color: var(--hero-muted);
          font-size: clamp(15px, 1.35vw, 19px);
          line-height: 1.65;
        }

        .ads-hero__actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: clamp(20px, 3svh, 30px);
        }

        .ads-hero__primary-button,
        .ads-hero__secondary-button {
          display: inline-flex;
          min-height: 54px;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 0 26px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 650;
          text-decoration: none;
          white-space: nowrap;
          transition: background-color 180ms ease, color 180ms ease, border-color 180ms ease, transform 180ms ease;
        }

        .ads-hero__primary-button {
          border: 1px solid var(--hero-primary);
          background: var(--hero-primary);
          color: #ffffff;
        }

        .ads-hero__primary-button:hover {
          transform: translateY(-1px);
          border-color: var(--hero-primary-hover);
          background: var(--hero-primary-hover);
        }

        .ads-hero__secondary-button {
          border: 1px solid var(--hero-border);
          background: #ffffff;
          color: var(--hero-text);
        }

        .ads-hero__secondary-button:hover {
          border-color: var(--hero-primary);
          color: var(--hero-primary);
        }

        .ads-hero__button-arrow {
          display: inline-block;
          font-size: 19px;
          line-height: 1;
          transition: transform 180ms ease;
        }

        .ads-hero__primary-button:hover .ads-hero__button-arrow,
        .ads-hero__secondary-button:hover .ads-hero__button-arrow {
          transform: translateX(3px);
        }

        .ads-hero__focus-areas {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px 22px;
          color: var(--hero-muted);
          font-size: 13.5px;
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
          height: min(72svh, 690px);
          min-height: 0;
          overflow: hidden;
          border: 7px solid #ffffff;
          border-radius: 20px;
          background: var(--hero-surface-muted);
          box-shadow: 0 22px 54px rgb(39 35 35 / 14%), 0 2px 8px rgb(39 35 35 / 5%);
          will-change: transform;
          transition: transform 220ms ease-out;
        }

        .ads-hero__image-layer {
          position: absolute;
          inset: 0;
          background-color: #eee8e4;
          background-position: center;
          background-size: cover;
          opacity: 0;
          transform: scale(1.015);
          transition: opacity 850ms ease, transform 5.5s linear;
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
          right: clamp(18px, 2vw, 30px);
          bottom: 54px;
          left: clamp(18px, 2vw, 30px);
          color: #ffffff;
          pointer-events: none;
        }

        .ads-hero__image-caption small {
          display: block;
          margin-bottom: 5px;
          color: rgb(255 255 255 / 86%);
          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .ads-hero__image-caption strong {
          display: block;
          max-width: 560px;
          font-size: clamp(17px, 2vw, 25px);
          font-weight: 650;
          letter-spacing: -0.025em;
          line-height: 1.25;
          text-wrap: balance;
        }

        /* Arrow controls stay vertically centered inside the image frame. */
        .ads-hero__carousel-button {
          position: absolute;
          z-index: 5;
          top: 50%;
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          padding: 0;
          transform: translateY(-50%);
          border: 1px solid rgb(255 255 255 / 75%);
          border-radius: 50%;
          background: rgb(255 255 255 / 95%);
          color: var(--hero-text);
          cursor: pointer;
          transition: background-color 160ms ease, color 160ms ease, border-color 160ms ease;
        }

        .ads-hero__carousel-button svg {
          display: block;
          width: 19px;
          height: 19px;
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

        .ads-hero__carousel-button--previous {
          left: clamp(12px, 1.8vw, 24px);
        }

        .ads-hero__carousel-button--next {
          right: clamp(12px, 1.8vw, 24px);
        }

        .ads-hero__dots {
          position: absolute;
          z-index: 5;
          right: 0;
          bottom: 15px;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 7px;
        }

        .ads-hero__dot {
          width: 7px;
          height: 7px;
          padding: 0;
          border: 0;
          border-radius: 99px;
          background: rgb(255 255 255 / 72%);
          cursor: pointer;
          transition: width 200ms ease, background-color 200ms ease;
        }

        .ads-hero__dot--active {
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
        .ads-hero--reduced-motion .ads-hero__dot {
          transition-duration: 0.01ms;
          transform: none;
        }

        @media (max-width: 1100px) and (min-width: 761px) {
          .ads-hero__grid {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: clamp(20px, 3vw, 36px);
            padding-inline: clamp(24px, 4vw, 54px);
          }

          .ads-hero__title {
            font-size: clamp(2.4rem, 5vw, 3.8rem);
          }

          .ads-hero__description {
            font-size: 15px;
            line-height: 1.6;
          }

          .ads-hero__primary-button,
          .ads-hero__secondary-button {
            min-height: 48px;
            padding-inline: 20px;
            font-size: 14px;
          }

          .ads-hero__focus-areas {
            font-size: 12.5px;
          }

          .ads-hero__image-frame {
            height: min(66svh, 540px);
          }
        }

        @media (max-width: 760px) {
          .ads-hero {
            padding-block: clamp(10px, 1.8svh, 18px);
          }

          .ads-hero__grid {
            grid-template-columns: minmax(0, 1fr);
            grid-template-rows: auto minmax(0, 1fr);
            align-content: stretch;
            gap: clamp(12px, 2svh, 18px);
            padding-inline: clamp(16px, 4.5vw, 28px);
          }

          .ads-hero__copy {
            max-width: none;
            padding-block: 0;
          }

          .ads-hero__title {
            max-width: 640px;
            margin-bottom: clamp(8px, 1.4svh, 14px);
            font-size: clamp(2.1rem, 8vw, 3.2rem);
            line-height: 1.04;
          }

          .ads-hero__description {
            max-width: 620px;
            margin-bottom: clamp(12px, 1.8svh, 18px);
            font-size: clamp(13px, 2.8vw, 16px);
            line-height: 1.5;
          }

          .ads-hero__actions {
            gap: 8px;
            margin-bottom: clamp(10px, 1.6svh, 14px);
          }

          .ads-hero__primary-button,
          .ads-hero__secondary-button {
            min-height: 44px;
            padding-inline: 16px;
            font-size: 12.5px;
          }

          .ads-hero__focus-areas {
            gap: 6px 14px;
            font-size: 11px;
          }

          .ads-hero__visual {
            display: flex;
            width: 100%;
            height: 100%;
            min-height: 0;
            margin-inline: auto;
          }

          .ads-hero__image-frame {
            width: 100%;
            height: 100%;
            min-height: 0;
            border-width: 5px;
            border-radius: 14px;
          }

          .ads-hero__visual-accent {
            top: -9px;
            right: -9px;
            border-width: 2px;
          }

          .ads-hero__carousel-button {
            width: 34px;
            height: 34px;
          }

          .ads-hero__carousel-button svg {
            width: 16px;
            height: 16px;
          }

          .ads-hero__carousel-button--previous { left: 10px; }
          .ads-hero__carousel-button--next { right: 10px; }

          .ads-hero__image-caption {
            right: 13px;
            bottom: 43px;
            left: 13px;
          }

          .ads-hero__image-caption small {
            font-size: 8px;
          }

          .ads-hero__image-caption strong {
            font-size: clamp(14px, 3.5vw, 20px);
          }

          .ads-hero__dots {
            bottom: 12px;
          }
        }

        @media (max-width: 480px) {
          .ads-hero__grid {
            padding-inline: 14px;
          }

          .ads-hero__title {
            font-size: clamp(1.95rem, 9vw, 2.6rem);
          }

          .ads-hero__description {
            font-size: 12.5px;
            line-height: 1.48;
          }

          .ads-hero__actions {
            gap: 7px;
          }

          .ads-hero__primary-button,
          .ads-hero__secondary-button {
            min-height: 40px;
            padding-inline: 12px;
            gap: 6px;
            font-size: 11.5px;
          }

          .ads-hero__focus-areas {
            gap: 5px 10px;
            font-size: 10px;
          }

          .ads-hero__image-caption {
            right: 11px;
            left: 11px;
          }

          .ads-hero__image-caption strong {
            font-size: 14px;
          }
        }

        @media (max-height: 680px) and (min-width: 761px) {
          .ads-hero {
            padding-block: 8px;
          }

          .ads-hero__grid {
            gap: clamp(18px, 2.8vw, 38px);
          }

          .ads-hero__title {
            margin-bottom: 12px;
            font-size: clamp(2.2rem, 4.2vw, 3.5rem);
            line-height: 1.03;
          }

          .ads-hero__description {
            margin-bottom: 16px;
            font-size: 14px;
            line-height: 1.5;
          }

          .ads-hero__actions {
            margin-bottom: 14px;
          }

          .ads-hero__primary-button,
          .ads-hero__secondary-button {
            min-height: 44px;
            font-size: 13.5px;
          }

          .ads-hero__focus-areas {
            font-size: 12px;
          }

          .ads-hero__image-frame {
            height: min(66svh, 440px);
          }
        }

        @media (max-width: 760px) and (max-height: 520px) and (orientation: landscape) {
          .ads-hero__grid {
            grid-template-columns: minmax(0, 1fr) minmax(0, 0.95fr);
            grid-template-rows: minmax(0, 1fr);
            gap: 14px;
            padding-inline: 18px;
          }

          .ads-hero__title {
            margin-bottom: 7px;
            font-size: clamp(1.5rem, 4.6vw, 2.2rem);
          }

          .ads-hero__description {
            margin-bottom: 8px;
            font-size: 11px;
            line-height: 1.4;
          }

          .ads-hero__actions {
            gap: 6px;
            margin-bottom: 8px;
          }

          .ads-hero__primary-button,
          .ads-hero__secondary-button {
            min-height: 34px;
            padding-inline: 10px;
            font-size: 9.5px;
          }

          .ads-hero__focus-areas {
            gap: 4px 8px;
            font-size: 8.5px;
          }

          .ads-hero__image-frame {
            height: 100%;
          }

          .ads-hero__image-caption {
            bottom: 36px;
          }

          .ads-hero__image-caption strong {
            font-size: 13px;
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

          <div className="ads-hero__reveal ads-hero__reveal--3 ads-hero__actions">
            <Link to="/about" className="ads-hero__primary-button">
              Explore the Department
              <span className="ads-hero__button-arrow" aria-hidden="true">
                →
              </span>
            </Link>
            <Link to="/academics" className="ads-hero__secondary-button">
              View Academics
              <span className="ads-hero__button-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>

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
            onMouseMove={handlePointerMove}
            onMouseLeave={resetTilt}
            style={{
              transform: reducedMotion
                ? undefined
                : `perspective(1200px) rotateX(${-tilt.y * 0.18}deg) rotateY(${tilt.x * 0.18}deg)`,
            }}
            aria-label="Department and technology highlights"
          >
            {HERO_IMAGES.map((image, index) => (
              <div
                key={image.src}
                className={`ads-hero__image-layer ${
                  index === activeImage ? "ads-hero__image-layer--active" : ""
                }`}
                style={{ backgroundImage: `url("${image.src}")` }}
                role="img"
                aria-label={image.alt}
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

            <div className="ads-hero__dots" aria-label="Choose a hero image">
              {HERO_IMAGES.map((image, index) => (
                <button
                  key={image.src}
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
