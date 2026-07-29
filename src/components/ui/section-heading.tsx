export function SectionHeading({
  kicker,
  title,
  body,
  invert = false,
}: {
  kicker: string;
  title: string;
  body?: string;
  invert?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <p className="kicker">{kicker}</p>
      <h2
        className={`mt-4 font-display text-3xl font-black tracking-[-0.03em] md:text-5xl ${invert ? "text-white" : "text-brand-black"}`}
      >
        {title}
      </h2>
      {body ? (
        <p
          className={`mt-4 text-base leading-7 md:text-lg ${invert ? "text-white/70" : "text-brand-muted"}`}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}
