import { useEffect, useRef, useState } from 'react';
import './Nav.css';
import { useNavMetrics } from '../../hooks/useNavMetrics';
import { useScrollSpy } from '../../hooks/useScrollSpy';

/** Links are passed in; the nav never hardcodes the site's sections. */
export function Nav({ items }) {
  const ref = useRef(null);
  const sentinel = useRef(null);
  const [stuck, setStuck] = useState(false);
  const active = useScrollSpy(items.map(({ id }) => id));

  useNavMetrics(ref);

  /* A sentinel above the nav rather than a scroll listener: the browser reports
     the crossing itself, so there is no per-frame work on a phone, and the
     project keeps its zero scroll listeners. */
  useEffect(() => {
    const el = sentinel.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinel} className="nav__sentinel" aria-hidden="true" />
      <nav className="nav" ref={ref} data-stuck={stuck ? '' : undefined} aria-label="Sections">
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
    </>
  );
}
