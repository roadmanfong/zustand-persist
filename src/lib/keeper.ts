import { parseJson } from './parseJson'

let _rootKey = 'root'
let _storage: Storage
let _cached: any

export function setKeeper(storage: Storage, rootKey?: string) {
  _storage = storage
  _rootKey = rootKey || _rootKey
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
