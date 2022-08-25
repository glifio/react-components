import base32Decode from 'base32-decode'
import type { CID as IPLDNode } from '@glif/filecoin-wallet-provider'
import { actorCodes } from '../../generated/actorCodes'
import type { BuiltInActorName } from '../../customPropTypes'
import { Network } from '../../services/EnvironmentProvider'

export const decodeActorCID = (
  cid: IPLDNode | string,
  network: Network
): BuiltInActorName | 'unknown' => {
  const cidStr = typeof cid === 'string' ? cid : cid['/']
  if (!cidStr) throw new Error('Invalid cid passed to decodeActorCID')
  const actorName = actorCodes?.[network]?.[cidStr]
  if (actorName) {
    return actorName
  }

  try {
    const decoded = base32Decode(cidStr.slice(1).toUpperCase(), 'RFC4648')
    const actorCode = new TextDecoder('utf-8').decode(decoded.slice(4))
    if (!actorCode.includes('fil/')) {
      return 'unknown'
    }
    return actorCode.split('/')[2] as BuiltInActorName
  } catch {
    return 'unknown'
  }
}
