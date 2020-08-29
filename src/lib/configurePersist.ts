import { SetState, GetState, StoreApi, StateCreator } from 'zustand'
import { parseJson } from './parseJson'
import { isLoaded, register, setLoaded } from './loadingManager'
import { setKeeper, getItem, setItem, removeRoot } from './keeper'

interface PersistOption {
  key: string
  denylist?: string[]
  allowlist?: string[]
}

interface ConfigurePersistOption {
  storage: Storage
  rootKey?: string
}

export function configurePersist(option: ConfigurePersistOption) {
  setKeeper(option.storage, option.rootKey)

  async function hydrate<T>(key: string, set: SetState<T>, get: GetState<T>) {
    if (!isLoaded(key)) {
      const saveState = parseJson(await getItem(key))
      if (saveState) {
        set({
          ...get(),
          ...saveState,
        })
      }

      setLoaded(key)
    }
  }

  const persist = <T>(option: PersistOption, config: StateCreator<T>) => (
    set: SetState<T>,
    get: GetState<T>,
    api: StoreApi<T>
  ): T => {
    const { key, allowlist, denylist } = option
    register(key)
    hydrate(key, set, get)

    const state = config(
      async (payload) => {
        set(payload)
        let result = get()

        if (allowlist) {
          result = Object.entries(get()).reduce((prev, [eachKey, value]) => {
            if (allowlist.includes(eachKey)) {
              prev[eachKey] = value
            }
            return prev
          }, {} as any)
        } else if (denylist) {
          result = Object.entries(get()).reduce((prev, [eachKey, value]) => {
            if (!denylist.includes(eachKey)) {
              prev[eachKey] = value
            }
            return prev
          }, {} as any)
        }
        setItem(key, JSON.stringify(result))
      },
      get,
      api
    )

    return state
  }

  async function purge() {
    return removeRoot()
  }

  return {
    persist,
    purge,
  }
}
