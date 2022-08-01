import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { isAddressSigner } from '../../../utils'
import Box from '../../Box'
import ProposalRow from './ProposalRow'
import { ProposalRowColumnTitles } from './ProposalRowColumnTitles'
import {
  ADDRESS_PROPTYPE,
  GRAPHQL_ADDRESS_PROP_TYPE
} from '../../../customPropTypes'
import {
  Address,
  MsigTransaction,
  useMsigPendingQuery
} from '../../../generated/graphql'
import { Caption, PageTitle } from '../../Layout'
import convertAddrToPrefix from '../../../utils/convertAddrToPrefix'

export default function ProposalHistoryTable({
  idHref,
  address,
  walletAddr
}: ProposalHistoryTableProps) {
  const { data, loading, error } = useMsigPendingQuery({
    variables: {
      address: convertAddrToPrefix(address)
    },
    pollInterval: 10000,
    fetchPolicy: 'cache-and-network'
  })

  const proposals = useMemo<Array<MsigTransaction>>(
    () =>
      data?.msigPending
        ? [...data?.msigPending].sort((a, b) => a.id - b.id)
        : [],
    [data?.msigPending]
  )

  const anyProposalActionRequired = useMemo<boolean>(
    () =>
      proposals.some(
        proposal => !isAddressSigner(walletAddr, proposal.approved)
      ),
    [proposals, walletAddr]
  )

  return (
    <Box>
      <PageTitle>Safe Proposals</PageTitle>
      <table>
        <Caption
          name='Safe Proposals'
          loading={loading}
          error={error}
          empty={!data?.msigPending.length}
        />
        <ProposalRowColumnTitles
          anyProposalActionRequired={anyProposalActionRequired}
        />
        <tbody>
          {proposals.map(proposal => (
            <ProposalRow
              key={proposal.id}
              proposal={proposal}
              idHref={idHref}
              inspectingAddress={address}
              proposalActionRequired={
                !isAddressSigner(walletAddr, proposal.approved)
              }
              anyProposalActionRequired={anyProposalActionRequired}
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
