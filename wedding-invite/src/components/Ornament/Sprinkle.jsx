import './Sprinkle.css';
import { layout, useSeed } from '../../theme/sprinkle';

/**
 * Paisleys scattered down the edges of the page, positioned by seed (see
 * theme/sprinkle.js). Decorative only: aria-hidden, no pointer events, and never
 * in the tab order. Lives in the shell, not in a card, because it has to reach
 * out past the cards into the surface at the sides.
 */
export function Sprinkle() {
  const seed = useSeed();
  return (
    <div className="sprinkle" aria-hidden="true">
      {layout(seed).map((o) => (
        <img
          key={o.id}
          className="sprinkle__item"
          src="/orn/paisley.webp"
          alt=""
          width="340"
          height="553"
          loading="lazy"
          decoding="async"
          data-side={o.side}
          style={{
            '--top': `${o.top}%`,
            '--k': o.size,
            '--tilt': `${o.tilt}deg`,
            '--flip': o.flip ? -1 : 1,
            '--show': o.show,
          }}
        />
      ))}
    </div>
  );
}
