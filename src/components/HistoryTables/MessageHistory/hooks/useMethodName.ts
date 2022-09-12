import { useMemo } from 'react'
import { getMethodName } from '@glif/filecoin-actor-utils'

import { useActorQuery } from '../../../../generated/graphql'
import { decodeActorCID } from '../../../../utils'
import { MessageConfirmedRow, MessagePendingRow } from '../../types'
import convertAddrToPrefix from '../../../../utils/convertAddrToPrefix'
import {
  useEnvironment,
  useLogger
} from '../../../../services/EnvironmentProvider'

type MessageForMethodNameType =
  | Pick<MessageConfirmedRow, 'to' | 'cid' | 'method'>
  | (MessagePendingRow & { actorName: string })

export const useMethodName = (
  message: MessageForMethodNameType
): { methodName: string; actorName: string } => {
  const { coinType, networkName } = useEnvironment()
  const logger = useLogger()
  const actor = useActorQuery({
    variables: {
      address: convertAddrToPrefix(
        message?.to.robust || message?.to.id,
        coinType
      )
    }
  })

  const actorName = useMemo<string>(() => {
    if (!message?.cid || actor.loading || actor.error || !actor.data) return ''
    try {
      return decodeActorCID(actor.data?.actor.Code, networkName)
    } catch (e) {
      logger.error(e)
      return 'unknown'
    }
  }, [actor, networkName, message?.cid, logger])

  const methodName = useMemo(() => {
    if (actorName) return getMethodName(actorName, Number(message.method))
    else return '...'
  }, [actorName, message?.method])

  return { methodName, actorName }
}
