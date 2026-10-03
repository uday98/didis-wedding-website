import './Envelope.css';
import { useContent } from '../../hooks/useContent';

/**
 * Presentation only. All state is owned by useEnvelope and passed in,
 * so the animation can be reused (a save-the-date page, a preview) untouched.
 *
 * The envelope is a box, not a stack of rectangles: __back is the far wall,
 * the three __wall strips are its sides, __body is the front panel one
 * --env-depth nearer the viewer, and the card rests in the gap between them.
 * DOM order no longer decides what paints on top -- translateZ does.
 */
export function Envelope({ phase, runId, onOpen, onSkip }) {
  const { addressedTo, sealInitials, openAriaLabel, skipLabel } = useContent('envelope');
  const { brideName, groomName } = useContent('couple');

  return (
    <div className="envelope-stage" data-phase={phase} aria-hidden={phase === 'open'}>
      {/* key={runId} remounts the subtree so replay restarts the CSS animation
          deterministically instead of reusing a node mid-keyframe. */}
      <div className="envelope" data-phase={phase} key={runId}>
        <div className="envelope__back" />
        <div className="envelope__wall envelope__wall--left" />
        <div className="envelope__wall envelope__wall--right" />
        <div className="envelope__wall envelope__wall--bottom" />

        <div className="envelope__card">
          <div>
            <p className="envelope__addressee">{addressedTo}</p>
            <p className="envelope__names">{brideName} &amp; {groomName}</p>
          </div>
        </div>

        <div className="envelope__body" />

        <div className="envelope__flap">
          <div className="envelope__flap-face envelope__flap-face--outer" />
          <div className="envelope__flap-face envelope__flap-face--inner" />
        </div>

        <button
          type="button"
          className="envelope__seal"
          onClick={onOpen}
          aria-label={openAriaLabel}
        >
          {sealInitials}
        </button>
      </div>
      {phase === 'closed' && (
        <button type="button" className="envelope__skip" onClick={onSkip}>
          {skipLabel}
        </button>
      )}
    </div>
  );
}
