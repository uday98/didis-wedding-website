import './Invitation.css';
import { useContent } from '../../hooks/useContent';
import { Jaali } from '../Ornament/Jaali';

/**
 * The formal invitation itself -- the part a paper card would carry above
 * everything else, and the thing this site was missing: an Indian invitation
 * names the two families, not just the couple.
 *
 * Order follows the convention: invocation, the hosting family, the request
 * line, the couple, then the other family. Which family hosts is data
 * (`families.hosts`), because it is not always the bride's side, and the whole
 * block reorders around it rather than being written twice.
 *
 * The couple line is the page's <h1>. The hero used to carry the names and
 * did that job, but the names are said here, once, in their proper setting.
 *
 * Every string is from wedding.json. Nothing here hardcodes a name, an
 * honorific or a connective phrase -- including "and", which is not "and" in
 * every family's wording.
 */
function Parents({ family }) {
  const { honorific, father, mother } = family;
  if (!father && !mother) return null;
  return (
    <p className="invitation__parents">
      {honorific && <span className="invitation__honorific">{honorific} </span>}
      {[father, mother].filter(Boolean).join(' & ')}
    </p>
  );
}

export function Invitation() {
  const families = useContent('families');
  const { brideName, groomName } = useContent('couple');
  const { invocation, invocationRoman, hosts, requestLine, withLine, closingLine } = families;

  const hostSide = hosts === 'groom' ? families.groom : families.bride;
  const otherSide = hosts === 'groom' ? families.bride : families.groom;
  const hostChild = hosts === 'groom' ? groomName : brideName;
  const otherChild = hosts === 'groom' ? brideName : groomName;

  return (
    <section className="invitation card" aria-label="Invitation">
      {invocation && (
        <p className="invitation__invocation" lang="sa">
          {invocation}
          {invocationRoman && (
            <span className="invitation__invocation-roman">{invocationRoman}</span>
          )}
        </p>
      )}

      <Parents family={hostSide} />
      {requestLine && (
        <p className="invitation__request">
          {requestLine} {hostSide.relation}
        </p>
      )}

      <h1 className="invitation__couple">
        <span className="invitation__name">{hostChild}</span>
        {withLine && <span className="invitation__with">{withLine}</span>}
        <span className="invitation__name">{otherChild}</span>
      </h1>

      {otherSide.relation && (
        <p className="invitation__request">
          {otherSide.relation} of
        </p>
      )}
      <Parents family={otherSide} />

      <Jaali />
      {closingLine && <p className="invitation__closing">{closingLine}</p>}
    </section>
  );
}
