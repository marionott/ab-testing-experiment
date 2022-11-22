import mitt from 'mitt'
import React, { createContext, useContext, useState } from 'react'

const emitter = mitt()
export const Context = createContext(emitter)

export function useTracker() {
  return useContext(Context)
}

export interface TrackerProviderProps {
  children?: JSX.Element | JSX.Element[]
}

function TrackerProvider({ children }: TrackerProviderProps) {
  const [tracker] = useState(emitter)
  return <Context.Provider value={tracker}>{children}</Context.Provider>
}

TrackerProvider.defaultProps = {}

export default TrackerProvider
