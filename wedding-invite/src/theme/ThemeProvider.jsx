import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from 'react';
import { palettes, ACTIVE_PALETTE, paletteNames } from './palettes';
import { safeLocalGet, safeLocalSet } from '../lib/storage';

const ThemeContext = createContext(null);

const KEY = 'invite.palette';

/* Every token ANY palette defines. A palette may omit the optional ones (the
   surface-specific text colours), and the CSS relies on that omission to fall
   back to the ordinary ink -- so a token left over from the PREVIOUS palette is
   not harmless, it silently overrides the fallback. Switching from a dark-surface
   palette to Heirloom left Heirloom's hero in the other palette's champagne. */
const ALL_TOKEN_KEYS = [...new Set(Object.values(palettes).flatMap((p) => Object.keys(p.tokens)))];

/* URL > localStorage > ACTIVE_PALETTE, matching LookProvider. A URL param
   deliberately does not write to storage, so ?palette=dusk shows the recipient
   what the sender saw without overwriting what they had chosen. The look
   persisted across reloads but the palette did not, which made auditioning the
   two together needlessly annoying. */
function resolveInitial() {
  const fromUrl = new URLSearchParams(window.location.search).get('palette');
  if (paletteNames.includes(fromUrl)) return fromUrl;
  const stored = safeLocalGet(KEY);
  if (paletteNames.includes(stored)) return stored;
  return ACTIVE_PALETTE;
}

export function ThemeProvider({ children }) {
  const [name, setName] = useState(resolveInitial);

  /* Layout, not passive: useEffect runs after paint, so frame 1 would have no
     --c-* at all and the whole page would flash unstyled on every cold load. */
  useLayoutEffect(() => {
    const { tokens, scheme } = palettes[name];
    const root = document.documentElement;
    // Clear first: setProperty only ever adds, so anything the new palette does
    // not define would otherwise survive from the last one.
    ALL_TOKEN_KEYS.forEach((k) => { if (!(k in tokens)) root.style.removeProperty(`--${k}`); });
    Object.entries(tokens).forEach(([k, v]) => root.style.setProperty(`--${k}`, v));
    /* Light vs dark paper is not derivable from a custom property in CSS, and a
       few effects genuinely need to branch on it -- the grain's blend mode is a
       no-op over dark paper. An attribute is the channel this project already
       uses for that kind of state. */
    root.setAttribute('data-scheme', scheme ?? 'light');
  }, [name]);

  const choose = useCallback((next) => {
    if (!paletteNames.includes(next)) return;
    safeLocalSet(KEY, next);
    setName(next);
  }, []);

  const value = useMemo(() => ({ name, setName: choose, names: paletteNames }), [name, choose]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
