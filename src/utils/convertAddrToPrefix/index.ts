import { CoinType } from '@glif/filecoin-address'
import { isFilAddress } from '../isAddress'

export default function convertAddrToPrefix(
  address: string,
  coinType: CoinType
) {
  if (!address) return ''
  return isFilAddress(address) ? `${coinType}${address.slice(1)}` : address
}
