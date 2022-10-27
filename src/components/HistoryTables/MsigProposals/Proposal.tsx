import PropTypes from 'prop-types'
import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { getActorName } from '@glif/filecoin-actor-utils'
import { FilecoinNumber } from '@glif/filecoin-number'

import {
  MsigState,
  ADDRESS_PROPTYPE,
  GRAPHQL_ADDRESS_PROP_TYPE
} from '../../../customPropTypes'
import { Address, useMsigPendingQuery } from '../../../generated/graphql'
import { isAddrEqual, useStateReadState, isAddressSigner } from '../../../utils'
import {
  Line,
  Lines,
  LinesParams,
  PageTitle,
  FilecoinLine,
  AddressLine,
  MethodLine
} from '../../Layout'
import { LoadingScreen } from '../../Loading/LoadingScreen'
import { ErrorView } from '../../ErrorView'
import convertAddrToPrefix from '../../../utils/convertAddrToPrefix'
import { ButtonV2Link } from '../../Button/V2'
import { IconCheck, IconCancel } from '../../Icons'
import {
  useEnvironment,
  useLogger
} from '../../../services/EnvironmentProvider'

export default function ProposalDetail({
  id,
  msigAddress,
  walletAddress,
  approveHref,
  cancelHref
}: ProposalDetailProps) {
  const router = useRouter()
  const logger = useLogger()
  const { coinType, networkName } = useEnvironment()

  // Ensure network cointype for address
  const address = useMemo<string>(
    () => convertAddrToPrefix(msigAddress, coinType),
    [msigAddress, coinType]
  )

  // Get safe proposals
  const {
    data: msigTxsData,
    loading: msigTxsLoading,
    error: msigTxsError
  } = useMsigPendingQuery({
    variables: { address },
    pollInterval: 0
  })

  // Find current proposal
  const proposal = useMemo(
    () => msigTxsData?.msigPending.find(p => p.id === id) || null,
    [msigTxsData, id]
  )

  // Load the actor state
  const {
    data: actorData,
    loading: actorLoading,
    notFound: actorNotFound,
    error: actorError
  } = useStateReadState<MsigState>(address)

  // Get the actor name from the actor code
  const actorName = useMemo<string | null>(
    () => (actorData ? getActorName(actorData.Code, networkName) : null),
    [actorData, networkName]
  )

  // Interpret state data as msig state if valid
  const msigState = useMemo<MsigState | null>(() => {
    const isMsigActor = actorName === 'multisig'
    return isMsigActor && actorData ? (actorData.State as MsigState) : null
  }, [actorData, actorName])

  // Log safe proposals errors
  useEffect(
    () => msigTxsError && logger.error(msigTxsError),
    [msigTxsError, logger]
  )

  // Log actor state errors
  useEffect(() => actorError && logger.error(actorError), [actorError, logger])

  // Can the user approve the proposal
  const canApprove = useMemo<boolean>(() => {
    if (!proposal || !msigState) return false
    const isSigner = isAddressSigner(walletAddress, msigState.Signers)
    const alreadyApproved = isAddressSigner(walletAddress, proposal.approved)
    return isSigner && !alreadyApproved
  }, [proposal, walletAddress, msigState])

  // Is the user the proposer
  const isProposer = useMemo<boolean>(
    () => proposal && isAddrEqual(walletAddress, proposal.approved[0]),
    [walletAddress, proposal]
  )

  // Determine approvals until execution
  const approvalsUntilExecution = useMemo<number>(() => {
    if (!proposal || !msigState) return 0
    return msigState.NumApprovalsThreshold - proposal?.approved.length
  }, [proposal, msigState])

  // Proposals or actor state loading
  const loading = useMemo<boolean>(
    () => msigTxsLoading || actorLoading,
    [msigTxsLoading, actorLoading]
  )

  // Proposals or actor state error
  const error = useMemo<Error | null>(() => {
    if (msigTxsError) return msigTxsError
    if (actorError) return actorError
    if (actorNotFound) return new Error('Actor not found')
    if (!msigTxsLoading && !proposal) return new Error('Proposal not found')
    return null
  }, [msigTxsError, actorError, actorNotFound, msigTxsLoading, proposal])

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
            {canApprove && (
              <ButtonV2Link green href={approveHref(proposal.id)}>
                <IconCheck height='1em' />
                Approve
              </ButtonV2Link>
            )}
            {isProposer && (
              <ButtonV2Link red href={cancelHref(proposal.id)}>
                <IconCancel height='1em' />
                Cancel
              </ButtonV2Link>
            )}
          </>
        }
      >
        Proposal Overview
      </PageTitle>
      <hr />
      <Lines>
        <Line label='Proposal ID'>{id}</Line>
        <AddressLine label='Proposer' value={proposal.approved[0]} />
        {proposal.approved.map((approver: Address, index) => (
          <AddressLine
            key={approver.robust || approver.id}
            label={index === 0 ? `Approvers (${proposal.approved.length})` : ''}
            value={approver}
          />
        ))}
        <Line label='Approvals until execution'>{approvalsUntilExecution}</Line>
        <hr />
        <AddressLine label='To' value={proposal.to} />
        <MethodLine
          label='Method'
          actorName={actorName}
          methodNum={proposal.method}
        />
        <FilecoinLine
          label='Value'
          value={new FilecoinNumber(proposal.value, 'attofil')}
        />
        <LinesParams
          address={proposal.to.robust || proposal.to.id}
          method={proposal.method}
          params={proposal.params}
        />
      </Lines>
    </div>
  )
}

type ProposalDetailProps = {
  id: number
  msigAddress: string
  walletAddress: Address
  approveHref: (id: number) => string
  cancelHref: (id: number) => string
}

ProposalDetail.propTypes = {
  id: PropTypes.number.isRequired,
  msigAddress: ADDRESS_PROPTYPE.isRequired,
  walletAddress: GRAPHQL_ADDRESS_PROP_TYPE.isRequired,
  approveHref: PropTypes.func.isRequired,
  cancelHref: PropTypes.func.isRequired
}
