/** Storage is unavailable in some in-app browsers. Never let it throw. */
export function safeGet(key) {
  try { return window.sessionStorage.getItem(key); } catch { return null; }
}

export function safeSet(key, value) {
  try { window.sessionStorage.setItem(key, value); } catch { /* ignore */ }
}
