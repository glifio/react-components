import { useMemo } from 'react'
import PropTypes from 'prop-types'
import Box from '../../Box'
import MessageConfirmedRow from './MessageConfirmedRow'
import MessagePendingRow from './MessagePendingRow'
import { MessageRowColumnTitles } from './MessageRowColumnTitles'
import { ADDRESS_PROPTYPE } from '../../../customPropTypes'
import ButtonV2 from '../../Button/V2'
import { TABLE, TableCaption } from '../table'
import { useAllMessages } from '../useAllMessages'
import { Title } from '../generic'

const DEFAULT_LIMIT = 10

export default function MessageHistoryTable(props: MessageHistoryTableProps) {
  const {
    messages,
    pendingMsgs,
    loading,
    error,
    chainHeadSub,
    fetchMore,
    fetchingMore
  } = useAllMessages(props.address, props.offset)

  const lastPage = useMemo(
    () => messages?.length < DEFAULT_LIMIT,
    [messages?.length]
  )

  return (
    <Box>
      <Title>Transaction History</Title>
      <TABLE className='narrow'>
        <TableCaption
          name='Transaction History'
          loading={loading}
          error={error}
          empty={!pendingMsgs?.length && !messages?.length}
        />
        <MessageRowColumnTitles />
        <tbody>
          {!loading &&
            pendingMsgs?.map(message => (
              <MessagePendingRow
                key={message.cid}
                message={message}
                cidHref={props.cidHref}
                addressHref={props.addressHref}
                inspectingAddress={props.address}
              />
            ))}
          {!loading &&
            messages?.map(message => (
              <MessageConfirmedRow
                key={message.cid}
                message={message}
                cidHref={props.cidHref}
                addressHref={props.addressHref}
                inspectingAddress={props.address}
                chainHeadSub={chainHeadSub}
              />
            ))}
        </tbody>
      </TABLE>
      {!lastPage && !fetchingMore && !loading && (
        <Box pt='4.5rem' textAlign='center'>
          <ButtonV2 onClick={fetchMore} px='18rem'>
            Load more
          </ButtonV2>
        </Box>
      )}
    </Box>
  )
}

type MessageHistoryTableProps = {
  offset: number
  address: string
  addressHref: (address: string) => string
  cidHref: (cid: string) => string
}

MessageHistoryTable.propTypes = {
  offset: PropTypes.number,
  address: ADDRESS_PROPTYPE,
  addressHref: PropTypes.func,
  cidHref: PropTypes.func
}

MessageHistoryTable.defaultProps = {
  offset: 0,
  // TODO
  addressHref: (address: string) => `/#/history/${address}`,
  cidHref: (cid: string) => `/#/detail/${cid}`
}
