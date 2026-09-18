import { EventCard } from './EventCard';
import { formatDate, formatWeekday } from '../../lib/datetime';

/** One day of functions. Added days appear here with no code change. */
export function DayGroup({ date, items }) {
  return (
    <section className="day">
      <h3 className="day__label">
        {formatWeekday(date)}
        <span className="day__date">{formatDate(date, { day: 'numeric', month: 'short' })}</span>
      </h3>
      <div className="day__events">
        {items.map((event) => <EventCard key={event.id} event={event} />)}
      </div>
    </section>
  );
}
