import { Protocol, DelegatedNamespace } from '@glif/filecoin-address'
import { GqlMessage, GqlMessagePending } from '../../customPropTypes'

const isDelegatedWithNamespace = (
  address: string,
  namespace: DelegatedNamespace
): boolean =>
  address
    ? address.slice(1).startsWith(`${Protocol.DELEGATED}${namespace}`)
    : false

// Assumption: any actor that has an ID address and NO robust address is NOT an FEVM actor
// Either the to or the from address must be an eth delegated address for this to return true
export const isFEVMTx = (message: GqlMessage | GqlMessagePending): boolean =>
  message
    ? isDelegatedWithNamespace(message.from.robust, DelegatedNamespace.EVM) ||
      isDelegatedWithNamespace(message.to.robust, DelegatedNamespace.EVM)
    : false
