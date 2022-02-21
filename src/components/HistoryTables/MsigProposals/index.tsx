import PropTypes from 'prop-types'
import Box from '../../Box'
import ProposalRow from './ProposalRow'
import { ProposalRowColumnTitles } from './ProposalRowColumnTitles'
import { ADDRESS_PROPTYPE } from '../../../customPropTypes'
import { TABLE, TableCaption } from '../table'
import { useMsigPendingQuery } from '../../../generated/graphql'

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
    pollInterval: 10000
  })

  return (
    <Box>
      <TABLE>
        <TableCaption
          name='MSIG Proposal List'
          loading={loading}
          error={error}
          empty={!data?.msigPending.length}
        />
        <ProposalRowColumnTitles />
        <tbody>
          {data &&
            [...data?.msigPending]
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
