import { SetState, GetState, StoreApi, StateCreator, State } from 'zustand'
import { parseJson } from './parseJson'
import { isLoaded, register, setLoaded } from './loadRecord'
import {
  configureKeeper,
  getItem,
  setItem,
  removeRoot,
  KeeperOption,
} from './keeper'
import reconcile, { NonFunctionPropertyNames } from './reconcile'

interface PersistOption<S extends State> {
  key: string
  denylist?: NonFunctionPropertyNames<S>[]
  allowlist?: NonFunctionPropertyNames<S>[]
}

type ConfigurePersistOption = KeeperOption

export function configurePersist(option: ConfigurePersistOption) {
  configureKeeper(option)

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

  const persist = <S extends State>(
    option: PersistOption<S>,
    fn: StateCreator<S>
  ) => (set: SetState<S>, get: GetState<S>, api: StoreApi<S>): S => {
    const { key, allowlist, denylist } = option
    register(key)
    hydrate(key, set, get)

    return fn(
      async (payload) => {
        set(payload)
        const state = reconcile(get(), { allowlist, denylist })
        await setItem(key, JSON.stringify(state))
      },
      get,
      api
    )
  }

  async function purge() {
    return removeRoot()
  }

  return {
    persist,
    purge,
  }
}
