const _loadedMap: {
  [key: string]: boolean
} = {}

let _callback = () => {}

export function onLoaded(fn: () => void) {
  _callback = fn
}

export function register(key: string) {
  _loadedMap[key] = false
}

export function isLoaded(key: string) {
  return _loadedMap[key]
}

export function setLoaded(key: string) {
  _loadedMap[key] = true
  if (Object.values(_loadedMap).every(Boolean)) {
    _callback()
  }
}
