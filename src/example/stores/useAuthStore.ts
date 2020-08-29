import createStore from 'zustand'
import delay from '../utils/delay'

const useAuthStore = createStore<{
  isAuthenticated: boolean
  isAuthenticating: boolean
  errorMessage: string
  user?: {
    name: string
    email: string
  }
  login: () => void
  logout: () => void
}>((set) => ({
  isAuthenticated: false,
  isAuthenticating: false,
  errorMessage: '',
  user: undefined,
  login: async () => {
    set((state) => ({ isAuthenticating: true }))
    await delay()
    set((state) => ({
      isAuthenticated: true,
      isAuthenticating: false,
      user: {
        name: 'Steven',
        email: 'example@gmail.com',
      },
    }))
  },
  logout: async () => {
    await delay()
    set((state) => ({ isAuthenticated: false }))
  },
}))

export default useAuthStore
