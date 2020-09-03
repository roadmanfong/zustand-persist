import { register, isLoaded, onAllLoaded, setLoaded } from '../src/loadRecord'

it('isLoaded should be false', () => {
  register('key1')
  register('key2')

  expect(isLoaded('key1')).toBe(false)
  expect(isLoaded('key2')).toBe(false)
})

it('isLoaded should be false', () => {
  register('key1')
  register('key2')

  setLoaded('key1')
  setLoaded('key2')
  expect(isLoaded('key1')).toBe(true)
  expect(isLoaded('key2')).toBe(true)
})

it('isLoaded trigger all onAllLoaded', () => {
  const callback = jest.fn()

  onAllLoaded(callback)

  register('key1')
  register('key2')

  setLoaded('key1')
  setLoaded('key2')
  expect(callback).toHaveBeenCalled()
})
