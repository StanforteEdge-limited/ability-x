import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type PillButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost" | "nav-active" | "nav-idle";
  className?: string;
};

const variants = {
  primary: "bg-brand-red text-white hover:bg-brand-red-dark",
  outline:
    "border border-white/30 bg-transparent text-white hover:bg-white/10",
  ghost:
    "border border-brand-border-strong bg-transparent text-brand-black hover:bg-brand-subtle",
  "nav-active": "bg-brand-red-soft text-brand-red",
  "nav-idle": "text-brand-black hover:bg-brand-subtle",
} as const;

export function PillButton({
  href,
  children,
  variant = "primary",
  className,
}: PillButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors duration-150 ease-in-out",
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
