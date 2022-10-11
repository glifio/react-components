import { FilecoinNumber } from '@glif/filecoin-number'
import { useWalletProvider, WalletProviderOpts } from '../'
import { Wallet } from '../types'

export const noWallet: Wallet = {
  address: '',
  id: '',
  robust: '',
  balance: new FilecoinNumber('0', 'fil'),
  path: ''
}

export const useWallet = (opts?: WalletProviderOpts): Wallet => {
  const { wallets, selectedWalletIdx } = useWalletProvider(opts)

  if (wallets.length === 0) return noWallet
  if (!wallets[selectedWalletIdx]) return noWallet
  return wallets[selectedWalletIdx]
}
