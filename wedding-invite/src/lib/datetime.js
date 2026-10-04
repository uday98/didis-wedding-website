const LOCALE = 'en-IN';

export function formatDate(iso, opts = { day: 'numeric', month: 'long', year: 'numeric' }) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString(LOCALE, opts);
}

export function formatWeekday(iso) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString(LOCALE, { weekday: 'long' });
}

export function formatTime(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d.toLocaleTimeString(LOCALE, { hour: 'numeric', minute: '2-digit' });
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const CLOCK = /^\d{1,2}:\d{2}$/;

export const isIsoDate = (v) =>
  typeof v === 'string' && ISO_DATE.test(v) && !Number.isNaN(new Date(`${v}T00:00:00`).getTime());
export const isClock = (v) => typeof v === 'string' && CLOCK.test(v);

/**
 * "Friday, 13 November" for a real date, and the text itself for anything else.
 *
 * The content file is edited by hand and is full of placeholders before it is
 * final, and a date that is genuinely not fixed yet is a legitimate state for an
 * invitation. new Date('PLACEHOLDER') is "Invalid Date", which is what a guest
 * would have seen. Showing the value as written means a placeholder stays
 * visibly a placeholder, and free text like "After sunset" just works.
 */
export function describeDay(value, opts = { day: 'numeric', month: 'long' }) {
  if (!value) return '';
  return isIsoDate(value) ? `${formatWeekday(value)}, ${formatDate(value, opts)}` : value;
}

/** "6:00 pm" for HH:MM, and the text itself for anything else. */
export function describeTime(value) {
  if (!value) return '';
  return isClock(value) ? formatTime(value) : value;
}
