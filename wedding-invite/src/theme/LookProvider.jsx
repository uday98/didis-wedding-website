import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from 'react';
import { ACTIVE_LOOK, DIMENSIONS, dimensionNames, PRESETS, isValid } from './looks';
import { safeLocalGet, safeLocalSet } from '../lib/storage';

const LookContext = createContext(null);
const KEY = 'invite.look';

/**
 * Precedence: URL > localStorage > ACTIVE_LOOK.
 *
 * A URL param deliberately does not write to storage. That way `?motion=full`
 * shows the recipient exactly what the sender saw, and auditioning a look via a
 * link never overwrites the one you saved.
 */
function resolveInitial() {
  const params = new URLSearchParams(window.location.search);
  let stored = {};
  try { stored = JSON.parse(safeLocalGet(KEY) ?? '{}') ?? {}; } catch { stored = {}; }

  return dimensionNames.reduce((look, d) => {
    const fromUrl = params.get(d);
    if (isValid(d, fromUrl)) return { ...look, [d]: fromUrl };
    if (isValid(d, stored[d])) return { ...look, [d]: stored[d] };
    return { ...look, [d]: ACTIVE_LOOK[d] };
  }, {});
}

export function LookProvider({ children }) {
  const [look, setLook] = useState(resolveInitial);

  /* Same reason as ThemeProvider: after-paint would mean one frame with no
     data-* at all, so every reveal and every ornament rule would miss frame 1. */
  useLayoutEffect(() => {
    const root = document.documentElement;
    dimensionNames.forEach((d) => root.setAttribute(`data-${d}`, look[d]));
  }, [look]);

  const set = useCallback((dimension, value) => {
    if (!isValid(dimension, value)) return;
    setLook((prev) => {
      const next = { ...prev, [dimension]: value };
      safeLocalSet(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const applyPreset = useCallback((preset) => {
    const next = PRESETS[preset];
    if (!next) return;
    setLook(next);
    safeLocalSet(KEY, JSON.stringify(next));
  }, []);

  const value = useMemo(
    () => ({ look, set, applyPreset, dimensions: DIMENSIONS }),
    [look, set, applyPreset],
  );
  return <LookContext.Provider value={value}>{children}</LookContext.Provider>;
}

export const useLook = () => useContext(LookContext);
