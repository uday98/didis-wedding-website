import { useContent } from '../../hooks/useContent';
import { Reveal } from '../Layout/Reveal';
import { Panel } from './Panel';
import { Divider } from './Divider';
import { Monogram } from './Monogram';
import { TaglineTiers } from './TaglineTiers';

export function Cover() {
  const { tagline } = useContent('couple');
  const { cover } = useContent('panels');
  return (
    <Panel id="cover" art={cover} as="header">
      <Reveal stagger className="pn-center">
        <Monogram />
        <Divider />
        <p className="pn-tagline"><TaglineTiers text={tagline} /></p>
        <Divider />
      </Reveal>
    </Panel>
  );
}
