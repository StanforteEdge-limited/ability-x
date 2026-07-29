import { Container } from "@/components/layout/container";

type PageBannerProps = {
  imageSrc?: string;
  imageAlt: string;
  kicker: string;
  title: string;
  description: string;
};

export function PageBanner({
  imageSrc,
  imageAlt,
  kicker,
  title,
  description,
}: PageBannerProps) {
  return (
    <section className="relative overflow-hidden bg-brand-black pt-[108px] text-white md:pt-[128px]">
      {imageSrc ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${imageSrc}")` }}
          role="img"
          aria-label={imageAlt}
        />
      ) : (
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(255,255,255,0.14),transparent_28%),linear-gradient(180deg,rgba(31,31,31,0.88),rgba(13,13,13,0.92))]"
          role="img"
          aria-label={imageAlt}
        />
      )}

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(31,31,31,0.6) 0%, rgba(13,13,13,0.85) 100%)",
        }}
      />

      <Container className="relative px-5 pb-16 pt-20 md:px-8 md:pb-16 lg:px-20 lg:pb-16 lg:pt-20">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-brand-red" aria-hidden="true" />
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-brand-red">
              {kicker}
            </p>
          </div>
          <h1 className="mt-4 font-display text-[34px] font-black tracking-[-0.03em] md:text-[56px]">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/70 md:text-xl">
            {description}
          </p>
        </div>
      </Container>
    </section>
  );
}
