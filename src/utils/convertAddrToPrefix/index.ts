import { CoinType } from '@glif/filecoin-address'

export default function convertAddrToPrefix(address: string) {
  if (!address) return ''
  return `${process.env.NEXT_PUBLIC_COIN_TYPE || CoinType.TEST}${address.slice(
    1
  )}`
}
