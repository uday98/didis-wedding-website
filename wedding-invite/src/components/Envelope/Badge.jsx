/* The seal: a round gold-foil medallion carrying a hand-lettered "ck" and a small
   heart, drawn as one monoline stroke after the couple's own signature mark.
   Strokes are classes, coloured from palette tokens in Envelope.css. */
export function Badge() {
  return (
    <svg className="badge" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <circle className="badge__field" cx="50" cy="50" r="44" />
      <circle className="badge__edge" cx="50" cy="50" r="44" />
      <circle className="badge__line" cx="50" cy="50" r="37" />
      <g transform="translate(50 50) scale(1.12) translate(-50 -50)">
      <path
        className="badge__mark"
        d="M17 60 C21 55 25 46 33 41 C27 44 23 52 26 58 C29 63 37 59 41 51
           C45 41 49 32 52 28 C50 36 46 51 44 60 C47 57 54 50 59 46
           C53 50 52 56 56 59 C60 62 64 58 66 55"
      />
      <path
        className="badge__heart"
        d="M70 55 C70 49 77 48 77.5 53 C78 48 85 49 85 55 C85 59 78 63 77.5 63.5 C77 63 70 59 70 55 Z"
      />
      </g>
    </svg>
  );
}
