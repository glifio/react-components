import PropTypes from 'prop-types'
import { isAddrEqual } from '../../../utils'
import Box from '../../Box'
import ProposalRow from './ProposalRow'
import { ProposalRowColumnTitles } from './ProposalRowColumnTitles'
import { ADDRESS_PROPTYPE } from '../../../customPropTypes'
import { TABLE, TableCaption } from '../table'
import { useMsigPendingQuery } from '../../../generated/graphql'
import { Title } from '../generic'
import convertAddrToPrefix from '../../../utils/convertAddrToPrefix'

type ProposalHistoryTableProps = {
  address: string
  walletAddr: string
  offset?: number
  // allows custom navigation
  idHref: (id: number) => string
}

export default function ProposalHistoryTable(props: ProposalHistoryTableProps) {
  const { data, loading, error } = useMsigPendingQuery({
    variables: {
      address: convertAddrToPrefix(props.address)
    },
    pollInterval: 10000,
    fetchPolicy: 'cache-and-network'
  })

  return (
    <Box>
      <Title>Safe Proposals</Title>
      <TABLE>
        <TableCaption
          name='Safe Proposals'
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
                  inspectingAddress={props.address}
                  actionRequired={
                    !proposal.approved.some(address =>
                      isAddrEqual(address, props.walletAddr)
                    )
                  }
                />
              ))}
        </tbody>
      </TABLE>
    </Box>
  )
}

ProposalHistoryTable.propTypes = {
  idHref: PropTypes.func,
  address: ADDRESS_PROPTYPE,
  walletAddr: ADDRESS_PROPTYPE
}

ProposalHistoryTable.defaultProps = {
  // TODO
  idHref: (id: number) => `/#/detail/${id}`
}
