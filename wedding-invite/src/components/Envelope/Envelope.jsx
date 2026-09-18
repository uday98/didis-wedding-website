import './Envelope.css';
import { useContent } from '../../hooks/useContent';

/**
 * Presentation only. All state is owned by useEnvelope and passed in,
 * so the animation can be reused (a save-the-date page, a preview) untouched.
 */
export function Envelope({ phase, onOpen, onSkip }) {
  const { addressedTo, sealInitials, openLabel } = useContent('envelope');
  const { brideName, groomName } = useContent('couple');

  return (
    <div className="envelope-stage" data-phase={phase} aria-hidden={phase === 'open'}>
      <div className="envelope" data-phase={phase}>
        <div className="envelope__card">
          <div>
            <p className="envelope__addressee">{addressedTo}</p>
            <p className="envelope__names">{brideName} &amp; {groomName}</p>
          </div>
        </div>
        <div className="envelope__body" />
        <div className="envelope__flap" />
        <button
          type="button"
          className="envelope__seal"
          onClick={onOpen}
          aria-label={`${openLabel} the invitation`}
        >
          {sealInitials}
        </button>
      </div>
      {phase === 'closed' && (
        <button type="button" className="envelope__skip" onClick={onSkip}>
          Skip to the details
        </button>
      )}
    </div>
  );
}
