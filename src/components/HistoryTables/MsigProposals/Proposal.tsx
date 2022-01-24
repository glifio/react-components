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
import { decodeActorCID } from '../../..'
import { useStateReadStateQuery } from './useStateReadStateQuery'
import { getMethodName } from '../methodName'

type ProposalDetailProps = {
  id: number
  address: string
  walletAddress?: string

  accept: (proposal: MsigTransaction) => void
  reject: (proposal: MsigTransaction) => void
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

  /////// TODO: remove once https://github.com/glifio/graph/issues/32 gets fixed
  const msigTxs = useMemo(() => {
    if (!msigTxsLoading && !_msigTxsError) {
      return {
        msigPending: msigTxsData?.msigPending?.map(p => {
          return {
            ...p,
            approved: p.approved.map(approver => ({ id: approver, robust: '' }))
          }
        }) as (MsigTransaction & { approved: Address[] })[]
      }
    }
  }, [msigTxsData, msigTxsLoading, _msigTxsError])
  ////////

  const proposal = useMemo(() => {
    if (!msigTxsLoading && !_msigTxsError) {
      return msigTxs?.msigPending.find(p => p.id === props.id)
    }
    return null
  }, [msigTxs, msigTxsLoading, _msigTxsError, props.id])

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

  const actionRequired = useMemo(() => {
    if (!props.walletAddress) return false
    if (!!proposal) {
      return proposal.approved.some((approver: Address) => {
        return (
          approver.id === props.walletAddress ||
          approver.robust === props.walletAddress
        )
      })
    }
    return false
  }, [proposal, props.walletAddress])

  const proposalFoundError = useMemo(() => {
    if (!msigTxsLoading && !proposal) {
      return new Error('Proposal not found')
    }
    return _msigTxsError
  }, [_msigTxsError, msigTxsLoading, proposal])

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
        reject={props.reject}
        actionRequired={actionRequired}
      />
      <HR />
      <Line label='Proposal ID'>{props.id}</Line>
      {/* TODO: This should be the normal address component */}
      <Line label='Proposer'>{proposal?.approved[0].id || 'Loading...'}</Line>
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
                <Line key={`${1}-${approver.robust}`} depth={1}>
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
  cidHref: PropTypes.func.isRequired,
  accept: PropTypes.func,
  reject: PropTypes.func
}

ProposalDetail.defaultProps = {
  cid: ''
}
