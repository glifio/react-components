import React, { useMemo } from 'react'
import { FilecoinNumber } from '@glif/filecoin-number'
import PropTypes from 'prop-types'
import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'
import { Badge } from '../../../Layout'
import { SmartLink } from '../../../SmartLink'
import { AddressLink } from '../../../LabeledText/AddressLink'
import { MessagePendingRow, MESSAGE_PENDING_ROW_PROP_TYPE } from '../../types'
import { useMethodName } from '../hooks/useMethodName'
import { isAddrEqual } from '../../../../utils/isAddrEqual'
import truncateAddress from '../../../../utils/truncateAddress'

// add RelativeTime plugin to Day.js
dayjs.extend(relativeTime.default)

export default function PendingMessageHistoryRow(
  props: PendingMessageHistoryRowProps
) {
  const { message, cidHref, inspectingAddress } = props
  const fromAddressIsInspecting = useMemo(
    () => isAddrEqual(message.from, inspectingAddress),
    [message.from, inspectingAddress]
  )
  const toAddressIsInspecting = useMemo(
    () => isAddrEqual(message.to, inspectingAddress),
    [message.to, inspectingAddress]
  )
  const { methodName } = useMethodName({ ...message, actorName: '' })
  return (
    <tr>
      <td>
        <SmartLink href={cidHref(message.cid)}>
          {truncateAddress(message.cid)}
        </SmartLink>
      </td>
      {props.inspectingAddress && (
        <td>
          <Badge color='purple' text={methodName} />
        </td>
      )}
      <td>(Pending)</td>
      <td>(Pending)</td>
      <td>
        <AddressLink
          id={message.from.id}
          address={message.from.robust}
          disableLink={fromAddressIsInspecting}
          hideCopy
        />
      </td>
      <td>
        <Badge
          color={toAddressIsInspecting ? 'green' : 'yellow'}
          text={toAddressIsInspecting ? 'IN' : 'OUT'}
        />
      </td>
      <td>
        <AddressLink
          id={message.to.id}
          address={message.to.robust}
          disableLink={toAddressIsInspecting}
          hideCopy
        />
      </td>
      <td>{new FilecoinNumber(message.value, 'attofil').toFil()} FIL</td>
    </tr>
  )
}

type PendingMessageHistoryRowProps = {
  message: MessagePendingRow
  cidHref: (cid: string, height?: number) => string
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
