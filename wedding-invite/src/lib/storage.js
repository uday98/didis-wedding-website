/** Storage is unavailable in some in-app browsers. Never let it throw. */
export function safeGet(key) {
  try { return window.sessionStorage.getItem(key); } catch { return null; }
}

export function safeSet(key, value) {
  try { window.sessionStorage.setItem(key, value); } catch { /* ignore */ }
}

export function safeRemove(key) {
  try { window.sessionStorage.removeItem(key); } catch { /* ignore */ }
}

/** The look survives a reload; the envelope's "already opened" does not.
 *  Different lifetimes, so different stores -- hence a second pair here
 *  rather than a `which store?` argument on the first. */
export function safeLocalGet(key) {
  try { return window.localStorage.getItem(key); } catch { return null; }
}

export function safeLocalSet(key, value) {
  try { window.localStorage.setItem(key, value); } catch { /* ignore */ }
}
