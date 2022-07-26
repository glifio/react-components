import { ApolloQueryResult } from '@apollo/client'
import { CoinType } from '@glif/filecoin-address'
import { FilecoinNumber } from '@glif/filecoin-number'
import Filecoin from '@glif/filecoin-wallet-provider'
import { SetStateAction } from 'react'
import { AddressQuery } from '../../generated/graphql'
import { Wallet } from '../../services'
import { convertAddrToPrefix, createPath } from '../../utils'
import { coinTypeCode } from '../../utils/createPath'

export const loadNextAccount = async (
  index: number,
  provider: Filecoin,
  coinType: CoinType,
  getBalance: (address: string) => Promise<FilecoinNumber>,
  getAddress: (address: string) => Promise<ApolloQueryResult<AddressQuery>>,
  setLoadedFirstWallet: (value: SetStateAction<boolean>) => void,
  setLoadingPage: (value: SetStateAction<boolean>) => void,
  setLoadingWallets: (value: SetStateAction<boolean>) => void,
  walletList: (value: Wallet[]) => void
) => {
  const [address] = await provider.wallet.getAccounts(
    index,
    index + 1,
    coinType
  )

  const [balance, { data }] = await Promise.all([
    getBalance(address),
    getAddress(address)
  ])

  const w: Wallet = {
    balance,
    robust: convertAddrToPrefix(address),
    id: convertAddrToPrefix(data?.address?.id),
    address: convertAddrToPrefix(address),
    path: createPath(coinTypeCode(coinType), index)
  }
  walletList([w])
  // if this is the first time we got a wallet balance, show the ui
  if (index === 0) {
    setLoadedFirstWallet(true)
    setLoadingPage(false)
  }

  // if this account has a balance and we've loaded less than 10 wallets, load the next wallet
  if ((balance.isGreaterThan(0) && index < 10) || index < 3) {
    await loadNextAccount(
      index + 1,
      provider,
      coinType,
      getBalance,
      getAddress,
      setLoadedFirstWallet,
      setLoadingPage,
      setLoadingWallets,
      walletList
    )
  }
  setLoadingWallets(false)
}
