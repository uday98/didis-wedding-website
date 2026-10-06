import { useSeed, setSeed, ACTIVE_SPRINKLE_SEED } from '../theme/sprinkle';

/**
 * A decision tool, not a guest feature. Walk the seed until the paisleys sit
 * well, then tell me the number and it becomes ACTIVE_SPRINKLE_SEED. Delete
 * this file with the rest of the dev panel before launch.
 */
export function SeedSwitcher() {
  const seed = useSeed();
  return (
    <div className="look-switcher" role="group" aria-label="Ornament seed">
      <div className="look-switcher__row">
        <span className="look-switcher__label" title="Which arrangement of the paisleys. Same number, same page, every time.">
          Paisley seed
        </span>
        <span className="look-switcher__values">
          <button type="button" onClick={() => setSeed(seed - 1)} aria-label="Previous seed">−</button>
          <span aria-live="polite" style={{ minWidth: '3ch', textAlign: 'center' }}>{seed}</span>
          <button type="button" onClick={() => setSeed(seed + 1)} aria-label="Next seed">+</button>
          <button type="button" onClick={() => setSeed(1 + Math.floor(Math.random() * 9999))}>shuffle</button>
          <button type="button" onClick={() => setSeed(ACTIVE_SPRINKLE_SEED)}>reset</button>
        </span>
      </div>
    </div>
  );
}
