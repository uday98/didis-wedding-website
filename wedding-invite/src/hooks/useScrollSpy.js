import { useEffect, useRef, useState } from 'react';

/**
 * Which section the reader is currently in. Continuous -- unlike useInView,
 * which is one-shot by design (it latches `seen` and disconnects on first hit)
 * and is therefore the wrong primitive here rather than one to extend.
 *
 * THE RULE: the last section whose top has crossed a horizontal line near the
 * top of the viewport.
 *
 * The obvious alternatives are both wrong, and the first version of this hook
 * shipped with a third that was worse:
 *
 *   - "first intersecting section in document order" (what shipped) means a
 *     tall section wins whenever any sliver of it is in the band, so Travel
 *     could not become active until Events had cleared entirely -- hundreds of
 *     pixels late, and never at all if the last section is shorter than the
 *     viewport.
 *   - "greatest intersectionRatio" is normalised by the TARGET's area, so a
 *     2000px section spanning a 300px band scores 0.15 while a 400px section
 *     with 300px in the band scores 0.75. The short one wins while the tall one
 *     fills the screen.
 *   - normalising by band height instead fails the other way: a section shorter
 *     than the band can never cover most of it, so it can never win.
 *
 * Crossing a line has neither failure, because sections tile the page without
 * gaps: at any scroll position exactly one section's top is the last one above
 * the line, whatever the heights are.
 *
 * Implemented with one observer whose bottom margin is pulled up to that line, so "is this section's top above the line" becomes "does this
 * section intersect at all" -- no scroll listener, no per-frame work.
 */
export function useScrollSpy(ids) {
  const [active, setActive] = useState(null);
  const crossed = useRef(new Map());
  const key = ids.join('|');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return undefined;

    const map = crossed.current;

    /* The line is a PERCENTAGE of the viewport, not a pixel offset from the nav.
       It used to be 72px, chosen to sit just below a 44px nav -- which meant it
       silently depended on the nav's height. When the nav gained a fade zone
       (68px), an anchor jump landed the section's top at ~92px, just BELOW the
       line, so clicking "Travel & stay" left the highlight on "Functions".
       A pixel constant tied to another component's geometry will do that every
       time that geometry changes.

       35% sits well clear of wherever a jump lands (nav + scroll-margin is well
       under a third of any phone screen), and is also a natural reading
       position: the section occupying the upper part of the screen is the one
       you are in. rootMargin takes percentages relative to the viewport, so it
       tracks the mobile URL bar showing and hiding with no innerHeight read and
       no rebuild on resize. */
    const LINE = 35;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => map.set(e.target.id, e.isIntersecting));
        /* Last one whose top is above the line. Walking backwards makes the tie
           deterministic regardless of how the browser batched the callbacks. */
        let next = null;
        for (let i = ids.length - 1; i >= 0; i -= 1) {
          if (map.get(ids[i])) { next = ids[i]; break; }
        }
        setActive((prev) => (prev === next ? prev : next));
      },
      { rootMargin: `0px 0px -${100 - LINE}% 0px`, threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  return active;
}
