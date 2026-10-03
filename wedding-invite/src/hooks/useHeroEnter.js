import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';
import { useStageLive } from './useStage';
import { useFontsReady } from './useFontsReady';
import { useLook } from '../theme/LookProvider';

/**
 * The hand-off. The envelope runs for 1770ms and used to cut to a dead-still
 * page; the hero now takes the motion over at the moment the envelope finishes.
 *
 * Waits on fonts too, so the headline does not animate in at Georgia's metrics
 * and then jump when Prata lands.
 */
export function useHeroEnter() {
  const reduced = useReducedMotion();
  const live = useStageLive();
  const fontsReady = useFontsReady();
  const { look } = useLook();
  const [entered, setEntered] = useState(false);

  const wanted = !reduced && look.motion !== 'off';

  useEffect(() => {
    if (!wanted) { setEntered(true); return undefined; }
    if (!live || !fontsReady || entered) return undefined;
    /* Set directly rather than waiting a frame. The usual reason to defer is to
       guarantee the browser paints the pre-transition state first, but here the
       hero renders data-enter="out" from its very first mount and sits that way
       for the whole envelope sequence, so that state is long since painted.
       requestAnimationFrame would also never fire in a background or occluded
       tab, which would leave the hero permanently invisible. */
    setEntered(true);
    return undefined;
  }, [wanted, live, fontsReady, entered]);

  return entered ? 'in' : 'out';
}
