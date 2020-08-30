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
import reconcile, { KeyList } from './reconcile'

interface PersistOption<TState extends State> {
  key: string
  denylist?: KeyList<TState>
  allowlist?: KeyList<TState>
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

  const persist = <TState extends State>(
    option: PersistOption<TState>,
    config: StateCreator<TState>
  ) => (
    set: SetState<TState>,
    get: GetState<TState>,
    api: StoreApi<TState>
  ): TState => {
    const { key, allowlist, denylist } = option
    register(key)
    hydrate(key, set, get)

    return config(
      async (payload) => {
        set(payload)
        const state = reconcile(get(), allowlist, denylist)
        setItem(key, JSON.stringify(state))
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
