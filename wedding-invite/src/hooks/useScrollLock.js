import { useLayoutEffect } from 'react';

/**
 * Holds the page still while the envelope is sealed.
 *
 * The envelope is position: fixed over a page that is already fully laid out,
 * so the document's own scrollbar sat visibly beside it and the page could be
 * scrolled underneath. That is also how the skip button could be scrolled out
 * from under a thumb's reach.
 *
 * Both <html> and <body>: iOS Safari has historically ignored overflow: hidden
 * on the root alone for touch scrolling.
 *
 * A layout effect, so the scrollbar is gone before the first paint rather than
 * flashing for a frame. The previous values are restored on cleanup instead of
 * assumed to be empty, so this never clobbers a style set by anything else.
 *
 * A programmatic scrollTo still works under overflow: hidden, which matters:
 * replay resets the scroll position while the lock is being re-applied.
 */
export function useScrollLock(locked) {
  useLayoutEffect(() => {
    if (!locked) return undefined;
    const html = document.documentElement;
    const body = document.body;
    const prev = { html: html.style.overflow, body: body.style.overflow };
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    return () => {
      html.style.overflow = prev.html;
      body.style.overflow = prev.body;
    };
  }, [locked]);
}
