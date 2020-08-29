import React, { useState } from 'react'
import { usePersistReady } from './configurePersist'

interface Props {
  children?: React.ReactNode
}

export function PersistGate(props: Props) {
  const [isReady, setIsReady] = useState(false)
  usePersistReady(() => setIsReady(true))

  return <React.Fragment>{isReady && props.children}</React.Fragment>
}
