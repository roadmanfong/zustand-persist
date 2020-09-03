import { parseJson } from '../src/parseJson'

it('should parse stringified data', () => {
  const result = parseJson(JSON.stringify({ foo: 'bar' }))
  expect(result).toMatchObject({ foo: 'bar' })
})

it('should should return undefined when can not be parse', () => {
  const result = parseJson('whatever')
  expect(result).toBeUndefined()
})
