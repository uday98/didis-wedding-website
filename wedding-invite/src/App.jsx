import { Envelope } from './components/Envelope/Envelope';
import { useEnvelope } from './components/Envelope/useEnvelope';
import { Shell } from './components/Layout/Shell';
import { Nav } from './components/Layout/Nav';
import { Hero } from './components/Hero/Hero';
import { Events } from './components/Events/Events';
import { Travel } from './components/Travel/Travel';
import { PaletteSwitcher } from './components/PaletteSwitcher';
import { useContent } from './hooks/useContent';

// Adding a section later means adding a component and one entry here.
const SECTIONS = [
  { id: 'events', label: 'Functions', Component: Events },
  { id: 'travel', label: 'Travel & stay', Component: Travel },
];

export default function App() {
  const { phase, runId, open, skip, replay, isOpen } = useEnvelope();
  const { monogram } = useContent('couple');
  const { replayLabel } = useContent('envelope');

  return (
    <>
      <Envelope phase={phase} runId={runId} onOpen={open} onSkip={skip} />
      <Shell
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
        {SECTIONS.map(({ id, Component }) => <Component key={id} />)}
      </Shell>
      {/* Remove before launch */}
      <PaletteSwitcher />
      {!isOpen && <div className="sr-only" aria-live="polite">Invitation sealed</div>}
    </>
  );
}
