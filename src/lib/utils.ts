export function parseJson(text: string | null) {
  try {
    return JSON.parse(text || '{}')
  } catch (error) {
    return undefined
  }
}

export interface Fn {
  (): void
}

const _listeners: Fn[] = []
export function listen(fn: Fn) {
  _listeners.push(fn)
}
export function trigger() {
  _listeners.forEach((fn) => fn())
}
