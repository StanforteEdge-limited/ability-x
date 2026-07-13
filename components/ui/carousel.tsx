"use client";

import {
  startTransition,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import {
  chunkCarouselItems,
  clampCarouselPage,
  getCarouselPageCount,
  getSlidesPerView,
  type CarouselSlidesPerView,
} from "@/lib/carousel-state";

const gridColumnsByCount = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
} as const;

export function Carousel({
  slides,
  ariaLabel,
  slidesPerView,
  pageClassName,
  slideClassName,
}: {
  slides: ReactNode[];
  ariaLabel: string;
  slidesPerView: CarouselSlidesPerView;
  pageClassName?: string;
  slideClassName?: string;
}) {
  const [viewportWidth, setViewportWidth] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const updateWidth = () => setViewportWidth(window.innerWidth);

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const visibleSlides = getSlidesPerView(slidesPerView, viewportWidth);
  const pages = useMemo(
    () => chunkCarouselItems(slides, visibleSlides),
    [slides, visibleSlides],
  );
  const pageCount = getCarouselPageCount(slides.length, visibleSlides);

  useEffect(() => {
    startTransition(() => {
      setPage((currentPage) => clampCarouselPage(currentPage, pageCount));
    });
  }, [pageCount]);

  const canGoPrev = page > 0;
  const canGoNext = page < pageCount - 1;
  const gridClass =
    gridColumnsByCount[
      Math.min(visibleSlides, 4) as keyof typeof gridColumnsByCount
    ] ?? "grid-cols-1";

  return (
    <div
      className="w-full"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" && canGoPrev) {
          startTransition(() => setPage((currentPage) => currentPage - 1));
        }

        if (event.key === "ArrowRight" && canGoNext) {
          startTransition(() => setPage((currentPage) => currentPage + 1));
        }
      }}
      aria-label={ariaLabel}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {pages.map((pageSlides, pageIndex) => (
            <div
              key={`${ariaLabel}-page-${pageIndex}`}
              className={cn(
                "grid w-full shrink-0 gap-6",
                gridClass,
                pageClassName,
              )}
            >
              {pageSlides.map((slide, slideIndex) => (
                <div
                  key={`${ariaLabel}-slide-${pageIndex}-${slideIndex}`}
                  className={slideClassName}
                >
                  {slide}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {pageCount > 1 ? (
        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() =>
              startTransition(() => setPage((currentPage) => currentPage - 1))
            }
            disabled={!canGoPrev}
            className="inline-flex rounded-full border border-brand-border-strong px-4 py-2 text-sm font-semibold text-brand-black transition-colors disabled:cursor-not-allowed disabled:opacity-35"
          >
            Previous
          </button>

          <div className="flex items-center gap-2">
            {pages.map((_, dotIndex) => (
              <button
                key={`${ariaLabel}-dot-${dotIndex}`}
                type="button"
                aria-label={`Go to slide group ${dotIndex + 1}`}
                aria-pressed={page === dotIndex}
                onClick={() => startTransition(() => setPage(dotIndex))}
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-colors",
                  page === dotIndex ? "bg-brand-red" : "bg-brand-border-strong",
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() =>
              startTransition(() => setPage((currentPage) => currentPage + 1))
            }
            disabled={!canGoNext}
            className="inline-flex rounded-full bg-brand-black px-4 py-2 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-35"
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}
