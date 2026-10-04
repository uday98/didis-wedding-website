import './Events.css';
import { FunctionPanel, NextCue } from './FunctionPanel';
import { Reveal } from '../Layout/Reveal';
import { Jaali } from '../Ornament/Jaali';
import { useContent } from '../../hooks/useContent';
import { groupByDate } from '../../lib/datetime';

/**
 * The functions, one per screen.
 *
 * Still derived from the data: groupByDate already sorts by date then time, so
 * flattening it gives the running order and a sixth function needs no code. The
 * day is no longer a heading above a group -- each panel carries its own day
 * label, because a guest who lands on Sangeet mid-scroll has no group heading to
 * tell them which day it is.
 *
 * #events stays on the wrapper so the nav link and the scrollspy keep working
 * unchanged; the wrapper itself is not a snap target, only its panels are.
 */
export function Events() {
  const events = groupByDate(useContent('events')).flatMap((day) => day.items);
  const { title, kicker, nextLabel, afterLast } = useContent('functions');

  const after = (i) => (events[i + 1]
    ? { href: `#fn-${events[i + 1].id}`, label: events[i + 1].name }
    : { href: '#travel', label: afterLast });

  return (
    <section className="functions" id="events" aria-labelledby="events-title">
      <header className="fn-intro card">
        <Reveal stagger className="fn-intro__body">
          <h2 className="fn-intro__title" id="events-title">{title}</h2>
          <Jaali />
          {kicker && <p className="fn-intro__kicker">{kicker}</p>}
        </Reveal>
        {events[0] && (
          <NextCue href={`#fn-${events[0].id}`} label={events[0].name} nextLabel={nextLabel} />
        )}
      </header>

      {events.map((event, i) => (
        <FunctionPanel key={event.id} event={event} next={after(i)} nextLabel={nextLabel} />
      ))}
    </section>
  );
}
