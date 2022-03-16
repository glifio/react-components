export default function convertAddrToPrefix(address: string) {
  if (!address) return ''
  return `${process.env.NEXT_PUBLIC_COIN_TYPE}${address.slice(1)}`
}
