/**
 * One mark per function. A shared vocabulary -- a 24x24 box, 1.1 strokes, a
 * 7-unit radius -- so five marks read as one set rather than five drawings.
 * Geometry rather than illustration: a turmeric root or a dholak rendered at
 * 22px is mud.
 */

export const SIGILS = {
  // Haldi -- the turmeric smear. The one solid mark, because haldi is the one
  // function where something is physically applied to someone.
  haldi: (
    <>
      <circle cx="12" cy="12" r="5" fill="currentColor" stroke="none" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={i} x1="12" y1="2.5" x2="12" y2="5" transform={`rotate(${i * 60} 12 12)`} />
      ))}
    </>
  ),

  // Mehendi -- the cone's trailing dots, laid along the arc a hand makes.
  mehendi: (
    <>
      <path d="M4 16.5a10 10 0 0 1 16 0" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const a = Math.PI * (1 - i / 6);
        return (
          <circle
            key={i}
            r="1.05"
            fill="currentColor"
            stroke="none"
            cx={(12 + 7.4 * Math.cos(a)).toFixed(2)}
            cy={(13.2 - 7.4 * Math.sin(a)).toFixed(2)}
          />
        );
      })}
    </>
  ),

  // Sangeet -- three arcs leaving a drum head. Sound, not an instrument.
  sangeet: (
    <>
      <path d="M8 3.5a9.5 9.5 0 0 1 0 17" />
      <path d="M12 6.5a7 7 0 0 1 0 11" />
      <path d="M16 9.2a4 4 0 0 1 0 5.6" />
    </>
  ),

  // Wedding -- the saat phere: the fire, and seven turns around it.
  wedding: (
    <>
      <circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none" />
      {Array.from({ length: 7 }, (_, i) => (
        <line key={i} x1="12" y1="3.4" x2="12" y2="6" transform={`rotate(${(i * 360) / 7} 12 12)`} />
      ))}
      <circle cx="12" cy="12" r="8.4" strokeDasharray="1.2 3.4" />
    </>
  ),

  // Reception -- a ring and a centre. The formal end of the week, plainest mark.
  reception: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),
};

/** Whatever wedding.json grows next still gets a mark. */
export const FALLBACK_SIGIL = <circle cx="12" cy="12" r="7.5" />;
