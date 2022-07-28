import React, { useMemo } from 'react'
import { FilecoinNumber } from '@glif/filecoin-number'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  GasCost,
  Message,
  MessagePending,
  MsigTransaction,
  useChainHeadSubscription
} from '../../generated/graphql'
import Box from '../Box'
import { ButtonV2, ButtonV2Link } from '../Button/V2'
import {
  IconSpeedUp,
  IconCancel,
  IconCheck,
  IconPending,
  IconFail,
  IconClock
} from '../Icons'
import { Badge, Lines, Line, AddressLine, PageTitle } from '../Layout'
import { PROPOSAL_ROW_PROP_TYPE } from './types'
import { getMethodName } from './methodName'
import { useUnformattedDateTime } from './MessageHistory/hooks/useAge'
import { AddressLink } from '../LabeledText/AddressLink'
import { attoFilToFil, formatNumber } from './utils'
import {
  GRAPHQL_GAS_COST_PROPTYPE,
  GRAPHQL_MESSAGE_PROPTYPE
} from '../../customPropTypes'

/**
 * Head
 * Top row of the detail page, displaying
 * the title and Speed up / Cancel buttons
 */
export const Head = ({
  title,
  pending,
  speedUpHref,
  cancelHref
}: HeadProps) => (
  <Box
    display='flex'
    alignItems='center'
    justifyContent='space-between'
    gridGap='1em'
    my='1em'
  >
    <PageTitle>{title}</PageTitle>
    <Box display='flex' gridGap='1rem'>
      {pending && (
        <>
          {speedUpHref && !process.env.NEXT_PUBLIC_IS_PROD && (
            <ButtonV2Link green href={speedUpHref} retainParams>
              <IconSpeedUp width='1.25rem' />
              Speed up
            </ButtonV2Link>
          )}

          {cancelHref && !process.env.NEXT_PUBLIC_IS_PROD && (
            <ButtonV2Link red href={cancelHref} retainParams>
              <IconCancel width='0.8rem' />
              Cancel
            </ButtonV2Link>
          )}
        </>
      )}
    </Box>
  </Box>
)

type HeadProps = {
  title: string
  pending: boolean
  speedUpHref?: string
  cancelHref?: string
}

Head.propTypes = {
  title: PropTypes.string.isRequired,
  pending: PropTypes.bool.isRequired,
  speedUpHref: PropTypes.string,
  cancelHref: PropTypes.string
}

Head.defaultProps = {
  pending: false
}

export const ProposalHead = ({
  title,
  proposal,
  accept,
  cancel,
  actionRequired,
  approvalsUntilExecution,
  isProposer
}: ProposalHeadProps) => (
  <Box
    display='flex'
    alignItems='center'
    justifyContent='space-between'
    gridGap='1em'
    my='1em'
  >
    <PageTitle>{title}</PageTitle>
    <Box display='flex' gridGap='1rem'>
      {actionRequired && (
        <ButtonV2
          green
          onClick={() => accept(proposal, approvalsUntilExecution)}
        >
          <IconCheck width='1.75rem' />
          Approve
        </ButtonV2>
      )}
      {isProposer && (
        <ButtonV2 red onClick={() => cancel(proposal, approvalsUntilExecution)}>
          <IconFail width='1.25rem' />
          Cancel
        </ButtonV2>
      )}
    </Box>
  </Box>
)

type ProposalHeadProps = {
  title: string
  actionRequired: boolean
  isProposer: boolean
  proposal: MsigTransaction
  approvalsUntilExecution: number
  accept?: (proposal: MsigTransaction, approvalsUntilExecution: number) => void
  cancel?: (proposal: MsigTransaction, approvalsUntilExecution: number) => void
}

ProposalHead.propTypes = {
  title: PropTypes.string.isRequired,
  actionRequired: PropTypes.bool.isRequired,
  isProposer: PropTypes.bool.isRequired,
  proposal: PROPOSAL_ROW_PROP_TYPE.isRequired,
  approvalsUntilExecution: PropTypes.number.isRequired,
  accept: PropTypes.func,
  cancel: PropTypes.func
}

ProposalHead.defaultProps = {
  actionRequired: false
}

const CAPTION = styled.div`
  line-height: 1.5em;
  text-align: left;
  padding: 1em;
  margin: -0.5em 0;
  color: ${props => props.theme.colors.gray.medium};

  &.error {
    background: ${props => props.theme.colors.red.light};
    color: ${props => props.theme.colors.red.dark};
    border-radius: 4px;
  }
`

