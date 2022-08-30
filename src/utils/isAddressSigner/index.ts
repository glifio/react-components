import { Address } from '../../generated/graphql'
import { isAddrEqual } from '../isAddrEqual'

export const isAddressSigner = (
  address: Address,
  signers: Array<Address | string>
): boolean => signers.some(signer => isAddrEqual(address, signer))
