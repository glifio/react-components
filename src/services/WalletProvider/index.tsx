import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  Dispatch,
  ReactChildren
} from 'react'
import PropTypes from 'prop-types'
import Filecoin, {
  LedgerProvider,
  MetaMaskProvider
} from '@glif/filecoin-wallet-provider'
import { FilecoinNumber } from '@glif/filecoin-number'
import { CoinType } from '@glif/filecoin-address'

import reducer, {
  initialState,
  setLoginOption,
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
import { LoginOption } from '../../customPropTypes'

type WalletProviderContextType = {
  state: WalletProviderState
  lotusApiAddr: string
  dispatch: Dispatch<WalletProviderAction> | null
  fetchDefaultWallet: (walletProvider: Filecoin) => Promise<Wallet>
  getProvider: () => Promise<Filecoin>
  connectLedger: () => Promise<Filecoin & { wallet: LedgerProvider }>
  connectMetaMask: () => Promise<Filecoin & { wallet: MetaMaskProvider }>
  setWalletError: (errorMessage: string) => void
  setLoginOption: (loginOption: LoginOption) => void
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
  lotusApiAddr: 'https://calibration.node.glif.io',
  dispatch: null,
  fetchDefaultWallet: null,
  getProvider: null,
  connectLedger: null,
  connectMetaMask: null,
  setWalletError: null,
  setLoginOption: null,
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
  lotusApiAddr,
  coinType
}: {
  children: ReactChildren
  lotusApiAddr: string
  coinType: CoinType
}) => {
  const [state, dispatch] = useReducer(
    reducerLogger<WalletProviderState, WalletProviderAction>(reducer),
    initialState
  )
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
              coinType
            ),
          [dispatch, state.loginOption, state.walletProvider, coinType]
        ),
        setWalletError: useCallback(
          errorMessage => dispatch(setError(errorMessage)),
          [dispatch]
        ),
        setLoginOption: useCallback(
          loginOption => dispatch(setLoginOption(loginOption)),
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

WalletProviderWrapper.propTypes = {
  children: PropTypes.node.isRequired
}

export const useWalletProvider = () => {
  const value = useContext(WalletProviderContext)
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
