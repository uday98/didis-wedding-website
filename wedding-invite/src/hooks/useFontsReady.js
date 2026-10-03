import { useEffect, useState } from 'react';

/**
 * Prata's metrics differ sharply from Georgia's, and the fonts load with
 * display=swap, so the hero headline reflows visibly when the real face
 * arrives. Holding the hero entrance until fonts are ready means the one
 * big piece of display type animates in already correctly sized.
 *
 * Starts true where document.fonts is missing, so an old browser gets the
 * content rather than an entrance that never fires.
 */
export function useFontsReady() {
  const [ready, setReady] = useState(() => !document.fonts);

  useEffect(() => {
    if (!document.fonts || ready) return undefined;
    let cancelled = false;
    document.fonts.ready.then(() => { if (!cancelled) setReady(true); });
    return () => { cancelled = true; };
  }, [ready]);

  return ready;
}
