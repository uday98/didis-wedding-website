import './Section.css';

/** The only component that knows about vertical rhythm and section headings. */
export function Section({ id, title, kicker, children }) {
  return (
    <section className="section" id={id} aria-labelledby={`${id}-title`}>
      <header className="section__head">
        <h2 className="section__title" id={`${id}-title`}>{title}</h2>
        {kicker && <p className="section__kicker">{kicker}</p>}
      </header>
      {children}
    </section>
  );
}
