# Zustand persist

Persist and rehydrate state works on react and react native

[Zustand](https://github.com/react-spring/zustand) is a small, fast and scaleable bearbones state-management solution.

This library is inspiring by [https://github.com/rt2zz/redux-persist](https://github.com/rt2zz/redux-persist)

Contributions are Welcome

[![Build Status](https://travis-ci.org/roadmanfong/zustand-persist.svg?branch=master)](https://travis-ci.org/roadmanfong/zustand-persist) [![npm version](https://img.shields.io/npm/v/zustand-persist.svg?style=flat-square)](https://www.npmjs.com/package/zustand-persist) [![npm downloads](https://img.shields.io/npm/dm/zustand-persist.svg?style=flat-square)](https://www.npmjs.com/package/zustand-persist)

```cli
$ npm install zustand-persist
$ yarn add zustand-persist
```

Try [Demo](https://codesandbox.io/s/zustand-persist-example-5u3ry?file=/src/App.js) Here

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
    allowlist: ['isAuthenticated', 'user'], // optional, will save everything if allowlist is undefined
    denylist: [], // optional, if allowlist set, denylist will be ignored
  }, (set) => ({
    isAuthenticating: false,
    isAuthenticated: false,
    user: undefined,
    login: async (username, password) =>{
      set((state) => ({ isAuthenticating: true }))
      const { user } = await webLogin(username, password)
      set((state) => ({
        isAuthenticated: true,
        isAuthenticating: false,
        user,
      })),
    }
  }))
)
```

## PersistGate

```tsx
function App() {
  return (
    <PersistGate
      onBeforeLift={() => {
        console.log('onBeforeLift')
      }}
      loading={<Loading />}>
      <AppContent />
    </PersistGate>
  )
}
```

## Todo

- enhanced removing root logic
