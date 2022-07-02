import React, { useEffect, useMemo, useState } from 'react'
import { bool, func, number, string } from 'prop-types'
import { CoinType } from '@glif/filecoin-address'
import styled from 'styled-components'
import { useApolloClient } from '@apollo/client'

import AccountCardAlt from '../AccountCardAlt'
import Box from '../Box'
import Card from '../Card'
import Glyph from '../Glyph'
import { Title } from '../Typography'
import LoadingScreen from '../LoadingScreen'
import { space } from '../theme'
import { useWalletProvider, Wallet } from '../../services/WalletProvider'
import useWallet from '../../services/WalletProvider/useWallet'
import HelperText from './HelperText'
import Create from './Create'
import { TESTNET_PATH_CODE } from '../../constants'

import createPath, { coinTypeCode } from '../../utils/createPath'
import convertAddrToPrefix from '../../utils/convertAddrToPrefix'
import { COIN_TYPE_PROPTYPE } from '../../customPropTypes'
import { logger } from '../../logger'
import { AddressDocument, AddressQuery } from '../../generated/graphql'

const WalletTiles = styled.div`
  display: grid;
  gap: ${space()};
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`

const AccountSelector = ({
  onSelectAccount,
  showSelectedAccount,
  helperText,
  title,
  coinType,
  nWalletsToLoad,
  test,
  isProd
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
  const wallet = useWallet()
  const [loadingAccounts, setLoadingAccounts] = useState(false)
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
  const apolloClient = useApolloClient()

  const [loadedFirstNWallets, setLoadedFirstNWallets] = useState(false)

  // automatically generate the first 5 wallets for the user to select from to avoid confusion for non tech folks
  useEffect(() => {
    const loadFirstNWallets = async () => {
      if (wallets.length < nWalletsToLoad) {
        try {
          const provider = await getProvider()

          if (provider) {
            const addresses = await provider.wallet.getAccounts(
              wallets.length,
              nWalletsToLoad,
              coinType
            )

            await Promise.all(
              addresses.map(async (address, i) => {
                const balance = await provider.getBalance(address)
                const { data } = await apolloClient.query<AddressQuery>({
                  query: AddressDocument,
                  variables: {
                    address
                  }
                })

                const w: Wallet = {
                  balance,
                  robust: convertAddrToPrefix(address),
                  id: convertAddrToPrefix(data?.address?.id),
                  address: convertAddrToPrefix(address),
                  path: createPath(
                    coinTypeCode(coinType),
                    Number(i) + Number(wallets.length)
                  )
                }

                walletList([w])
              })
            )
            setLoadingPage(false)
          }
        } catch (err) {
          logger.error(
            err instanceof Error
              ? err.message
              : 'Error loading first N Wallets',
            'AccountSelector'
          )
          setUncaughtError(err.message)
          setLoadingPage(false)
        }
      } else {
        setLoadedFirstNWallets(true)
        setLoadingPage(false)
      }
    }

    if (!loadedFirstNWallets) {
      setLoadedFirstNWallets(true)
      loadFirstNWallets()
    }
  }, [
    getProvider,
    walletProvider,
    loadedFirstNWallets,
    wallets,
    walletList,
    coinType,
    nWalletsToLoad,
    apolloClient
  ])

  const errorMsg = useMemo(() => {
    if (walletError()) return walletError()
    if (uncaughtError) return uncaughtError
    return ''
  }, [uncaughtError, walletError])

  const fetchNextAccount = async (index: number, ct: CoinType) => {
    setLoadingAccounts(true)
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
    setLoadingAccounts(false)
  }

  if (loadingPage) return <LoadingScreen height='100vh' />

  return (
    <>
      <Card
        display='block'
        border='none'
        width='100%'
        mb={space()}
        backgroundColor='blue.muted700'
      >
        <Box display='flex' alignItems='center'>
          <Glyph
            acronym='Ac'
            bg='core.primary'
            borderColor='core.primary'
            color='core.white'
          />
          <Title ml={2} color='core.primary'>
            {title}
          </Title>
        </Box>
        <Box mt={5}>
          <HelperText text={helperText} />
        </Box>
      </Card>
      <WalletTiles>
        {wallets.map((w, i) => (
          <AccountCardAlt
            key={w.address}
            onClick={() => {
              switchWallet(i)
              onSelectAccount()
            }}
            address={w.address}
            index={Number(w.path.split('/')[5])}
            selected={showSelectedAccount && w.address === wallet.address}
            legacy={isProd && w.path.split('/')[2] === `${TESTNET_PATH_CODE}'`}
            path={w.path}
            // This is a hack to make testing the UI easier
            // its hard to mock SWR + balance fetcher in the AccountCardAlt
            // so we pass a manual balance to not rely on SWR for testing
            balance={test ? '1' : null}
            jsonRpcEndpoint={lotusApiAddr}
            nDefaultWallets={nWalletsToLoad}
          />
        ))}
        <Create
          errorMsg={errorMsg}
          nextAccountIndex={wallets.length}
          onClick={fetchNextAccount}
          loading={loadingAccounts}
          defaultCoinType={coinType}
        />
      </WalletTiles>
    </>
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
