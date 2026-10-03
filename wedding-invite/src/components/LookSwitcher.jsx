import { useLook } from '../theme/LookProvider';
import { dimensionNames, matchPreset, presetNames } from '../theme/looks';

/**
 * A decision tool, not a guest feature.
 * Remove this file and its one line in App.jsx before going live -- the chosen
 * look lives in ACTIVE_LOOK, so deleting this bakes it in rather than loses it.
 */
export function LookSwitcher({ onPaceChange }) {
  const { look, set, applyPreset, dimensions } = useLook();
  const current = matchPreset(look);

  /* Pace is the one dimension with nothing on screen to demonstrate it: the
     envelope plays once per session and the reveals are one-shot, so changing
     it used to look like it did nothing at all. Replaying the opening is the
     only way to actually see the difference. */
  const choose = (dimension, value) => {
    set(dimension, value);
    if (dimension === 'pace') onPaceChange?.();
  };

  return (
    <div className="look-switcher" role="group" aria-label="Preview look">
      <div className="look-switcher__presets">
        {presetNames.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => applyPreset(p)}
            aria-pressed={p === current}
            className="look-switcher__preset"
          >
            {p}
          </button>
        ))}
        {/* Says so explicitly, rather than leaving both preset buttons unpressed
            and looking broken. */}
        {current === null && <span className="look-switcher__custom">custom</span>}
      </div>

      {dimensionNames.map((d) => (
        <div className="look-switcher__row" key={d}>
          <span className="look-switcher__label" title={dimensions[d].help}>
            {dimensions[d].label}
          </span>
          <div className="look-switcher__values">
            {dimensions[d].values.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => choose(d, v)}
                aria-pressed={v === look[d]}
                aria-label={`${dimensions[d].label}: ${v}`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
