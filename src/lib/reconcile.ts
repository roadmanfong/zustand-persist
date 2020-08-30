export type KeyList<T> = Array<keyof T>

export default function reconcile<T>(
  state: T,
  allowlist?: KeyList<T>,
  denylist?: KeyList<T>
): T {
  if (allowlist) {
    return Object.entries(state).reduce((prev, [eachKey, value]) => {
      if (allowlist.includes(eachKey as keyof T)) {
        prev[eachKey] = value
      }
      return prev
    }, {} as any)
  } else if (denylist) {
    return Object.entries(state).reduce((prev, [eachKey, value]) => {
      if (!denylist.includes(eachKey as keyof T)) {
        prev[eachKey] = value
      }
      return prev
    }, {} as any)
  }
  return state
}
