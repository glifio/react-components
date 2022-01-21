import { useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Box from '../../Box'
import MessageConfirmedRow from './MessageConfirmedRow'
import MessagePendingRow from './MessagePendingRow'
import { MessageRowColumnTitles } from './MessageRowColumnTitles'
import { ADDRESS_PROPTYPE } from '../../../customPropTypes'
import ButtonV2 from '../../Button/V2'
import { TABLE } from '../table'
import { useAllMessages } from '../useAllMessages'

type MessageHistoryTableProps = {
  address: string
  offset?: number
  // allows custom navigation
  addressHref: (address: string) => string
  cidHref: (cid: string) => string
}

const DEFAULT_LIMIT = 10

export default function MessageHistoryTable(props: MessageHistoryTableProps) {
  const [time, setTime] = useState(Date.now())

  const { messages, pendingMsgs, loading, error, fetchMore } = useAllMessages(
    props.address,
    props.offset
  )

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000)
    return () => clearInterval(interval)
  })

  const lastPage = useMemo(
    () => messages?.length < DEFAULT_LIMIT,
    [messages?.length]
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :( {error.message}</p>

  return (
    <Box>
      <TABLE>
        <MessageRowColumnTitles />
        <tbody>
          {pendingMsgs?.map(message => (
            <MessagePendingRow
              key={message.cid}
              message={message}
              cidHref={props.cidHref}
              addressHref={props.addressHref}
              inspectingAddress={props.address}
            />
          ))}
          {messages?.map(message => (
            <MessageConfirmedRow
              key={message.cid}
              message={message}
              time={time}
              cidHref={props.cidHref}
              addressHref={props.addressHref}
              inspectingAddress={props.address}
            />
          ))}
        </tbody>
      </TABLE>
      {!lastPage && (
        <Box pt='4.5rem' textAlign='center'>
          <ButtonV2 onClick={fetchMore} display='inline-block' px='18rem'>
            Load more
          </ButtonV2>
        </Box>
      )}
    </Box>
  )
}

MessageHistoryTable.propTypes = {
  addressHref: PropTypes.func,
  cidHref: PropTypes.func,
  offset: PropTypes.number,
  address: ADDRESS_PROPTYPE
}

MessageHistoryTable.defaultProps = {
  offset: 0,
  // TODO
  addressHref: (address: string) => `/#/history/${address}`,
  cidHref: (cid: string) => `/#/detail/${cid}`
}
