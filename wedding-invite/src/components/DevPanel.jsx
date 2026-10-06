import { useEffect, useState } from 'react';
import { LookSwitcher } from './LookSwitcher';
import { SeedSwitcher } from './SeedSwitcher';
import { safeLocalGet, safeLocalSet } from '../lib/storage';

const KEY = 'invite.dev.open';

/**
 * A decision tool, not a guest feature.
 * Remove this file and its one line in App.jsx before going live. The chosen
 * look lives in ACTIVE_LOOK, the palette in ACTIVE_PALETTE and the pairing in
 * ACTIVE_PAIRING, so deleting this bakes them in rather than losing them.
 *
 * A launcher and a sheet rather than the two fixed panels this replaces: seven
 * look rows and eight palette dots covered most of a 280px fold's screen, and
 * this site is judged on a phone. The sheet can be dismissed, so the controls
 * are never between you and the thing you are looking at, and it gets
 * max-height and its own scroll for free.
 *
 * Open state is persisted so an HMR reload does not close it mid-comparison.
 * The shortcut is a bare `d` because there is no text input on this site for it
 * to collide with.
 */
export function DevPanel({ onPaceChange }) {
  const [open, setOpen] = useState(() => safeLocalGet(KEY) === '1');

  useEffect(() => { safeLocalSet(KEY, open ? '1' : '0'); }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'd' && !e.metaKey && !e.ctrlKey && !e.altKey) setOpen((v) => !v);
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="dev">
      <button
        type="button"
        className="dev__launcher"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="dev-sheet"
      >
        <span aria-hidden="true">{open ? '×' : '◐'}</span>
        <span className="sr-only">{open ? 'Close' : 'Open'} preview controls</span>
      </button>

      {/* Mounted either way and hidden with an attribute: unmounting would throw
          away the sheet's scroll position every time it closes. */}
      <div className="dev__sheet" id="dev-sheet" data-open={open ? '' : undefined}>
        <LookSwitcher onPaceChange={onPaceChange} />
        <SeedSwitcher />
        <p className="dev__hint">Press d to toggle. Changing pace replays the opening. Delete DevPanel before launch.</p>
      </div>
    </div>
  );
}
