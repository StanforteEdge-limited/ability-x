"use client";

import { useState, type FormEvent } from "react";

type FormType = "partner" | "waitlist" | "exhibit";

type FieldType = "text" | "email" | "textarea" | "select" | "radio" | "checkbox";

interface Field {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
}

const FIELD_CONFIG: Record<FormType, Field[]> = {
  partner: [
    { name: "name", label: "Full name", type: "text", required: true },
    { name: "organization", label: "Organization", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "message", label: "How would you like to partner?", type: "textarea" },
  ],
  waitlist: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone number", type: "text", required: true },
    { name: "position", label: "Organization Position", type: "text" },
    { name: "disability", label: "Do you identify as a person with disability?", type: "radio", required: true, options: ["Yes", "No", "Prefer not to say"] },
    { name: "category", label: "What category best describes you?", type: "select", required: true, options: ["NGO/Civil society", "Student", "Government Official", "Media", "Technology/Innovation", "Other"] },
    { name: "interest", label: "Interest in AbilityX 2026", type: "select", required: true, options: ["Financial Inclusion & Access to Capital", "Inclusive Agriculture", "Informal Economy & Inclusive Marketing", "Assistive Technology Lab & Hackathon", "Inclusive Public & Private Procurement", "Entrepreneurship Accelerator", "Gig Economy & Remote Work Pathways", "Inclusive Healthcare Systems"] },
    { name: "updates", label: "How would you like to receive updates?", type: "select", required: true, options: ["Email", "WhatsApp", "Both"] },
    { name: "heardFrom", label: "How did you hear about the AbilityX 2026 Waitlist?", type: "text" },
    { name: "extraInfo", label: "Is there anything else you would like to know?", type: "textarea" },
  ],
  exhibit: [
    { name: "organization", label: "Organization/Company Name", type: "text", required: true },
    { name: "contactPerson", label: "Primary Contact Person", type: "text", required: true },
    { name: "email", label: "Email Address", type: "email", required: true },
    { name: "phone", label: "Phone Number", type: "text", required: true },
    { name: "orgType", label: "Organization Type", type: "select", required: true, options: ["Tech Startup", "Social Enterprise", "Established Company/Corporation", "Research Institution", "NGO/Civil Society", "Individual Innovator", "Other"] },
    { name: "country", label: "Country of Operation", type: "text", required: true },
    { name: "website", label: "Organization Website/Social Media", type: "text", required: true },
    { name: "innovationName", label: "Innovation/Product Name", type: "text", required: true },
    { name: "innovationCategory", label: "Innovation Category", type: "select", required: true, options: ["Assistive Technology", "Accessibility Software/App", "Hardware/Device", "AI/Machine Learning Solution", "Digital Platform", "Inclusive Fintech", "EdTech Solution", "Health Tech", "Employment/Workplace Solution", "Other"] },
    { name: "description", label: "Brief Description of Your Innovation", type: "textarea", required: true },
    { name: "problemStatement", label: "Problem Statement", type: "textarea", required: true },
    { name: "targetUsers", label: "Target Users", type: "checkbox", required: true, options: ["Persons with visual impairments", "Persons with hearing impairments", "Persons with physical/mobility disabilities", "Persons with intellectual/developmental disabilities", "Persons with psychosocial disabilities", "All disabilities", "Other"] },
    { name: "stage", label: "Stage of Development", type: "select", required: true, options: ["Concept/Ideation", "Prototype", "Pilot/Testing", "Market-ready", "Scaling/Established"] },
    { name: "impact", label: "Current Impact", type: "textarea", required: true },
    { name: "boothNeeds", label: "What will you need for your exhibition booth?", type: "checkbox", options: ["Table space", "Power outlets", "Internet connectivity", "Display screen/monitor", "Projection capabilities", "Product demonstration area", "Other"] },
    { name: "physicalProducts", label: "Will you have physical products to demonstrate?", type: "radio", required: true, options: ["Yes", "No", "Maybe"] },
    { name: "representatives", label: "Number of representatives attending", type: "text", required: true },
    { name: "seeking", label: "Are you seeking investment or partnerships?", type: "checkbox", options: ["Seed funding", "Growth capital", "Strategic partnerships", "Distribution partners", "Technology partners", "Not seeking at this time", "Other"] },
    { name: "hopes", label: "What do you hope to gain from exhibiting at AbilityX 2026?", type: "textarea", required: true },
    { name: "videoLink", label: "Please provide a link to a video demo or presentation of your innovation", type: "text" },
  ],
};

function hasOther(options?: string[]): boolean {
  return options?.some((o) => o === "Other") ?? false;
}

export function InquiryForm({ formType }: { formType: FormType }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const fields = FIELD_CONFIG[formType];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const payload: Record<string, string> = {};

    for (const [key, value] of formData.entries()) {
      const str = value.toString();
      if (payload[key]) {
        payload[key] += `, ${str}`;
      } else {
        payload[key] = str;
      }
    }

    try {
      const res = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType, ...payload }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-brand-red font-semibold">
        Thanks — we&apos;ve received your submission and will be in touch soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col gap-1">
          {field.type === "radio" || field.type === "checkbox" ? (
            <span className="text-sm font-medium">
              {field.label}{field.required ? " *" : ""}
            </span>
          ) : (
            <label htmlFor={field.name} className="text-sm font-medium">
              {field.label}{field.required ? " *" : ""}
            </label>
          )}

          {field.type === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              required={field.required}
              rows={4}
              className="rounded-md border border-gray-300 p-2 text-brand-black"
            />
          ) : field.type === "select" ? (
            <>
              <select
                id={field.name}
                name={field.name}
                required={field.required}
                defaultValue=""
                className="rounded-md border border-gray-300 p-2 text-brand-black"
              >
                <option value="" disabled>Select an option</option>
                {field.options?.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {hasOther(field.options) && (
                <input
                  type="text"
                  name={`${field.name}Other`}
                  placeholder="If Other, please specify"
                  className="mt-1 rounded-md border border-gray-300 p-2 text-sm text-brand-black"
                />
              )}
            </>
          ) : field.type === "radio" ? (
            <div className="flex flex-wrap gap-4 pt-1">
              {field.options?.map((opt) => (
                <label key={opt} className="flex items-center gap-2 text-sm text-brand-black">
                  <input
                    type="radio"
                    name={field.name}
                    value={opt}
                    required={field.required}
                    className="accent-brand-red"
                  />
                  {opt}
                </label>
              ))}
            </div>
          ) : field.type === "checkbox" ? (
            <>
              <div className="flex flex-col gap-2 pt-1">
                {field.options?.map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-sm text-brand-black">
                    <input
                      type="checkbox"
                      name={field.name}
                      value={opt}
                      className="accent-brand-red"
                    />
                    {opt}
                  </label>
                ))}
              </div>
              {hasOther(field.options) && (
                <input
                  type="text"
                  name={`${field.name}Other`}
                  placeholder="If Other, please specify"
                  className="mt-1 rounded-md border border-gray-300 p-2 text-sm text-brand-black"
                />
              )}
            </>
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              required={field.required}
              className="rounded-md border border-gray-300 p-2 text-brand-black"
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-full bg-brand-red text-white px-5 py-3 text-sm font-semibold transition-colors duration-150 ease-in-out hover:bg-brand-red-dark disabled:opacity-50"
      >
        {status === "submitting" ? "Sending…" : "Submit"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong — please try again.</p>
      )}
    </form>
  );
}
