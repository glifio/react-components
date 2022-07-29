import { useMemo } from 'react'
import PropTypes from 'prop-types'
import Box from '../../../Box'
import MessageConfirmedRow from './MessageConfirmedRow'
import MessagePendingRow from './MessagePendingRow'
import { MessageRowColumnTitles } from './MessageRowColumnTitles'
import { ADDRESS_PROPTYPE } from '../../../../customPropTypes'
import { ButtonV2 } from '../../../Button/V2'
import { useAllMessages } from '../hooks/useAllMessages'
import { Caption, PageTitle } from '../../../Layout'
import { SyncStatus } from '../../../SyncStatus'

export default function MessageHistoryTable(props: MessageHistoryTableProps) {
  const {
    messages,
    pendingMsgs,
    loading,
    error,
    fetchMore,
    fetchingMore,
    lastPage
  } = useAllMessages(props.address, props.offset)

  const isEmpty = useMemo(
    () => !pendingMsgs?.length && !messages?.length,
    [pendingMsgs, messages]
  )

  return (
    <Box>
      <PageTitle>Transaction History</PageTitle>
      {props.warnMissingData && <SyncStatus />}
      <br />
      <table>
        <Caption
          name='Transaction History'
          loading={isEmpty && loading}
          error={error}
          empty={isEmpty}
        />
        <MessageRowColumnTitles />
        <tbody>
          {pendingMsgs?.map(message => (
            <MessagePendingRow
              key={message.cid}
              message={message}
              cidHref={props.cidHref}
              inspectingAddress={props.address}
            />
          ))}
          {messages?.map(message => (
            <MessageConfirmedRow
              key={message.cid}
              message={message}
              cidHref={props.cidHref}
              inspectingAddress={props.address}
            />
          ))}
        </tbody>
      </table>
      {!isEmpty && !lastPage && (
        <Box pt='4.5rem' textAlign='center'>
          <ButtonV2
            onClick={fetchMore}
            px='18rem'
            disabled={loading || fetchingMore}
          >
            {loading || fetchingMore ? 'Loading...' : 'Load more'}
          </ButtonV2>
        </Box>
      )}
    </Box>
  )
}

type MessageHistoryTableProps = {
  offset: number
  address: string
  warnMissingData?: boolean
  cidHref: (cid: string) => string
}

MessageHistoryTable.propTypes = {
  address: ADDRESS_PROPTYPE.isRequired,
  cidHref: PropTypes.func.isRequired,
  offset: PropTypes.number,
  warnMissingData: PropTypes.bool
}

MessageHistoryTable.defaultProps = {
  offset: 0
}
