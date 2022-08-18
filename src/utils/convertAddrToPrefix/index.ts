import { CoinType } from '@glif/filecoin-address'

export default function convertAddrToPrefix(
  address: string,
  coinType: CoinType
) {
  if (!address) return ''
  return `${coinType}${address.slice(1)}`
}
