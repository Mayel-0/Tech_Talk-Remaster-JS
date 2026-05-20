"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import "../app/carousel.css";

export default function Carousel({
  images = [],
  autoPlay = true,
  autoPlayInterval = 4000,
  loop = true,
}) {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const progressRef = useRef(null);
  const touchStartX = useRef(null);
  const startTime = useRef(null);

  const count = images.length;

  const goTo = useCallback((index) => {
    if (loop) {
      setCurrent(((index % count) + count) % count);
    } else {
      setCurrent(Math.max(0, Math.min(index, count - 1)));
    }
    setProgress(0);
  }, [count, loop]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || count <= 1) return;

    startTime.current = Date.now();

    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime.current;
      setProgress(Math.min((elapsed / autoPlayInterval) * 100, 100));
    }, 50);

    timerRef.current = setTimeout(() => {
      next();
    }, autoPlayInterval);

    return () => {
      clearTimeout(timerRef.current);
      clearInterval(progressRef.current);
    };
  }, [current, autoPlay, autoPlayInterval, next, count]);

  // Touch swipe
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
    touchStartX.current = null;
  };

  // Keyboard
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);

  if (count === 0) {
    return (
      <>
        <div className="carousel-root">
          <div className="carousel-wrapper">
            <div className="carousel-track-outer">
              <div className="carousel-slide">
                <div className="slide-placeholder">
                  <span>🖼</span>
                  <p>Aucune image fournie</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="carousel-root">
        <div className="carousel-label">Galerie — {count} image{count > 1 ? 's' : ''}</div>

        <div className="carousel-wrapper">
          <div
            className="carousel-track-outer"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {images.map((img, i) => (
                <div className="carousel-slide" key={i}>
                  {img.src ? (
                    <>
                      <img src={img.src} alt={img.alt || `Slide ${i + 1}`} />
                      <div className="carousel-slide-overlay" />
                      {(img.title || img.subtitle) && (
                        <div className="carousel-slide-caption">
                          {img.title && <h3>{img.title}</h3>}
                          {img.subtitle && <p>{img.subtitle}</p>}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="slide-placeholder">
                      <span>🖼</span>
                      <p>Image {i + 1}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="carousel-counter">
              {String(current + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </div>
          </div>

          {/* Progress bar */}
          {autoPlay && count > 1 && (
            <div className="carousel-progress">
              <div className="carousel-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          )}

          {/* Controls */}
          {count > 1 && (
            <div className="carousel-controls">
              <div className="carousel-dots">
                {images.map((_, i) => (
                  <button
                    key={i}
                    className={`carousel-dot ${i === current ? 'active' : ''}`}
                    onClick={() => goTo(i)}
                    aria-label={`Aller au slide ${i + 1}`}
                  />
                ))}
              </div>
              <div className="carousel-arrows">
                <button
                  className="carousel-btn"
                  onClick={prev}
                  disabled={!loop && current === 0}
                  aria-label="Précédent"
                >
                  ←
                </button>
                <button
                  className="carousel-btn"
                  onClick={next}
                  disabled={!loop && current === count - 1}
                  aria-label="Suivant"
                >
                  →
                </button>
              </div>
            </div>
          )}

          {count > 1 && (
            <div className="carousel-hint">← Swipe ou touches directionnelles →</div>
          )}
        </div>
      </div>
    </>
  );
}

// ─── Démo ────────────────────────────────────────────────────────────────────

const DEMO_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200&q=80",
    alt: "Studio podcast",
    title: "Episode #42 — L'IA en 2025",
    subtitle: "Tech · 12 jan 2025",
  },
  {
    src: "https://images.unsplash.com/photo-1590602847861-f45433d009a2?w=1200&q=80",
    alt: "Micro",
    title: "Episode #41 — Le futur du web",
    subtitle: "Dev · 05 jan 2025",
  },
  {
    src: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=80",
    alt: "Casque audio",
    title: "Episode #40 — Open Source",
    subtitle: "Culture · 28 déc 2024",
  },
  {
    src: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=1200&q=80",
    alt: "Enregistrement",
    title: "Episode #39 — Sécurité",
    subtitle: "Cyber · 20 déc 2024",
  },
];

export function CarouselDemo() {
  return <Carousel images={DEMO_IMAGES} autoPlay={true} autoPlayInterval={4000} loop={true} />;
}
