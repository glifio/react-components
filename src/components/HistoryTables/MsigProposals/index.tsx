import PropTypes from 'prop-types'
import Box from '../../Box'
import ProposalRow from './ProposalRow'
import { ProposalRowColumnTitles } from './ProposalRowColumnTitles'
import { ADDRESS_PROPTYPE } from '../../../customPropTypes'
import { TABLE } from '../table'
import { useMsigPendingQuery } from '../../..'

type ProposalHistoryTableProps = {
  address: string
  offset?: number
  // allows custom navigation
  addressHref: (address: string) => string
  idHref: (id: number) => string
}

export default function ProposalHistoryTable(props: ProposalHistoryTableProps) {
  const { data, loading, error } = useMsigPendingQuery({
    variables: {
      address: props.address,
      offset: props.offset,
      limit: Number.MAX_SAFE_INTEGER
    },
    pollInterval: 0
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :( {error.message} </p>

  return (
    <Box>
      <TABLE>
        <ProposalRowColumnTitles />
        <tbody>
          {[...data?.msigPending]
            .sort((a, b) => a.id - b.id)
            .map(proposal => (
              <ProposalRow
                key={proposal.id}
                proposal={proposal}
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
