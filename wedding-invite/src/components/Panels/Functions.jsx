import { describeDay, describeTime } from '../../lib/datetime';
import { useContent } from '../../hooks/useContent';
import { Reveal } from '../Layout/Reveal';
import { Sigil } from '../Ornament/Sigil';
import { titleSize } from '../../lib/titleSize';
import { Panel } from './Panel';
import { Divider } from './Divider';

/**
 * The functions, one illustrated panel each, in the ORDER THE CONTENT FILE LISTS
 * THEM -- an invitation's running order is the family's decision, not something to
 * recompute. A sixth function needs no code here, only an entry and its artwork.
 */
function FunctionPanel({ event }) {
  const { id, name, subtitle, date, startTime, timeNote, venue, address, mapUrl, note, image } = event;
  const day = describeDay(date);
  const time = describeTime(startTime);
  return (
    <Panel id={id} art={image} as="article" aria-labelledby={`fn-${id}-name`}>
      <Reveal stagger className="pn-center" id={`fn-${id}`}>
        <div className="pn-sigil"><Sigil id={id} size={40} /></div>
        {day && <p className="pn-day">{day}</p>}
        <h2 className="pn-title" id={`fn-${id}-name`} data-size={titleSize(name)}>{name}</h2>
        {subtitle && <p className="pn-sub">{subtitle}</p>}
        {time && (
          <p className="pn-time">
            {time}
            {/* A real space, not CSS margin: margin is invisible to copy, paste
                and screen readers, which would hear "pmonwards". */}
            {timeNote && <>{' '}<span className="pn-time-note">{timeNote}</span></>}
          </p>
        )}
        <Divider />
        <p className="pn-venue">
          {mapUrl ? <a href={mapUrl} target="_blank" rel="noreferrer">{venue}</a> : venue}
        </p>
        <p className="pn-address">{address}</p>
        {note && <p className="pn-note">{note}</p>}
      </Reveal>
    </Panel>
  );
}

export function Functions() {
  const events = useContent('events');
  return (
    <section id="events" aria-label="The functions">
      {events.map((event) => <FunctionPanel key={event.id} event={event} />)}
    </section>
  );
}
