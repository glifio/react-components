import { accountActorCodes } from './AccountActorCodes'
import { msigActorCodes } from './MultisigActorCodes'
import { cronActorCodes } from './CronActorCodes'
import { minerActorCodes } from './MinerActorCodes'
import { initActorCodes } from './InitActorCodes'
import { paymentChannelActorCodes } from './PaymentChannelActorCodes'
import { powerActorCodes } from './PowerActorCodes'
import { rewardActorCodes } from './RewardActorCodes'
import { verifiedRegistryActorCodes } from './VerifiedRegistryActorCodes'
import { storageMarketActorCodes } from './StorageMarketActorCodes'

export type ActorCode = string

export const getMethodName = (
  actorCode: ActorCode = '',
  methodNum: number
): string => {
  let methodName = ''

  if (actorCode.includes('/multisig')) {
    methodName = msigActorCodes[methodNum]
  } else if (actorCode.includes('/account')) {
    methodName = accountActorCodes[methodNum]
  } else if (actorCode.includes('/init')) {
    methodName = initActorCodes[methodNum]
  } else if (actorCode.includes('/cron')) {
    methodName = cronActorCodes[methodNum]
  } else if (actorCode.includes('/verifiedregistry')) {
    methodName = verifiedRegistryActorCodes[methodNum]
  } else if (actorCode.includes('/reward')) {
    methodName = rewardActorCodes[methodNum]
  } else if (actorCode.includes('/paymentchannel')) {
    methodName = paymentChannelActorCodes[methodNum]
  } else if (actorCode.includes('/storageminer')) {
    methodName = minerActorCodes[methodNum]
  } else if (actorCode.includes('/storagepower')) {
    methodName = powerActorCodes[methodNum]
  } else if (actorCode.includes('/storagemarket')) {
    methodName = storageMarketActorCodes[methodNum]
  } else if (actorCode.includes('/system')) {
    methodName = 'internal'
  } else if (methodNum === 0) {
    methodName = 'send'
  } else {
    methodName = methodNum.toString()
  }

  return methodName
}
