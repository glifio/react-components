import { decode } from '@ipld/dag-cbor'
import address from '@glif/filecoin-address'

const bytesToAddress = (payload): string => {
  const addr = new address.Address(payload)
  return address.encode(process.env.NEXT_PUBLIC_COIN_TYPE, addr)
}

export type ExecReturn = {
  id: string
  robust: string
}

export const getAddrFromReceipt = (base64Return: string): ExecReturn => {
  const [cborBytesID, cborBytesRobust] = decode(
    Buffer.from(base64Return, 'base64')
  )
  return {
    robust: bytesToAddress(cborBytesRobust),
    id: bytesToAddress(cborBytesID)
  }
}
