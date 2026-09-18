import './Travel.css';
import { Section } from '../Layout/Section';
import { ArrivalList } from './ArrivalList';
import { StayCard } from './StayCard';
import { LocalHelp } from './LocalHelp';
import { useContent } from '../../hooks/useContent';

export function Travel() {
  const { intro, arrivals, stays, localHelp } = useContent('travel');
  return (
    <Section id="travel" title="Getting there and staying" kicker={intro}>
      <ArrivalList arrivals={arrivals} />
      <h3 className="travel__subhead">Where to stay</h3>
      <div className="stays">
        {stays.map((stay) => <StayCard key={stay.id} stay={stay} />)}
      </div>
      <h3 className="travel__subhead">Getting around</h3>
      <LocalHelp {...localHelp} />
    </Section>
  );
}
