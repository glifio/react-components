import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import Box from '../../Box'
import { P, HR } from '../../Typography'
import { AddressLink } from '../../AddressLink'
import { ProposalHead, Line, Parameters } from '../detail'
import { ADDRESS_PROPTYPE } from '../../../customPropTypes'
import {
  Address,
  MsigTransaction,
  useActorQuery,
  useMsigPendingQuery
} from '../../../generated/graphql'
import {
  isAddrEqual,
  decodeActorCID,
  useStateReadStateQuery,
  MsigState
} from '../../../utils'
import LoadingScreen from '../../LoadingScreen'
import ErrorView from '../../Error'

type ProposalDetailProps = {
  id: number
  address: string
  walletAddress?: string

  accept: (proposal: MsigTransaction, approvalsUntilExecution: number) => void
  cancel: (proposal: MsigTransaction, approvalsUntilExecution: number) => void
  addressHref: (address: string) => string
}

const SeeMore = styled(P).attrs(() => ({
  color: 'core.primary',
  role: 'button'
}))`
  cursor: pointer;
`

export default function ProposalDetail(props: ProposalDetailProps) {
  const router = useRouter()
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
  } = useStateReadStateQuery<MsigState>({
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

      return walletAddressIsSigner && !alreadyApproved
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

  const error: Error | null = useMemo(
    () => proposalFoundError || actorError || stateError || null,
    [proposalFoundError, actorError, stateError]
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

  if (loading) return <LoadingScreen marginTop='10rem' />
  if (error)
    return (
      <ErrorView
        title='Failed to load proposal'
        description={error.message}
        sendHome={() => {
          router.back()
        }}
      />
    )

  return (
    <Box>
      <ProposalHead
        title='Proposal Overview'
        accept={props.accept}
        cancel={props.cancel}
        proposal={proposal}
        actionRequired={actionRequired}
        approvalsUntilExecution={approvalsUntilExecution}
        isProposer={isProposer}
      />
      <HR />
      <Line label='Proposal ID'>{props.id}</Line>
      <Line label='Proposer'>
        {proposal?.approved[0] && (
          <AddressLink
            address={proposal.approved[0].robust}
            url={props.addressHref(proposal.approved[0].robust)}
            id={proposal.approved[0].id}
          />
        )}
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
            method: proposal.method,
            params: proposal.params
          }
        }}
        actorName='/multisig'
        depth={0}
        addressHref={props.addressHref}
      />
      <HR />
      <SeeMore onClick={() => setSeeMore(!seeMore)}>
        Click to see {seeMore ? 'less ↑' : 'more ↓'}
      </SeeMore>
      <HR />
      {seeMore && (
        <>
          <Line label='Next Transaction ID'>{stateData?.State.NextTxnID}</Line>
          <Line
            label={`Approvers${
              proposal?.approved ? ` (${proposal?.approved.length})` : ''
            }`}
          >
            {proposal?.approved.map((approver: Address, index: number) => (
              <AddressLink
                key={index}
                address={approver.robust}
                url={props.addressHref(approver.robust)}
                id={approver.id}
              />
            ))}
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
