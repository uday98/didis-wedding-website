import { createContext, useContext } from 'react';

/**
 * One question: may the page start revealing itself yet?
 *
 * The envelope is position: fixed over a page that is already fully laid out,
 * and nothing locks body scroll, so every section behind it is intersecting the
 * viewport the whole time the envelope is sealed. Without this gate the reveals
 * all fire unseen and the envelope hands off to a page that has already played
 * its entrance.
 *
 * Fed from useEnvelope's existing isOpen in App, so there is still exactly one
 * source of truth for whether the invitation has been opened.
 */
const StageContext = createContext(false);

export function StageProvider({ live, children }) {
  return <StageContext.Provider value={live}>{children}</StageContext.Provider>;
}

export const useStageLive = () => useContext(StageContext);
