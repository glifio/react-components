import { FilecoinNumber } from '@glif/filecoin-number'
import Filecoin, { WalletSubProvider } from '@glif/filecoin-wallet-provider'
import Transport from '@ledgerhq/hw-transport'
import {
  LedgerActionType,
  LedgerState
} from './ledgerUtils/ledgerStateManagement'
import { LoginOption } from '../../customPropTypes'
import { MetaMaskState, MetaMaskActionType } from './metamaskUtils'

export type WalletActionType =
  | 'SET_LOGIN_OPTION'
  | 'CREATE_WALLET_PROVIDER'
  | 'WALLET_ERROR'
  | 'CLEAR_ERROR'
  | 'RESET_STATE'
  | 'WALLET_LIST'
  | 'SWITCH_WALLET'
  | 'UPDATE_BALANCE'

export type WalletProviderAction = {
  type: WalletActionType | LedgerActionType | MetaMaskActionType
  error?: string
  payload?: any
}

export type Wallet = {
  path: string
  balance: FilecoinNumber
  robust: string
  id: string
  // will be deprecated but keeping for now
  address: string
}

export type WalletProviderState = {
  loginOption: LoginOption
  walletProvider: Filecoin | null
  ledger: LedgerState
  metamask: MetaMaskState
  wallets: Wallet[]
  selectedWalletIdx: number
  error: string
}

export type LedgerVersion = {
  return_code: number
  error_message: string
  // ///
  test_mode: boolean
  major: number
  minor: number
  patch: number
  device_locked: boolean
  target_id: string
}

export type LedgerSubProvider = WalletSubProvider & {
  getVersion: () => Promise<LedgerVersion>
  showAddressAndPubKey: (_: string) => Promise<string | Error>
  resetTransport: (_: Transport) => Promise<void>
}
