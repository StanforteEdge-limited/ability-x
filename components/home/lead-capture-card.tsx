import type { LeadCaptureCard as LeadCaptureCardType } from "@/content/types";

export function LeadCaptureCard({ card }: { card: LeadCaptureCardType }) {
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

      <div className="mt-6 space-y-3">
        <a
          href={card.href}
          target="_blank"
          rel="noreferrer"
          className={
            card.featured
              ? "inline-flex rounded-full bg-brand-red px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 ease-in-out hover:bg-brand-red-dark"
              : "inline-flex rounded-full bg-brand-black px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 ease-in-out hover:bg-brand-surface"
          }
        >
          {card.buttonLabel}
        </a>
        <p className={`text-xs ${card.featured ? "text-white/60" : "text-brand-muted"}`}>
          Opens a Google Form in a new tab.
        </p>
      </div>
    </article>
  );
}
