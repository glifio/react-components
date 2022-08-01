import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { AddressLink } from '../../LabeledText/AddressLink'
import { Parameters } from '../detail'
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
  MsigState,
  isAddressSigner
} from '../../../utils'
import { Lines, Line, PageTitle } from '../../Layout'
import { LoadingScreen } from '../../Loading/LoadingScreen'
import ErrorView from '../../Error'
import convertAddrToPrefix from '../../../utils/convertAddrToPrefix'
import { logger } from '../../../logger'
import { ButtonV2 } from '../../Button/V2'
import { IconCheck, IconFail } from '../../Icons'

export default function ProposalDetail(props: ProposalDetailProps) {
  const router = useRouter()
  let {
    data: msigTxsData,
    loading: msigTxsLoading,
    error: _msigTxsError
  } = useMsigPendingQuery({
    variables: {
      address: convertAddrToPrefix(props.address)
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
  } = useActorQuery({
    variables: { address: convertAddrToPrefix(props.address) }
  })

  const loadMsigState = useMemo<boolean>(() => {
    try {
      return (
        !!actorData && decodeActorCID(actorData.actor.Code).includes('multisig')
      )
    } catch (e) {
      logger.error(e)
      return false
    }
  }, [actorData])

  const {
    data: stateData,
    loading: stateLoading,
    error: stateError
  } = useStateReadStateQuery<MsigState>({
    variables: { address: convertAddrToPrefix(props.address) },
    skip: !loadMsigState
  })

  const proposalFoundError = useMemo(() => {
    if (!msigTxsLoading && !proposal) {
      return new Error('Proposal not found')
    }
    return _msigTxsError
  }, [_msigTxsError, msigTxsLoading, proposal])

  const actionRequired = useMemo<boolean>(() => {
    if (!proposal || proposalFoundError || stateError || stateLoading)
      return false
    const walletAddressIsSigner = isAddressSigner(
      props.walletAddress,
      stateData.State.Signers
    )
    const alreadyApproved = isAddressSigner(
      props.walletAddress,
      proposal.approved
    )
    return walletAddressIsSigner && !alreadyApproved
  }, [
    proposal,
    proposalFoundError,
    props.walletAddress,
    stateData?.State.Signers,
    stateLoading,
    stateError
  ])

  const isProposer = useMemo<boolean>(
    () => isAddrEqual(props.walletAddress, proposal?.approved?.[0]),
    [props.walletAddress, proposal]
  )

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

  if (loading) return <LoadingScreen />
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
    <div>
      <PageTitle
        sideContent={
          <>
            {actionRequired && (
              <ButtonV2
                green
                onClick={() => props.accept(proposal, approvalsUntilExecution)}
              >
                <IconCheck width='1.75rem' />
                Approve
              </ButtonV2>
            )}
            {isProposer && (
              <ButtonV2
                red
                onClick={() => props.cancel(proposal, approvalsUntilExecution)}
              >
                <IconFail width='1.25rem' />
                Cancel
              </ButtonV2>
            )}
          </>
        }
      >
        Proposal Overview
      </PageTitle>
      <hr />
      <Lines>
        <Line label='Proposal ID'>{props.id}</Line>
        <Line label='Proposer'>
          {proposal?.approved[0] && (
            <AddressLink
              id={proposal.approved[0].id}
              address={proposal.approved[0].robust}
              hideCopyText={false}
            />
          )}
        </Line>
        <Line label='Approvals until execution'>
          {approvalsUntilExecution.toString()}
        </Line>
        <hr />
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
        />
        <hr />
        {seeMore ? (
          <p role='button' onClick={() => setSeeMore(false)}>
            Click to see less ↑
          </p>
        ) : (
          <p role='button' onClick={() => setSeeMore(true)}>
            Click to see more ↓
          </p>
        )}
        <hr />
        {seeMore && (
          <>
            <Line label='Next Transaction ID'>
              {stateData?.State.NextTxnID}
            </Line>
            <Line
              label={`Approvers${
                proposal?.approved ? ` (${proposal?.approved.length})` : ''
              }`}
            >
              {proposal?.approved.map((approver: Address) => (
                <AddressLink
                  key={approver.robust || approver.id}
                  id={approver.id}
                  address={approver.robust}
                />
              ))}
            </Line>
          </>
        )}
      </Lines>
    </div>
  )
}

type ProposalDetailProps = {
  id: number
  address: string
  walletAddress?: Address
  accept: (proposal: MsigTransaction, approvalsUntilExecution: number) => void
  cancel: (proposal: MsigTransaction, approvalsUntilExecution: number) => void
}

ProposalDetail.propTypes = {
  id: PropTypes.number.isRequired,
  address: ADDRESS_PROPTYPE.isRequired,
  walletAddress: ADDRESS_PROPTYPE,
  accept: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
}
