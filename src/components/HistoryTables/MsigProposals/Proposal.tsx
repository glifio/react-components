import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Box from '../../Box'
import { P, HR } from '../../Typography'
import { ProposalHead, Line, Parameters } from '../detail'
import { ADDRESS_PROPTYPE } from '../../../customPropTypes'
import {
  Address,
  MsigTransaction,
  useActorQuery,
  useMsigPendingQuery
} from '../../../generated/graphql'
import { isAddrEqual, decodeActorCID } from '../../../utils'
import { useStateReadStateQuery } from './useStateReadStateQuery'
import { getMethodName } from '../methodName'

type ProposalDetailProps = {
  id: number
  address: string
  walletAddress?: string

  accept: (proposal: MsigTransaction) => void
  cancel: (proposal: MsigTransaction) => void
  addressHref: (address: string) => string
}

const SeeMore = styled(P).attrs(() => ({
  color: 'core.primary',
  role: 'button'
}))`
  cursor: pointer;
`

export default function ProposalDetail(props: ProposalDetailProps) {
  let {
    data: msigTxsData,
    loading: msigTxsLoading,
    error: _msigTxsError
  } = useMsigPendingQuery({
    variables: {
      address: props.address,
      offset: 0,
      limit: Number.MAX_SAFE_INTEGER
    },
    pollInterval: 0
  })

  const proposal = useMemo(() => {
    if (!msigTxsLoading && !_msigTxsError) {
      return msigTxsData?.msigPending.find(p => p.id === props.id)
    }
    return null
  }, [msigTxsData, msigTxsLoading, _msigTxsError, props.id])

  const [seeMore, setSeeMore] = useState(false)

  const {
    data: actorData,
    loading: actorLoading,
    error: actorError
  } = useActorQuery({ variables: { address: props.address } })

  const {
    data: stateData,
    loading: stateLoading,
    error: stateError
  } = useStateReadStateQuery({
    variables: { address: props.address },
    skip:
      !!actorError ||
      (!actorLoading &&
        !decodeActorCID(actorData.actor.Code).includes('multisig'))
  })

  const proposalFoundError = useMemo(() => {
    if (!msigTxsLoading && !proposal) {
      return new Error('Proposal not found')
    }
    return _msigTxsError
  }, [_msigTxsError, msigTxsLoading, proposal])

  const actionRequired = useMemo(() => {
    if (proposalFoundError) return false
    if (!props.walletAddress) return false
    if (!!proposal && !stateLoading && !stateError) {
      const walletAddressIsSigner = stateData.State.Signers.some(signer =>
        isAddrEqual(signer, props.walletAddress)
      )

      const alreadyApproved = proposal.approved.some(approver =>
        isAddrEqual(approver, props.walletAddress)
      )

      return walletAddressIsSigner || !alreadyApproved
    }
    return false
  }, [
    proposal,
    proposalFoundError,
    props.walletAddress,
    stateData?.State.Signers,
    stateLoading,
    stateError
  ])

  const isProposer = useMemo(() => {
    if (!proposalFoundError && !!proposal && !!props.walletAddress) {
      return isAddrEqual(proposal.approved[0], props.walletAddress)
    }
    return false
  }, [proposal, proposalFoundError, props.walletAddress])

  const loading = useMemo(
    () => actorLoading || msigTxsLoading || stateLoading,
    [actorLoading, msigTxsLoading, stateLoading]
  )

  const approvalsUntilExecution = useMemo(() => {
    if (!loading && !proposalFoundError && !stateError) {
      return (
        Number(stateData?.State.NumApprovalsThreshold) -
        proposal?.approved.length
      )
    }
  }, [
    loading,
    proposalFoundError,
    proposal?.approved.length,
    stateError,
    stateData?.State.NumApprovalsThreshold
  ])

  const outerMethodName = useMemo(
    () => getMethodName('/multisig', proposal?.method),
    [proposal?.method]
  )

  if (loading) return <p>Loading...</p>
  if (proposalFoundError) return <p>Error :( {proposalFoundError.message}</p>
  if (actorError) return <p>Error :( {actorError.message}</p>
  if (stateError) return <p>Error :( {stateError.message}</p>

  return (
    <Box>
      <ProposalHead
        title='Proposal Overview'
        accept={props.accept}
        cancel={props.cancel}
        proposal={proposal}
        actionRequired={actionRequired}
        isProposer={isProposer}
      />
      <HR />
      <Line label='Proposal ID'>{props.id}</Line>
      <Line label='Proposer'>
        {`${proposal?.approved[0].robust} (${proposal?.approved[0].id})` ||
          'Loading...'}
      </Line>
      <Line label='Approvals until execution'>
        {approvalsUntilExecution.toString()}
      </Line>
      <HR />
      <Parameters
        params={{
          params: {
            to: proposal.to.robust,
            value: proposal.value,
            method: outerMethodName,
            params: proposal.params
          }
        }}
        depth={1}
      />
      <HR />
      <SeeMore onClick={() => setSeeMore(!seeMore)}>
        Click to see {seeMore ? 'less ↑' : 'more ↓'}
      </SeeMore>
      <HR />
      {seeMore && (
        <>
          <Line label='Next Transaction ID'>{stateData?.State.NextTxnID}</Line>
          <Line label='Approvers'>
            {proposal?.approved.map((approver: Address) => {
              return (
                <Line key={`${1}-${approver.robust || approver.id}`} depth={1}>
                  {approver.robust} ({approver.id})
                </Line>
              )
            })}
          </Line>
        </>
      )}
    </Box>
  )
}

ProposalDetail.propTypes = {
  id: PropTypes.number.isRequired,
  walletAddress: ADDRESS_PROPTYPE,
  cid: PropTypes.string,
  address: ADDRESS_PROPTYPE,
  addressHref: PropTypes.func.isRequired,
  accept: PropTypes.func,
  reject: PropTypes.func
}

ProposalDetail.defaultProps = {
  cid: ''
}
