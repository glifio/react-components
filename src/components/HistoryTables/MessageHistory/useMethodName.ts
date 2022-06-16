import { useMemo } from 'react'
import { useActorQuery } from '../../../generated/graphql'
import { getMethodName } from '../methodName'
import { decodeActorCID } from '../../../utils'
import { MessageConfirmedRow, MessagePendingRow } from '../types'
import convertAddrToPrefix from '../../../utils/convertAddrToPrefix'
import { logger } from '../../../logger'

type MessageForMethodNameType =
  | Pick<MessageConfirmedRow, 'actorName' | 'to' | 'cid' | 'method'>
  | (MessagePendingRow & { actorName: string })

export const useMethodName = (
  message: MessageForMethodNameType
): { methodName: string; actorName: string } => {
  const actor = useActorQuery({
    variables: {
      address: convertAddrToPrefix(message?.to.robust || message?.to.id)
    },
    // this means the message came from low confidence query
    // so we have to look up the actor ourselves
    skip: !message?.cid || !!(message?.cid && message?.actorName)
  })

  const actorName = useMemo<string>(() => {
    if (message?.actorName) return message.actorName
    if (!message?.cid || actor.loading || actor.error || !actor.data) return ''
    try {
      return decodeActorCID(actor.data?.actor.Code)
    } catch (e) {
      logger.error(e)
      return 'unknown'
    }
  }, [message?.actorName, actor, message?.cid])

  const methodName = useMemo(() => {
    if (actorName) return getMethodName(actorName, Number(message.method))
    else return '...'
  }, [actorName, message?.method])

  return { methodName, actorName }
}
