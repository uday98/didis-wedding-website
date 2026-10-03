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
          /* Three tones, not just the accent. A flat accent dot made midnight --
             a dark palette with a gold accent -- look like a yellow palette, and
             told you nothing about the paper you would actually be reading on.
             Paper fills the dot, the accent takes the lower half, metal a sliver. */
          style={{
            background: palettes[key].tokens['c-paper'],
            borderColor: palettes[key].tokens['c-line'],
            backgroundImage: `linear-gradient(to top,
              ${palettes[key].tokens['c-accent']} 0 38%,
              ${palettes[key].tokens['c-metal']} 38% 46%,
              transparent 46%)`,
          }}
          title={palettes[key].label}
        >
          <span className="sr-only">{palettes[key].label}</span>
        </button>
      ))}
    </div>
  );
}
