import { useState } from "react";
import { InquiryForm, type InquiryFormType } from "@/components/react/inquiry-form";
import { Modal } from "@/components/react/modal";
import { cn } from "@/lib/cn";

export function FormModalButton({
  formType,
  label,
  title,
  tone = "dark",
  className,
}: {
  formType: InquiryFormType;
  label: string;
  title: string;
  tone?: "dark" | "red";
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 ease-in-out",
          tone === "red" ? "bg-brand-red hover:bg-brand-red-dark" : "bg-brand-black hover:bg-brand-surface",
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
