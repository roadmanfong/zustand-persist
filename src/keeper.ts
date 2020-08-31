import { parseJson } from './parseJson'

interface AnyStorage {
  setItem: (key: string, value: string) => Promise<void> | void
  getItem: (key: string) => Promise<string | null> | string | null
  removeItem: (key: string) => Promise<void> | void
}

let _rootKey = 'root'
let _storage: AnyStorage
let _cached: any

export interface KeeperOption {
  storage: AnyStorage
  rootKey?: string
}

export function configureKeeper(option: KeeperOption) {
  _storage = option.storage
  _rootKey = option?.rootKey || _rootKey
}

export async function getItem(key: string) {
  const draft = await getRoot()
  return draft[key]
}

export async function setItem(key: string, value: string) {
  const draft = await getRoot()
  draft[key] = value
  _storage.setItem(_rootKey, JSON.stringify(draft))
}

export async function removeItem(key: string) {
  const draft = await getRoot()
  delete draft[key]
}

async function getRoot() {
  if (_cached) {
    return { ..._cached }
  }
  _cached = parseJson(await _storage.getItem(_rootKey))
  return { ..._cached }
}

export async function removeRoot() {
  await _storage.removeItem(_rootKey)
}
