import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Badge } from '../../../Layout'
import { SmartLink } from '../../../SmartLink'
import { AddressLink } from '../../../LabeledText/AddressLink'
import {
  MessageConfirmedRow,
  MESSAGE_CONFIRMED_ROW_PROP_TYPE
} from '../../types'
import { attoFilToFil } from '../../utils'
import { useAge } from '../hooks/useAge'
import { useMethodName } from '../hooks/useMethodName'
import { isAddrEqual } from '../../../../utils/isAddrEqual'
import truncateAddress from '../../../../utils/truncateAddress'

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
    <tr>
      <td>
        <SmartLink href={cidHref(message.cid)}>
          {truncateAddress(message.cid)}
        </SmartLink>
      </td>
      <td>
        <Badge color='purple' text={methodName} />
      </td>
      <td>{message.height}</td>
      <td>{age}</td>
      <td>
        <AddressLink
          id={message.from.id}
          address={message.from.robust}
          disableLink={fromAddressIsInspecting}
          hideCopy
        />
      </td>
      {props.inspectingAddress && (
        <td>
          <Badge
            color={toAddressIsInspecting ? 'green' : 'yellow'}
            text={toAddressIsInspecting ? 'IN' : 'OUT'}
          />
        </td>
      )}
      <td>
        <AddressLink
          id={message.to.id}
          address={message.to.robust}
          disableLink={toAddressIsInspecting}
          hideCopy
        />
      </td>
      <td>{value}</td>
    </tr>
  )
}

type MessageHistoryRowProps = {
  message: MessageConfirmedRow
  cidHref: (cid: string, height?: number) => string
  inspectingAddress: string
}

MessageHistoryRow.propTypes = {
  message: MESSAGE_CONFIRMED_ROW_PROP_TYPE,
  cidHref: PropTypes.func.isRequired,
  inspectingAddress: PropTypes.string
}

MessageHistoryRow.defaultProps = {
  inspectingAddress: ''
}
