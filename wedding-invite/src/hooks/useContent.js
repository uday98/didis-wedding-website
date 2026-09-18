import data from '../content/wedding.json';

/**
 * Single read point for content. Components ask for the slice they need
 * and never import the JSON directly, so the source can move to a CMS
 * or a fetch later without touching a component.
 */
export const useContent = (slice) => (slice ? data[slice] : data);
