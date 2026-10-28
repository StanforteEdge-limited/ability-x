import { useState } from "react";
import { InquiryForm, type InquiryFormType } from "@/components/react/inquiry-form";
import { Modal } from "@/components/react/modal";
import { cn } from "@/lib/cn";

export function FormModalButton({
  formType,
  label,
  title,
  className,
}: {
  formType: InquiryFormType;
  label: string;
  title: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex rounded-full bg-brand-black px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 ease-in-out hover:bg-brand-surface",
          className,
        )}
      >
        {label}
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title={title}>
        {open && <InquiryForm formType={formType} />}
      </Modal>
    </>
  );
}
