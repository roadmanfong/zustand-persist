# zustand-persist

## Middleware

```ts
const { persist, purge } = configurePersist({
  storage: localStorage,
})

const useStore = createStore(
  persist({ key: 'base', denylist: ['isLoading'] }, (set) => ({
    isLoading: false,
    bees: false,
    setBees: (input) =>
      set((state) => {
        state.bees = input
      }),
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
