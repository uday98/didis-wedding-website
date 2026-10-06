import { useContent } from '../../hooks/useContent';
import { Reveal } from '../Layout/Reveal';
import { Panel } from './Panel';
import { Divider } from './Divider';

export function Closing() {
  const { title } = useContent('closing');
  const { closing } = useContent('panels');
  return (
    <Panel id="closing" art={closing}>
      <Reveal stagger className="pn-center">
        <Divider />
        <p className="pn-closing-title">{title}</p>
        <Divider />
      </Reveal>
    </Panel>
  );
}
