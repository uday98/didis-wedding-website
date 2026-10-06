/** A fine gold rule with a small lotus at its centre, the divider on the stationery. */
export function Divider() {
  return (
    <svg className="pn-divider" viewBox="0 0 220 16" fill="none" stroke="currentColor" strokeWidth="0.8"
      strokeLinecap="round" aria-hidden="true" focusable="false">
      <path d="M2 8h88M130 8h88" />
      <g transform="translate(110 8)">
        <path d="M0 -6 Q3.4 -1.5 0 4.5 Q-3.4 -1.5 0 -6Z" />
        <path d="M-1.8 4 Q-8 2.5 -10 -1.5 Q-4.5 -1.5 -1.8 4Z" />
        <path d="M1.8 4 Q8 2.5 10 -1.5 Q4.5 -1.5 1.8 4Z" />
        <circle cx="-16" cy="0" r="0.9" fill="currentColor" stroke="none" />
        <circle cx="16" cy="0" r="0.9" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}