export const DetailCaption = ({
  name,
  caption,
  loading,
  error
}: DetailCaptionProps) => {
  if (error)
    return (
      <CAPTION className='error'>{`${name} failed to load: ${error.message}`}</CAPTION>
    )
  if (loading) return <CAPTION>{caption}</CAPTION>
  return <></>
}

type DetailCaptionProps = {
  name: string
  caption: string
  loading: boolean
  error: Error
}

DetailCaption.propTypes = {
  name: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object
}

/**
 * Parameters
 * Parameter rows of the detail page
 */
export const Parameters = ({ params, depth, actorName }: ParametersProps) => (
  <>
    {Object.entries(params).map(([key, value]) => {
      switch (key.toLowerCase()) {
        case 'method': {
          return (
            <Line key={`${depth}-${key}`} label={key} depth={depth}>
              <Badge
                color='purple'
                text={getMethodName(actorName, value as number)}
              />
            </Line>
          )
        }

        case 'to':
        case 'from':
        case 'signer':
          return (
            <AddressLine
              key={`${depth}-${key}`}
              value={value}
              label={key}
              depth={depth}
            />
          )

        case 'approved':
          return value.map((signer, index) => (
            <AddressLine
              key={`${depth}-${key}-${index}`}
              value={signer}
              label={index ? '' : 'Approved by'}
              depth={depth}
            />
          ))

        case 'value':
          return (
            <Line key={`${depth}-${key}`} label={key} depth={depth}>
              {new FilecoinNumber(value, 'attofil').toFil()} FIL
            </Line>
          )

        default: {
          switch (typeof value) {
            case 'object':
              if (value)
                return (
                  <Lines key={`${depth}-${key}`}>
                    <Line
                      label={key === 'params' ? 'Parameters' : key}
                      depth={depth}
                    ></Line>
                    <Parameters
                      params={value}
                      depth={depth + 1}
                      actorName={actorName}
                    />
                  </Lines>
                )
              break

            case 'boolean':
              return (
                <Line key={`${depth}-${key}`} label={key} depth={depth}>
                  {value ? 'true' : 'false'}
                </Line>
              )
          }

          return (
            <Line
              key={`${depth}-${key}`}
              label={key === 'params' ? 'Parameters' : key}
              depth={depth}
            >
              {value ?? '—'}
            </Line>
          )
        }
      }
    })}
  </>
)

type ParametersProps = {
  params: object
  depth: number
  actorName: string
}

Parameters.propTypes = {
  params: PropTypes.object.isRequired,
  depth: PropTypes.number.isRequired,
  actorName: PropTypes.string.isRequired
}

/**
 * Status
 * Badge displaying the current status of the message
 */
export const Status = ({ exitCode, pending }: StatusProps) => {
  const success = useMemo(() => exitCode === 0, [exitCode])
  const color = useMemo(() => {
    if (pending) return 'yellow'
    if (success) return 'green'
    return 'red'
  }, [success, pending])

  const text = useMemo(() => {
    if (pending) return 'PENDING'
    if (success) return 'SUCCESS'
    return 'ERROR'
  }, [success, pending])

  const icon = useMemo(() => {
    if (pending) return <IconPending />
    if (success) return <IconCheck width='1.1875rem' />
    return null
  }, [success, pending])

  return <Badge color={color} text={text} icon={icon} />
}

type StatusProps = {
  exitCode?: number
  pending: boolean
}

Status.propTypes = {
  exitCode: PropTypes.number
}

/**
 * Confirmations
 * Badge displaying the current confirmations of the message
 */
export const Confirmations = ({ count, total }: ConfirmationsProps) => {
  const confirmed = useMemo(() => count >= total, [count, total])
  return (
    <Badge
      color={confirmed ? 'green' : 'yellow'}
      text={`${Math.min(count, total)} / ${total} Confirmations`}
      icon={confirmed ? <IconCheck width='1.1875rem' /> : null}
      uppercase={false}
    />
  )
}

type ConfirmationsProps = {
  count: number
  total: number
}

Confirmations.propTypes = {
  count: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
}

