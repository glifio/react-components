import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Box from '../../Box'
import ProposalRow from './ProposalRow'
import { MessageRowColumnTitles } from './ProposalRowColumnTitles'
import { ADDRESS_PROPTYPE } from '../../../customPropTypes'
import { TABLE } from '../table'
import { useCompletedProposals } from './useCompletedProposals'

type ProposalHistoryTableProps = {
  address: string
  offset?: number
  // allows custom navigation
  addressHref: (address: string) => string
  idHref: (cid: number) => string
}

export default function ProposalHistoryTable(props: ProposalHistoryTableProps) {
  const [time, setTime] = useState(Date.now())
  const { completedProposals, loading, error } = useCompletedProposals(
    props.address
  )

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000)
    return () => clearInterval(interval)
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :( {error.message} </p>

  return (
    <Box>
      <TABLE>
        <MessageRowColumnTitles />
        <tbody>
          {completedProposals?.map(completedProposal => (
            <ProposalRow
              key={completedProposal.proposal.id}
              proposal={completedProposal.proposal}
              messageConfirmed={completedProposal.messageConfirmed}
              time={time}
              idHref={props.idHref}
              addressHref={props.addressHref}
              inspectingAddress={props.address}
            />
          ))}
        </tbody>
      </TABLE>
    </Box>
  )
}

ProposalHistoryTable.propTypes = {
  addressHref: PropTypes.func,
  idHref: PropTypes.func,
  offset: PropTypes.number,
  address: ADDRESS_PROPTYPE
}

ProposalHistoryTable.defaultProps = {
  offset: 0,
  // TODO
  addressHref: (address: string) => `/#/history/${address}`,
  idHref: (id: number) => `/#/detail/${id}`
}
