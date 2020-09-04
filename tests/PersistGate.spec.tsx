import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { configurePersist } from '../src/configurePersist'
import { PersistGate, PersistGateProps } from '../src/PersistGate'
import { createMemoryStorage } from 'storage-memory'
import createStore from 'zustand'

let persist
let purge
let useExampleStore
let Example

interface ExampleStore {
  data?: string
  setData: (value: string) => void
}
const memoryStorage = createMemoryStorage()

beforeEach(() => {
  const instance = configurePersist({
    storage: memoryStorage,
  })
  persist = instance.persist
  purge = instance.purge

  useExampleStore = createStore<ExampleStore>(
    persist(
      {
        key: 'exampleKey',
      },
      (set) => ({
        data: undefined,
        setData: (value: string) => {
          set((state) => ({ data: value }))
        },
      })
    )
  )

  Example = () => {
    const { data, setData } = useExampleStore()
    return (
      <div>
        <title>Example Title</title>
        <article>{data}</article>
        <button onClick={() => setData('setDataByButton')}>Set Button</button>
        <button onClick={() => purge()}>Clear Button</button>
      </div>
    )
  }
})

const Root = (props: PersistGateProps) => (
  <div data-testid="rootDiv">
    <PersistGate {...props}>
      <Example />
    </PersistGate>
  </div>
)

it('should not show anything before gate lift', async () => {
  render(<Root />)
  expect(screen.queryByText('Example Title')).toBeNull()
  await waitFor(() => screen.getByTestId('rootDiv'))
})

it('should show loading', async () => {
  render(<Root loading={<div>loading</div>} />)
  expect(screen.getByText('loading')).toBeVisible()
  await waitFor(() => screen.getByTestId('rootDiv'))
})

it('should called onBeforeLift ', async () => {
  const callback = jest.fn()
  render(<Root onBeforeLift={callback} />)
  await waitFor(() => screen.getByTestId('rootDiv'))
  expect(callback).toHaveBeenCalled()
})

it('should show example after rehydration', async () => {
  render(<Root />)
  await waitFor(() => screen.getByTestId('rootDiv'))
  expect(screen.queryByText('Example Title')).not.toBeNull()
})

it('should set data correctly', async () => {
  render(<Root />)
  await waitFor(() => screen.getByTestId('rootDiv'))

  fireEvent.click(screen.getByText('Set Button'))
  expect(screen.getByRole('article')).toHaveTextContent('setDataByButton')
})

it('prepare for next text', async () => {
  render(<Root />)
  await waitFor(() => screen.getByTestId('rootDiv'))

  fireEvent.click(screen.getByText('Set Button'))
  expect(screen.getByRole('article')).toHaveTextContent('setDataByButton')
})

it('should persist previous data', async () => {
  render(<Root />)

  await waitFor(() => screen.getByTestId('rootDiv'))
  expect(screen.getByRole('article')).toHaveTextContent('setDataByButton')
})

it('should purge but keep current state', async () => {
  render(<Root />)

  await waitFor(() => screen.getByTestId('rootDiv'))
  fireEvent.click(screen.getByText('Clear Button'))
  await waitFor(() => screen.getByTestId('rootDiv'))
  expect(screen.getByRole('article')).toHaveTextContent('setDataByButton')
})

it('should have no data if purge before', async () => {
  render(<Root />)

  await waitFor(() => screen.getByTestId('rootDiv'))
  expect(screen.getByRole('article')).toBeEmptyDOMElement()
})
