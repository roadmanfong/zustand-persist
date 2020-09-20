import { getLoadManager } from './LoadManager'
import { SetState, GetState, StoreApi, StateCreator, State } from 'zustand'
import { parseJson } from './parseJson'
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
  const loadManager = getLoadManager()

  async function hydrate<T>(key: string, set: SetState<T>, get: GetState<T>) {
    if (!loadManager.isLoaded(key)) {
      const saveState = parseJson(await getItem(key))
      if (saveState) {
        set({
          ...get(),
          ...saveState,
        })
      }

      loadManager.setLoaded(key)
    }
  }

  const persist = <S extends State>(
    option: PersistOption<S>,
    fn: StateCreator<S>
  ) => (set: SetState<S>, get: GetState<S>, api: StoreApi<S>): S => {
    const { key, allowlist, denylist } = option
    loadManager.register(key)
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
