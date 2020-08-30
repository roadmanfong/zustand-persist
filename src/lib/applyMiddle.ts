import { State, StateCreator } from 'zustand'

interface Middleware<TState extends State> {
  (args: StateCreator<TState>): any
}

export function applyMiddle<TState extends State>(
  ...middleware: Middleware<TState>[]
) {
  return function (stateCreator: StateCreator<TState>) {
    return middleware.reduce((prev, current) => {
      return current(prev)
    }, stateCreator)
  }
}
