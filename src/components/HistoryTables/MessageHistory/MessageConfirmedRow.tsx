import React, { useMemo } from 'react'
import Link from 'next/link'
import { SubscriptionResult } from '@apollo/client'
import PropTypes from 'prop-types'
import { TR, TD } from '../table'
import { Badge } from '../generic'
import { AddressWOptionalLink } from '../../Link/SmartLink'
import { MessageConfirmedRow, MESSAGE_CONFIRMED_ROW_PROP_TYPE } from '../types'
import { attoFilToFil, getTotalCostShort } from '../utils'
import { getMethodName } from '../methodName'
import { decodeActorCID } from '../../../utils'
import {
  ChainHeadSubscription,
  useActorQuery
} from '../../../generated/graphql'
import { useAge } from './useAge'

export default function MessageHistoryRow(props: MessageHistoryRowProps) {
  const {
    message,
    time,
    cidHref,
    addressHref,
    inspectingAddress,
    chainHeadSub
  } = props
  const value = useMemo(() => attoFilToFil(message.value), [message.value])
  const totalCost = useMemo(() => getTotalCostShort(message), [message])
  const incoming = useMemo(
    () => message.to.robust === inspectingAddress,
    [message.to.robust, inspectingAddress]
  )

  const actor = useActorQuery({
    variables: { address: message.to.robust || message.to.id }
  })

  const age = useAge(chainHeadSub, message, time)

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

  return (
    <TR>
      <TD>
        <Link href={cidHref(message.cid)}>
          <a
            style={{
              display: 'inline-block',
              maxWidth: '8rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {message.cid.slice()}
          </a>
        </Link>
      </TD>
      <TD>
        <Badge color='purple'>{methodName.toUpperCase()}</Badge>
      </TD>
      <TD>{message.height}</TD>
      <TD>{age}</TD>
      <TD>
        <AddressWOptionalLink
          address={message.from?.robust || message.from.id}
          addressHref={addressHref}
          inspectingAddress={inspectingAddress}
        />
      </TD>
      <TD>
        <Badge color={incoming ? 'green' : 'yellow'}>
          {incoming ? 'IN' : 'OUT'}
        </Badge>
      </TD>
      <TD>
        <AddressWOptionalLink
          address={message.to?.robust || message.to.id}
          addressHref={addressHref}
          inspectingAddress={inspectingAddress}
        />
      </TD>
      <TD>{value}</TD>
      <TD>{totalCost}</TD>
    </TR>
  )
}

type MessageHistoryRowProps = {
  message: MessageConfirmedRow
  time: number
  cidHref: (cid: string) => string
  addressHref: (address: string) => string
  inspectingAddress: string
  chainHeadSub: SubscriptionResult<ChainHeadSubscription, any>
}

MessageHistoryRow.propTypes = {
  message: MESSAGE_CONFIRMED_ROW_PROP_TYPE,
  time: PropTypes.number.isRequired,
  cidHref: PropTypes.func.isRequired,
  addressHref: PropTypes.func.isRequired,
  inspectingAddress: PropTypes.string
}

MessageHistoryRow.defaultProps = {
  inspectingAddress: ''
}
