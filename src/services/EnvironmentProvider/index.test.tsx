import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-dom/test-utils'
import { TestEnvironment } from '../../test-utils/TestEnvironment'
import { Network, networks, useEnvironment } from '.'
import { CoinType } from '@glif/filecoin-address'

const mockRouterPush = jest.fn()
const useRouter = jest.spyOn(require('next/router'), 'useRouter')
useRouter.mockImplementation(() => ({
  query: { network: 'calibration' },
  push: mockRouterPush,
  asPath: 'https://wallet.glif.io/'
}))

describe('EnvironmentProvider', () => {
  test('it exports a useEnvironment hook that exports the current environment', () => {
    const { result } = renderHook(() => useEnvironment(), {
      wrapper: TestEnvironment
    })
    expect(result.current.homeUrl).toBeTruthy()
    expect(result.current.blogUrl).toBeTruthy()
    expect(result.current.walletUrl).toBeTruthy()
    expect(result.current.safeUrl).toBeTruthy()
    expect(result.current.explorerUrl).toBeTruthy()
    expect(result.current.verifierUrl).toBeTruthy()
    expect(result.current.nodeStatusApiUrl).toBeTruthy()
    expect(result.current.nodeStatusApiKey).toBeTruthy()
    expect(result.current.graphUrl).toBeTruthy()
    expect(result.current.lotusApiUrl).toBeTruthy()
    expect(result.current.networkName).toBeTruthy()
    expect(result.current.setNetwork).toBeTruthy()
    expect(result.current.coinType).toBeTruthy()
    expect(result.current.isProd).toBeFalsy()
    expect(result.current.sentryDsn).toBe('')
    expect(result.current.sentryEnv).toBe('')
  })

  test('switchNetwork changes the network', async () => {
    const { result } = renderHook(() => useEnvironment(), {
      wrapper: TestEnvironment
    })

    act(() => {
      result.current.setNetwork(networks.mainnet)
    })

    expect(result.current.coinType).toBe(CoinType.MAIN)
    expect(result.current.nodeStatusApiKey).toBe(
      networks[Network.MAINNET].nodeStatusApiKey
    )
    expect(result.current.graphUrl).toBe(networks[Network.MAINNET].graphUrl)
    expect(result.current.lotusApiUrl).toBe(
      networks[Network.MAINNET].lotusApiUrl
    )
    expect(result.current.networkName).toBe(Network.MAINNET)
  })
})