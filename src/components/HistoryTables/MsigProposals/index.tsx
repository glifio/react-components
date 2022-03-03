import PropTypes from 'prop-types'
import { isAddrEqual } from '../../../utils'
import Box from '../../Box'
import ProposalRow from './ProposalRow'
import { ProposalRowColumnTitles } from './ProposalRowColumnTitles'
import { ADDRESS_PROPTYPE } from '../../../customPropTypes'
import { TABLE, TableCaption } from '../table'
import { useMsigPendingQuery } from '../../../generated/graphql'
import { Title } from '../generic'

type ProposalHistoryTableProps = {
  address: string
  walletAddr: string
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
    pollInterval: 10000,
    fetchPolicy: 'cache-and-network'
  })

  return (
    <Box>
      <Title>MSIG Proposals</Title>
      <TABLE>
        <TableCaption
          name='MSIG Proposals'
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
  addressHref: PropTypes.func,
  idHref: PropTypes.func,
  offset: PropTypes.number,
  address: ADDRESS_PROPTYPE,
  walletAddr: ADDRESS_PROPTYPE
}

ProposalHistoryTable.defaultProps = {
  offset: 0,
  // TODO
  addressHref: (address: string) => `/#/history/${address}`,
  idHref: (id: number) => `/#/detail/${id}`
}
