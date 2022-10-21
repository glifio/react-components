import { decode } from '@ipld/dag-cbor'
import { fromString } from 'uint8arrays'
import address, { CoinType } from '@glif/filecoin-address'

const bytesToAddress = (payload, coinType: CoinType): string => {
  const addr = new address.Address(payload)
  return address.encode(coinType, addr)
}

export type ExecReturn = {
  id: string
  robust: string
}

export const getAddrFromReceipt = (
  base64Return: string,
  coinType: CoinType
): ExecReturn => {
  const [cborBytesID, cborBytesRobust] = decode<[Uint8Array, Uint8Array]>(
    fromString(base64Return, 'base64')
  )
  return {
    robust: bytesToAddress(cborBytesRobust, coinType),
    id: bytesToAddress(cborBytesID, coinType)
  }
}
