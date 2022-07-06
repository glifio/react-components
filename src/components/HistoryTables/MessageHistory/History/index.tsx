import { useMemo } from 'react'
import PropTypes from 'prop-types'
import Box from '../../../Box'
import MessageConfirmedRow from './MessageConfirmedRow'
import MessagePendingRow from './MessagePendingRow'
import { MessageRowColumnTitles } from './MessageRowColumnTitles'
import { ADDRESS_PROPTYPE } from '../../../../customPropTypes'
import { ButtonV2 } from '../../../Button/V2'
import { TABLE, TableCaption } from '../../table'
import { useAllMessages } from '../hooks/useAllMessages'
import { Title } from '../../generic'
import { WarningBox } from '../../../Layout'
import dayjs from 'dayjs'

const FINISH_DATE = dayjs('july 15, 2022')

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

  const daysLeft = useMemo(() => FINISH_DATE.fromNow(true), [])

  return (
    <Box>
      <Title>Transaction History</Title>
      {props.warnMissingData && (
        <WarningBox>
          <h3>Limited Historical Data</h3>
          <p>
            Some transactions are currently missing for the next {daysLeft}{' '}
            while our servers finish syncing with Filecoin Mainnet.
          </p>
        </WarningBox>
      )}
      <br />
      <TABLE className='narrow'>
        <TableCaption
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
      </TABLE>
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