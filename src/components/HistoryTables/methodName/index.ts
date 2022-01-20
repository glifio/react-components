import { msigActorCodes } from './MultisigActorCodes'

export type ActorCode = string

export const getMethodName = (
  actorCode: ActorCode,
  methodNum: number
): string => {
  let methodName = ''

  if (actorCode.includes('/multisig')) {
    methodName = msigActorCodes[methodNum]
  }

  return methodName
}
