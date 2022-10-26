import { validateAddressString } from '@glif/filecoin-address'
import { utils } from 'ethers'

export const isAddress = (address: string): boolean =>
  isFilAddress(address) || isEthAddress(address)

export const isFilAddress = (address: string): boolean =>
  validateAddressString(address)

export const isEthAddress = (address: string): boolean =>
  utils.isAddress(address)
