import type { APIRoute } from "astro";
import { sendAdminNotification, sendConfirmation } from "@/lib/email";
import {
  EDITION_LABEL,
  RECIPIENTS,
  SHEET_RANGES,
  SUBJECT_LABELS,
  buildEmailHtml,
  buildRow,
  nameFor,
  validateFormBody,
} from "@/lib/forms";
import { appendToSheet } from "@/lib/googleSheets";

export const prerender = false;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Missing required fields" }, 400);
  }

  const result = validateFormBody(body);
  if (!result.ok) return json({ error: result.error }, 400);

  const { formType, fields } = result;
  const row = buildRow(formType, fields, new Date().toISOString());
  const emailHtml = buildEmailHtml(formType, fields);

  try {
    try {
      await appendToSheet(SHEET_RANGES[formType], row);
    } catch (sheetErr) {
      console.warn("Sheets append skipped (not wired yet):", sheetErr);
    }

    const adminEmail = RECIPIENTS[formType];
    const subject = `${SUBJECT_LABELS[formType]} — ${EDITION_LABEL}`;

    await Promise.all([
      sendAdminNotification(adminEmail, subject, emailHtml),
      sendConfirmation(fields.email, nameFor(formType, fields), formType, adminEmail),
    ]);

    return json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`Form submission failed (${formType}):`, message);
    return json({ error: "Submission failed" }, 500);
  }
};
