import PropTypes from 'prop-types'
import { isAddressSigner } from '../../../utils'
import Box from '../../Box'
import ProposalRow from './ProposalRow'
import { ProposalRowColumnTitles } from './ProposalRowColumnTitles'
import {
  ADDRESS_PROPTYPE,
  GRAPHQL_ADDRESS_PROP_TYPE
} from '../../../customPropTypes'
import { TableCaption } from '../../Table'
import { Address, useMsigPendingQuery } from '../../../generated/graphql'
import { PageTitle } from '../../Layout'
import convertAddrToPrefix from '../../../utils/convertAddrToPrefix'

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
      <PageTitle>Safe Proposals</PageTitle>
      <table>
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
                    !isAddressSigner(props.walletAddr, proposal.approved)
                  }
                />
              ))}
        </tbody>
      </table>
    </Box>
  )
}

type ProposalHistoryTableProps = {
  idHref: (id: number) => string
  address: string
  walletAddr: Address
}

ProposalHistoryTable.propTypes = {
  idHref: PropTypes.func,
  address: ADDRESS_PROPTYPE.isRequired,
  walletAddr: GRAPHQL_ADDRESS_PROP_TYPE.isRequired
}

ProposalHistoryTable.defaultProps = {
  // TODO
  idHref: (id: number) => `/#/detail/${id}`
}
