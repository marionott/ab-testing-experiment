import { createContext, useContext } from 'react'

const GoogleAnalyticsContext = createContext<any>(null)

export const GoogleAnalyticsProvider = GoogleAnalyticsContext.Provider

export const useGA = () => useContext(GoogleAnalyticsContext)
