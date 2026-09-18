import './Shell.css';

/** Page frame: width, background, footer. Holds no wedding content. */
export function Shell({ children, footer }) {
  return (
    <div className="shell">
      <main className="shell__main">{children}</main>
      {footer && <footer className="shell__footer">{footer}</footer>}
    </div>
  );
}
