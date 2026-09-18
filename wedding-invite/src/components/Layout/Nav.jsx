import './Nav.css';

/** Links are passed in; the nav never hardcodes the site's sections. */
export function Nav({ items }) {
  return (
    <nav className="nav" aria-label="Sections">
      <ul className="nav__list">
        {items.map(({ id, label }) => (
          <li key={id}><a className="nav__link" href={`#${id}`}>{label}</a></li>
        ))}
      </ul>
    </nav>
  );
}
