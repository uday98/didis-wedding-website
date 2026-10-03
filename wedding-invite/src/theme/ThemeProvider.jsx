import { createContext, useContext, useLayoutEffect, useMemo, useState } from 'react';
import { palettes, ACTIVE_PALETTE, paletteNames } from './palettes';

const ThemeContext = createContext(null);

function resolveInitial() {
  const fromUrl = new URLSearchParams(window.location.search).get('palette');
  return paletteNames.includes(fromUrl) ? fromUrl : ACTIVE_PALETTE;
}

export function ThemeProvider({ children }) {
  const [name, setName] = useState(resolveInitial);

  /* Layout, not passive: useEffect runs after paint, so frame 1 would have no
     --c-* at all and the whole page would flash unstyled on every cold load. */
  useLayoutEffect(() => {
    const { tokens } = palettes[name];
    const root = document.documentElement;
    Object.entries(tokens).forEach(([k, v]) => root.style.setProperty(`--${k}`, v));
  }, [name]);

  const value = useMemo(() => ({ name, setName, names: paletteNames }), [name]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
