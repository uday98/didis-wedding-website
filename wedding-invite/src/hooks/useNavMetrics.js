import { useEffect } from 'react';

/**
 * Publishes the sticky nav's real height as --nav-h so sections can set
 * scroll-margin-top from it. Without this an anchor jump lands the section
 * heading underneath the bar, which is most of why the jump read as landing on
 * a different page.
 *
 * ResizeObserver rather than a measurement on mount: the bar's height changes
 * with the viewport, with the font pairing, and when it shrinks on scroll.
 */
export function useNavMetrics(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const publish = () => {
      const h = Math.round(el.getBoundingClientRect().height);
      if (h > 0) document.documentElement.style.setProperty('--nav-h', `${h}px`);
    };
    publish();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', publish);
      return () => window.removeEventListener('resize', publish);
    }
    const ro = new ResizeObserver(publish);
    /* border-box, not the default content-box. The nav's own padding is part of
       its height (the fade zone IS padding), and a change to it never alters the
       content box -- so with the default this observer silently missed it and
       --nav-h went stale when the nav style changed. Browsers that do not know
       the option ignore it and fall back to content-box, which is no worse than
       before. */
    ro.observe(el, { box: 'border-box' });
    return () => ro.disconnect();
  }, [ref]);
}
