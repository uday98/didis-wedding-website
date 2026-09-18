import './Events.css';
import { DayGroup } from './DayGroup';
import { Section } from '../Layout/Section';
import { useContent } from '../../hooks/useContent';
import { groupByDate } from '../../lib/datetime';

export function Events() {
  const days = groupByDate(useContent('events'));
  return (
    <Section id="events" title="The functions" kicker="Timings are when things start, not when they are called for.">
      <div className="events">
        {days.map(({ date, items }) => <DayGroup key={date} date={date} items={items} />)}
      </div>
    </Section>
  );
}
