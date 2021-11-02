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

  // Workaround for getting stuck on Loading component, as described at
  // https://github.com/roadmanfong/zustand-persist/issues/4
  useEffect(() => {
    getLoadManager().setLoaded('')
  }, [])

  getLoadManager().onAllLoaded(async () => {
    onBeforeLift && (await onBeforeLift())
    setIsReady(true)
  })

  return <React.Fragment>{isReady ? children : loading}</React.Fragment>
}
