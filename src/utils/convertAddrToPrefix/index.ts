export default function convertAddrToPrefix(address: string) {
  return `${process.env.NEXT_PUBLIC_COIN_TYPE}${address.slice(1)}`
}
