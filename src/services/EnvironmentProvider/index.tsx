import LotusRpcEngine from '@glif/filecoin-rpc-client'
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
  CALIBRATION = 'calibrationnet',
  WALLABY = 'wallabynet'
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
  lotusApi: LotusRpcEngine
  coinType: CoinType
  isProd: boolean
  networkName: Network
  setNetwork: (network: NetworkInfo) => void
  sentryDsn?: string
  sentryEnv?: string
  packageName?: string
  packageVersion?: string
}

export const emptyEnvironmentContext = {
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
  lotusApi: null,
  networkName: Network.CALIBRATION,
  setNetwork: () => {},
  coinType: CoinType.TEST,
  isProd: false,
  sentryDsn: '',
  sentryEnv: ''
}

export const EnvironmentContext = createContext<EnvironmentContextType>(
  emptyEnvironmentContext
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
    nodeStatusApiKey: 'm792585234-2e992345ecb11cd5846f7161',
    graphUrl: 'graph-wallaby.glif.link/query',
    lotusApiUrl: 'https://wallaby.node.glif.io',
    networkName: Network.WALLABY,
    coinType: CoinType.TEST
  }
}

export const Environment = ({ children, ...environment }: EnvironmentProps) => {
  return (
    <EnvironmentContext.Provider
      value={{
        ...emptyEnvironmentContext,
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
  const networkParam = getQueryParam.string(router, 'network') as Network
  const network =
    Object.keys(networks).find(
      name => name === networkParam || name === `${networkParam}net`
    ) || Network.MAINNET
  const lotusApi = networks[network].lotusApiUrl
    ? new LotusRpcEngine({
        apiAddress: networks[network].lotusApiUrl
      })
    : null
  const env: Omit<EnvironmentProps, 'children'> = {
    ...initialEnvironment,
    ...networks[network],
    lotusApi
  }

  const [environment, setEnvironment] = useState({ ...env })
  const setNetwork = useCallback(
    async (n: NetworkInfo) => {
      const url =
        n.networkName === Network.MAINNET
          ? removeQueryParam(router.asPath, 'network')
          : appendQueryParams(router.asPath, {
              network: n.networkName
            })
      window?.location?.assign(url)
    },
    [router]
  )

  // updates state based on the url bar changing
  useEffect(() => {
    const shouldChangeNetwork = !isEqual(
      pick(environment, networkInfoKeys),
      networks[network]
    )
    if (shouldChangeNetwork) {
      const newNetwork = networks[network]
      setEnvironment({
        ...environment,
        ...newNetwork,
        lotusApi: newNetwork.lotusApiUrl
          ? new LotusRpcEngine({
              apiAddress: newNetwork.lotusApiUrl
            })
          : null
      })
    }
  }, [network, environment, setNetwork])

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
