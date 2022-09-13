import { getActorName, getMethodName } from '@glif/filecoin-actor-utils'

import { useActorQuery } from '../../../../generated/graphql'
import { MessageConfirmedRow, MessagePendingRow } from '../../types'
import convertAddrToPrefix from '../../../../utils/convertAddrToPrefix'
import { useEnvironment } from '../../../../services/EnvironmentProvider'

type MessageForMethodNameType =
  | Pick<MessageConfirmedRow, 'to' | 'cid' | 'method'>
  | (MessagePendingRow & { actorName: string })

export const useMethodName = (
  message: MessageForMethodNameType
): { methodName: string; actorName: string } => {
  const { coinType, networkName } = useEnvironment()

  // Get actor data from GraphQL
  const { data } = useActorQuery({
    variables: {
      address: convertAddrToPrefix(
        message?.to.robust || message?.to.id,
        coinType
      )
    }
  })

  // Resolve actor code, name and message name
  const actorCode = data?.actor?.Code
  const actorName = actorCode ? getActorName(actorCode, networkName) : null
  const methodName = actorName ? getMethodName(actorName, Number(message.method)) : null

  return { methodName: methodName ?? '...', actorName: actorName ?? 'unknown' }
}
