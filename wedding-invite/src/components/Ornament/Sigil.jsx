import { SIGILS, FALLBACK_SIGIL } from './sigils';

/**
 * Looked up by the event's id, with a plain ring as the default. A lookup with
 * a fallback, not a hardcode -- so a sixth function needs no code here, the
 * same promise groupByDate already makes about deriving days from the data.
 */
export function Sigil({ id, size = 22 }) {
  return (
    <svg
      className="sigil"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      {SIGILS[id] ?? FALLBACK_SIGIL}
    </svg>
  );
}
