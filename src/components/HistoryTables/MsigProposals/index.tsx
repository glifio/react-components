import { useMemo } from 'react'
import PropTypes from 'prop-types'
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
import { useEnvironment } from '../../../services/EnvironmentProvider'

export default function ProposalHistoryTable({
  msigAddress,
  walletAddress,
  idHref,
  approveHref,
  cancelHref
}: ProposalHistoryTableProps) {
  const { coinType } = useEnvironment()
  const { data, loading, error } = useMsigPendingQuery({
    variables: {
      address: convertAddrToPrefix(msigAddress, coinType)
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

  return (
    <>
      <PageTitle>Safe Proposals</PageTitle>
      <table>
        <Caption
          name='Safe Proposals'
          loading={loading}
          error={error}
          empty={!data?.msigPending.length}
        />
        <ProposalRowColumnTitles />
        <tbody>
          {proposals.map(proposal => (
            <ProposalRow
              key={proposal.id}
              proposal={proposal}
              walletAddress={walletAddress}
              idHref={idHref}
              approveHref={approveHref}
              cancelHref={cancelHref}
            />
          ))}
        </tbody>
      </table>
    </>
  )
}

type ProposalHistoryTableProps = {
  msigAddress: string
  walletAddress: Address
  idHref: (id: number) => string
  approveHref: (id: number) => string
  cancelHref: (id: number) => string
}

ProposalHistoryTable.propTypes = {
  msigAddress: ADDRESS_PROPTYPE.isRequired,
  walletAddress: GRAPHQL_ADDRESS_PROP_TYPE.isRequired,
  idHref: PropTypes.func.isRequired,
  approveHref: PropTypes.func.isRequired,
  cancelHref: PropTypes.func.isRequired
}
