import { useCallback, useEffect, useState } from 'react';
import { safeGet, safeSet, safeRemove } from '../../lib/storage';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { OPEN_TOTAL_MS } from '../../theme/motion';

const KEY = 'invite.opened';

/**
 * Owns one question: is the envelope closed, opening, or done.
 * The animation plays once per browser session. Returning guests
 * checking a venue or a timing land straight on the invitation --
 * and `replay` exists for the one guest who wants to show a parent.
 *
 * The opening's length comes from theme/motion.js, the same module that feeds
 * the CSS its --d-* values, so the timer cannot drift from the animation it is
 * timing. It used to: the hook waited 2000ms for a 1600ms animation.
 */
export function useEnvelope() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(() => (safeGet(KEY) ? 'open' : 'closed'));
  const [runId, setRunId] = useState(0);

  const finish = useCallback(() => {
    safeSet(KEY, '1');
    setPhase('open');
  }, []);

  const open = useCallback(() => {
    setPhase((p) => (p === 'closed' ? 'opening' : p));
  }, []);

  const skip = finish;

  /** Replay is a transition back to `closed`, a state the machine already has,
   *  so no fourth phase is needed. The scroll reset matters because whoever
   *  triggers this is by definition at the foot of the page. */
  const replay = useCallback(() => {
    safeRemove(KEY);
    setRunId((n) => n + 1);
    setPhase('closed');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    if (phase !== 'opening') return undefined;
    if (reduced) { finish(); return undefined; }
    const t = setTimeout(finish, OPEN_TOTAL_MS);
    return () => clearTimeout(t);
  }, [phase, reduced, finish]);

  return { phase, runId, open, skip, replay, isOpen: phase === 'open' };
}
