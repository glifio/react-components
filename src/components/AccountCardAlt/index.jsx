import React from 'react'
import useSWR from 'swr'
import LotusRPCEngine from '@glif/filecoin-rpc-client'
import { FilecoinNumber } from '@glif/filecoin-number'
import { string, number, bool, func } from 'prop-types'
import { ADDRESS_PROPTYPE } from '../../customPropTypes'
import Box from '../Box'
import Glyph from '../Glyph'
import Card from '../Card'
import { Text, Title } from '../Typography'
import makeFriendlyBalance from '../../utils/makeFriendlyBalance'
import { MAINNET_JSON_RPC_ENDPOINT } from '../../constants'
import Button from '../Button'
import AccountTitle from './AccountTitle'
import { AddressLink } from '../LabeledText/AddressLink'

const calcGlyphAcronym = (index, nDefaultWallets) => {
  if (index < nDefaultWallets) return index.toString()
  return 'Cr'
}

// allows you to optionally pass a balance for future wallet upgrades
// if you dont pass a balance, it will poll for you
const AccountCardAlt = ({
  address,
  balance,
  index,
  selected,
  onClick,
  legacy,
  jsonRpcEndpoint,
  path,
  nDefaultWallets
}) => {
  const { data, error: balanceFetchingError } = useSWR(
    !balance ? [address] : null,
    async walletAddress => {
      const lCli = new LotusRPCEngine({
        apiAddress: jsonRpcEndpoint || MAINNET_JSON_RPC_ENDPOINT
      })

      const bal = await lCli.request('WalletBalance', walletAddress)
      const filBal = new FilecoinNumber(bal, 'attofil')
      return makeFriendlyBalance(filBal, 6, true)
    }
  )

  const balanceForUI = balance || data

  return (
    <Card
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      width='100%'
      height={11}
      border={1}
      borderRadius={2}
      p={3}
      bg={selected ? 'card.account.background' : 'hsla(0, 0%, 90%, 0)'}
      color={selected ? 'card.account.color' : 'colors.core.black'}
    >
      <Box display='flex' alignItems='center' justifyContent='flex-start'>
        <Glyph
          mr={3}
          color={selected ? 'card.account.color' : 'colors.core.black'}
          acronym={calcGlyphAcronym(index, nDefaultWallets)}
        />
        <AccountTitle
          index={index}
          legacy={legacy}
          path={path}
          nDefaultWallets={nDefaultWallets}
        />
      </Box>
      <Box display='flex' justifyContent='center' fontSize={4}>
        <AddressLink
          address={address}
          color={selected ? 'var(--white)' : 'var(--purple-medium)'}
        />
      </Box>
      <Box
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
        alignItems='flex-end'
      >
        <Box display='flex' flexDirection='column'>
          {balanceFetchingError ? (
            <Text fontSize={3} my={0}>
              Error fetching balance
            </Text>
          ) : (
            <>
              <Text fontSize={3} my={0}>
                Balance
              </Text>
              <Title fontSize={4} my={0}>
                {balanceForUI} FIL
              </Title>
            </>
          )}
        </Box>
        {selected ? (
          <Button variant='tertiary' title='Select' onClick={onClick} />
        ) : (
          <Button variant='secondary' title='Select' onClick={onClick} />
        )}
      </Box>
    </Card>
  )
}

AccountCardAlt.propTypes = {
  address: ADDRESS_PROPTYPE.isRequired,
  index: number.isRequired,
  path: string.isRequired,
  balance: string,
  onClick: func.isRequired,
  selected: bool,
  jsonRpcEndpoint: string,
  legacy: bool,
  nDefaultWallets: number
}

AccountCardAlt.defaultProps = {
  selected: false,
  legacy: false,
  nDefaultWallets: 5
}

export default AccountCardAlt
