import { Address } from '../../generated/graphql'
import convertAddrToPrefix from '../convertAddrToPrefix'

export const isAddrEqual = (
  address: Address,
  address2: Address | string
): boolean => {
  if (!address || !address2) return false

  if (typeof address2 === 'string') {
    return (
      convertAddrToPrefix(address2) === convertAddrToPrefix(address.id) ||
      convertAddrToPrefix(address2) === convertAddrToPrefix(address.robust)
    )
  }

  return (
    convertAddrToPrefix(address2.id) === convertAddrToPrefix(address.id) ||
    convertAddrToPrefix(address2.robust) === convertAddrToPrefix(address.robust)
  )
}
