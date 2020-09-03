import reconcile from '../src/reconcile'

it('should return full data', () => {
  const result = reconcile({
    foo: 1,
    bar: 2,
    baz: 3,
  })
  expect(result).toMatchObject({ foo: 1, bar: 2 })
})

it('should handle allowlist', () => {
  const result = reconcile(
    {
      foo: 1,
      bar: 2,
      baz: 3,
    },
    {
      allowlist: ['foo', 'bar'],
    }
  )
  expect(result).toMatchObject({ foo: 1, bar: 2 })
})

it('should handle denylist', () => {
  const result = reconcile(
    {
      foo: 1,
      bar: 2,
      baz: 3,
    },
    {
      denylist: ['foo', 'bar'],
    }
  )
  expect(result).toMatchObject({ baz: 3 })
})
