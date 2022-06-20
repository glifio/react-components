import { Network } from '@glif/filecoin-address'
import type { CID as IPLDNode } from '@glif/filecoin-wallet-provider'
import actorCodeJSON from './actorCodes.json'
import type { BuiltInActorRegistry, BuiltInActorName } from './types'

const actorCodes = actorCodeJSON as BuiltInActorRegistry

export const decodeActorCID = (
  cid: IPLDNode | string
): BuiltInActorName | 'unknown' => {
  const cidStr = typeof cid === 'string' ? cid : cid['/']
  if (!cidStr) throw new Error('Invalid cid passed to decodeActorCID')
  const network = (process.env.NEXT_PUBLIC_COIN_TYPE as Network) || Network.TEST
  const actorName = actorCodes?.[network]?.[cidStr] || 'unknown'
  return actorName
}
