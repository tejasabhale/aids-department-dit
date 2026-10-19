import React, { useCallback, useEffect, useRef, useState } from "react";

const INTERVAL = 5000;

/*
  TEMP IMAGES: placeholders from picsum.photos (needs internet).
  To use your own photos, put them in /public/images/ and replace each
  `src` with e.g. "/images/campus.jpg".
*/
const images = [
  { src: "https://picsum.photos/seed/aids-campus/1600/800", alt: "Campus building" },
  { src: "https://picsum.photos/seed/aids-lab/1600/800", alt: "Computer lab" },
  { src: "https://picsum.photos/seed/aids-students/1600/800", alt: "Students at work" },
  { src: "https://picsum.photos/seed/aids-event/1600/800", alt: "Department event" },
  { src: "https://picsum.photos/seed/aids-tech/1600/800", alt: "Technology workshop" },
];

const HeroCarousel = () => {
  const total = images.length;
  const [{ current, previous }, setState] = useState({ current: 0, previous: null });
  const touchStartX = useRef(null);

  const goTo = useCallback(
    (i) => setState((s) => ({ current: (i + total) % total, previous: s.current })),
    [total]
  );
  const next = useCallback(
    () => setState((s) => ({ current: (s.current + 1) % total, previous: s.current })),
    [total]
  );
  const prev = useCallback(
    () => setState((s) => ({ current: (s.current - 1 + total) % total, previous: s.current })),
    [total]
  );

  // Autoplay
  useEffect(() => {
    const id = setTimeout(next, INTERVAL);
    return () => clearTimeout(id);
  }, [current, next]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) (diff < 0 ? next : prev)();
    touchStartX.current = null;
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Department photo gallery"
      className="relative h-[260px] w-full overflow-hidden bg-brand-dark sm:h-[380px] md:h-[460px] lg:h-[560px]"
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      tabIndex={0}
    >
      {/* Slides */}
      {images.map((img, i) => {
        const isActive = i === current;
        // Keep the zoom running on the outgoing slide so it doesn't snap back during the fade
        const animate = isActive || i === previous;
        const zoom = i % 2 === 0 ? "animate-zoom-in" : "animate-zoom-out";

        return (
          <div
            key={img.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${total}`}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
          >
            <div
              className={`absolute inset-0 ${animate ? zoom : ""}`}
              style={{ transformOrigin: ["center", "30% 40%", "70% 60%", "50% 30%", "60% 50%"][i % 5] }}
            >
              <img
                src={img.src}
                alt={img.alt}
                decoding="async"
                draggable="false"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        );
      })}

      {/* Soft bottom shade so the controls stay visible on any photo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-brand-dark/60 to-transparent"
      />

      {/* Arrows */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous image"
        className="absolute left-3 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-on-brand/40 bg-brand-dark/50 text-on-brand backdrop-blur-sm transition-colors duration-200 hover:bg-gold hover:text-brand-dark sm:flex"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
          <path d="M12.7 5.3a1 1 0 010 1.4L9.4 10l3.3 3.3a1 1 0 01-1.4 1.4l-4-4a1 1 0 010-1.4l4-4a1 1 0 011.4 0z" />
        </svg>
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next image"
        className="absolute right-3 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-on-brand/40 bg-brand-dark/50 text-on-brand backdrop-blur-sm transition-colors duration-200 hover:bg-gold hover:text-brand-dark sm:flex"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
          <path d="M7.3 14.7a1 1 0 010-1.4l3.3-3.3-3.3-3.3a1 1 0 111.4-1.4l4 4a1 1 0 010 1.4l-4 4a1 1 0 01-1.4 0z" />
        </svg>
      </button>

      {/* Dots with progress */}
      <div className="absolute inset-x-0 bottom-4 z-30 flex items-center justify-center gap-2">
        {images.map((img, i) => {
          const isActive = i === current;
          return (
            <button
              key={img.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={isActive}
              className={`relative h-2.5 overflow-hidden rounded-full bg-on-brand/60 shadow-[0_1px_4px_rgb(0_0_0/35%)] transition-all duration-500 ${
                isActive ? "w-10" : "w-2.5 hover:bg-on-brand"
              }`}
            >
              {isActive && (
                <span
                  key={current}
                  className="animate-progress absolute inset-y-0 left-0 bg-gold"
                  style={{ animationDuration: `${INTERVAL}ms` }}
                />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default HeroCarousel;