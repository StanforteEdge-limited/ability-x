import { describe, expect, it } from "vitest";
import { buildEmailHtml, buildRow, validateFormBody } from "@/lib/forms";

describe("validateFormBody", () => {
  it("accepts complete submissions", () => {
    expect(validateFormBody({ formType: "partner", name: "A", email: "a@b.co" }).ok).toBe(true);
    expect(validateFormBody({ formType: "exhibit", contactPerson: "A", email: "a@b.co" }).ok).toBe(true);
    expect(
      validateFormBody({ formType: "waitlist", name: "A", email: "a@b.co", phone: "1" }).ok,
    ).toBe(true);
  });

  it("rejects missing or unknown fields", () => {
    expect(validateFormBody({ formType: "partner", name: "A" })).toEqual({
      ok: false,
      error: "Missing required fields",
    });
    expect(validateFormBody({ formType: "exhibit", name: "A", email: "a@b.co" }).ok).toBe(false);
    expect(validateFormBody({ formType: "waitlist", name: "A", email: "a@b.co" }).ok).toBe(false);
    expect(validateFormBody({ formType: "nope", name: "A", email: "a@b.co" }).ok).toBe(false);
    expect(validateFormBody(null).ok).toBe(false);
    expect(validateFormBody("x").ok).toBe(false);
  });
});

describe("buildRow", () => {
  it("builds the partner row", () => {
    expect(
      buildRow("partner", { name: "A", organization: "O", email: "e", message: "m" }, "T"),
    ).toEqual(["T", "A", "O", "e", "m"]);
  });

  it("builds the waitlist row with 'Other' detail", () => {
    expect(
      buildRow("waitlist", { name: "A", email: "e", phone: "p", category: "Other", categoryOther: "Artist" }, "T"),
    ).toEqual(["T", "A", "e", "p", "", "", "Other: Artist", "", "", "", ""]);
  });

  it("builds the exhibit row with 21 columns", () => {
    const row = buildRow("exhibit", { organization: "O", contactPerson: "C", orgType: "Other", orgTypeOther: "Coop" }, "T");
    expect(row).toHaveLength(21);
    expect(row.slice(0, 3)).toEqual(["T", "O", "C"]);
    expect(row[5]).toBe("Other: Coop");
  });
});

describe("buildEmailHtml", () => {
  it("includes the subject label and fields", () => {
    const html = buildEmailHtml("partner", { name: "Ada", organization: "O", email: "e", message: "m" });
    expect(html).toContain("<h2>New Partner Inquiry</h2>");
    expect(html).toContain("<strong>Name:</strong> Ada");
  });

  it("puts the innovation name in the exhibit heading", () => {
    expect(buildEmailHtml("exhibit", { innovationName: "Echo" })).toContain(
      "<h2>New Exhibit Interest — Echo</h2>",
    );
  });
});
