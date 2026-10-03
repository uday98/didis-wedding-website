import { formatTime } from '../../lib/datetime';
import { Sigil } from '../Ornament/Sigil';

/** Renders one function. Knows nothing about how many there are. */
export function EventCard({ event }) {
  const { id, name, startTime, venue, address, mapUrl, dressCode, note } = event;
  return (
    <article className="event">
      <div className="event__time event__mark">
        <Sigil id={id} />
        <span>{formatTime(startTime)}</span>
      </div>
      <div className="event__body">
        <h3 className="event__name">{name}</h3>
        <p className="event__venue">
          {mapUrl ? <a href={mapUrl} target="_blank" rel="noreferrer">{venue}</a> : venue}
          <span className="event__address">{address}</span>
        </p>
        {dressCode && <p className="event__meta">Wear: {dressCode}</p>}
        {note && <p className="event__note">{note}</p>}
      </div>
    </article>
  );
}
