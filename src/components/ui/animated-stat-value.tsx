"use client";

import { useEffect, useRef, useState } from "react";

function parseStatValue(value: string) {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);

  if (!match) {
    return { numeric: null, suffix: value };
  }

  return {
    numeric: Number(match[1]),
    suffix: match[2],
  };
}

export function AnimatedStatValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [currentValue, setCurrentValue] = useState(0);
  const { numeric, suffix } = parseStatValue(value);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || numeric === null) {
      return;
    }

    let frame = 0;
    const start = performance.now();
    const duration = 1200;

    const tick = (timestamp: number) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCurrentValue(numeric * eased);

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, [numeric, visible]);

  if (numeric === null) {
    return <span ref={ref}>{value}</span>;
  }

  return <span ref={ref}>{`${Math.round(currentValue)}${suffix}`}</span>;
}
