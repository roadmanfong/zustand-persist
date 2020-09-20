import { getLoadManager } from './../src/LoadManager'

it('isLoaded should be false', () => {
  const loadManager = getLoadManager()
  loadManager.register('key1')
  loadManager.register('key2')

  expect(loadManager.isLoaded('key1')).toBe(false)
  expect(loadManager.isLoaded('key2')).toBe(false)
})

it('isLoaded should be false', () => {
  const loadManager = getLoadManager()
  loadManager.register('key1')
  loadManager.register('key2')

  loadManager.setLoaded('key1')
  loadManager.setLoaded('key2')
  expect(loadManager.isLoaded('key1')).toBe(true)
  expect(loadManager.isLoaded('key2')).toBe(true)
})

it('isLoaded trigger all onAllLoaded', () => {
  const loadManager = getLoadManager()
  const callback = jest.fn()

  loadManager.onAllLoaded(callback)

  loadManager.register('key1')
  loadManager.register('key2')

  loadManager.setLoaded('key1')
  loadManager.setLoaded('key2')
  expect(callback).toHaveBeenCalled()
})

it('isLoaded trigger all onAllLoaded second times', () => {
  const loadManager = getLoadManager()
  const callback = jest.fn()

  loadManager.onAllLoaded(callback)

  loadManager.register('key1')
  loadManager.register('key2')

  loadManager.setLoaded('key1')
  loadManager.setLoaded('key2')
  expect(callback).toHaveBeenCalled()
})
