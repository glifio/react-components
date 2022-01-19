import { useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Box from '../../Box'
import ProposalRow from './ProposalRow'
import { MessageRowColumnTitles } from './ProposalRowColumnTitles'
import { ADDRESS_PROPTYPE } from '../../../customPropTypes'
import ButtonV2 from '../../Button/V2'
import { TABLE } from '../table'
import { useCompletedProposals } from './useCompletedProposals'

type ProposalHistoryTableProps = {
  address: string
  offset?: number
  // allows custom navigation
  addressHref: (address: string) => string
  cidHref: (cid: string) => string
}

const DEFAULT_LIMIT = 10

export default function ProposalHistoryTable(props: ProposalHistoryTableProps) {
  const [time, setTime] = useState(Date.now())
  const { completedProposals, onClickLoadMore, loading, error } =
    useCompletedProposals(props.address)

  // useEffect(() => {
  //   const interval = setInterval(() => setTime(Date.now()), 1000)
  //   return () => clearInterval(interval)
  // })

  const lastPage = useMemo(
    () => completedProposals?.length < DEFAULT_LIMIT,
    [completedProposals?.length]
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :( {error.message} </p>

  console.log(completedProposals)
  return (
    <Box>
      <TABLE>
        <MessageRowColumnTitles />
        <tbody>
          {/* Pending transaction rows could go here if we like this setup */}
          {/* {data?.messagesConfirmed?.map(message => (
            <ProposalRow
              key={message.cid}
              message={message}
              time={time}
              cidHref={props.cidHref}
              addressHref={props.addressHref}
              inspectingAddress={props.address}
            />
          ))} */}
        </tbody>
      </TABLE>
      {!lastPage && (
        <Box pt='4.5rem' textAlign='center'>
          <ButtonV2 onClick={onClickLoadMore} px='18rem'>
            Load more
          </ButtonV2>
        </Box>
      )}
    </Box>
  )
}

ProposalHistoryTable.propTypes = {
  addressHref: PropTypes.func,
  cidHref: PropTypes.func,
  offset: PropTypes.number,
  address: ADDRESS_PROPTYPE
}

ProposalHistoryTable.defaultProps = {
  offset: 0,
  // TODO
  addressHref: (address: string) => `/#/history/${address}`,
  cidHref: (cid: string) => `/#/detail/${cid}`
}
