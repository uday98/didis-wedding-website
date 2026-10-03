/**
 * A torana is the strung mango-leaf garland hung across a doorway for a
 * wedding. Here it is a single hanging row under the hero tagline: a cord,
 * and leaves alternating in length the way a real one hangs. Rich look only.
 */
export function Torana({ leaves = 11, width = 220 }) {
  const step = width / (leaves - 1);
  return (
    <svg
      className="torana"
      width={width}
      height="26"
      viewBox={`0 0 ${width} 26`}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      aria-hidden="true"
      focusable="false"
    >
      <path d={`M0 4 Q ${width / 2} 10 ${width} 4`} />
      {Array.from({ length: leaves }, (_, i) => {
        const x = i * step;
        // Follows the cord's sag, so the leaves hang from the curve, not a line.
        const t = x / width;
        const y = 4 + 6 * (4 * t * (1 - t));
        const len = i % 2 === 0 ? 13 : 9;
        return (
          <path
            key={i}
            d={`M${x.toFixed(1)} ${y.toFixed(1)}
                q -2.6 ${(len * 0.55).toFixed(1)} 0 ${len}
                q 2.6 ${(-len * 0.45).toFixed(1)} 0 ${-len}`}
          />
        );
      })}
    </svg>
  );
}
