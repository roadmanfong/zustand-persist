import React, { useState } from 'react'
import { onLoaded } from './loadingManager'

interface Props {
  children?: React.ReactNode
}

export function PersistGate(props: Props) {
  const [isReady, setIsReady] = useState(false)
  onLoaded(() => setIsReady(true))

  return <React.Fragment>{isReady && props.children}</React.Fragment>
}
