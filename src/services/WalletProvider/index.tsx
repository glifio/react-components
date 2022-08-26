import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  Dispatch,
  ReactNode,
  Context
} from 'react'
import { useApolloClient } from '@apollo/client'
import PropTypes from 'prop-types'
import Filecoin, {
  LedgerProvider,
  MetaMaskProvider
} from '@glif/filecoin-wallet-provider'
import { FilecoinNumber } from '@glif/filecoin-number'
import { CoinType } from '@glif/filecoin-address'

import reducer, {
  initialState,
  setError,
  clearError,
  resetLedgerState,
  resetState,
  walletList,
  switchWallet,
  updateBalance
} from './state'
import fetchDefaultWallet from './fetchDefaultWallet'
import connectLedger from './connectLedger'
import connectMetaMask from './connectMetaMask'
import { Wallet, WalletProviderAction, WalletProviderState } from './types'
import { hasLedgerError, reportLedgerConfigError } from './ledgerUtils'
import { reportMetaMaskError } from './metamaskUtils'
import { reducerLogger } from '../../logger'
import { useEnvironment } from '../EnvironmentProvider'

export type WalletProviderContextType = {
  state: WalletProviderState
  lotusApiAddr: string
  dispatch: Dispatch<WalletProviderAction> | null
  fetchDefaultWallet: (walletProvider: Filecoin) => Promise<Wallet>
  getProvider: () => Promise<Filecoin>
  connectLedger: () => Promise<Filecoin & { wallet: LedgerProvider }>
  connectMetaMask: () => Promise<Filecoin & { wallet: MetaMaskProvider }>
  setWalletError: (errorMessage: string) => void
  resetWalletError: () => void
  resetLedgerState: () => void
  resetState: () => void
  walletList: (wallets: Wallet[]) => void
  switchWallet: (walletIdx: number) => void
  updateBalance: (bal: FilecoinNumber, walletIdx: number) => void
  walletError: () => string | null
  coinType: CoinType
}

export const WalletProviderContext = createContext<WalletProviderContextType>({
  state: { ...initialState },
  lotusApiAddr: 'https://api.calibration.node.glif.io',
  dispatch: null,
  fetchDefaultWallet: null,
  getProvider: null,
  connectLedger: null,
  connectMetaMask: null,
  setWalletError: null,
  resetWalletError: () => {},
  resetLedgerState: null,
  resetState: null,
  walletList: null,
  switchWallet: null,
  updateBalance: null,
  walletError: () => null,
  coinType: CoinType.TEST
})

const WalletProviderWrapper = ({
  children,
  initialState: walletProviderInitialState
}: WalletProviderPropTypes) => {
  const { isProd, lotusApiUrl: lotusApiAddr, coinType } = useEnvironment()
  const [state, dispatch] = useReducer(
    reducerLogger<WalletProviderState, WalletProviderAction>(reducer, isProd),
    walletProviderInitialState
  )
  const client = useApolloClient()
  return (
    <WalletProviderContext.Provider
      value={{
        lotusApiAddr,
        coinType,
        state,
        dispatch,
        fetchDefaultWallet: useCallback(
          // a lot of times here, we instantiate the walletProvider AND fetch the default wallet back-to-back
          // which could lead to race conditions, since the wallet provider's state may not have updated in time
          // thats why we allow you to pass the walletProvider here, and fallback to the provider in state in other circumstances
          (walletProvider = state.walletProvider) =>
            fetchDefaultWallet(
              dispatch,
              state.loginOption,
              walletProvider,
              coinType,
              client
            ),
          [dispatch, state.loginOption, state.walletProvider, coinType, client]
        ),
        setWalletError: useCallback(
          errorMessage => dispatch(setError(errorMessage)),
          [dispatch]
        ),
        getProvider: useCallback(async (): Promise<Filecoin> => {
          if (state?.loginOption === 'METAMASK') {
            return connectMetaMask(
              dispatch,
              state?.walletProvider?.wallet as MetaMaskProvider,
              coinType,
              lotusApiAddr
            )
          }
          if (state?.loginOption === 'LEDGER') {
            return connectLedger(
              dispatch,
              (state?.walletProvider?.wallet as LedgerProvider) || null,
              lotusApiAddr
            )
          } else {
            return state?.walletProvider
          }
        }, [
          dispatch,
          state?.loginOption,
          state?.walletProvider,
          lotusApiAddr,
          coinType
        ]),
        connectLedger: useCallback(
          () =>
            connectLedger(
              dispatch,
              (state?.walletProvider?.wallet as LedgerProvider) || null,
              lotusApiAddr
            ),
          [dispatch, state?.walletProvider?.wallet, lotusApiAddr]
        ),
        connectMetaMask: useCallback(
          () =>
            connectMetaMask(
              dispatch,
              (state?.walletProvider?.wallet as MetaMaskProvider) || null,
              coinType,
              lotusApiAddr
            ),
          [dispatch, state?.walletProvider?.wallet, lotusApiAddr, coinType]
        ),
        resetLedgerState: useCallback(
          () => dispatch(resetLedgerState()),
          [dispatch]
        ),
        resetWalletError: useCallback(() => {
          dispatch(resetLedgerState())
          dispatch(clearError())
          dispatch({ type: 'METAMASK_RESET_STATE' })
        }, [dispatch]),
        resetState: useCallback(() => dispatch(resetState()), [dispatch]),
        walletList: useCallback(
          wallets => dispatch(walletList(wallets)),
          [dispatch]
        ),
        switchWallet: useCallback(
          selectedWalletIdx => dispatch(switchWallet(selectedWalletIdx)),
          [dispatch]
        ),
        updateBalance: useCallback(
          (balance, index) => dispatch(updateBalance(balance, index)),
          [dispatch]
        ),
        walletError: useCallback((): string | null => {
          if (state?.error) {
            return state.error
          }

          if (state?.loginOption === 'LEDGER') {
            if (hasLedgerError(state?.ledger)) {
              return reportLedgerConfigError(state?.ledger)
            }
            return null
          }

          if (state?.loginOption === 'METAMASK') {
            if (state?.metamask.error) {
              return reportMetaMaskError(state?.metamask)
            }
            return null
          }
          return null
        }, [state?.ledger, state?.metamask, state?.loginOption, state?.error])
      }}
    >
      {children}
    </WalletProviderContext.Provider>
  )
}

type WalletProviderPropTypes = {
  children: ReactNode
  initialState?: WalletProviderState
}

WalletProviderWrapper.propTypes = {
  children: PropTypes.node.isRequired
}

WalletProviderWrapper.defaultProps = {
  initialState
}

export type WalletProviderOpts = {
  context: Context<WalletProviderContextType>
}

export const useWalletProvider = (opts?: WalletProviderOpts) => {
  let ctx: Context<WalletProviderContextType>
  if (opts?.context) {
    ctx = opts.context
  } else {
    ctx = WalletProviderContext
  }

  const value = useContext(ctx)
  const { state } = value
  return {
    ...state,
    ...value
  }
}

export * from './state'
export * from './types'
export * from './ledgerUtils'
export * from './metamaskUtils'

export default WalletProviderWrapper
