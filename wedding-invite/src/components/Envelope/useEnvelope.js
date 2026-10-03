import { useCallback, useEffect, useRef, useState } from 'react';
import { safeGet, safeSet, safeRemove } from '../../lib/storage';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { openTotalMs, exitTotalMs } from '../../theme/motion';
import { useLook } from '../../theme/LookProvider';

const KEY = 'invite.opened';

/**
 * Owns one question: where in the opening are we.
 *
 *   closed   sealed, waiting for a click
 *   opening  flap back, card rising, card holding
 *   closing  the card is up and the stage is fading while the page rises
 *   open     the stage is gone
 *
 * Plays once per browser session. Returning guests checking a venue or a timing
 * land straight on the invitation; `replay` exists for the one guest who wants
 * to show a parent.
 *
 * Durations come from theme/motion.js, the same module that feeds CSS its --d-*
 * and --pace-k, so a timer cannot drift from the animation it is timing. It
 * used to: the hook waited 2000ms for a 1600ms animation.
 */
export function useEnvelope() {
  const reduced = useReducedMotion();
  const { look } = useLook();
  const [phase, setPhase] = useState(() => (safeGet(KEY) ? 'open' : 'closed'));
  const [runId, setRunId] = useState(0);

  /* Read through a ref inside the running effects. Putting look.pace in their
     dependency arrays meant that changing pace mid-flight restarted the timer
     at full length while the CSS animation kept its elapsed progress and merely
     re-read its duration -- a genuine desync. Pace is sampled when a phase
     begins; changing it re-triggers from the top instead (see App). */
  const paceRef = useRef(look.pace);
  paceRef.current = look.pace;

  const finish = useCallback(() => {
    safeSet(KEY, '1');
    setPhase('open');
  }, []);

  const open = useCallback(() => {
    setPhase((p) => (p === 'closed' ? 'opening' : p));
  }, []);

  const skip = finish;

  /** Replay is a transition back to `closed`, a state the machine already has,
   *  so no extra phase is needed. The scroll reset matters because whoever
   *  triggers this is by definition at the foot of the page. */
  const replay = useCallback(() => {
    safeRemove(KEY);
    setRunId((n) => n + 1);
    setPhase('closed');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  // opening -> closing, once the card has risen and held
  useEffect(() => {
    if (phase !== 'opening') return undefined;
    if (reduced) { finish(); return undefined; }
    const t = setTimeout(() => setPhase('closing'), openTotalMs(paceRef.current));
    return () => clearTimeout(t);
  }, [phase, reduced, finish, runId]);

  // closing -> open, once the stage has faded out
  useEffect(() => {
    if (phase !== 'closing') return undefined;
    const t = setTimeout(finish, exitTotalMs(paceRef.current));
    return () => clearTimeout(t);
  }, [phase, finish, runId]);

  /**
   * What the PAGE may do, which is a different question from what the envelope
   * is doing -- and the reason it is derived here rather than in App.
   *
   *   sealed  the overlay is opaque over a laid-out page. Nothing may reveal:
   *           nothing locks body scroll, so every section is intersecting the
   *           viewport the whole time and every reveal would fire unseen.
   *   live    the overlay is FADING and the shell is rising underneath it. The
   *           page must already be revealing here, or the overlay clears onto a
   *           blank sheet and the sections pop in afterwards.
   *   done    the overlay is gone.
   */
  const stage = phase === 'closed' || phase === 'opening'
    ? 'sealed'
    : phase === 'closing' ? 'live' : 'done';

  return { phase, stage, runId, open, skip, replay, isOpen: phase === 'open' };
}
