import { describe, expect, it } from "vitest";
import {
  chunkCarouselItems,
  clampCarouselPage,
  getCarouselPageCount,
  getSlidesPerView,
} from "@/lib/carousel-state";

describe("carousel-state", () => {
  it("uses the right slides-per-view at common breakpoints", () => {
    expect(
      getSlidesPerView({ base: 1, md: 2, xl: 4 }, 390),
    ).toBe(1);
    expect(
      getSlidesPerView({ base: 1, md: 2, xl: 4 }, 900),
    ).toBe(2);
    expect(
      getSlidesPerView({ base: 1, md: 2, xl: 4 }, 1440),
    ).toBe(4);
  });

  it("chunks items into carousel pages based on slides-per-view", () => {
    expect(chunkCarouselItems([1, 2, 3, 4, 5], 2)).toEqual([
      [1, 2],
      [3, 4],
      [5],
    ]);
  });

  it("clamps the current page when the page count shrinks", () => {
    expect(getCarouselPageCount(8, 4)).toBe(2);
    expect(clampCarouselPage(3, 2)).toBe(1);
    expect(clampCarouselPage(1, 0)).toBe(0);
  });
});
