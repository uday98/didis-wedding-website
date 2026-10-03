import './Shell.css';

/** Page frame: width, background, footer. Holds no wedding content. */
export function Shell({ children, footer, enter }) {
  return (
    <div className="shell" data-enter={enter}>
      <main className="shell__main">{children}</main>
      {footer && <footer className="shell__footer">{footer}</footer>}
    </div>
  );
}
