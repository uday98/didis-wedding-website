import { useRef } from 'react';
import './Nav.css';
import { useNavMetrics } from '../../hooks/useNavMetrics';
import { useScrollSpy } from '../../hooks/useScrollSpy';

/**
 * Links are passed in; the nav never hardcodes the site's sections.
 *
 * It used to shrink by 3px once the page scrolled. Nothing visible came of it
 * once the nav stopped being a bar, but the nav sits in normal flow above the
 * hero, so the shrink pulled every piece of content on the page up by 3px the
 * instant a guest started scrolling. That was removed along with the observer
 * that detected it.
 */
export function Nav({ items }) {
  const ref = useRef(null);
  const active = useScrollSpy(items.map(({ id }) => id));

  useNavMetrics(ref);

  return (
    <nav className="nav" ref={ref} aria-label="Sections">
      <ul className="nav__list">
        {items.map(({ id, label }) => (
          <li key={id}>
            <a
              className="nav__link"
              href={`#${id}`}
              /* aria-current, not just a class: the highlight is information,
                 not decoration, and a screen reader should get it too. */
              aria-current={active === id ? 'location' : undefined}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
