import { FilecoinNumber } from '@glif/filecoin-number'

import createPath from '../../utils/createPath'
import { IMPORT_MNEMONIC, IMPORT_SINGLE_KEY } from '../../constants'
import { mockWalletProviderInstance } from '../../../__mocks__/@glif/filecoin-wallet-provider'
import {
  WALLET_ADDRESS,
  WALLET_ADDRESS_2,
  WALLET_ID,
  WALLET_ID_2
} from '../constants'
import { WalletProviderState } from '../../../src/services/WalletProvider/types'

export const composeWalletProviderState = (
  initialWalletProviderState: WalletProviderState,
  preset:
    | 'preOnboard'
    | 'postOnboard'
    | 'postOnboardLowBal'
    | 'postOnboardWithError'
    | 'selectedOtherWallet'
) => {
  switch (preset) {
    case 'postOnboard': {
      return Object.freeze({
        ...initialWalletProviderState,
        walletType: IMPORT_MNEMONIC,
        walletProvider: mockWalletProviderInstance,
        wallets: [
          {
            address: WALLET_ADDRESS,
            robust: WALLET_ADDRESS,
            id: WALLET_ID,
            balance: new FilecoinNumber('1', 'fil'),
            path: createPath(1, 0)
          }
        ],
        selectedWalletIdx: 0,
        loginOption: IMPORT_SINGLE_KEY
      })
    }
    case 'postOnboardLowBal': {
      return Object.freeze({
        ...initialWalletProviderState,
        walletType: IMPORT_MNEMONIC,
        walletProvider: mockWalletProviderInstance,
        wallets: [
          {
            address: WALLET_ADDRESS,
            robust: WALLET_ADDRESS,
            id: WALLET_ID,
            balance: new FilecoinNumber('.000001', 'fil'),
            path: createPath(1, 0)
          }
        ],
        selectedWalletIdx: 0,
        loginOption: IMPORT_SINGLE_KEY
      })
    }
    case 'postOnboardWithError': {
      return Object.freeze({
        ...initialWalletProviderState,
        walletProvider: mockWalletProviderInstance,
        wallets: [
          {
            address: WALLET_ADDRESS,
            robust: WALLET_ADDRESS,
            id: WALLET_ID,
            balance: new FilecoinNumber('1', 'fil'),
            path: createPath(1, 0)
          }
        ],
        selectedWalletIdx: 0,
        loginOption: IMPORT_SINGLE_KEY,
        error: 'ERROR'
      })
    }
    case 'selectedOtherWallet': {
      return Object.freeze({
        ...initialWalletProviderState,
        walletProvider: mockWalletProviderInstance,
        wallets: [
          {
            address: WALLET_ADDRESS,
            robust: WALLET_ADDRESS,
            id: WALLET_ID,
            balance: new FilecoinNumber('1', 'fil'),
            path: createPath(1, 0)
          },
          {
            address: WALLET_ADDRESS_2,
            robust: WALLET_ADDRESS_2,
            id: WALLET_ID_2,
            balance: new FilecoinNumber('5', 'fil'),
            path: createPath(1, 1)
          }
        ],
        selectedWalletIdx: 1,
        loginOption: IMPORT_MNEMONIC
      })
    }
    default:
      return initialWalletProviderState
  }
}
