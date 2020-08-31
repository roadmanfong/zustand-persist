const _loadRecord: Record<string, boolean> = {}
let _callback = () => {}

export function register(key: string) {
  _loadRecord[key] = false
}

export function isLoaded(key: string) {
  return _loadRecord[key]
}

export function onAllLoaded(fn: () => void) {
  _callback = fn
}

export function setLoaded(key: string) {
  _loadRecord[key] = true
  if (Object.values(_loadRecord).every(Boolean)) {
    _callback()
  }
}
