/**
 * The optional photograph behind the names.
 *
 * Renders nothing at all when there is no photo, so the hero falls back to the
 * type-led version with no empty frame to explain away. That is the normal case
 * today -- the content is still placeholder.
 *
 * eager + high priority, NOT lazy: this is the LCP element on every device and
 * it is above the fold, so deferring it defers the one thing the score is
 * measured on. It is also the only image on the site, so there is nothing else
 * lazy loading would help.
 *
 * The aspect ratio is fixed so the box exists before the bytes arrive and the
 * headline cannot be pushed down mid-load.
 */
export function HeroPhoto({ src, alt }) {
  if (!src) return null;
  return (
    <div className="hero__photo" aria-hidden={alt ? undefined : 'true'}>
      <img src={src} alt={alt ?? ''} loading="eager" fetchPriority="high" decoding="async" />
      <div className="hero__scrim" />
    </div>
  );
}
