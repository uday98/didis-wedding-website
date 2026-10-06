import { useContent } from '../../hooks/useContent';
import { Reveal } from '../Layout/Reveal';
import { Panel } from './Panel';
import { Divider } from './Divider';
import { titleSize } from '../../lib/titleSize';

/**
 * The formal invitation: blessing, the hosting family, the request, the couple,
 * the other family, a closing line. Which family hosts is data (`families.hosts`)
 * and the block reorders around it. Every string is from wedding.json; the couple
 * line is the page's <h1>.
 */
function Parents({ family }) {
  const { father, mother } = family;
  if (!father && !mother) return null;
  return (
    <p className="pn-parents">
      {father && <span>{father}{mother ? ' &' : ''}</span>}{' '}
      {mother && <span>{mother}</span>}
    </p>
  );
}

export function Invitation() {
  const families = useContent('families');
  const { brideName, groomName } = useContent('couple');
  const { invitation } = useContent('panels');
  const { openingLine, hosts, requestLine, withLine, closingLine } = families;

  const hostSide = hosts === 'groom' ? families.groom : families.bride;
  const otherSide = hosts === 'groom' ? families.bride : families.groom;
  const hostChild = hosts === 'groom' ? groomName : brideName;
  const otherChild = hosts === 'groom' ? brideName : groomName;

  return (
    <Panel id="invitation" art={invitation} aria-label="Invitation">
      <Reveal stagger className="pn-center">
        {openingLine && <p className="pn-blessing">{openingLine}</p>}
        <Parents family={hostSide} />
        {requestLine && <p className="pn-request">{requestLine} {hostSide.relation}</p>}
        <h1 className="pn-couple">
          <span className="pn-name" data-size={titleSize(hostChild)}>{hostChild}</span>
          {withLine && <span className="pn-with">{withLine}</span>}
          <span className="pn-name" data-size={titleSize(otherChild)}>{otherChild}</span>
        </h1>
        {otherSide.relation && <p className="pn-request">{otherSide.relation} of</p>}
        <Parents family={otherSide} />
        <Divider />
        {closingLine && <p className="pn-blessing">{closingLine}</p>}
      </Reveal>
    </Panel>
  );
}
