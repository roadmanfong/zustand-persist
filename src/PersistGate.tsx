import React, { useEffect, useState } from 'react'
import { getLoadManager } from './LoadManager'

export interface PersistGateProps {
  children?: React.ReactNode
  loading?: React.ReactNode
  onBeforeLift?: () => void
}

export function PersistGate(props: PersistGateProps) {
  const { children, loading = false, onBeforeLift } = props
  const [isReady, setIsReady] = useState(false)

  // Only need to call this once on initial render.
  // https://github.com/roadmanfong/zustand-persist/issues/4
  // https://github.com/roadmanfong/zustand-persist/issues/9
  useEffect(() => {
    getLoadManager().onAllLoaded(async () => {
      onBeforeLift && (await onBeforeLift())
      setIsReady(true)
    })
  }, [])

  return <React.Fragment>{isReady ? children : loading}</React.Fragment>
}
