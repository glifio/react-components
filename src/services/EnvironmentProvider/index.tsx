import { CoinType } from '@glif/filecoin-address'
import { Logger, LogLevel } from '@glif/logger'
import { useRouter } from 'next/router'
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
  useEffect,
  useCallback
} from 'react'
import pick from 'lodash.pick'
import isEqual from 'lodash.isequal'

import { appendQueryParams, getQueryParam, removeQueryParam } from '../../utils'

export enum Network {
  MAINNET = 'mainnet',
  CALIBRATION = 'calibration',
  WALLABY = 'wallaby'
}

export type NetworkInfo = {
  nodeStatusApiKey: string
  graphUrl: string
  lotusApiUrl: string
  networkName: Network
  coinType: CoinType
}

const networkInfoKeys = [
  'nodeStatusApiKey',
  'graphUrl',
  'lotusApiUrl',
  'networkName',
  'coinType'
]

export interface EnvironmentContextType {
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
  sentryDsn?: string
  sentryEnv?: string
  packageName?: string
  packageVersion?: string
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
  sentryEnv: ''
}

export const EnvironmentContext = createContext<EnvironmentContextType>(
  initialEnvironmentContext
)

export const networks: Record<Network, NetworkInfo> = {
  [Network.MAINNET]: {
    nodeStatusApiKey: 'm786191525-b3192b91db66217a44f7d4be',
    graphUrl: 'graph.glif.link/query',
    lotusApiUrl: 'https://mainnet.glif.host',
    networkName: Network.MAINNET,
    coinType: CoinType.MAIN
  },
  [Network.CALIBRATION]: {
    nodeStatusApiKey: 'm787669344-2a9b90eb03dbff3e503c93c7',
    graphUrl: 'graph-calibration.glif.link/query',
    lotusApiUrl: 'https://api.calibration.node.glif.io/',
    networkName: Network.CALIBRATION,
    coinType: CoinType.TEST
  },
  [Network.WALLABY]: {
    nodeStatusApiKey: '',
    graphUrl: '',
    lotusApiUrl: '',
    networkName: Network.WALLABY,
    coinType: CoinType.TEST
  }
}

export const Environment = ({ children, ...environment }: EnvironmentProps) => {
  return (
    <EnvironmentContext.Provider
      value={{
        ...initialEnvironmentContext,
        ...environment
      }}
    >
      {children}
    </EnvironmentContext.Provider>
  )
}

// This wrapper is used by the apps, which decorates the Environment from the URL bar
export const EnvironmentProvider = ({
  children,
  ...initialEnvironment
}: Omit<
  EnvironmentProps,
  'nodeStatusApiKey' | 'graphUrl' | 'lotusApiUrl' | 'coinType' | 'networkName'
>) => {
  const router = useRouter()
  let network = getQueryParam.string(router, 'network') as Network
  if (!network) network = Network.MAINNET

  const env: Omit<EnvironmentProps, 'children'> = {
    ...initialEnvironment,
    ...networks[network]
  }

  const [environment, setEnvironment] = useState({ ...env })
  const setNetwork = useCallback(
    (n: NetworkInfo) => {
      setEnvironment({ ...environment, ...n })
      const url =
        n.networkName === Network.MAINNET
          ? removeQueryParam(router.asPath, 'network')
          : appendQueryParams(router.asPath, {
              network: n.networkName
            })

      router.push(url)
    },
    [router, environment, setEnvironment]
  )

  // catches any mismatching URL => environment configs on render and adjusts the env to fit the URL bar

  const [changedNetwork, setChangedNetwork] = useState(false)
  useEffect(() => {
    const shouldChangeNetwork =
      !isEqual(pick(environment, networkInfoKeys), networks[network]) &&
      !changedNetwork

    if (shouldChangeNetwork) {
      setChangedNetwork(true)
      setNetwork(networks[network])
    }
  }, [network, environment, setNetwork, changedNetwork, setChangedNetwork])

  return (
    <Environment {...env} setNetwork={setNetwork}>
      {children}
    </Environment>
  )
}

export const useEnvironment = (): EnvironmentContextType => {
  return useContext(EnvironmentContext)
}

export const useLogger = (): Logger => {
  const { isProd, sentryDsn, sentryEnv, packageName, packageVersion } =
    useEnvironment()
  return useMemo(
    () =>
      new Logger({
        consoleEnabled: true,
        consoleLevel: LogLevel.DEBUG,
        sentryEnabled: isProd,
        sentryLevel: LogLevel.WARN,
        sentryDsn: sentryDsn || '',
        sentryEnv: sentryEnv || '',
        sentryTraces: 0,
        packageName: packageName || 'react-components',
        packageVersion: packageVersion || '?.?.?'
      }),
    [isProd, sentryDsn, sentryEnv, packageName, packageVersion]
  )
}

export type EnvironmentProps = {
  children: ReactNode
} & Partial<EnvironmentContextType>
