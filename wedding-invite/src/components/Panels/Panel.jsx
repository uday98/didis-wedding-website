import './Panels.css';

/**
 * One illustrated screen of the invitation -- a 9:16 card, drawn as artwork with
 * the words laid over it as live text. The artwork carries no text at all, so the
 * words stay sharp, selectable and tappable, and are sized from the panel's own
 * width (see Panels.css) so they stay in step with the picture on any screen.
 *
 * `id` selects the per-panel placement in Panels.css (where the text block starts,
 * and any sideways shift where the artwork leaves less room on one side).
 */
export function Panel({ id, art, as: Tag = 'section', children, ...rest }) {
  return (
    <Tag className="panel" data-panel={id} style={art ? { '--art': `url(${art})` } : undefined} {...rest}>
      <div className="panel__body">{children}</div>
    </Tag>
  );
}
