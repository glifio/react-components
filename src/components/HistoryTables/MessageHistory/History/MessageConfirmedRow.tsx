import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Badge } from '../../../Layout'
import { SmartLink } from '../../../SmartLink'
import { AddressLink } from '../../../LabeledText/AddressLink'
import { GRAPHQL_MESSAGES_MSG_PROPTYPE } from '../../../../customPropTypes'
import { MessageConfirmed } from '../../../../generated/graphql'
import { attoFilToFil } from '../../utils'
import { useAge } from '../../../../utils/useAge'
import { useMethodName } from '../hooks/useMethodName'
import { isAddrEqual } from '../../../../utils/isAddrEqual'
import truncateAddress from '../../../../utils/truncateAddress'

export const MessageConfirmedRow = ({
  message,
  cidHref,
  inspectingAddress
}: MessageConfirmedRowProps) => {
  const value = useMemo(() => attoFilToFil(message.value), [message.value])
  const fromAddressIsInspecting = useMemo(
    () => isAddrEqual(message.from, inspectingAddress),
    [message.from, inspectingAddress]
  )
  const toAddressIsInspecting = useMemo(
    () => isAddrEqual(message.to, inspectingAddress),
    [message.to, inspectingAddress]
  )
  const methodName = useMethodName(message.to, message.method)
  const { age } = useAge(message?.height)

  return (
    <tr>
      <td>
        <SmartLink href={cidHref(message.cid)}>
          {truncateAddress(message.cid)}
        </SmartLink>
      </td>
      <td>{methodName}</td>
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
      <td>{value}</td>
    </tr>
  )
}

type MessageConfirmedRowProps = {
  message: MessageConfirmed
  cidHref: (cid: string) => string
  inspectingAddress: string
}

MessageConfirmedRow.propTypes = {
  message: GRAPHQL_MESSAGES_MSG_PROPTYPE.isRequired,
  cidHref: PropTypes.func.isRequired,
  inspectingAddress: PropTypes.string.isRequired
}
