import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";

type SiteFooterProps = {
  links?: Array<{ href: string; label: string }>;
};

export function SiteFooter({ links }: SiteFooterProps) {
  return (
    <footer className="bg-brand-black text-white">
      <Container className="px-5 py-12 md:px-8 lg:px-20 lg:py-16">
        <div className="border-b border-white/10 pb-8 md:flex md:items-end md:justify-between md:gap-10">
          <Image
            src="/abilityx/logo-white.png"
            alt="AbilityX"
            width={152}
            height={36}
            className="h-8 w-auto"
          />
          <p className="mt-6 max-w-xl text-sm leading-7 text-white/70 md:text-base">
            It&apos;s not just an event. It&apos;s a movement. - By ProjectEnable
            Africa
          </p>
          {links?.length ? (
            <div className="mt-6 flex flex-wrap gap-6 text-sm text-white/70 md:mt-0 md:shrink-0">
              {links.map((link) => (
                <Link key={link.href + link.label} href={link.href} className="transition-colors hover:text-brand-red">
                  {link.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 pt-6 text-xs text-white/30 md:flex-row md:items-center md:justify-between">
          <p>© 2026 ProjectEnable Africa. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
