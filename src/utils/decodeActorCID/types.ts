import { Network } from '@glif/filecoin-address'
import type { CID as IPLDNode } from '@glif/filecoin-wallet-provider'
import { CID } from 'multiformats/cid'

export type SystemActorState = {
  BuiltinActors: IPLDNode
}

export type BuiltInActorName =
  | 'system'
  | 'init'
  | 'cron'
  | 'account'
  | 'storagepower'
  | 'storageminer'
  | 'storagemarket'
  | 'paymentchannel'
  | 'multisig'
  | 'reward'
  | 'verifiedregistry'

export type BuiltInActorRecord = [BuiltInActorName, CID]

export type BuiltInActorRegistryReturn = BuiltInActorRecord[]

export type BuiltInActorNetworkRegistry = Record<string, BuiltInActorName>

export type BuiltInActorRegistry = Record<Network, BuiltInActorNetworkRegistry>
