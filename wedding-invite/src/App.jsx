import { Envelope } from './components/Envelope/Envelope';
import { useEnvelope } from './components/Envelope/useEnvelope';
import { useScrollLock } from './hooks/useScrollLock';
import { StageProvider } from './hooks/useStage';
import { Shell } from './components/Layout/Shell';
import { Nav } from './components/Layout/Nav';
import { Hero } from './components/Hero/Hero';
import { Invitation } from './components/Invitation/Invitation';
import { Events } from './components/Events/Events';
import { Travel } from './components/Travel/Travel';
import { DevPanel } from './components/DevPanel';
import { useContent } from './hooks/useContent';
import './components/Ornament/Ornament.css';

// Adding a section later means adding a component and one entry here.
const SECTIONS = [
  { id: 'events', label: 'Functions', Component: Events },
  { id: 'travel', label: 'Travel & stay', Component: Travel },
];

export default function App() {
  const { phase, stage, runId, open, skip, replay, isOpen } = useEnvelope();
  const { monogram } = useContent('couple');
  // The page stays put while the envelope is sealed. Released at `live`, so the
  // scrollbar returns as the overlay starts to fade rather than after it.
  useScrollLock(stage === 'sealed');
  const { replayLabel } = useContent('envelope');

  return (
    <>
      <Envelope phase={phase} runId={runId} onOpen={open} onSkip={skip} />
      {/* `stage`, not `isOpen`. Reveals must start while the overlay is still
          FADING, so the page has settled by the time it clears -- gating on
          isOpen would mean the overlay lifts onto a blank sheet and the sections
          pop in afterwards. Nothing may reveal while it is sealed, though: the
          overlay is fixed over a laid-out page and body scroll is not locked, so
          every section is intersecting the viewport the whole time. */}
      <StageProvider live={stage !== 'sealed'}>
        <Shell
          enter={stage === 'sealed' ? 'out' : 'in'}
          footer={
            <>
              <p>{monogram}</p>
              {/* Gated on isOpen so it is not an unreachable tab stop behind the
                  sealed overlay. */}
              {isOpen && (
                <button type="button" className="invite-replay" onClick={replay}>
                  {replayLabel}
                </button>
              )}
            </>
          }
        >
          <Nav items={SECTIONS.map(({ id, label }) => ({ id, label }))} />
          <Hero />
          {/* The formal invitation sits between the hero and the details:
              it is the card, the sections below are the logistics. */}
          <Invitation />
          {SECTIONS.map(({ id, Component }) => <Component key={id} />)}
        </Shell>
      </StageProvider>
      <div className="grain" aria-hidden="true" />
      {/* Remove before launch */}
      <DevPanel onPaceChange={replay} />
      {!isOpen && <div className="sr-only" aria-live="polite">Invitation sealed</div>}
    </>
  );
}
