import './Shell.css';
/* Imported here rather than by any one section. The shell paints the surface the
   cards lie on, so it is the natural owner of the card styles too -- and it used
   to be imported by Section instead, so deleting Section silently stripped the
   paper, shadow and grain from every card on the page. */
import './Card.css';
import { Sprinkle } from '../Ornament/Sprinkle';

/** Page frame: width, background, footer. Holds no wedding content. */
export function Shell({ children, footer, enter }) {
  return (
    <div className="shell" data-enter={enter}>
      <Sprinkle />
      <main className="shell__main">{children}</main>
      {footer && <footer className="shell__footer">{footer}</footer>}
    </div>
  );
}
