import { useCallback, useEffect, useState } from 'react';
import { safeGet, safeSet } from '../../lib/storage';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const KEY = 'invite.opened';
const FLAP_MS = 900;
const LIFT_MS = 1100;

/**
 * Owns one question: is the envelope closed, opening, or done.
 * The animation plays once per browser session. Returning guests
 * checking a venue or a timing land straight on the invitation.
 */
export function useEnvelope() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(() => (safeGet(KEY) ? 'open' : 'closed'));

  const open = useCallback(() => {
    setPhase((p) => (p === 'closed' ? 'opening' : p));
  }, []);

  const skip = useCallback(() => {
    safeSet(KEY, '1');
    setPhase('open');
  }, []);

  useEffect(() => {
    if (phase !== 'opening') return undefined;
    if (reduced) { skip(); return undefined; }
    const t = setTimeout(() => { safeSet(KEY, '1'); setPhase('open'); }, FLAP_MS + LIFT_MS);
    return () => clearTimeout(t);
  }, [phase, reduced, skip]);

  return { phase, open, skip, isOpen: phase === 'open' };
}
