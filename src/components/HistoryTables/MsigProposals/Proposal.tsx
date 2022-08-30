import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { AddressLink } from '../../LabeledText/AddressLink'
import { Parameters } from '../detail'
import {
  ADDRESS_PROPTYPE,
  GRAPHQL_ADDRESS_PROP_TYPE
} from '../../../customPropTypes'
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
import { ErrorView } from '../../ErrorView'
import convertAddrToPrefix from '../../../utils/convertAddrToPrefix'
import { ButtonV2 } from '../../Button/V2'
import { IconCheck, IconFail } from '../../Icons'
import {
  useEnvironment,
  useLogger
} from '../../../services/EnvironmentProvider'

export interface MsigState {
  InitialBalance: string
  NextTxnID: number
  NumApprovalsThreshold: number
  PendingTxns: LotusCID
  Signers: string[]
  StartEpoch: number
  UnlockDuration: number
}

export default function ProposalDetail({
  id,
  msigAddress,
  walletAddress,
  approve,
  cancel
}: ProposalDetailProps) {
  const router = useRouter()
  const { coinType, networkName } = useEnvironment()
  const logger = useLogger()
  let {
    data: msigTxsData,
    loading: msigTxsLoading,
    error: _msigTxsError
  } = useMsigPendingQuery({
    variables: {
      address: convertAddrToPrefix(msigAddress, coinType)
    },
    pollInterval: 0
  })

  const proposal = useMemo(() => {
    if (!msigTxsLoading && !_msigTxsError) {
      return msigTxsData?.msigPending.find(p => p.id === id)
    }
    return null
  }, [msigTxsData, msigTxsLoading, _msigTxsError, id])

  const [seeMore, setSeeMore] = useState(false)

  const {
    data: actorData,
    loading: actorLoading,
    error: actorError
  } = useActorQuery({
    variables: { address: convertAddrToPrefix(msigAddress, coinType) }
  })

  const loadMsigState = useMemo<boolean>(() => {
    try {
      return (
        !!actorData &&
        decodeActorCID(actorData.actor.Code, networkName).includes('multisig')
      )
    } catch (e) {
      logger.error(e)
      return false
    }
  }, [actorData, networkName, logger])

  const {
    data: stateData,
    loading: stateLoading,
    error: stateError
  } = useStateReadStateQuery<MsigState>({
    variables: { address: convertAddrToPrefix(msigAddress, coinType) },
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
      walletAddress,
      stateData.State.Signers
    )
    const alreadyApproved = isAddressSigner(walletAddress, proposal.approved)
    return walletAddressIsSigner && !alreadyApproved
  }, [
    proposal,
    proposalFoundError,
    walletAddress,
    stateData?.State.Signers,
    stateLoading,
    stateError
  ])

  const isProposer = useMemo<boolean>(
    () => isAddrEqual(walletAddress, proposal?.approved?.[0]),
    [walletAddress, proposal]
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
              <ButtonV2 green onClick={() => approve(proposal)}>
                <IconCheck width='1.75rem' />
                Approve
              </ButtonV2>
            )}
            {isProposer && (
              <ButtonV2 red onClick={() => cancel(proposal)}>
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
        <Line label='Proposal ID'>{id}</Line>
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
  msigAddress: string
  walletAddress: Address
  approve: (proposal: MsigTransaction) => void
  cancel: (proposal: MsigTransaction) => void
}

ProposalDetail.propTypes = {
  id: PropTypes.number.isRequired,
  msigAddress: ADDRESS_PROPTYPE.isRequired,
  walletAddress: GRAPHQL_ADDRESS_PROP_TYPE.isRequired,
  approve: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
}
