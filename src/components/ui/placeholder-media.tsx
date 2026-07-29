import { cn } from "@/lib/cn";

export function PlaceholderMedia({
  label,
  description,
  className,
}: {
  label: string;
  description?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "placeholder-dashed flex min-h-[220px] flex-col justify-end p-5",
        className,
      )}
      role="img"
      aria-label={description ? `${label}. ${description}` : label}
    >
      <span className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-muted">
        {label}
      </span>
      {description ? (
        <span className="mt-2 text-sm text-brand-muted">{description}</span>
      ) : null}
    </div>
  );
}
