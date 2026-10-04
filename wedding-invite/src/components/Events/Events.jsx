import './Events.css';
import { FunctionPanel, NextCue } from './FunctionPanel';
import { Reveal } from '../Layout/Reveal';
import { Jaali } from '../Ornament/Jaali';
import { useContent } from '../../hooks/useContent';

/**
 * The functions, one per screen.
 *
 * Derived from the data, in the ORDER THE CONTENT FILE LISTS THEM. It used to
 * sort by date and time, which was wrong twice over: a function with no date yet
 * sorts first ('' < '2026'), and an invitation's running order is a decision the
 * family makes, not something to be recomputed. The day is no longer a heading
 * above a group either -- each panel carries its own day label, because a guest
 * who lands on Sangeet mid-scroll has no group heading to tell them which day it
 * is. A sixth function still needs no code.
 *
 *
 * Scrolling is the browser's normal scrolling. Page-wide scroll snapping was
 * tried and removed: on a phone it redirected flicks to snap points the guest had
 * not aimed at, and re-snapped when the address bar moved.
 */
export function Events() {
  const events = useContent('events');
  const { title, kicker, nextLabel } = useContent('functions');

  /* The last function has nothing after it, so no cue. It used to point at the
     travel section; that section is gone and a cue to nowhere would be worse
     than none. */
  const after = (i) => (events[i + 1]
    ? { href: `#fn-${events[i + 1].id}`, label: events[i + 1].name }
    : null);

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
