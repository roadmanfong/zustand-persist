import { configurePersist } from '../../../build'

const { persist, purge } = configurePersist({
  storage: localStorage,
})
export default persist
export { purge }
