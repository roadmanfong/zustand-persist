import { configurePersist } from '../../../src'
const { persist, purge } = configurePersist({
  storage: localStorage,
})
export default persist
export { purge }
