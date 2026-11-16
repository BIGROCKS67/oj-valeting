// Owen's winter hours, from his WhatsApp to Jack on 16 Nov 2026. Times are minutes from midnight.
// Saturday is one job only. Sunday is by arrangement (mostly maintenance customers, about one
// Sunday a month), so it isn't offered online. Change these when his summer hours start.

type Day = { open: number; close: number; oneJob?: boolean } | null;

const h = (hh: number, mm = 0) => hh * 60 + mm;

export const hours: Record<number, Day> = {
  0: null,
  1: { open: h(8), close: h(16) },
  2: { open: h(8), close: h(14) },
  3: { open: h(9), close: h(16) },
  4: { open: h(8), close: h(14) },
  5: { open: h(9), close: h(16) },
  6: { open: h(8, 30), close: h(8, 30), oneJob: true },
};

export const season = "Winter hours";

/** Shown on the booking page and in the footer */
export const hoursList: [string, string][] = [
  ["Monday", "8am to 4pm"],
  ["Tuesday", "8am to 2pm"],
  ["Wednesday", "9am to 4pm"],
  ["Thursday", "8am to 2pm"],
  ["Friday", "9am to 4pm"],
  ["Saturday", "One job, usually starting 8:30am"],
  ["Sunday", "By arrangement"],
];

export function fmtTime(min: number) {
  if (min === 720) return "midday";
  const hh = Math.floor(min / 60);
  const mm = min % 60;
  const h12 = hh % 12 === 0 ? 12 : hh % 12;
  return `${h12}${mm ? `:${String(mm).padStart(2, "0")}` : ""}${hh < 12 ? "am" : "pm"}`;
}

/**
 * Start times that leave room to finish the job before Owen's finish time that day,
 * on the hour every two hours from his start. Saturday's single job ignores the finish time.
 */
export function startTimes(dayOfWeek: number, jobHours: number): string[] {
  const d = hours[dayOfWeek];
  if (!d) return [];
  if (d.oneJob) return [fmtTime(d.open)];
  const out: string[] = [];
  for (let s = d.open; s + jobHours * 60 <= d.close; s += 120) out.push(fmtTime(s));
  return out;
}
