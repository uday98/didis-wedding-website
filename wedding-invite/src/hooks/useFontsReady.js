import { useEffect, useState } from 'react';

/**
 * Prata's metrics differ sharply from Georgia's, and the fonts load with
 * display=swap, so the hero headline reflows visibly when the real face
 * arrives. Holding the hero entrance until fonts are ready means the one
 * big piece of display type animates in already correctly sized.
 *
 * Starts true where document.fonts is missing, so an old browser gets the
 * content rather than an entrance that never fires.
 *
 * BAIL_MS is not a nicety. document.fonts.ready does not settle while a font
 * request is stalled, and the hero entrance waits on this hook -- so on a bad
 * phone connection the hero would sit at opacity 0 indefinitely. Showing the
 * content in a fallback face beats not showing it.
 */
const BAIL_MS = 2500;

export function useFontsReady() {
  const [ready, setReady] = useState(() => !document.fonts);

  useEffect(() => {
    if (!document.fonts || ready) return undefined;
    let cancelled = false;
    document.fonts.ready.then(() => { if (!cancelled) setReady(true); });
    const bail = setTimeout(() => { if (!cancelled) setReady(true); }, BAIL_MS);
    return () => { cancelled = true; clearTimeout(bail); };
  }, [ready]);

  return ready;
}
