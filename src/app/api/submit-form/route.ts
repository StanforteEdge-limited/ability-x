import { NextRequest, NextResponse } from "next/server";
import { appendToSheet } from "@/lib/googleSheets";
import { sendAdminNotification, sendConfirmation } from "@/lib/email";

type FormType = "partner" | "waitlist" | "exhibit";

const SHEET_RANGES: Record<FormType, string> = {
  partner: "Partner Inquiries!A:E",
  waitlist: "Waitlist!A:K",
  exhibit: "Exhibit Interest!A:U",
};

const SUBJECT_LABELS: Record<FormType, string> = {
  partner: "New Partner Inquiry",
  waitlist: "New Waitlist Signup",
  exhibit: "New Exhibit Interest",
};

const RECIPIENTS: Record<FormType, string> = {
  partner: "damilare@projectenable.africa",
  waitlist: "janet@projectenable.africa",
  exhibit: "janet@projectenable.africa",
};

function val(value: string | undefined): string {
  return value ?? "";
}

function withOther(value: string | undefined, otherValue: string | undefined): string {
  const v = val(value);
  const o = val(otherValue);
  if (v === "Other" && o) return `Other: ${o}`;
  return v;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { formType, ...fields } = body as {
    formType: FormType;
    [key: string]: string;
  };

  const nameField = formType === "exhibit" ? fields.contactPerson : fields.name;
  const missingEmail = !fields.email;
  const missingFields = !formType || !SHEET_RANGES[formType] || !nameField || missingEmail;

  if (formType === "waitlist" && !fields.phone) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  if (missingFields) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  const timestamp = new Date().toISOString();

  let row: (string | number)[];
  let emailHtml: string;

  if (formType === "waitlist") {
    row = [
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

    emailHtml = `
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
  } else if (formType === "partner") {
    row = [
      timestamp,
      val(fields.name),
      val(fields.organization),
      val(fields.email),
      val(fields.message),
    ];

    emailHtml = `
      <h2>${SUBJECT_LABELS[formType]}</h2>
      <p><strong>Name:</strong> ${val(fields.name)}</p>
      <p><strong>Organization:</strong> ${val(fields.organization)}</p>
      <p><strong>Email:</strong> ${val(fields.email)}</p>
      <p><strong>Message:</strong> ${val(fields.message)}</p>
    `;
  } else {
    row = [
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

    emailHtml = `
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

  try {
    try {
      await appendToSheet(SHEET_RANGES[formType], row);
    } catch (sheetErr) {
      console.warn("Sheets append skipped (not wired yet):", sheetErr);
    }

    const adminEmail = RECIPIENTS[formType];
    const subject = `${SUBJECT_LABELS[formType]} — AbilityX 2.0`;

    await Promise.all([
      sendAdminNotification(adminEmail, subject, emailHtml),
      sendConfirmation(val(fields.email), val(nameField), formType, adminEmail),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`Form submission failed (${formType}):`, message);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
