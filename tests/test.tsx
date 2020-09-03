// import createStore from 'zustand'
// import { configurePersist } from '../src/index'

test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3)
})

// test('should return init data', () => {
//   const { persist, purge } = configurePersist({
//     storage: localStorage,
//   })

//   const useDataStore = createStore(
//     persist(
//       {
//         key: 'key',
//       },
//       (set) => ({
//         data: 'data',
//       })
//     )
//   )

//   const { data } = useDataStore()
//   expect(data).toBe('data')
// })
