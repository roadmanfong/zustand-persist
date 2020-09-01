# Zustand persist

inspiring by [https://github.com/rt2zz/redux-persist](redux-persit)

Persist and rehydrate state works on react and react native

Contributions are Welcome

[![npm version](https://img.shields.io/npm/v/zustand-persist.svg?style=flat-square)](https://www.npmjs.com/package/zustand-persist) [![npm downloads](https://img.shields.io/npm/dm/zustand-persist.svg?style=flat-square)](https://www.npmjs.com/package/zustand-persist)

```cli
$ npm install zustand-persist
$ yarn add zustand-persist
```

## Middleware

```ts
// if in react native
// import AsyncStorage from '@react-native-community/async-storage'

const { persist, purge } = configurePersist({
  storage: localStorage, // use `AsyncStorage` in react native
  rootKey: 'root', // optional, default value is `root`
})

const useStore = createStore(
  persist({
    key: 'auth', // required, child key of storage
    allowlist: ['isAuthenticated', 'username'], // optional, will save everything if allowlist is undefined
    denylist: [], // optional, if allowlist set, denylist will be ignored
  }, (set) => ({
    isAuthenticating: false,
    isAuthenticated: false,
    username: undefined,
    setUserName: async (input) =>{
      set((state) => ({ isAuthenticating: true }))
      const { username } = await fetchUser()
      set((state) => ({
        isAuthenticated: true,
        isAuthenticating: false,
        username,
      })),
    }
  }))
)
```

## PersistGate

```tsx
function App() {
  function onBeforeList() {
    console.log('onBeforeList)
  }

  return (
    <PersistGate
      onBeforeList={onBeforeList}
      loading={(<Loading />)}
    >
      <AppContent />
    </PersistGate>
  )
}
```
