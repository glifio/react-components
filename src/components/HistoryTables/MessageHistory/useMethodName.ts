import { useMemo } from 'react'
import { useActorQuery } from '../../../generated/graphql'
import { getMethodName } from '../methodName'
import { decodeActorCID } from '../../../utils'
import { MessageConfirmedRow, MessagePendingRow } from '../types'

export const useMethodName = (
  message: MessageConfirmedRow | (MessagePendingRow & { actorName: string })
) => {
  const actor = useActorQuery({
    variables: { address: message?.to.robust || message?.to.id },
    // this means the message came from low confidence query
    // so we have to look up the actor ourselves
    skip: message?.cid && !!message.actorName
  })

  const methodName = useMemo(() => {
    if (message?.actorName) {
      return getMethodName(message.actorName, Number(message.method))
    } else if (message?.cid && !(actor.loading || actor.error)) {
      return getMethodName(
        decodeActorCID(actor.data?.actor.Code),
        Number(message.method)
      )
    } else return '...'
  }, [message?.actorName, message?.method, message?.cid, actor])

  return methodName
}
