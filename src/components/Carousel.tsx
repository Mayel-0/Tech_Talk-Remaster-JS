"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import "../app/carousel.css";

type CarouselImage = {
  src: string;
  alt?: string;
  title?: string;
  subtitle?: string;
};

export default function Carousel({
  images = [],
  autoPlay = true,
  autoPlayInterval = 4000,
  loop = true,
}: {
  images: CarouselImage[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  loop?: boolean;
}) {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const startTime = useRef<number | null>(null);

  const count = images.length;

  const goTo = useCallback((index: number) => {
    if (loop) {
      setCurrent(((index % count) + count) % count);
    } else {
      setCurrent(Math.max(0, Math.min(index, count - 1)));
    }
    setProgress(0);
  }, [count, loop]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (!autoPlay || count <= 1) return;

    startTime.current = Date.now();

    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - (startTime.current ?? 0);
      setProgress(Math.min((elapsed / autoPlayInterval) * 100, 100));
    }, 50);

    timerRef.current = setTimeout(() => {
      next();
    }, autoPlayInterval);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [current, autoPlay, autoPlayInterval, next, count]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
    touchStartX.current = null;
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);

  if (count === 0) {
    return (
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
    );
  }

  return (
    <div className="carousel-root">
      <div className="carousel-wrapper">
        <button
          className="carousel-btn"
          onClick={prev}
          disabled={!loop && current === 0}
          aria-label="Précédent"
        >
          ←
        </button>

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
        </div>

        <button
          className="carousel-btn"
          onClick={next}
          disabled={!loop && current === count - 1}
          aria-label="Suivant"
        >
          →
        </button>
      </div>

      <div className="carousel-arrows">
        {autoPlay && count > 1 && (
          <div className="carousel-progress">
            <div className="carousel-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>
    </div>
  );
}
