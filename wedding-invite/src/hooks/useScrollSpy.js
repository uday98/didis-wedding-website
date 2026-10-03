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
 * Implemented with an observer per section whose bottom margin is pulled up to
 * that line, so "is this section's top above the line" becomes "does this
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

    /* The line sits a little below the nav. It is NOT read from --nav-h: the
       nav shrinks 3px the moment you scroll, which would change the margin and
       tear down and rebuild every observer on every scroll. Quantised to a
       round number that clears the bar at any of its heights. */
    const LINE = 72;

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
      { rootMargin: `0px 0px -${Math.max(0, window.innerHeight - LINE)}px 0px`, threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  return active;
}
