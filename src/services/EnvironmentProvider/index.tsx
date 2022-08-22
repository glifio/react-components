import { CoinType } from '@glif/filecoin-address'
import { Logger, LogLevel } from '@glif/logger'
import { createContext, useContext, ReactNode, useState, useMemo } from 'react'

export enum Network {
  MAINNET = 'MAINNET',
  CALIBRATION = 'CALIBRATION',
  WALLABY = 'WALLABY'
}

export type NetworkInfo = {
  nodeStatusApiKey: string
  graphUrl: string
  lotusApiUrl: string
  networkName: Network
}

export interface Environment {
  homeUrl: string
  blogUrl: string
  walletUrl: string
  safeUrl: string
  explorerUrl: string
  verifierUrl: string
  nodeStatusApiUrl: string
  nodeStatusApiKey: string
  graphUrl: string
  lotusApiUrl: string
  coinType: CoinType
  isProd: boolean
  networkName: Network
  setNetwork: (network: NetworkInfo) => void
  logger: Logger
  sentryDsn?: string
  sentryEnv?: string
}

export const initialEnvironmentContext = {
  homeUrl: 'https://apps.glif.io',
  blogUrl: 'https://blog.glif.io',
  walletUrl: 'https://wallet.glif.io',
  safeUrl: 'https://safe.glif.io',
  explorerUrl: 'https://explorer.glif.io',
  verifierUrl: 'https://verify.glif.io',
  nodeStatusApiUrl: 'https://api.uptimerobot.com/v2/getMonitors',
  nodeStatusApiKey: 'm786191525-b3192b91db66217a44f7d4be',
  graphUrl: 'graph.glif.link/query',
  lotusApiUrl: 'https://mainnet.glif.host',
  networkName: Network.MAINNET,
  setNetwork: () => {},
  coinType: CoinType.MAIN,
  isProd: false,
  sentryDsn: '',
  sentryEnv: '',
  logger: null
}

export const EnvironmentContext = createContext<Environment>(
  initialEnvironmentContext
)

export const networks: Record<Network, NetworkInfo> = {
  [Network.MAINNET]: {
    nodeStatusApiKey: 'm786191525-b3192b91db66217a44f7d4be',
    graphUrl: 'graph.glif.link/query',
    lotusApiUrl: 'https://mainnet.glif.host',
    networkName: Network.MAINNET
  },
  [Network.CALIBRATION]: {
    nodeStatusApiKey: 'm787669344-2a9b90eb03dbff3e503c93c7',
    graphUrl: 'graph-calibration.glif.link/query',
    lotusApiUrl: 'https://api.calibration.node.glif.io/',
    networkName: Network.CALIBRATION
  },
  [Network.WALLABY]: {
    nodeStatusApiKey: '',
    graphUrl: '',
    lotusApiUrl: '',
    networkName: Network.WALLABY
  }
}

export const Environment = ({
  children,
  ...initialEnvironment
}: EnvironmentPropTypes) => {
  const [environment, setEnvironment] = useState(initialEnvironment)
  const setNetwork = (network: NetworkInfo) => {
    setEnvironment({ ...environment, ...network })
  }

  const logger = useMemo(
    () =>
      new Logger({
        consoleEnabled: true,
        consoleLevel: LogLevel.DEBUG,
        sentryEnabled: environment.isProd,
        sentryLevel: LogLevel.WARN,
        sentryDsn: environment.sentryDsn || '',
        sentryEnv: environment.sentryEnv || '',
        sentryTraces: 0,
        packageName: 'react-components',
        packageVersion: '?.?.?'
      }),
    [environment.isProd, environment.sentryDsn, environment.sentryEnv]
  )

  return (
    <EnvironmentContext.Provider
      value={{
        ...initialEnvironmentContext,
        ...environment,
        setNetwork,
        logger
      }}
    >
      {children}
    </EnvironmentContext.Provider>
  )
}

export const useEnvironment = (): Environment => {
  return useContext(EnvironmentContext)
}

export const useLogger = (): Logger => {
  return useContext(EnvironmentContext).logger
}

export type EnvironmentPropTypes = {
  children: ReactNode
} & Partial<Environment>
