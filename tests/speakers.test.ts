import { describe, expect, it } from "vitest";
import { initials, speakerSubtitle } from "@/lib/speakers";

describe("speaker helpers", () => {
  it("joins role and organisation", () => {
    expect(speakerSubtitle({ role: "CEO", organisation: "Lafiami" })).toBe("CEO, Lafiami");
    expect(speakerSubtitle({ role: "CEO", organisation: "" })).toBe("CEO");
    expect(speakerSubtitle({ role: null, organisation: "Lafiami" })).toBe("Lafiami");
    expect(speakerSubtitle({})).toBe("");
  });

  it("builds initials, skipping titles", () => {
    expect(initials("Dr Kolawole Olugbodi")).toBe("KO");
    expect(initials("Mrs Bolaji Alabi")).toBe("BA");
    expect(initials("Temi Dalley")).toBe("TD");
    expect(initials("Cher")).toBe("C");
    expect(initials("  ")).toBe("");
  });
});
