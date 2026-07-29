export type CarouselSlidesPerView = {
  base: number;
  md?: number;
  lg?: number;
  xl?: number;
};

export function getSlidesPerView(
  config: CarouselSlidesPerView,
  width: number,
) {
  if (width >= 1280 && config.xl) {
    return config.xl;
  }

  if (width >= 1024 && config.lg) {
    return config.lg;
  }

  if (width >= 768 && config.md) {
    return config.md;
  }

  return config.base;
}

export function getCarouselPageCount(totalItems: number, slidesPerView: number) {
  if (totalItems <= 0) {
    return 0;
  }

  return Math.ceil(totalItems / Math.max(slidesPerView, 1));
}

export function clampCarouselPage(page: number, pageCount: number) {
  if (pageCount <= 0) {
    return 0;
  }

  return Math.min(Math.max(page, 0), pageCount - 1);
}

export function chunkCarouselItems<T>(items: T[], slidesPerView: number) {
  const safeSlidesPerView = Math.max(slidesPerView, 1);
  const pages: T[][] = [];

  for (let index = 0; index < items.length; index += safeSlidesPerView) {
    pages.push(items.slice(index, index + safeSlidesPerView));
  }

  return pages;
}
