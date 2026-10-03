import { useEffect, useRef, useState } from 'react';

/**
 * One-shot "has this entered the viewport yet". The primitive; policy about
 * whether to use it at all lives in useReveal.
 *
 * One-shot on purpose: content that has been seen stays seen. Re-hiding a
 * section when it scrolls away makes a page feel restless, and it means a guest
 * scrolling back up to recheck a venue watches it fade in again.
 *
 * StrictMode-safe: the dev mount/unmount/remount pair completes synchronously,
 * while an IntersectionObserver callback is always async, so `seen` is still
 * false for both effects and the second run simply re-observes. The disconnect
 * on first hit means no observer outlives its usefulness.
 */
export function useInView(enabled, { rootMargin = '0px 0px -12% 0px' } = {}) {
  const ref = useRef(null);
  const seen = useRef(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!enabled || seen.current) return undefined;
    const el = ref.current;
    if (!el) return undefined;

    // Ancient browser, or a test environment: show the content rather than
    // leaving it at opacity 0 forever.
    if (typeof IntersectionObserver === 'undefined') {
      seen.current = true;
      setInView(true);
      return undefined;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        seen.current = true;
        setInView(true);
        io.disconnect();
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [enabled, rootMargin]);

  return [ref, inView];
}
