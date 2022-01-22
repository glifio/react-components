import React, { useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useCompletedProposal } from './useCompletedProposals'
import ButtonV2 from '../../Button/V2'
import Box from '../../Box'
import { P, HR } from '../../Typography'
import { Head, Line, Parameters } from '../detail'
import { ADDRESS_PROPTYPE } from '../../../customPropTypes'
import { MsigTransaction } from '../../../generated/graphql'
import { formatNumber } from '../utils'
import { IconClock } from '../../Icons'

type ProposalDetailProps = {
  id: number
  address: string
  cid?: string

  accept?: (proposal: MsigTransaction) => void
  reject?: (proposal: MsigTransaction) => void
  addressHref: (address: string) => string
  cidHref: (cid: string) => string
}

const SeeMore = styled(P).attrs(() => ({
  color: 'core.primary',
  role: 'button'
}))`
  cursor: pointer;
`

export default function ProposalDetail(props: ProposalDetailProps) {
  const { completedProposal, loading, error } = useCompletedProposal(
    props.id,
    props.address,
    props.cid
  )
  const [seeMore, setSeeMore] = useState(false)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :( {error.message}</p>

  return (
    <Box>
      <Head title='Proposal Overview' speedUp={() => {}} cancel={() => {}} />
      <HR />
      <Line label='Proposal ID'>{props.id}</Line>
      <Line label='Proposal CID'>
        <Link href={props.cidHref(props.cid)}>{props.cid}</Link>
      </Line>

      <Line label='Height'>{completedProposal.messageConfirmed.height}</Line>
      <Line label='Timestamp'>
        <IconClock width='1.125em' />
        {/* {age} ({date}) */}
      </Line>
      <HR />
      {/* <Line label='From'>
        {data.message.from.robust}
        <Link
          href={props.addressHref(data.message.from.robust)}
        >{`(${data.message.from.id})`}</Link>
      </Line>
      <Line label='To'>
        {data.message.to.robust}
        <Link
          href={props.addressHref(data.message.to.robust)}
        >{`(${data.message.to.id})`}</Link>
      </Line>
      <HR />
      <Line label='Value'>{value}</Line>
      <Line label='Transaction Fee'>{totalCost}</Line>
      {!loading && methodName && (
        <Line label='Method'>
          <Badge color='purple'>{methodName.toUpperCase()}</Badge>
        </Line>
      )}
      <HR />
      <SeeMore onClick={() => setSeeMore(!seeMore)}>
        Click to see {seeMore ? 'less ↑' : 'more ↓'}
      </SeeMore>
      <HR /> */}
      {seeMore && (
        <>
          {/* <Line label='Gas Limit & Usage by Txn'>
            {formatNumber(data.message.gasLimit)}
            <span className='gray'>|</span>
            {formatNumber(data.message.gasUsed)} attoFil
            <span>({gasPercentage})</span>
          </Line>
          <Line label='Gas Fees'>
            <span className='gray'>Premium</span>
            {formatNumber(data.message.gasPremium)} attoFIL
          </Line>
          <Line label=''>
            <span className='gray'>Fee Cap</span>
            {formatNumber(data.message.gasFeeCap)} attoFIL
          </Line>
          <Line label=''>
            <span className='gray'>Base</span>
            {formatNumber(data.message.baseFeeBurn)} attoFIL
          </Line>
          <Line label='Gas Burnt'>
            {formatNumber(data.message.gasBurned)} attoFIL
          </Line>
          <HR />
          <Parameters params={{ params: data.message.params }} depth={0} /> */}
        </>
      )}
    </Box>
  )
}

ProposalDetail.propTypes = {
  id: PropTypes.number.isRequired,
  cid: PropTypes.string,
  address: ADDRESS_PROPTYPE,
  addressHref: PropTypes.func.isRequired,
  cidHref: PropTypes.func.isRequired,
  accept: PropTypes.func,
  reject: PropTypes.func
}

ProposalDetail.defaultProps = {
  cid: ''
}
