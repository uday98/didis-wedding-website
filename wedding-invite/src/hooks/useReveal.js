import { useInView } from './useInView';
import { useReducedMotion } from './useReducedMotion';
import { useStageLive } from './useStage';
import { useLook } from '../theme/LookProvider';

/**
 * Policy. Decides whether a reveal should happen at all, then delegates the
 * "has it entered yet" question to useInView.
 *
 * Three ways to opt out, and all three mean the same thing -- show the content
 * immediately, and do not build an observer:
 *   - the guest prefers reduced motion
 *   - the look is set to motion: off
 *   - the envelope is still sealed, so nothing behind it should be revealing
 *
 * Returns the ref to attach and the string that goes straight into
 * data-reveal, mirroring the envelope's data-phase pattern.
 */
export function useReveal() {
  const reduced = useReducedMotion();
  const live = useStageLive();
  const { look } = useLook();

  const wanted = !reduced && look.motion !== 'off';
  const [ref, inView] = useInView(wanted && live);

  return [ref, !wanted || inView ? 'in' : 'out'];
}
