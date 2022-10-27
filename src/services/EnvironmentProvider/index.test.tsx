import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-dom/test-utils'
import { TestEnvironment } from '../../test-utils/TestEnvironment'
import { EnvironmentProvider, Network, networks, useEnvironment } from '.'
import { CoinType } from '@glif/filecoin-address'
import { switchNetworkUrl } from '../../utils/urlParams'

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
    expect(result.current.walletUrl).toBeTruthy()
    expect(result.current.safeUrl).toBeTruthy()
    expect(result.current.explorerUrl).toBeTruthy()
    expect(result.current.verifierUrl).toBeTruthy()
    expect(result.current.nodesUrl).toBeTruthy()
    expect(result.current.blogUrl).toBeTruthy()
    expect(result.current.githubUrl).toBeTruthy()
    expect(result.current.discordUrl).toBeTruthy()
    expect(result.current.twitterUrl).toBeTruthy()
    expect(result.current.contactEmail).toBeTruthy()
    expect(result.current.nodeStatusApiUrl).toBeTruthy()
    expect(result.current.nodeStatusApiKey).toBeTruthy()
    expect(result.current.graphUrl).toBeTruthy()
    expect(result.current.graphSecure).toBeTruthy()
    expect(result.current.lotusApiUrl).toBeTruthy()
    expect(result.current.networkName).toBeTruthy()
    expect(result.current.setNetwork).toBeTruthy()
    expect(result.current.coinType).toBeTruthy()
    expect(result.current.isProd).toBeFalsy()
    expect(result.current.sentryDsn).toBe('')
    expect(result.current.sentryEnv).toBe('')
  })

  describe('switchNetwork', () => {
    const windowReassignMock = jest.fn()
    beforeAll(() => {
      global.window = Object.create(window)
      Object.defineProperty(window, 'location', {
        value: {
          assign: windowReassignMock
        }
      })

      jest.spyOn(require('next/router'), 'useRouter').mockImplementation(() => {
        return {
          asPath: 'https://wallet.glif.io/',
          query: {
            network: Network.CALIBRATION
          }
        }
      })
    })

    test('switchNetwork changes the network', async () => {
      const { result, waitFor } = renderHook(() => useEnvironment(), {
        wrapper: EnvironmentProvider
      })

      act(() => {
        result.current.setNetwork(networks.mainnet)
      })

      waitFor(() => {
        expect(result.current.coinType).toBe(CoinType.MAIN)
        expect(result.current.nodeStatusApiKey).toBe(
          networks[Network.MAINNET].nodeStatusApiKey
        )
        expect(result.current.graphUrl).toBe(networks[Network.MAINNET].graphUrl)
        expect(result.current.lotusApiUrl).toBe(
          networks[Network.MAINNET].lotusApiUrl
        )
        expect(result.current.networkName).toBe(Network.MAINNET)
        expect(windowReassignMock).toHaveBeenCalledWith(
          'https://wallet.glif.io/'
        )
      })
    })
  })

  describe('switchNetworkUrl', () => {
    test('it can switch from mainnet to another network via query params', () => {
      const url = '/address/t0100/'
      expect(switchNetworkUrl(url, Network.WALLABY)).toBe(
        '/address/t0100/?network=wallabynet'
      )
    })
    test('it can switch from another network to mainnet via query params', () => {
      const url = '/address/t0100/?network=wallaby'
      expect(switchNetworkUrl(url, Network.MAINNET)).toBe('/address/t0100/')
    })
    test('it can switch from another network to mainnet via path params', () => {
      const expected = '/address/t0100/'
      const url = '/wallabynet/address/t0100/'
      const url2 = '/wallaby/address/t0100/'
      expect(switchNetworkUrl(url, Network.MAINNET)).toBe(expected)
      expect(switchNetworkUrl(url2, Network.MAINNET)).toBe(expected)
    })
    test('it can switch from one non mainnet network to another non mainnet network via path params', () => {
      const url = '/calibration/address/t0100/'
      expect(switchNetworkUrl(url, Network.WALLABY)).toBe(
        '/wallabynet/address/t0100/'
      )
    })
  })
})
