/** Normalizes a pathname so "/about/" and "/about" compare equal. */
export const normalizePath = (path = '/') =>
  path.length > 1 ? path.replace(/\/+$/, '') : path
