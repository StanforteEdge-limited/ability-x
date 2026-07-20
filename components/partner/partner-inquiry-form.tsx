import { partnerContent } from "@/content/partner";

export function PartnerInquiryForm() {
  return (
    <article className="flex h-full flex-col rounded-[16px] border border-brand-border bg-brand-subtle p-6 md:p-11">
      <h2 className="font-display text-[28px] font-black tracking-[-0.03em] text-brand-black">
        {partnerContent.form.title}
      </h2>
      <p className="mt-2 text-sm text-brand-muted">{partnerContent.form.intro}</p>
      <div className="mt-6 flex flex-1 flex-col justify-end rounded-[14px] border border-brand-border bg-white p-5">
        <a
          href={partnerContent.form.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-full items-center justify-center rounded-full bg-brand-red px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-150 ease-in-out hover:bg-brand-red-dark"
        >
          {partnerContent.form.submitLabel}
        </a>
      </div>
    </article>
  );
}
