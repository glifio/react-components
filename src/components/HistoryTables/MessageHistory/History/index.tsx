import { useMemo } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { MessageConfirmedRow } from './MessageConfirmedRow'
import { MessagePendingRow } from './MessagePendingRow'
import { MessageRowColumnTitles } from './MessageRowColumnTitles'
import { ADDRESS_PROPTYPE } from '../../../../customPropTypes'
import { ButtonV2 } from '../../../Button/V2'
import { useAllMessages } from '../hooks/useAllMessages'
import { ButtonRowCenter, Caption, PageTitle } from '../../../Layout'
import { IconWarn } from '../../../Icons'
import { Colors } from '../../../theme'

const MissingDataWarning = styled.span`
  color: ${Colors.YELLOW_DARK};
`

export const MessageHistoryTable = ({
  address,
  cidHref,
  offset,
  warnMissingData
}: MessageHistoryTableProps) => {
  const {
    messages,
    pendingMsgs,
    loading,
    error,
    fetchMore,
    fetchingMore,
    lastPage
  } = useAllMessages(address, offset)

  const isEmpty = useMemo(
    () => !pendingMsgs?.length && !messages?.length,
    [pendingMsgs, messages]
  )

  return (
    <div>
      <PageTitle
        sideContent={
          warnMissingData && (
            <>
              <IconWarn />
              <MissingDataWarning>Syncing data from Mainnet</MissingDataWarning>
            </>
          )
        }
      >
        Transaction History
      </PageTitle>
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
              cidHref={cidHref}
              inspectingAddress={address}
            />
          ))}
          {messages?.map(message => (
            <MessageConfirmedRow
              key={message.cid}
              message={message}
              cidHref={cidHref}
              inspectingAddress={address}
            />
          ))}
        </tbody>
      </table>
      {!isEmpty && !lastPage && (
        <ButtonRowCenter>
          <ButtonV2 onClick={fetchMore} disabled={loading || fetchingMore}>
            {loading || fetchingMore ? 'Loading...' : 'Load more'}
          </ButtonV2>
        </ButtonRowCenter>
      )}
    </div>
  )
}

type MessageHistoryTableProps = {
  address: string
  cidHref: (cid: string) => string
  offset?: number
  warnMissingData?: boolean
}

MessageHistoryTable.propTypes = {
  address: ADDRESS_PROPTYPE.isRequired,
  cidHref: PropTypes.func.isRequired,
  offset: PropTypes.number,
  warnMissingData: PropTypes.bool
}

MessageHistoryTable.defaultProps = {
  offset: 0,
  warnMissingData: false
}
