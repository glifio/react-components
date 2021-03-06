import { FilecoinNumber } from '@glif/filecoin-number'
import Filecoin from '@glif/filecoin-wallet-provider'
import { initialLedgerState } from './ledgerUtils/ledgerStateManagement'
import { initialMetaMaskState } from './metamaskUtils'
import sortAndRemoveWalletDups from './sortAndRemoveWalletDups'
import updateArrayItem from '../../utils/updateArrayItem'
import { WalletProviderAction, WalletProviderState, Wallet } from './types'
import { LoginOption } from '../../customPropTypes'

export const initialState: WalletProviderState = {
  loginOption: null,
  walletProvider: null,
  error: '',
  ledger: initialLedgerState,
  metamask: initialMetaMaskState,
  wallets: [],
  selectedWalletIdx: -1
}

/* ACTIONS */

export const createWalletProvider = (
  provider: Filecoin,
  loginOption: LoginOption
): WalletProviderAction => ({
  type: 'CREATE_WALLET_PROVIDER',
  payload: {
    provider,
    loginOption
  }
})

export const setError = (errMessage: string): WalletProviderAction => ({
  type: 'WALLET_ERROR',
  error: errMessage
})

export const clearError = (): WalletProviderAction => ({
  type: 'CLEAR_ERROR'
})

export const resetLedgerState = (): WalletProviderAction => ({
  type: 'LEDGER_RESET_STATE'
})

export const resetState = (): WalletProviderAction => ({
  type: 'RESET_STATE'
})

export const walletList = (wallets: Wallet[]): WalletProviderAction => ({
  type: 'WALLET_LIST',
  payload: {
    wallets
  }
})

export const switchWallet = (index: number): WalletProviderAction => ({
  type: 'SWITCH_WALLET',
  payload: {
    index
  }
})

export const updateBalance = (
  balance: FilecoinNumber,
  walletIdx = 0
): WalletProviderAction => ({
  type: 'UPDATE_BALANCE',
  payload: {
    balance,
    walletIdx
  }
})

/* REDUCER */
// TODO - we need strict typechecking on `payload`... Haven't figured out an elegant solution to this yet
export default function reducer(
  state: WalletProviderState,
  action: WalletProviderAction
): WalletProviderState {
  switch (action.type) {
    case 'WALLET_LIST':
      return {
        ...Object.freeze(state),
        wallets: sortAndRemoveWalletDups(state.wallets, action.payload.wallets),
        selectedWalletIdx:
          state.selectedWalletIdx >= 0 ? state.selectedWalletIdx : 0
      }
    case 'UPDATE_BALANCE':
      const { walletIdx, balance } = action.payload
      return {
        ...Object.freeze(state),
        wallets: updateArrayItem(state.wallets, walletIdx, {
          ...state.wallets[walletIdx],
          balance
        })
      }
    case 'SWITCH_WALLET':
      return {
        ...Object.freeze(state),
        selectedWalletIdx: action.payload.index
      }
    case 'SET_LOGIN_OPTION':
      return {
        ...Object.freeze(state),
        loginOption: action.payload.loginOption
      }
    case 'CREATE_WALLET_PROVIDER':
      return {
        ...Object.freeze(state),
        walletProvider: action.payload.provider,
        loginOption: action.payload.loginOption
      }
    case 'WALLET_ERROR':
      return { ...Object.freeze(state), error: action.error }
    case 'CLEAR_ERROR':
      return { ...Object.freeze(state), error: '' }
    case 'RESET_STATE':
      return Object.freeze(initialState)
    // ledger cases
    case 'LEDGER_USER_INITIATED_IMPORT':
      return {
        ...Object.freeze(state),
        ledger: {
          ...state.ledger,
          connecting: true,
          connectedFailure: false
        }
      }
    case 'LEDGER_NOT_FOUND':
      return {
        ...Object.freeze(state),
        ledger: {
          ...state.ledger,
          connecting: false,
          connectedFailure: true,
          userImportFailure: true
        }
      }
    case 'LEDGER_CONNECTED':
      return {
        ...Object.freeze(state),
        ledger: {
          ...state.ledger,
          connecting: false,
          connectedFailure: false,
          inUseByAnotherApp: false
        }
      }
    case 'LEDGER_ESTABLISHING_CONNECTION_W_FILECOIN_APP':
      return {
        ...Object.freeze(state),
        ledger: {
          ...state.ledger,
          filecoinAppNotOpen: false,
          locked: false,
          unlocked: false,
          busy: false,
          replug: false
        }
      }
    case 'LEDGER_LOCKED':
      return {
        ...Object.freeze(state),
        ledger: {
          ...state.ledger,
          locked: true,
          unlocked: false,
          userImportFailure: true
        }
      }
    case 'LEDGER_UNLOCKED':
      return {
        ...Object.freeze(state),
        ledger: {
          ...state.ledger,
          locked: false,
          unlocked: true
        }
      }
    case 'LEDGER_FILECOIN_APP_NOT_OPEN':
      return {
        ...Object.freeze(state),
        ledger: {
          ...state.ledger,
          filecoinAppNotOpen: true,
          userImportFailure: true,
          // counterintuitive - but the only way we could have known this
          // is if the ledger was unlocked
          unlocked: true
        }
      }
    case 'LEDGER_FILECOIN_APP_OPEN':
      return {
        ...Object.freeze(state),
        ledger: {
          ...state.ledger,
          filecoinAppNotOpen: false,
          locked: false,
          unlocked: true,
          replug: false,
          busy: false
        }
      }
    case 'LEDGER_BUSY':
      return {
        ...Object.freeze(state),
        ledger: {
          ...state.ledger,
          busy: true
        }
      }
    case 'LEDGER_REPLUG':
      return {
        ...Object.freeze(state),
        ledger: {
          ...state.ledger,
          replug: true
        }
      }
    case 'LEDGER_USED_BY_ANOTHER_APP':
      return {
        ...Object.freeze(state),
        ledger: {
          ...state.ledger,
          inUseByAnotherApp: true
        }
      }
    case 'LEDGER_BAD_VERSION':
      return {
        ...Object.freeze(state),
        ledger: {
          ...state.ledger,
          badVersion: true
        }
      }
    case 'TRANSPORT_UNSUPPORTED':
      return {
        ...Object.freeze(state),
        ledger: {
          ...state.ledger,
          transportSupported: false
        }
      }
    case 'LEDGER_RESET_STATE':
      return {
        ...Object.freeze(state),
        ledger: {
          ...initialLedgerState
        }
      }

    case 'METAMASK_RESET_STATE':
      return {
        ...Object.freeze(state),
        metamask: {
          ...initialMetaMaskState
        }
      }
    case 'METAMASK_CONFIGURED_SUCCESS':
      return {
        ...Object.freeze(state),
        metamask: {
          extSupportsSnap: true,
          snapInstalled: true,
          snapEnabled: true,
          extInstalled: true,
          extUnlocked: true,
          error: false,
          loading: false
        }
      }
    case 'METAMASK_CONFIGURED_FAIL':
      return {
        ...Object.freeze(state),
        metamask: {
          ...state.metamask,
          ...action.payload,
          error: true,
          loading: false
        }
      }
    default:
      return state
  }
}
