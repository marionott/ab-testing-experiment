import TrackerProvider from '~/providers/TrackerProvider'

export interface AppProviderProps {
  children: JSX.Element | JSX.Element[]
}

function AppProvider({ children }: AppProviderProps) {
  return <TrackerProvider>{children}</TrackerProvider>
}

AppProvider.defaultProps = {}

export default AppProvider
