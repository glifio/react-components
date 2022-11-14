import {
  validateAddressString,
  checkAddressString,
  Protocol
} from '@glif/filecoin-address'
import { utils } from 'ethers'

export const isAddress = (address: string): boolean =>
  isFilAddress(address) || isEthAddress(address)

export const isFilAddress = (address: string): boolean =>
  validateAddressString(address)

export const isDelegatedAddress = (address: string): boolean => {
  try {
    const { protocol } = checkAddressString(address)
    return protocol === Protocol.DELEGATED
  } catch {
    return false
  }
}

export const isEthAddress = (address: string): boolean =>
  utils.isAddress(address)