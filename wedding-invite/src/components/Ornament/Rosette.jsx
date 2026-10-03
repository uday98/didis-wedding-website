/**
 * A quarter rosette for the hero's top corner -- the corner block of a
 * printed invitation card. Rich look only; placement is CSS.
 */
export function Rosette({ size = 108 }) {
  return (
    <svg
      className="rosette"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      aria-hidden="true"
      focusable="false"
    >
      {/* Petals swept about the corner, each one the same arc pair rotated. */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path
          key={i}
          d="M100 0a46 46 0 0 1-16 32 46 46 0 0 0-16-32"
          transform={`rotate(${i * 15} 100 0)`}
        />
      ))}
      <path d="M100 0a74 74 0 0 1-74 74" strokeDasharray="1.5 4" />
      <path d="M100 0a88 88 0 0 1-88 88" />
    </svg>
  );
}
