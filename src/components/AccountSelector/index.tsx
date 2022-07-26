import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { bool, func, number, string } from 'prop-types'
import { CoinType } from '@glif/filecoin-address'
import { FilecoinNumber } from '@glif/filecoin-number'
import LotusRPCEngine from '@glif/filecoin-rpc-client'
import { useApolloClient } from '@apollo/client'

import LoadingScreen from '../LoadingScreen'
import { useWalletProvider, Wallet } from '../../services/WalletProvider'

import createPath, { coinTypeCode } from '../../utils/createPath'
import convertAddrToPrefix from '../../utils/convertAddrToPrefix'
import { COIN_TYPE_PROPTYPE } from '../../customPropTypes'
import { logger } from '../../logger'
import { AddressDocument, AddressQuery } from '../../generated/graphql'
import { ErrorBox, StandardBox } from '../Layout'
import { WalletsTable } from './table'
import { CreateWallet } from './Create2'
import { useWallet } from '../../services'

const AccountSelector = ({
  onSelectAccount,
  showSelectedAccount,
  helperText,
  title,
  coinType,
  nWalletsToLoad
}: {
  onSelectAccount: () => void
  showSelectedAccount: boolean
  helperText: string
  title: string
  coinType: CoinType
  nWalletsToLoad: number
  test: boolean
  isProd: boolean
}) => {
  const [loadingWallets, setLoadingWallets] = useState(false)
  const [loadingPage, setLoadingPage] = useState(true)
  const [uncaughtError, setUncaughtError] = useState('')
  const {
    walletProvider,
    walletList,
    switchWallet,
    getProvider,
    wallets,
    walletError,
    lotusApiAddr
  } = useWalletProvider()
  const wallet = useWallet()
  const apolloClient = useApolloClient()

  const getBalance = useCallback(
    async (address: string) => {
      const lCli = new LotusRPCEngine({
        apiAddress: lotusApiAddr
      })

      const bal = await lCli.request('WalletBalance', address)
      return new FilecoinNumber(bal, 'attofil')
    },
    [lotusApiAddr]
  )

  const [loadedFirstWallet, setLoadedFirstWallet] = useState(false)

  // automatically generate the wallets that have a balance. Minimum 3, max 10
  useEffect(() => {
    const loadNextWallet = async (index, provider) => {
      const [address] = await provider.wallet.getAccounts(
        index,
        index + 1,
        coinType
      )

      const [balance, { data }] = await Promise.all([
        getBalance(address),
        apolloClient.query<AddressQuery>({
          query: AddressDocument,
          variables: {
            address
          }
        })
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
        await loadNextWallet(index + 1, provider)
      }
    }

    if (!loadedFirstWallet) {
      setLoadingPage(false)
      setLoadingWallets(true)
      setLoadedFirstWallet(true)
      getProvider()
        .then(provider => loadNextWallet(wallets.length, provider))
        .then(() => {
          setLoadingWallets(false)
        })
        .catch(err => {
          logger.error(
            err instanceof Error ? err.message : 'Error loading wallet',
            'AccountSelector'
          )
          setUncaughtError(err.message)
          setLoadingPage(false)
        })
    }
  }, [
    getProvider,
    walletProvider,
    loadedFirstWallet,
    wallets,
    walletList,
    coinType,
    nWalletsToLoad,
    apolloClient,
    getBalance
  ])

  const errorMsg = useMemo(() => {
    if (walletError()) return walletError()
    if (uncaughtError) return uncaughtError
    return ''
  }, [uncaughtError, walletError])

  const fetchNextWallet = async (index: number, ct: CoinType) => {
    setLoadingWallets(true)
    try {
      const provider = await getProvider()

      if (provider) {
        const [address] = await provider.wallet.getAccounts(
          index,
          index + 1,
          ct
        )

        const { data } = await apolloClient.query<AddressQuery>({
          query: AddressDocument,
          variables: {
            address
          }
        })

        const balance = await provider.getBalance(address)
        const w: Wallet = {
          balance,
          robust: convertAddrToPrefix(address),
          id: convertAddrToPrefix(data?.address?.id),
          address: convertAddrToPrefix(address),
          path: createPath(coinTypeCode(ct), index)
        }
        walletList([w])
      }
    } catch (err) {
      logger.error(
        err instanceof Error ? err.message : 'Error fetching next account',
        'AccountSelector'
      )
      setUncaughtError(err.message)
    }
    setLoadingWallets(false)
  }

  const selectAccount = useCallback(
    (i: number) => {
      switchWallet(i)
      onSelectAccount()
    },
    [onSelectAccount, switchWallet]
  )

  if (loadingPage) return <LoadingScreen height='100vh' />

  return (
    <div>
      {errorMsg ? (
        <ErrorBox>
          <h2>Error</h2>
          <p>{errorMsg}</p>
        </ErrorBox>
      ) : (
        <StandardBox>
          <h2>{title}</h2>
          <p>{helperText}</p>
        </StandardBox>
      )}
      <br />
      <WalletsTable
        wallets={wallets}
        loadingWallets={loadingWallets}
        selectAccount={selectAccount}
        showSelectedWallet={showSelectedAccount}
        selectedWalletPath={wallet.path}
      />
      {!loadingWallets && (
        <CreateWallet
          fetchNextWallet={fetchNextWallet}
          walletIdx={wallets.length}
        />
      )}
    </div>
  )
}

AccountSelector.propTypes = {
  onSelectAccount: func.isRequired,
  showSelectedAccount: bool,
  helperText: string.isRequired,
  title: string.isRequired,
  test: bool,
  coinType: COIN_TYPE_PROPTYPE,
  nWalletsToLoad: number,
  isProd: bool
}

AccountSelector.defaultProps = {
  showSelectedAccount: true,
  test: false,
  nWalletsToLoad: 5,
  isProd: false
}

export default AccountSelector
