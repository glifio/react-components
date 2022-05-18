import Filecoin, { LedgerProvider } from '@glif/filecoin-wallet-provider'
import { Dispatch } from 'react'
import { CoinType } from '@glif/filecoin-address'
import { LEDGER } from '../../constants'
import { clearError } from './state'
import createPath, { coinTypeCode } from '../../utils/createPath'
import connectWithLedger from './connectLedger'
import { WalletProviderAction } from './types'
import { LoginOption } from '../../customPropTypes'

// a helper function for getting the default wallet associated with the wallet provider
const fetchDefaultWallet = async (
  dispatch: Dispatch<WalletProviderAction>,
  loginOption: LoginOption,
  walletProvider: Filecoin,
  coinType: CoinType
) => {
  dispatch(clearError())
  let provider = walletProvider
  if (loginOption === LEDGER) {
    provider = await connectWithLedger(
      dispatch,
      walletProvider.wallet as LedgerProvider,
      walletProvider.jsonRpcEngine.apiAddress
    )
  }

  const [defaultAddress] = await provider.wallet.getAccounts(0, 1, coinType)
  const balance = await provider.getBalance(defaultAddress)
  let path = createPath(coinTypeCode(coinType), 0)

  if (loginOption === 'IMPORT_SINGLE_KEY') path = ''
  return {
    balance,
    address: defaultAddress,
    path
  }
}

export default fetchDefaultWallet
