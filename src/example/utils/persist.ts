import { configurePersist } from '../../lib'

const { persist, purge } = configurePersist({
  storage: localStorage,
})
export default persist
export { purge }
