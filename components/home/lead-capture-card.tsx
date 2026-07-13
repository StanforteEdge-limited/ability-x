"use client";

import { useRef, useState } from "react";
import type { LeadCaptureCard as LeadCaptureCardType } from "@/content/types";

export function LeadCaptureCard({ card }: { card: LeadCaptureCardType }) {
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = () => {
    if (!inputRef.current?.value.trim()) {
      return;
    }

    setSubmitted(true);
  };

  return (
    <article
      className={
        card.featured
          ? "rounded-[16px] bg-brand-black p-6 text-white shadow-card md:p-8"
          : "rounded-[16px] border border-brand-border bg-white p-6 shadow-card md:p-8"
      }
    >
      <h3
        className={`font-display text-2xl font-black tracking-[-0.03em] ${card.featured ? "text-white" : "text-brand-black"}`}
      >
        {card.title}
      </h3>
      <p
        className={`mt-3 text-sm leading-7 md:text-base ${card.featured ? "text-white/70" : "text-brand-muted"}`}
      >
        {card.description}
      </p>

      {submitted ? (
        <div className="mt-6 rounded-[14px] border border-success-border bg-success-bg px-4 py-4 text-sm font-medium text-success-fg">
          {card.successMessage}
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <label className="block text-sm font-medium">
            <span className="sr-only">{card.inputLabel}</span>
            <input
              ref={inputRef}
              type="email"
              required
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  submit();
                }
              }}
              placeholder={card.inputPlaceholder}
              className={
                card.featured
                  ? "mt-2 w-full rounded-full border border-white/25 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/55"
                  : "mt-2 w-full rounded-full border border-brand-border-strong bg-white px-4 py-3 text-sm text-brand-black placeholder:text-brand-muted"
              }
            />
          </label>
          <button
            type="button"
            onClick={submit}
            className={
              card.featured
                ? "inline-flex rounded-full bg-brand-red px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 ease-in-out hover:bg-brand-red-dark"
                : "inline-flex rounded-full bg-brand-black px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 ease-in-out hover:bg-brand-surface"
            }
          >
            {card.buttonLabel}
          </button>
        </div>
      )}
    </article>
  );
}
