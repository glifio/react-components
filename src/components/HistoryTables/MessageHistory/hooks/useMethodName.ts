import { useMemo } from 'react'
import { useActorQuery } from '../../../../generated/graphql'
import { getMethodName } from '../../methodName'
import { decodeActorCID } from '../../../../utils'
import { MessageConfirmedRow, MessagePendingRow } from '../../types'
import convertAddrToPrefix from '../../../../utils/convertAddrToPrefix'
import { logger } from '../../../../logger'

type MessageForMethodNameType =
  | Pick<MessageConfirmedRow, 'to' | 'cid' | 'method'>
  | (MessagePendingRow & { actorName: string })

export const useMethodName = (
  message: MessageForMethodNameType
): { methodName: string; actorName: string } => {
  const actor = useActorQuery({
    variables: {
      address: convertAddrToPrefix(message?.to.robust || message?.to.id)
    }
  })

  const actorName = useMemo<string>(() => {
    if (!message?.cid || actor.loading || actor.error || !actor.data) return ''
    try {
      return decodeActorCID(actor.data?.actor.Code)
    } catch (e) {
      logger.error(e)
      return 'unknown'
    }
  }, [actor, message?.cid])

  const methodName = useMemo(() => {
    if (actorName) return getMethodName(actorName, Number(message.method))
    else return '...'
  }, [actorName, message?.method])

  return { methodName, actorName }
}
