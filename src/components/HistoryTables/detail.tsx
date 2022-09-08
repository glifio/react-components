import { useMemo } from 'react'
import { FilecoinNumber } from '@glif/filecoin-number'
import { ExecutionTrace } from '@glif/filecoin-wallet-provider'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  GasCost,
  Message,
  MessagePending,
  useChainHeadSubscription
} from '../../generated/graphql'
import { IconCheck, IconPending, IconClock } from '../Icons'
import { Badge, Lines, Line, AddressLine } from '../Layout'
import { getMethodName } from './methodName'
import { useAge } from '../../utils/useAge'
import { AddressLink } from '../LabeledText/AddressLink'
import { attoFilToFil, formatNumber } from './utils'
import { Colors } from '../theme'
import {
  EXECUTION_TRACE_PROPTYPE,
  GRAPHQL_GAS_COST_PROPTYPE,
  GRAPHQL_MESSAGE_PROPTYPE
} from '../../customPropTypes'
import { MessageLink } from '../LabeledText/MessageLink'

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
  infoMsg,
  loadingMsg,
  loading,
  error
}: DetailCaptionProps) => {
  if (error)
    return (
      <CAPTION className='error'>{`${name} failed to load: ${error.message}`}</CAPTION>
    )
  if (loading) return <CAPTION>{loadingMsg || `${name} is loading...`}</CAPTION>
  if (infoMsg) return <CAPTION>{infoMsg}</CAPTION>
  return <></>
}

type DetailCaptionProps = {
  name: string
  infoMsg?: string
  loadingMsg?: string
  loading?: boolean
  error?: Error
}

DetailCaption.propTypes = {
  name: PropTypes.string.isRequired,
  infoMsg: PropTypes.string,
  loadingMsg: PropTypes.string,
  loading: PropTypes.bool,
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
  confirmations
}: MessageDetailBaseProps) => {
  const { age } = useAge(message?.height)

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
      <Line label='CID'>
        <MessageLink
          cid={cid}
          hideCopyText={false}
          hideCopy={false}
          shouldTruncate={false}
        />
      </Line>
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
            {age}
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
  color: ${Colors.GRAY_MEDIUM};
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
  executionTrace: ExecutionTrace
}

SeeMoreContent.propTypes = {
  message: GRAPHQL_MESSAGE_PROPTYPE.isRequired,
  gasUsed: PropTypes.number.isRequired,
  gasCost: GRAPHQL_GAS_COST_PROPTYPE.isRequired,
  actorName: PropTypes.string.isRequired,
  executionTrace: EXECUTION_TRACE_PROPTYPE.isRequired
}
