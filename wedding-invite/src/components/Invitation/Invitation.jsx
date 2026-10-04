import './Invitation.css';
import { useContent } from '../../hooks/useContent';
import { Jaali } from '../Ornament/Jaali';
import { titleSize } from '../../lib/titleSize';

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
function Parents({ family, fatherHonorific, motherHonorific }) {
  const { father, mother } = family;
  if (!father && !mother) return null;
  /* "Mr Sumit Talwar & Mrs Aneeta Talwar", not "Mr & Mrs Sumit Talwar & Aneeta
     Talwar". With two different first names the honorific has to sit on each
     person -- "Mr and Mrs Sumit Talwar" would name the husband and leave the wife
     out. The honorifics are content, not code: some families use Shri and Smt. */
  /* `tail` is the ampersand, kept INSIDE the first person's unit so it travels
     with them: "Mr Sumit Talwar &" then "Mrs Aneeta Talwar", never a line that
     begins with a dangling "&". */
  const person = (honorific, name, tail = '') => (name ? (
    <span className="invitation__person">
      {honorific && <span className="invitation__honorific">{honorific} </span>}
      {name}{tail}
    </span>
  ) : null);
  return (
    <p className="invitation__parents">
      {person(fatherHonorific, father, father && mother ? ' &' : '')}{' '}
      {person(motherHonorific, mother)}
    </p>
  );
}

export function Invitation() {
  const families = useContent('families');
  const { brideName, groomName } = useContent('couple');
  const { invocation, invocationRoman, hosts, requestLine, withLine, closingLine,
    fatherHonorific, motherHonorific } = families;

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

      <Parents family={hostSide} fatherHonorific={fatherHonorific} motherHonorific={motherHonorific} />
      {requestLine && (
        <p className="invitation__request">
          {requestLine} {hostSide.relation}
        </p>
      )}

      <h1 className="invitation__couple">
        <span className="invitation__name" data-size={titleSize(hostChild)}>{hostChild}</span>
        {withLine && <span className="invitation__with">{withLine}</span>}
        <span className="invitation__name" data-size={titleSize(otherChild)}>{otherChild}</span>
      </h1>

      {otherSide.relation && (
        <p className="invitation__request">
          {otherSide.relation} of
        </p>
      )}
      <Parents family={otherSide} fatherHonorific={fatherHonorific} motherHonorific={motherHonorific} />

      <Jaali />
      {closingLine && <p className="invitation__closing">{closingLine}</p>}
    </section>
  );
}
