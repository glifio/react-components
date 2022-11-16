import { useMemo } from 'react'
import { FilecoinNumber } from '@glif/filecoin-number'
import PropTypes from 'prop-types'
import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'

import { Badge } from '../../../Layout'
import { SmartLink } from '../../../SmartLink'
import { AddressLink } from '../../../LabeledText/AddressLink'
import {
  GqlMessagePending,
  GRAPHQL_MESSAGE_PENDING_PROPTYPE
} from '../../../../customPropTypes'
import { useMethodName } from '../hooks/useMethodName'
import { isAddrEqual } from '../../../../utils/isAddrEqual'
import { truncateString } from '../../../../utils/truncateString'

// add RelativeTime plugin to Day.js
dayjs.extend(relativeTime.default)

export const MessagePendingRow = ({
  message,
  txIDHref,
  inspectingAddress
}: MessagePendingRowProps) => {
  const fromAddressIsInspecting = useMemo(
    () => isAddrEqual(message.from, inspectingAddress),
    [message.from, inspectingAddress]
  )
  const toAddressIsInspecting = useMemo(
    () => isAddrEqual(message.to, inspectingAddress),
    [message.to, inspectingAddress]
  )
  const methodName = useMethodName(message.to, message.method, message.params)
  return (
    <tr>
      <td>
        <SmartLink href={txIDHref(message.cid)}>
          {truncateString(message.cid)}
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

type MessagePendingRowProps = {
  message: GqlMessagePending
  txIDHref: (txID: string) => string
  inspectingAddress: string
}

MessagePendingRow.propTypes = {
  message: GRAPHQL_MESSAGE_PENDING_PROPTYPE.isRequired,
  txIDHref: PropTypes.func.isRequired,
  inspectingAddress: PropTypes.string.isRequired
}
