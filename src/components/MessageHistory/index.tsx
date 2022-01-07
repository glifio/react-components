import { useMemo, useState } from 'react'
import { useMessagesConfirmedQuery } from '../../generated/graphql'
import PropTypes from 'prop-types'
import Box from '../Box'
import MessageConfirmedRow from './MessageConfirmedRow'
import { MessageRowColumnTitles } from './MessageRowColumnTitles'
import { ADDRESS_PROPTYPE } from '../../customPropTypes'
import ButtonV2 from '../Button/V2'
import { TABLE } from '../Typography'

type MessageHistoryTableProps = {
  address: string
  offset?: number
  // allows custom navigation
  addressHref: (address: string) => string
  cidHref: (cid: string) => string
}

const DEFAULT_LIMIT = 10

export default function MessageHistoryTable(props: MessageHistoryTableProps) {
  const [offset, setOffset] = useState(props.offset)
  const { data, loading, error, fetchMore } = useMessagesConfirmedQuery({
    variables: {
      address: props.address,
      limit: DEFAULT_LIMIT,
      offset: props.offset
    }
  })

  const lastPage = useMemo(
    () => data?.messagesConfirmed?.length < DEFAULT_LIMIT,
    [data?.messagesConfirmed?.length]
  )

  function onClickLoadMore() {
    fetchMore({
      variables: {
        offset: offset + DEFAULT_LIMIT
      }
    })
    setOffset(offset + DEFAULT_LIMIT)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :( {error.message}</p>

  return (
    <Box>
      <TABLE>
        <MessageRowColumnTitles />
        <tbody>
          {/* Pending transaction rows could go here if we like this setup */}
          {data?.messagesConfirmed?.map(message => (
            <MessageConfirmedRow
              key={message.cid}
              message={message}
              cidHref={props.cidHref}
              addressHref={props.addressHref}
              inspectingAddress={props.address}
            />
          ))}
        </tbody>
      </TABLE>
      {!lastPage && (
        <Box pt='4.5rem' textAlign='center'>
          <ButtonV2 onClick={onClickLoadMore} display='inline-block' px='18rem'>
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
