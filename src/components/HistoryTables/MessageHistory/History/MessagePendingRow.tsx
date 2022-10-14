import { useMemo } from 'react'
import { FilecoinNumber } from '@glif/filecoin-number'
import PropTypes from 'prop-types'
import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'

import { Badge } from '../../../Layout'
import { SmartLink } from '../../../SmartLink'
import { AddressLink } from '../../../LabeledText/AddressLink'
import { MESSAGE_PENDING_PROP_TYPE } from '../../../../customPropTypes'
import { MessagePending } from '../../../../generated/graphql'
import { useMethodName } from '../hooks/useMethodName'
import { isAddrEqual } from '../../../../utils/isAddrEqual'
import truncateAddress from '../../../../utils/truncateAddress'

// add RelativeTime plugin to Day.js
dayjs.extend(relativeTime.default)

export const MessagePendingRow = ({
  message,
  cidHref,
  inspectingAddress
}: PendingMessageHistoryRowProps) => {
  const fromAddressIsInspecting = useMemo(
    () => isAddrEqual(message.from, inspectingAddress),
    [message.from, inspectingAddress]
  )
  const toAddressIsInspecting = useMemo(
    () => isAddrEqual(message.to, inspectingAddress),
    [message.to, inspectingAddress]
  )
  const methodName = useMethodName(message.to, message.method)
  return (
    <tr>
      <td>
        <SmartLink href={cidHref(message.cid)}>
          {truncateAddress(message.cid)}
        </SmartLink>
      </td>
      <td>{methodName}</td>
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
  message: MessagePending
  cidHref: (cid: string) => string
  inspectingAddress: string
}

MessagePendingRow.propTypes = {
  message: MESSAGE_PENDING_PROP_TYPE.isRequired,
  cidHref: PropTypes.func.isRequired,
  inspectingAddress: PropTypes.string.isRequired
}
