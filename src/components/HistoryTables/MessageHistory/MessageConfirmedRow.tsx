import React, { useMemo } from 'react'
import Link from 'next/link'
import { SubscriptionResult } from '@apollo/client'
import PropTypes from 'prop-types'
import { TR, TD } from '../table'
import { Badge } from '../generic'
import { AddressLink } from '../../AddressLink'
import { MessageConfirmedRow, MESSAGE_CONFIRMED_ROW_PROP_TYPE } from '../types'
import { attoFilToFil } from '../utils'
import { ChainHeadSubscription } from '../../../generated/graphql'
import { useAge } from './useAge'
import { useMethodName } from './useMethodName'
import { isAddrEqual } from '../../../utils/isAddrEqual'

export default function MessageHistoryRow(props: MessageHistoryRowProps) {
  const { message, cidHref, inspectingAddress } = props
  const time = useMemo(() => Date.now(), [])

  const value = useMemo(() => attoFilToFil(message.value), [message.value])
  const fromAddressIsInspecting = useMemo(
    () => isAddrEqual(message.from, inspectingAddress),
    [message.from, inspectingAddress]
  )
  const toAddressIsInspecting = useMemo(
    () => isAddrEqual(message.to, inspectingAddress),
    [message.to, inspectingAddress]
  )
  const { methodName } = useMethodName(message)
  const age = useAge(message, time)

  return (
    <TR>
      <TD>
        <Link href={cidHref(message.cid, message.height)}>
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
        <Badge color='purple' text={methodName} />
      </TD>
      <TD>{message.height}</TD>
      <TD>{age}</TD>
      <TD>
        <AddressLink
          id={message.from.robust ? '' : message.from.id}
          address={message.from.robust}
          disableLink={fromAddressIsInspecting}
          hideCopy
        />
      </TD>
      {props.inspectingAddress && (
        <TD>
          <Badge
            color={toAddressIsInspecting ? 'green' : 'yellow'}
            text={toAddressIsInspecting ? 'IN' : 'OUT'}
          />
        </TD>
      )}
      <TD>
        <AddressLink
          id={message.to.robust ? '' : message.to.id}
          address={message.to.robust}
          disableLink={toAddressIsInspecting}
          hideCopy
        />
      </TD>
      <TD>{value}</TD>
    </TR>
  )
}

type MessageHistoryRowProps = {
  message: MessageConfirmedRow
  cidHref: (cid: string, height?: string) => string
  inspectingAddress: string
  chainHeadSub: SubscriptionResult<ChainHeadSubscription, any>
}

MessageHistoryRow.propTypes = {
  message: MESSAGE_CONFIRMED_ROW_PROP_TYPE,
  cidHref: PropTypes.func.isRequired,
  inspectingAddress: PropTypes.string
}

MessageHistoryRow.defaultProps = {
  inspectingAddress: ''
}
