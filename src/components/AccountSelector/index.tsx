import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { bool, func, string } from 'prop-types'
import { CoinType } from '@glif/filecoin-address'
import { FilecoinNumber } from '@glif/filecoin-number'
import LotusRPCEngine from '@glif/filecoin-rpc-client'
import { useApolloClient } from '@apollo/client'

import { LoadingScreen } from '../Loading/LoadingScreen'
import { useWalletProvider, Wallet } from '../../services/WalletProvider'

import createPath, { coinTypeCode } from '../../utils/createPath'
import convertAddrToPrefix from '../../utils/convertAddrToPrefix'
import { AddressDocument, AddressQuery } from '../../generated/graphql'
import { ErrorBox, StandardBox } from '../Layout'
import { AccountsTable } from './table'
import { CreateAccount } from './Create'
import { useWallet } from '../../services'
import { loadNextAccount } from './loadNextAccount'
import { useEnvironment, useLogger } from '../../services/EnvironmentProvider'

const AccountSelector = ({
  onSelectAccount,
  showSelectedAccount,
  helperText,
  title
}: AccountSelectorProps) => {
  const { coinType } = useEnvironment()
  const logger = useLogger()

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
    lotusApiAddr,
    loginOption
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

  const getAddress = useCallback(
    async address =>
      apolloClient.query<AddressQuery>({
        query: AddressDocument,
        variables: {
          address
        }
      }),
    [apolloClient]
  )

  const keyDerive = useCallback(
    async (path: string) => {
      try {
        const provider = await getProvider()
        return provider.wallet.keyDerive(path)
      } catch (err) {
        setUncaughtError(err?.message || JSON.stringify(err))
      }
    },
    [getProvider]
  )

  const [loadedFirstWallet, setLoadedFirstWallet] = useState(false)

  // automatically generate the wallets that have a balance. Minimum 3, max 10
  useEffect(() => {
    if (!loadedFirstWallet) {
      setLoadingPage(false)
      setLoadingWallets(true)
      setLoadedFirstWallet(true)
      getProvider()
        .then(provider =>
          loadNextAccount(
            wallets.length,
            provider,
            coinType,
            getBalance,
            getAddress,
            setLoadedFirstWallet,
            setLoadingPage,
            setLoadingWallets,
            walletList
          )
        )
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
    apolloClient,
    getBalance,
    getAddress,
    logger
  ])

  const errorMsg = useMemo(() => {
    if (walletError()) return walletError()
    if (uncaughtError) return uncaughtError
    return ''
  }, [uncaughtError, walletError])

  const fetchNextAccount = async (index: number, ct: CoinType) => {
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
          robust: convertAddrToPrefix(address, coinType),
          id: convertAddrToPrefix(data?.address?.id, coinType),
          address: convertAddrToPrefix(address, coinType),
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

  if (loadingPage) return <LoadingScreen />

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
      <AccountsTable
        wallets={wallets}
        loadingWallets={loadingWallets}
        selectAccount={selectAccount}
        showSelectedWallet={showSelectedAccount}
        selectedWalletPath={wallet.path}
      />
      {!loadingWallets && (
        <CreateAccount
          fetchNextAccount={fetchNextAccount}
          keyDerive={keyDerive}
          loginOption={loginOption}
          setError={setUncaughtError}
          accountIdx={wallets.length}
        />
      )}
    </div>
  )
}

type AccountSelectorProps = {
  onSelectAccount: () => void
  showSelectedAccount: boolean
  helperText: string
  title: string
}

AccountSelector.propTypes = {
  onSelectAccount: func.isRequired,
  showSelectedAccount: bool,
  helperText: string.isRequired,
  title: string.isRequired
}

AccountSelector.defaultProps = {
  showSelectedAccount: true
}

export default AccountSelector
