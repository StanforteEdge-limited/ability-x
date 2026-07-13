import { partnerContent } from "@/content/partner";

export function PartnerInquiryForm() {
  return (
    <article className="rounded-[16px] border border-brand-border bg-brand-subtle p-6 md:p-11">
      <h2 className="font-display text-[28px] font-black tracking-[-0.03em] text-brand-black">
        {partnerContent.form.title}
      </h2>
      <p className="mt-2 text-sm text-brand-muted">{partnerContent.form.intro}</p>
      <div className="mt-6 rounded-[14px] border border-brand-border bg-white p-5">
        <p className="text-sm leading-7 text-brand-muted">
          Google Forms handles submission and confirmation, so there is no local
          form state or backend for this flow.
        </p>
        <a
          href={partnerContent.form.href}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex rounded-full bg-brand-red px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-150 ease-in-out hover:bg-brand-red-dark"
        >
          {partnerContent.form.submitLabel}
        </a>
      </div>
      <p className="mt-4 text-center text-[11px] text-[#8f8f8f]">{partnerContent.form.caption}</p>
    </article>
  );
}
