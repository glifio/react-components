import { Address } from '../../generated/graphql'
import convertAddrToPrefix from '../convertAddrToPrefix'

export const isAddrEqual = (
  address: Address,
  address2: Address | string
): boolean => {
  if (!address || !address2) return false

  const id1 = convertAddrToPrefix(address.id)
  const robust1 = convertAddrToPrefix(address.robust)
  const id2 = convertAddrToPrefix(
    typeof address2 === 'string' ? address2 : address2.id
  )
  const robust2 = convertAddrToPrefix(
    typeof address2 === 'string' ? address2 : address2.robust
  )

  return (!!id1 && id1 === id2) || (!!robust1 && robust1 === robust2)
}
