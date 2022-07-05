import { Address } from '../../generated/graphql'
import { isAddrEqual } from '../isAddrEqual'

export const isAddressSigner = (
  address: Address,
  signers: Address[]
): boolean => signers.some(signer => isAddrEqual(signer, address))