export const MessageDetailBase = ({
  message,
  pending,
  exitCode,
  cid,
  methodName,
  confirmations,
  time
}: MessageDetailBaseProps) => {
  const unformattedTime = useUnformattedDateTime(message, time)

  const chainHeadSubscription = useChainHeadSubscription({
    variables: {},
    shouldResubscribe: true,
    skip: pending
  })

  const confirmationCount = useMemo<number>(
    () =>
      chainHeadSubscription.data?.chainHead.height && !!message?.height
        ? chainHeadSubscription.data.chainHead.height - Number(message.height)
        : 0,
    [message?.height, chainHeadSubscription.data?.chainHead.height]
  )

  return (
    <>
      <Line label='CID'>{cid}</Line>
      {Number(exitCode) >= 0 && (
        <Line label='Status and Confirmations'>
          <Status exitCode={exitCode} pending={pending} />
          {!pending && (
            <Confirmations count={confirmationCount} total={confirmations} />
          )}
        </Line>
      )}
      <Line label='Height'>
        {Number(message.height) > 0 ? message.height : 'Pending'}
      </Line>
      <Line label='Timestamp'>
        {pending ? (
          'Pending'
        ) : (
          <>
            <IconClock width='1.125em' />
            {unformattedTime
              ? `${unformattedTime?.from(
                  time
                )} (${unformattedTime?.toString()})`
              : ''}
          </>
        )}
      </Line>
      <hr />
      <Line label='From'>
        <AddressLink
          id={message.from.id}
          address={message.from.robust}
          hideCopyText={false}
        />
      </Line>
      <Line label='To'>
        <AddressLink
          id={message.to.id}
          address={message.to.robust}
          hideCopyText={false}
        />
      </Line>
      <hr />
      <Line label='Value'>{attoFilToFil(message.value)}</Line>
      {methodName && (
        <Line label='Method'>
          <Badge color='purple' text={methodName} />
        </Line>
      )}
    </>
  )
}

type MessageDetailBaseProps = {
  cid: string
  message: Message | MessagePending
  methodName: string
  time: number
  confirmations?: number
  pending?: boolean
  exitCode?: number
}

MessageDetailBase.propTypes = {
  cid: PropTypes.string.isRequired,
  message: GRAPHQL_MESSAGE_PROPTYPE.isRequired,
  time: PropTypes.number.isRequired,
  pending: PropTypes.bool,
  confirmations: PropTypes.number,
  methodName: PropTypes.string,
  exitCode: PropTypes.number
}

const SpanGray = styled.span`
  color: var(--gray-medium);
`

export const SeeMoreContent = ({
  message,
  gasUsed,
  gasCost,
  actorName
}: SeeMoreContentProps) => {
  const gasPercentage = useMemo<string>(() => {
    const gasLimit = new FilecoinNumber(message.gasLimit, 'attofil')

    return (
      new FilecoinNumber(gasUsed, 'attofil')
        .dividedBy(gasLimit)
        .times(100)
        .toFixed(1) + '%'
    )
  }, [message?.gasLimit, gasUsed])

  const gasBurned = useMemo<string>(() => {
    const baseFeeBurn = new FilecoinNumber(
      gasCost.baseFeeBurn || '0',
      'attofil'
    )
    const overEstimationBurn = new FilecoinNumber(
      gasCost.overEstimationBurn || '0',
      'attofil'
    )
    return formatNumber(baseFeeBurn.plus(overEstimationBurn).toAttoFil())
  }, [gasCost])

  return (
    <>
      <Line label='Gas Limit & Usage by Txn'>
        {formatNumber(message.gasLimit)}
        <SpanGray>|</SpanGray>
        {formatNumber(gasUsed)} attoFil
        <span>({gasPercentage})</span>
      </Line>
      <Line label='Gas Fees'>
        <SpanGray>Premium</SpanGray>
        {formatNumber(message.gasPremium)} attoFIL
      </Line>
      <Line label=''>
        <SpanGray>Fee Cap</SpanGray>
        {formatNumber(message.gasFeeCap)} attoFIL
      </Line>
      <Line label=''>
        <SpanGray>Base</SpanGray>
        {formatNumber(gasCost.baseFeeBurn)} attoFIL
      </Line>
      <Line label='Gas Burned'>{gasBurned} attoFIL</Line>
      <hr />
      <Parameters
        params={{ params: message.params }}
        actorName={actorName}
        depth={0}
      />
    </>
  )
}

type SeeMoreContentProps = {
  message: Message
  gasUsed: number
  gasCost: GasCost
  actorName: string
}

SeeMoreContent.propTypes = {
  message: GRAPHQL_MESSAGE_PROPTYPE.isRequired,
  gasUsed: PropTypes.number.isRequired,
  gasCost: GRAPHQL_GAS_COST_PROPTYPE.isRequired,
  actorName: PropTypes.string.isRequired
}
