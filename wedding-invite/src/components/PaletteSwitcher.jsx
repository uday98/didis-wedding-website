import { useTheme } from '../theme/ThemeProvider';
import { palettes } from '../theme/palettes';

/**
 * A decision tool, not a guest feature.
 * Remove this file and its one line in App.jsx before going live.
 */
export function PaletteSwitcher() {
  const { name, setName, names } = useTheme();
  return (
    <div className="palette-switcher" role="group" aria-label="Preview palette">
      {names.map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => setName(key)}
          aria-pressed={key === name}
          style={{ background: palettes[key].tokens['c-accent'] }}
          title={palettes[key].label}
        >
          <span className="sr-only">{palettes[key].label}</span>
        </button>
      ))}
    </div>
  );
}
