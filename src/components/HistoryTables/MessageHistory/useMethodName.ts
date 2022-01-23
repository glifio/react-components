import { useMemo } from 'react'
import { useActorQuery } from '../../../generated/graphql'
import { getMethodName } from '../methodName'
import { decodeActorCID } from '../../../utils'
import { MessageConfirmedRow, MessagePendingRow } from '../types'

export const useMethodName = (
  message: MessageConfirmedRow | (MessagePendingRow & { actorName: string })
) => {
  const actor = useActorQuery({
    variables: { address: message.to.robust || message.to.id },
    skip: !!message?.actorName
  })

  const methodName = useMemo(() => {
    if (message.actorName) {
      return getMethodName(message.actorName, Number(message.method))
    } else if (!(actor.loading || actor.error)) {
      return getMethodName(
        decodeActorCID(actor.data?.actor.Code),
        Number(message.method)
      )
    } else return '...'
  }, [message.actorName, message.method, actor])

  return methodName
}
