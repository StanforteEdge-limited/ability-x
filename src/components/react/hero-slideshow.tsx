import { useEffect, useState } from "react";

export function HeroSlideshow({ images, intervalMs = 5000 }: { images: string[]; intervalMs?: number }) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % images.length);
    }, intervalMs);
    return () => window.clearInterval(interval);
  }, [images.length, intervalMs]);

  return (
    <>
      {images.map((imageSrc, index) => (
        <div
          key={imageSrc}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1800ms] ease-in-out motion-reduce:transition-none"
          style={{
            backgroundImage: `url("${encodeURI(imageSrc)}")`,
            opacity: activeSlide === index ? 1 : 0,
            animation: activeSlide === index ? "ken-burns 8s ease-in-out forwards" : undefined,
          }}
          role={index === 0 ? "img" : undefined}
          aria-label={index === 0 ? "AbilityX hero banner photography." : undefined}
        />
      ))}
    </>
  );
}
