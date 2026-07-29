import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PillButton } from "@/components/ui/pill-button";

type SiteNavProps = {
  active: "home" | "event-1-0" | "about" | "partner";
};

export function SiteNav({ active }: SiteNavProps) {
  const homeActive = active === "home";
  const eventActive = active === "event-1-0";
  const aboutActive = active === "about";
  const partnerActive = active === "partner";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-brand-border bg-white/95 backdrop-blur-sm">
      <Container>
        <div className="flex min-h-16 items-center justify-between gap-4 px-5 md:min-h-20 lg:px-8">
          <Link href="/" aria-label="AbilityX home">
            <Image
              src="/abilityx/logo-primary.png"
              alt="AbilityX"
              width={138}
              height={32}
              className="h-[26px] w-auto md:h-8"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-2 md:flex" aria-label="Primary">
            <PillButton href="/" variant={homeActive ? "nav-active" : "nav-idle"}>
              Home
            </PillButton>
            <PillButton
              href="/events/1.0"
              variant={eventActive ? "nav-active" : "nav-idle"}
            >
              AbilityX 1.0
            </PillButton>
            <PillButton href="/about" variant={aboutActive ? "nav-active" : "nav-idle"}>
              About
            </PillButton>
          </nav>

          {partnerActive ? (
            <span className="inline-flex items-center justify-center rounded-full bg-brand-red px-4 py-2.5 text-sm font-semibold text-white md:px-5 md:py-3">
              <span className="hidden sm:inline">Partner With Us</span>
              <span className="sm:hidden">Partner</span>
            </span>
          ) : (
            <PillButton href="/partner" className="px-4 py-2.5 md:px-5 md:py-3">
              <span className="hidden sm:inline">Partner With Us</span>
              <span className="sm:hidden">Partner</span>
            </PillButton>
          )}
        </div>

        <nav
          className="flex items-center gap-4 border-t border-brand-border px-5 py-2 text-[13px] md:hidden"
          aria-label="Mobile secondary"
        >
          <Link href="/" className={homeActive ? "font-semibold text-brand-red" : "text-brand-muted"}>
            Home
          </Link>
          <Link
            href="/events/1.0"
            className={eventActive ? "font-semibold text-brand-red" : "text-brand-muted"}
          >
            AbilityX 1.0
          </Link>
          <Link href="/about" className={aboutActive ? "font-semibold text-brand-red" : "text-brand-muted"}>
            About
          </Link>
        </nav>
      </Container>
    </header>
  );
}
