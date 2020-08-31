import React, { useState } from 'react'
import { onAllLoaded } from './loadRecord'

interface Props {
  children?: React.ReactNode
  loading?: React.ReactNode
  onBeforeLift?: () => void
}

export function PersistGate(props: Props) {
  const { children, loading = false, onBeforeLift } = props
  const [isReady, setIsReady] = useState(false)

  onAllLoaded(async () => {
    onBeforeLift && (await onBeforeLift())
    setIsReady(true)
  })

  return <React.Fragment>{isReady ? children : loading}</React.Fragment>
}
