import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { bool, func, number, string } from 'prop-types'
import { CoinType } from '@glif/filecoin-address'
import { FilecoinNumber } from '@glif/filecoin-number'
import LotusRPCEngine from '@glif/filecoin-rpc-client'
import { useApolloClient } from '@apollo/client'
import styled from 'styled-components'

import LoadingScreen from '../LoadingScreen'
import { space } from '../theme'
import { useWalletProvider, Wallet } from '../../services/WalletProvider'
import { useWallet } from '../../services/WalletProvider/useWallet'
import { TESTNET_PATH_CODE } from '../../constants'
import { TABLE, TR, TH, TD } from '../HistoryTables/table'

import createPath, { coinTypeCode } from '../../utils/createPath'
import convertAddrToPrefix from '../../utils/convertAddrToPrefix'
import { COIN_TYPE_PROPTYPE } from '../../customPropTypes'
import { logger } from '../../logger'
import { AddressDocument, AddressQuery } from '../../generated/graphql'
import { Title } from '../HistoryTables/generic'
import { makeFriendlyBalance, truncateAddress } from '../../utils'
import { AddressLink } from '../AddressLink'
import _LoaderGlyph from '../LoaderGlyph'
import { ButtonV2 } from '../Button/V2'
import { StandardBox } from '../Layout'
import { Toggle } from '../InputV2/Toggle'

const LoaderGlyph = styled(_LoaderGlyph)`
  margin-left: ${space()};
`

const CreateWalletContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: ${space()};
`

export const idxFromPath = (path: string): string => {
  return path.split('/')[5]
}

export const Row = styled(TR)`
  margin-left: ${space()};
  &:hover {
    cursor: pointer;

    background-color: var(--purple-light);

    -webkit-transition: background-color 100ms linear;
    -moz-transition: background-color 100ms linear;
    -o-transition: background-color 100ms linear;
    -ms-transition: background-color 100ms linear;
    transition: background-color 100ms linear;
  }
`

const WalletRow = ({
  w,
  selectAccount,
  index
}: {
  w: Wallet
  selectAccount: (i: number) => void
  index: number
}) => {
  return (
    <Row key={w.robust} onClick={() => selectAccount(index)}>
      <TD></TD>
      <TD>{idxFromPath(w.path)}</TD>
      <TD>Account {idxFromPath(w.path)}</TD>
      <TD>
        <AddressLink
          address={convertAddrToPrefix(w.robust)}
          shouldTruncate={false}
        />
      </TD>
      <TD>{makeFriendlyBalance(w.balance, 6, true)}</TD>
      <TD>{convertAddrToPrefix(w.id) || '-'}</TD>
      <TD>{w.path}</TD>
    </Row>
  )
}

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
      if (balance.isGreaterThan(0) && index < 10) {
        // await loadNextWallet(index + 1, provider)
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
      <StandardBox>
        <h2>{title}</h2>
        <p>{helperText}</p>
      </StandardBox>
      <br />
      <TABLE className='narrow'>
        <thead>
          <TR>
            <TH></TH>
            <TH>#</TH>
            <TH>Name</TH>
            <TH>Address</TH>
            <TH>Balance</TH>
            <TH>Id</TH>
            <TH>Path</TH>
          </TR>
        </thead>
        <tbody>
          {wallets.map((w, i) => (
            <WalletRow
              key={w.address}
              w={w}
              selectAccount={selectAccount}
              index={i}
            />
          ))}
          {loadingWallets && (
            <TR>
              <TD></TD>
              <TD>
                <LoaderGlyph />
              </TD>
              <TD>Loading...</TD>
              <TD></TD>
              <TD></TD>
              <TD></TD>
            </TR>
          )}
        </tbody>
      </TABLE>
      {!loadingWallets && (
        <CreateWalletContainer>
          <ButtonV2
            large
            onClick={() =>
              fetchNextAccount(
                wallets.length,
                process.env.NEXT_PUBLIC_COIN_TYPE as CoinType
              )
            }
          >
            Next account
          </ButtonV2>
          <Toggle label='Expert Mode' checked={true} onChange={() => {}} />
        </CreateWalletContainer>
      )}
    </div>
  )
  {
    /* <Card
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
          />
        ))}
        <Create
          errorMsg={errorMsg}
          nextAccountIndex={wallets.length}
          onClick={fetchNextAccount}
          loading={loadingWallets}
          defaultCoinType={coinType}
        />
      </WalletTiles> */
  }
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
