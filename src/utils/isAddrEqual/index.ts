import { CoinType } from '@glif/filecoin-address'
import { Address } from '../../generated/graphql'
import convertAddrToPrefix from '../convertAddrToPrefix'

export const isAddrEqual = (
  address: Address | string,
  address2: Address | string
): boolean => {
  if (!address || !address2) return false

  const id1 = convertAddrToPrefix(
    typeof address === 'string' ? address : address.id,
    CoinType.TEST
  )
  const robust1 = convertAddrToPrefix(
    typeof address === 'string' ? address : address.robust,
    CoinType.TEST
  )
  const id2 = convertAddrToPrefix(
    typeof address2 === 'string' ? address2 : address2.id,
    CoinType.TEST
  )
  const robust2 = convertAddrToPrefix(
    typeof address2 === 'string' ? address2 : address2.robust,
    CoinType.TEST
  )

  return (!!id1 && id1 === id2) || (!!robust1 && robust1 === robust2)
}
