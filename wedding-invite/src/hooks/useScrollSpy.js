import { useEffect, useRef, useState } from 'react';

/**
 * Which section is currently under the nav. Continuous -- unlike useInView,
 * which is one-shot by design (it latches `seen` and disconnects on first hit)
 * and is therefore the wrong primitive here rather than one to extend. A spy
 * needs no latch, no disconnect, and one observer for all sections rather than
 * one each; an { once: false } flag would make every line of useInView's header
 * comment true of only one branch.
 *
 * The two observer sets do not interfere: IntersectionObserver instances are
 * independent and an element may be observed by any number of them.
 *
 * Document order breaks ties, so the answer is deterministic regardless of how
 * the browser batches callbacks.
 */
export function useScrollSpy(ids) {
  const [active, setActive] = useState(null);
  const ratios = useRef(new Map());
  const key = ids.join('|');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!els.length) return undefined;

    const map = ratios.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => map.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0));
        // One answer derived from all of them, in document order.
        let next = null;
        for (const id of ids) {
          if ((map.get(id) ?? 0) > 0) { next = id; break; }
        }
        setActive((prev) => (prev === next ? prev : next));
      },
      {
        /* The band runs from just below the nav down to 45% of the viewport:
           below the bar, so a heading hidden under it does not count as
           current, and well above the fold so a tall section does not hand over
           early. Widen the bottom figure if the answer flips too eagerly. */
        rootMargin: '-72px 0px -45% 0px',
        threshold: 0,
      },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  return active;
}
