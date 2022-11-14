import { Protocol, DelegatedNamespace } from '@glif/filecoin-address'
import { GqlMessage, GqlMessagePending } from '../../customPropTypes'

const isDelegatedWithNamespace = (
  address: string,
  namespace: DelegatedNamespace
): boolean => {
  const addrWithoutCoinType = address.slice(1)
  return addrWithoutCoinType.startsWith(`${Protocol.DELEGATED}${namespace}`)
}

// Assumption: any actor that has an ID address and _no_ robust address is NOT an FEVM actor
export const isFEVMTx = (message: GqlMessage | GqlMessagePending): boolean => {
  if (!message) return false
  // either the to or the from address must be an eth delegated address for this to return true
  return (
    isDelegatedWithNamespace(message.from?.robust, DelegatedNamespace.EVM) ||
    isDelegatedWithNamespace(message.to?.robust, DelegatedNamespace.EVM)
  )
}
