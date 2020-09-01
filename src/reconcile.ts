export type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K
}[keyof T]

interface ReconcileOption<T> {
  allowlist?: NonFunctionPropertyNames<T>[]
  denylist?: NonFunctionPropertyNames<T>[]
}

export default function reconcile<T>(
  state: T,
  option?: ReconcileOption<T>
): Partial<T> {
  const { allowlist, denylist } = option || {}
  if (allowlist) {
    return Object.entries(state).reduce(
      (prev, [eachKey, value]) =>
        allowlist.includes(eachKey as NonFunctionPropertyNames<T>)
          ? { ...prev, [eachKey]: value }
          : prev,
      {}
    )
  } else if (denylist) {
    return Object.entries(state).reduce(
      (prev, [eachKey, value]) =>
        !denylist.includes(eachKey as NonFunctionPropertyNames<T>)
          ? { ...prev, [eachKey]: value }
          : prev,
      {}
    )
  }
  return state
}
