import { SetState, GetState, StoreApi, StateCreator } from 'zustand'
import { parseJson, listen, trigger, Fn } from './utils'

let _storage: Storage
const _hydratedMap: {
  [key: string]: boolean
} = {}

export function usePersistReady(callback: Fn) {
  listen(callback)
}

async function hydrate<T>(key: string, set: SetState<T>) {
  if (_hydratedMap[key] === false) {
    const saveState = parseJson(await _storage.getItem(key))
    if (saveState) {
      set(saveState)
    }
    _hydratedMap[key] = true
    if (Object.values(_hydratedMap).every(Boolean)) {
      trigger()
    }
  }
}

export function purge() {
  Object.keys(_hydratedMap).forEach((key) => {
    _storage.removeItem(key)
  })
}

function makePersist(storage: Storage) {
  _storage = storage
  const persist = <T>(key: string, config: StateCreator<T>) => (
    set: SetState<T>,
    get: GetState<T>,
    api: StoreApi<T>
  ): T => {
    _hydratedMap[key] = false
    hydrate(key, set)

    const state = config(
      async (payload) => {
        set(payload)
        _storage.setItem(key, JSON.stringify(get()))
      },
      get,
      api
    )

    return state
  }
  return persist
}

export default makePersist
