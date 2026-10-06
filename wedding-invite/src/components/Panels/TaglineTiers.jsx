/**
 * "The wedding we have all been waiting for" set in three tiers, as on the
 * stationery: THE (small) WEDDING (large) / WE HAVE ALL BEEN WAITING FOR (small).
 * Derived from the words, not hard-coded, so the line stays in wedding.json. A line
 * that does not split into at least three words is shown plainly.
 */
export function TaglineTiers({ text = '' }) {
  const m = text.trim().match(/^(\S+)\s+(\S+)\s+(.+)$/);
  if (!m) return <span className="tt__c">{text}</span>;
  return (
    <>
      <span className="tt__a">{m[1]}</span>{' '}
      <span className="tt__b">{m[2]}</span>
      <span className="tt__c">{m[3]}</span>
    </>
  );
}
