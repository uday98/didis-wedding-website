import { describeDay, describeTime } from '../../lib/datetime';
import { useContent } from '../../hooks/useContent';
import { Reveal } from '../Layout/Reveal';
import { Sigil } from '../Ornament/Sigil';
import { titleSize } from '../../lib/titleSize';

/** The "Next: Mehendi" link at the foot of a panel. It is a real link, so it is
 *  also the keyboard and screen-reader way onward, and because it sits at the very
 *  bottom of the panel it is only on screen once you have reached the end of that
 *  function -- which is how a guest on a small phone can tell "more of this
 *  function below" from "this is the end, the next flick moves on". */
export function NextCue({ href, label, nextLabel }) {
  return (
    <a className="fn__next" href={href}>
      <span className="fn__next-label">{nextLabel}</span>
      <span className="fn__next-name">{label}</span>
      <svg className="fn__next-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true" focusable="false">
        <path d="M3 5l4 4 4-4" />
      </svg>
    </a>
  );
}

/**
 * One function, one screen. Renders a single event and knows nothing about how
 * many there are or what comes after it -- the parent resolves `next`.
 *
 * min-height is a full screen, but it is a MINIMUM: on a 280px fold phone with a
 * long address and note the panel simply runs taller rather than cutting
 * anything off or shrinking type to something unreadable.
 */
export function FunctionPanel({ event, next, nextLabel }) {
  const { id, name, date, startTime, timeNote, venue, address, mapUrl, dressCode, note, image } = event;
  const { wearLabel } = useContent('functions');
  const day = describeDay(date);
  const time = describeTime(startTime);

  return (
    <article className="fn card" id={`fn-${id}`} aria-labelledby={`fn-${id}-name`} data-image={image ? '' : undefined}>
      {image && (
        /* Decorative: the details are text, so the photo carries no information
           and is hidden from assistive tech. Lazy, unlike the hero photo -- every
           function sits below the fold. */
        <div className="fn__photo" aria-hidden="true">
          <img src={image} alt="" loading="lazy" decoding="async" />
          <div className="fn__scrim" />
        </div>
      )}

      <Reveal stagger className="fn__body">
        <div className="fn__sigil"><Sigil id={id} size={52} /></div>
        {day && <p className="fn__day">{day}</p>}
        <h3 className="fn__name" id={`fn-${id}-name`} data-size={titleSize(name)}>{name}</h3>
        {time && (
          <p className="fn__time">
            {time}
            {/* "onwards", "sharp", "approx." -- how firm the time is, in the
                family's words rather than ours. Quieter than the time itself.
                A real space, not just CSS margin: margin is invisible to copy,
                paste and screen readers, which would hear "pmonwards". */}
            {timeNote && <>{' '}<span className="fn__time-note">{timeNote}</span></>}
          </p>
        )}
        <p className="fn__venue">
          {mapUrl ? <a href={mapUrl} target="_blank" rel="noreferrer">{venue}</a> : venue}
          <span className="fn__address">{address}</span>
        </p>
        {dressCode && <p className="fn__meta">{wearLabel}: {dressCode}</p>}
        {note && <p className="fn__note">{note}</p>}
      </Reveal>

      {next && <NextCue href={next.href} label={next.label} nextLabel={nextLabel} />}
    </article>
  );
}
