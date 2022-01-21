import React, { useMemo } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'
import { TR, TD } from '../table'
import { Badge } from '../generic'
import { AddressWOptionalLink } from '../../Link/SmartLink'
import { MessageConfirmedRow, MESSAGE_CONFIRMED_ROW_PROP_TYPE } from '../types'
import { attoFilToFil, getTotalCostShort } from '../utils'

// add RelativeTime plugin to Day.js
dayjs.extend(relativeTime.default)

export default function MessageHistoryRow(props: MessageHistoryRowProps) {
  const { message, time, cidHref, addressHref, inspectingAddress } = props
  const value = useMemo(() => attoFilToFil(message.value), [message.value])
  const totalCost = useMemo(() => getTotalCostShort(message), [message])
  const incoming = useMemo(
    () => message.to.robust === inspectingAddress,
    [message.to.robust, inspectingAddress]
  )
  const age = useMemo(
    () => dayjs.unix(message.block.Timestamp).from(time),
    [message.block.Timestamp, time]
  )

  return (
    <TR>
      <TD>
        <Link href={cidHref(message.cid)}>
          <a
            style={{
              display: 'inline-block',
              maxWidth: '10rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {message.cid.slice()}
          </a>
        </Link>
      </TD>
      <TD>
        <Badge color='purple'>{message.methodName.toUpperCase()}</Badge>
      </TD>
      <TD>{message.height}</TD>
      <TD>{age}</TD>
      <TD>
        <AddressWOptionalLink
          address={message.from.robust}
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
          address={message.to.robust}
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
