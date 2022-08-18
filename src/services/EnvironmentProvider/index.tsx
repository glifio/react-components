import { CoinType } from '@glif/filecoin-address'
import { Logger, LogLevel } from '@glif/logger'
import { createContext, useContext, ReactNode, useState, useMemo } from 'react'

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
  setNetwork: (network: Network) => void
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
  nodeStatusApiKey: '',
  graphUrl: '',
  lotusApiUrl: '',
  setNetwork: () => {},
  coinType: CoinType.TEST,
  isProd: false,
  sentryDsn: '',
  sentryEnv: '',
  logger: null
}

export const EnvironmentContext = createContext<Environment>(
  initialEnvironmentContext
)

export enum Network {
  MAINNET = 'MAINNET',
  CALIBRATION = 'CALIBRATION',
  WALLABY = 'WALLABY'
}

export type NetworkInfo = {
  nodeStatusApiKey: string
  graphUrl: string
  lotusApiUrl: string
}

export const networks: Record<Network, NetworkInfo> = {
  [Network.MAINNET]: {
    nodeStatusApiKey: 'm786191525-b3192b91db66217a44f7d4be',
    graphUrl: 'graph.glif.link/query',
    lotusApiUrl: 'https://mainnet.glif.host'
  },
  [Network.CALIBRATION]: {
    nodeStatusApiKey: 'm787669344-2a9b90eb03dbff3e503c93c7',
    graphUrl: 'graph-calibration.glif.link/query',
    lotusApiUrl: 'https://api.calibration.node.glif.io/'
  },
  [Network.WALLABY]: {
    nodeStatusApiKey: '',
    graphUrl: '',
    lotusApiUrl: ''
  }
}

export const Environment = ({
  children,
  ...initialEnvironment
}: EnvironmentPropTypes) => {
  const [environment, setEnvironment] = useState(initialEnvironment)
  const setNetwork = (network: Network) => {
    setEnvironment({ ...environment, ...networks[network] })
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
    <EnvironmentContext.Provider value={{ ...environment, setNetwork, logger }}>
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
} & Environment
