import {
  validateAddressString,
  checkAddressString,
  Protocol
} from '@glif/filecoin-address'
import { utils } from 'ethers'

export const isAddress = (address: string): boolean =>
  address && (isFilAddress(address) || isEthAddress(address))

export const isFilAddress = (address: string): boolean =>
  address && validateAddressString(address)

export const isDelegatedAddress = (address: string): boolean => {
  if (!address) return false
  try {
    const { protocol } = checkAddressString(address)
    return protocol === Protocol.DELEGATED
  } catch {
    return false
  }
}

export const isEthAddress = (address: string): boolean =>
  address && utils.isAddress(address)
