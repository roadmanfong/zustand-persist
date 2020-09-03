import {
  configureKeeper,
  getItem,
  setItem,
  removeItem,
  removeRoot,
} from '../src/keeper'
import { createMemoryStorage } from 'storage-memory'

describe('customRootKey', () => {
  beforeAll(() => {
    configureKeeper({
      rootKey: 'customRootKey',
      storage: createMemoryStorage(),
    })
  })

  it('should setItem getItem correctly', async () => {
    await setItem('subKey', 'subKeyData')
    const result = await getItem('subKey')
    expect(result).toBe('subKeyData')
  })

  it('should setItem removeItem correctly', async () => {
    await setItem('subKey', 'subKeyData')
    await removeItem('subKey')
    const result = await getItem('subKey')
    expect(result).toBeUndefined()
  })

  it('should setItem removeRoot correctly', async () => {
    await setItem('subKey', 'subKeyData')
    await removeRoot()
    const result = await getItem('subKey')
    expect(result).toBeUndefined()
  })
})

describe('default rootKey', () => {
  beforeAll(() => {
    configureKeeper({
      storage: createMemoryStorage(),
    })
  })

  it('should setItem getItem correctly', async () => {
    await setItem('subKey', 'subKeyData')
    const result = await getItem('subKey')
    expect(result).toBe('subKeyData')
  })

  it('should setItem removeItem correctly', async () => {
    await setItem('subKey', 'subKeyData')
    await removeItem('subKey')
    const result = await getItem('subKey')
    expect(result).toBeUndefined()
  })

  it('should setItem removeRoot correctly', async () => {
    await setItem('subKey', 'subKeyData')
    await removeRoot()
    const result = await getItem('subKey')
    expect(result).toBeUndefined()
  })
})
