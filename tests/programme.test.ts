import { describe, expect, it } from "vitest";
import { formatTime, formatTimeRange, parseTime, sortSessions } from "@/lib/programme";

describe("programme helpers", () => {
  it("parses 24h times into minutes", () => {
    expect(parseTime("09:00")).toBe(540);
    expect(parseTime("23:59")).toBe(1439);
    expect(parseTime("9am")).toBeNull();
    expect(parseTime("24:00")).toBeNull();
    expect(parseTime("")).toBeNull();
    expect(parseTime(undefined)).toBeNull();
  });

  it("formats times for display and keeps malformed input as typed", () => {
    expect(formatTime("13:30")).toBe("1:30 PM");
    expect(formatTime("00:05")).toBe("12:05 AM");
    expect(formatTime("12:00")).toBe("12:00 PM");
    expect(formatTime(" 9am ")).toBe("9am");
  });

  it("formats a time range", () => {
    expect(formatTimeRange("09:00", "10:30")).toBe("9:00 AM – 10:30 AM");
    expect(formatTimeRange("09:00", null)).toBe("9:00 AM");
    expect(formatTimeRange("09:00", "")).toBe("9:00 AM");
  });

  it("sorts sessions by start time, malformed times last, ties by title", () => {
    const input = [
      { start_time: "11:00", title: "B" },
      { start_time: "9am", title: "Bad" },
      { start_time: "09:00", title: "Z" },
      { start_time: "09:00", title: "A" },
    ];
    expect(sortSessions(input).map((s) => s.title)).toEqual(["A", "Z", "B", "Bad"]);
    expect(input[0].title).toBe("B");
  });
});
