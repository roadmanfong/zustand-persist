import { parseJson } from './parseJson'

interface AnyStorage {
  setItem: (key: string, value: string) => Promise<void> | void
  getItem: (key: string) => Promise<string | null> | string | null
  removeItem: (key: string) => Promise<void> | void
}

let _rootKey = 'root'
let _storage: AnyStorage

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

let isRemovingRoot = false

export async function setItem(key: string, value: string) {
  const draft = await getRoot()
  draft[key] = value

  if (isRemovingRoot) {
    return
  }
  _cachedRoot = draft
  await _storage.setItem(_rootKey, JSON.stringify(draft))
}

export async function removeItem(key: string) {
  const draft = await getRoot()
  delete draft[key]
  await _storage.setItem(_rootKey, JSON.stringify(draft))
}

let _cachedRoot: any = null
async function getRoot() {
  if (_cachedRoot) {
    return _cachedRoot
  }
  _cachedRoot = parseJson(await _storage.getItem(_rootKey))
  return _cachedRoot
}

export async function removeRoot() {
  isRemovingRoot = true
  await _storage.removeItem(_rootKey)
  _cachedRoot = undefined
  isRemovingRoot = false
}
