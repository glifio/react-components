import { renderHook } from '@testing-library/react-hooks'
import { CoinType } from '@glif/filecoin-address'

import WalletProviderWrapper, { useWalletProvider } from '.'
import { initialState } from './state'
import { MockedProvider } from '@apollo/client/testing'

describe('useWalletProvider', () => {
  test('it exposes the necessary methods to manipulate state', () => {
    const wrapper = ({ children }) => (
      <MockedProvider>
        <WalletProviderWrapper
          coinType={CoinType.TEST}
          lotusApiAddr='https://calibrationnet.nodes.glif.io'
        >
          {children}
        </WalletProviderWrapper>
      </MockedProvider>
    )
    const { result } = renderHook(() => useWalletProvider(), { wrapper })
    expect(typeof result.current.dispatch).toBe('function')
    expect(typeof result.current.fetchDefaultWallet).toBe('function')
    expect(typeof result.current.setWalletError).toBe('function')
    expect(typeof result.current.connectLedger).toBe('function')
    expect(typeof result.current.resetLedgerState).toBe('function')
    expect(typeof result.current.resetState).toBe('function')
  })

  test('it passes down the wallet provider state', () => {
    const wrapper = ({ children }) => (
      <MockedProvider>
        <WalletProviderWrapper
          coinType={CoinType.TEST}
          lotusApiAddr='https://calibrationnet.nodes.glif.io'
        >
          {children}
        </WalletProviderWrapper>
      </MockedProvider>
    )
    const { result } = renderHook(() => useWalletProvider(), { wrapper })
    expect(JSON.stringify(result.current.state)).toEqual(
      JSON.stringify(initialState)
    )
  })
})
