"use client";

import { useRef, useState } from "react";
import { partnerContent } from "@/content/partner";

export function PartnerInquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const orgRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const interestRef = useRef<HTMLSelectElement>(null);

  const submit = () => {
    if (
      !nameRef.current?.value.trim() ||
      !orgRef.current?.value.trim() ||
      !emailRef.current?.value.trim() ||
      !interestRef.current?.value
    ) {
      return;
    }

    setSubmitted(true);
  };

  return (
    <article className="rounded-[16px] border border-brand-border bg-brand-subtle p-6 md:p-11">
      <h2 className="font-display text-[28px] font-black tracking-[-0.03em] text-brand-black">
        {partnerContent.form.title}
      </h2>
      <p className="mt-2 text-sm text-brand-muted">{partnerContent.form.intro}</p>
      {submitted ? (
        <div className="py-10 text-center">
          <p className="font-display text-[22px] font-extrabold text-brand-black">{partnerContent.form.successTitle}</p>
          <p className="mt-3 text-sm leading-7 text-brand-muted">{partnerContent.form.successBody}</p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-brand-black">
            <span className="sr-only">{partnerContent.form.fields.fullName}</span>
            <input ref={nameRef} type="text" placeholder="Full name" className="mt-2 w-full rounded-[10px] border border-brand-border-strong bg-white px-4 py-3.5 text-sm text-brand-black placeholder:text-brand-muted" />
          </label>
          <label className="block text-sm font-medium text-brand-black">
            <span className="sr-only">{partnerContent.form.fields.organization}</span>
            <input ref={orgRef} type="text" placeholder="Organization" className="mt-2 w-full rounded-[10px] border border-brand-border-strong bg-white px-4 py-3.5 text-sm text-brand-black placeholder:text-brand-muted" />
          </label>
          <label className="block text-sm font-medium text-brand-black">
            <span className="sr-only">{partnerContent.form.fields.workEmail}</span>
            <input ref={emailRef} type="email" placeholder="Work email" className="mt-2 w-full rounded-[10px] border border-brand-border-strong bg-white px-4 py-3.5 text-sm text-brand-black placeholder:text-brand-muted" />
          </label>
          <label className="block text-sm font-medium text-brand-black">
            <span className="sr-only">{partnerContent.form.fields.interestArea}</span>
            <select ref={interestRef} defaultValue="" className="mt-2 w-full rounded-[10px] border border-brand-border-strong bg-white px-4 py-3.5 text-sm text-brand-muted">
              <option value="" disabled>
                Select an interest area
              </option>
              {partnerContent.form.interestOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={submit}
            className="mt-2 inline-flex rounded-full bg-brand-red px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-150 ease-in-out hover:bg-brand-red-dark"
          >
            {partnerContent.form.submitLabel}
          </button>
        </div>
      )}
      <p className="mt-4 text-center text-[11px] text-[#8f8f8f]">{partnerContent.form.caption}</p>
    </article>
  );
}
