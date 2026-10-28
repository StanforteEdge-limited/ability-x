const TIME_PATTERN = /^([01]\d|2[0-3]):([0-5]\d)$/;

/** Minutes since midnight for a 24h "HH:MM" time, or null when it isn't one. */
export function parseTime(value: string | null | undefined): number | null {
  const match = TIME_PATTERN.exec((value ?? "").trim());
  if (!match) return null;
  return Number(match[1]) * 60 + Number(match[2]);
}

/** "13:30" → "1:30 PM". Anything that isn't a 24h time is shown as typed. */
export function formatTime(value: string): string {
  const minutes = parseTime(value);
  if (minutes === null) return value.trim();
  const hours = Math.floor(minutes / 60);
  const suffix = hours < 12 ? "AM" : "PM";
  const displayHour = hours % 12 === 0 ? 12 : hours % 12;
  return `${displayHour}:${String(minutes % 60).padStart(2, "0")} ${suffix}`;
}

export function formatTimeRange(start: string, end?: string | null): string {
  const from = formatTime(start);
  return end?.trim() ? `${from} – ${formatTime(end)}` : from;
}

/** Valid start times ascending, malformed ones after them, ties by title. */
export function sortSessions<T extends { start_time: string; title: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const aTime = parseTime(a.start_time) ?? Number.POSITIVE_INFINITY;
    const bTime = parseTime(b.start_time) ?? Number.POSITIVE_INFINITY;
    if (aTime !== bTime) return aTime - bTime;
    return a.title.localeCompare(b.title);
  });
}
