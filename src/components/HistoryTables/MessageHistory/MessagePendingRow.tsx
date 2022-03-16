import React, { useMemo } from 'react'
import { FilecoinNumber } from '@glif/filecoin-number'
import Link from 'next/link'
import PropTypes from 'prop-types'
import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'
import { Badge } from '../generic'
import { TR, TD } from '../table'
import { AddressLink } from '../../AddressLink'
import { MessagePendingRow, MESSAGE_PENDING_ROW_PROP_TYPE } from '../types'
import { useMethodName } from './useMethodName'
import convertAddrToPrefix from '../../../utils/convertAddrToPrefix'

// add RelativeTime plugin to Day.js
dayjs.extend(relativeTime.default)

export default function PendingMessageHistoryRow(
  props: PendingMessageHistoryRowProps
) {
  const { message, cidHref, inspectingAddress } = props
  const fromAddressIsInspecting = useMemo(
    () =>
      message.from.robust === inspectingAddress ||
      message.from.id === inspectingAddress,
    [message.from, inspectingAddress]
  )
  const toAddressIsInspecting = useMemo(
    () =>
      convertAddrToPrefix(message.to.robust) ===
        convertAddrToPrefix(inspectingAddress) ||
      convertAddrToPrefix(message.to.id) ===
        convertAddrToPrefix(inspectingAddress),
    [message.to, inspectingAddress]
  )
  const { methodName } = useMethodName({ ...message, actorName: '' })
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
      {props.inspectingAddress && (
        <TD>
          <Badge color='purple' text={methodName} />
        </TD>
      )}
      <TD>(Pending)</TD>
      <TD>(Pending)</TD>
      <TD>
        <AddressLink
          id={message.from.robust ? '' : message.from.id}
          address={message.from.robust}
          disableLink={!fromAddressIsInspecting}
          hideCopy
        />
      </TD>
      <TD>
        <Badge
          color={toAddressIsInspecting ? 'green' : 'yellow'}
          text={toAddressIsInspecting ? 'IN' : 'OUT'}
        />
      </TD>
      <TD>
        <AddressLink
          id={message.to.robust ? '' : message.to.id}
          address={message.to.robust}
          disableLink={toAddressIsInspecting}
          hideCopy
        />
      </TD>
      <TD>{new FilecoinNumber(message.value, 'attofil').toFil()} FIL</TD>
    </TR>
  )
}

type PendingMessageHistoryRowProps = {
  message: MessagePendingRow
  cidHref: (cid: string, height?: string) => string
  inspectingAddress: string
}

PendingMessageHistoryRow.propTypes = {
  message: MESSAGE_PENDING_ROW_PROP_TYPE.isRequired,
  cidHref: PropTypes.func.isRequired,
  inspectingAddress: PropTypes.string
}

PendingMessageHistoryRow.defaultProps = {
  inspectingAddress: ''
}
