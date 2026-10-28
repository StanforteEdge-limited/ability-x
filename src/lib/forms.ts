export type FormType = "partner" | "waitlist" | "exhibit";

export const SHEET_RANGES: Record<FormType, string> = {
  partner: "Partner Inquiries!A:E",
  waitlist: "Waitlist!A:K",
  exhibit: "Exhibit Interest!A:U",
};

export const SUBJECT_LABELS: Record<FormType, string> = {
  partner: "New Partner Inquiry",
  waitlist: "New Waitlist Signup",
  exhibit: "New Exhibit Interest",
};

export const RECIPIENTS: Record<FormType, string> = {
  partner: "damilare@projectenable.africa",
  waitlist: "janet@projectenable.africa",
  exhibit: "janet@projectenable.africa",
};

export const EDITION_LABEL = "AbilityX 2026";

type Fields = Record<string, string>;

function val(value: string | undefined): string {
  return value ?? "";
}

function withOther(value: string | undefined, otherValue: string | undefined): string {
  const v = val(value);
  const o = val(otherValue);
  if (v === "Other" && o) return `Other: ${o}`;
  return v;
}

function isFormType(value: unknown): value is FormType {
  return typeof value === "string" && Object.hasOwn(SHEET_RANGES, value);
}

export function nameFor(formType: FormType, fields: Fields): string {
  return val(formType === "exhibit" ? fields.contactPerson : fields.name);
}

export function validateFormBody(
  body: unknown,
): { ok: true; formType: FormType; fields: Fields } | { ok: false; error: string } {
  const missing = { ok: false as const, error: "Missing required fields" };
  if (!body || typeof body !== "object") return missing;

  const { formType, ...rest } = body as Record<string, unknown>;
  if (!isFormType(formType)) return missing;

  const fields: Fields = {};
  for (const [key, value] of Object.entries(rest)) {
    if (value !== undefined && value !== null) fields[key] = String(value);
  }

  if (!nameFor(formType, fields) || !fields.email) return missing;
  if (formType === "waitlist" && !fields.phone) return missing;

  return { ok: true, formType, fields };
}

export function buildRow(formType: FormType, fields: Fields, timestamp: string): (string | number)[] {
  if (formType === "waitlist") {
    return [
      timestamp,
      val(fields.name),
      val(fields.email),
      val(fields.phone),
      val(fields.position),
      withOther(fields.disability, ""),
      withOther(fields.category, fields.categoryOther),
      val(fields.interest),
      val(fields.updates),
      val(fields.heardFrom),
      val(fields.extraInfo),
    ];
  }

  if (formType === "partner") {
    return [timestamp, val(fields.name), val(fields.organization), val(fields.email), val(fields.message)];
  }

  return [
    timestamp,
    val(fields.organization),
    val(fields.contactPerson),
    val(fields.email),
    val(fields.phone),
    withOther(fields.orgType, fields.orgTypeOther),
    val(fields.country),
    val(fields.website),
    val(fields.innovationName),
    withOther(fields.innovationCategory, fields.innovationCategoryOther),
    val(fields.description),
    val(fields.problemStatement),
    val(fields.targetUsers),
    val(fields.stage),
    val(fields.impact),
    val(fields.boothNeeds),
    val(fields.physicalProducts),
    val(fields.representatives),
    val(fields.seeking),
    val(fields.hopes),
    val(fields.videoLink),
  ];
}

export function buildEmailHtml(formType: FormType, fields: Fields): string {
  if (formType === "waitlist") {
    return `
      <h2>${SUBJECT_LABELS[formType]}</h2>
      <p><strong>Name:</strong> ${val(fields.name)}</p>
      <p><strong>Email:</strong> ${val(fields.email)}</p>
      <p><strong>Phone:</strong> ${val(fields.phone)}</p>
      <p><strong>Position:</strong> ${val(fields.position)}</p>
      <p><strong>Disability:</strong> ${val(fields.disability)}</p>
      <p><strong>Category:</strong> ${withOther(fields.category, fields.categoryOther)}</p>
      <p><strong>Interest:</strong> ${val(fields.interest)}</p>
      <p><strong>Updates:</strong> ${val(fields.updates)}</p>
      <p><strong>Heard from:</strong> ${val(fields.heardFrom)}</p>
      <p><strong>Extra info:</strong> ${val(fields.extraInfo)}</p>
    `;
  }

  if (formType === "partner") {
    return `
      <h2>${SUBJECT_LABELS[formType]}</h2>
      <p><strong>Name:</strong> ${val(fields.name)}</p>
      <p><strong>Organization:</strong> ${val(fields.organization)}</p>
      <p><strong>Email:</strong> ${val(fields.email)}</p>
      <p><strong>Message:</strong> ${val(fields.message)}</p>
    `;
  }

  return `
      <h2>${SUBJECT_LABELS[formType]} — ${val(fields.innovationName)}</h2>
      <p><strong>Organization:</strong> ${val(fields.organization)}</p>
      <p><strong>Contact Person:</strong> ${val(fields.contactPerson)}</p>
      <p><strong>Email:</strong> ${val(fields.email)}</p>
      <p><strong>Phone:</strong> ${val(fields.phone)}</p>
      <p><strong>Org Type:</strong> ${withOther(fields.orgType, fields.orgTypeOther)}</p>
      <p><strong>Country:</strong> ${val(fields.country)}</p>
      <p><strong>Website:</strong> ${val(fields.website)}</p>
      <p><strong>Innovation:</strong> ${val(fields.innovationName)}</p>
      <p><strong>Category:</strong> ${withOther(fields.innovationCategory, fields.innovationCategoryOther)}</p>
      <p><strong>Description:</strong> ${val(fields.description)}</p>
      <p><strong>Problem:</strong> ${val(fields.problemStatement)}</p>
      <p><strong>Target Users:</strong> ${val(fields.targetUsers)}</p>
      <p><strong>Stage:</strong> ${val(fields.stage)}</p>
      <p><strong>Impact:</strong> ${val(fields.impact)}</p>
      <p><strong>Booth Needs:</strong> ${val(fields.boothNeeds)}</p>
      <p><strong>Physical Products:</strong> ${val(fields.physicalProducts)}</p>
      <p><strong>Representatives:</strong> ${val(fields.representatives)}</p>
      <p><strong>Seeking:</strong> ${val(fields.seeking)}</p>
      <p><strong>Hopes:</strong> ${val(fields.hopes)}</p>
      <p><strong>Video Link:</strong> ${val(fields.videoLink)}</p>
    `;
}
