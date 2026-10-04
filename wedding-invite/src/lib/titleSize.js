/**
 * How big a name or title can be set, by how much text there is.
 *
 * CSS cannot read how long a string is, so the component says. At a single size
 * either the long ones wrap onto four lines of display type and push a screen off
 * the page, or the short ones are made timid for the sake of the long ones.
 * Used for function titles ("Pheras" ... "Chand, Sitare aur Sangeet") and for the
 * couple's full names on the invitation ("Paduri Krishna Sai Reddy").
 */
export const titleSize = (text = '') => (text.length <= 10 ? 'short' : text.length <= 18 ? 'medium' : 'long');
