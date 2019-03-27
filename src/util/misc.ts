/** Removes undefined from type */
export type NotUndefined<T> = Exclude<T, undefined>

/** Useful for filtering out undefined values without casting. */
export function notUndefined<T>(n: T): n is NotUndefined<T> {
  return n !== undefined
}
