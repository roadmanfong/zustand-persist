import React, { useState } from 'react'
import { getLoadManager } from './LoadManager'

export interface PersistGateProps {
  children?: React.ReactNode
  loading?: React.ReactNode
  onBeforeLift?: () => void
}

export function PersistGate(props: PersistGateProps) {
  const { children, loading = false, onBeforeLift } = props
  const [isReady, setIsReady] = useState(false)

  getLoadManager().onAllLoaded(async () => {
    onBeforeLift && (await onBeforeLift())
    setIsReady(true)
  })

  return <React.Fragment>{isReady ? children : loading}</React.Fragment>
}
