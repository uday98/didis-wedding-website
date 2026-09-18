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

/** Groups events into days without assuming how many there are. */
export function groupByDate(events) {
  const map = new Map();
  for (const ev of events) {
    if (!map.has(ev.date)) map.set(ev.date, []);
    map.get(ev.date).push(ev);
  }
  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, items]) => ({
      date,
      items: items.sort((a, b) => a.startTime.localeCompare(b.startTime)),
    }));
}
