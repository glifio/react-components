import { useMemo } from 'react'
import { FilecoinNumber } from '@glif/filecoin-number'
import { ExecutionTrace } from '@glif/filecoin-wallet-provider'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { GasCost, useChainHeadSubscription } from '../../generated/graphql'
import { IconCheck, IconPending, IconClock } from '../Icons'
import { Badge, Line } from '../Layout'
import { useAge } from '../../utils/useAge'
import { AddressLink } from '../LabeledText/AddressLink'
import { attoFilToFil, formatNumber } from './utils'
import { Colors } from '../theme'
import {
  GqlMessage,
  GqlMessagePending,
  EXECUTION_TRACE_PROPTYPE,
  GRAPHQL_GAS_COST_PROPTYPE,
  GRAPHQL_MESSAGE_PROPTYPE
} from '../../customPropTypes'
import { TxLink } from '../LabeledText/TxLink'
import { LinesParams } from '../Layout/LinesParams'
import { LinesReturn } from '../Layout/LinesReturn'
import { AbiSelector } from '../AbiSelector'
import { isDelegatedAddress } from '../../utils/isAddress'

const CAPTION = styled.div`
  line-height: 1.5em;
  text-align: left;
  padding: 1em;
  margin: -0.5em 0;
  color: ${Colors.GRAY_MEDIUM};

  &.error {
    background-color: ${Colors.RED_LIGHT};
    color: ${Colors.RED_DARK};
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
    if (pending) return <IconPending height='1em' />
    if (success) return <IconCheck height='1em' />
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
      icon={confirmed ? <IconCheck height='1em' /> : null}
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
  txID,
  methodName,
  confirmations
}: MessageDetailBaseProps) => {
  const { age } = useAge(message.height)

  const chainHeadSubscription = useChainHeadSubscription({
    variables: {},
    shouldResubscribe: true,
    skip: pending
  })

  const confirmationCount = useMemo<number>(
    () =>
      chainHeadSubscription.data?.chainHead.height && message.height
        ? chainHeadSubscription.data.chainHead.height - message.height
        : 0,
    [message.height, chainHeadSubscription.data?.chainHead.height]
  )

  return (
    <>
      <Line label='CID'>
        <TxLink
          txID={txID}
          hideCopyText={false}
          hideCopy={false}
          shouldTruncate={false}
        />
      </Line>
      {exitCode >= 0 && (
        <Line label='Status and Confirmations'>
          <Status exitCode={exitCode} pending={pending} />
          {!pending && (
            <Confirmations count={confirmationCount} total={confirmations} />
          )}
        </Line>
      )}
      <Line label='Height'>
        {message.height > 0 ? message.height : 'Pending'}
      </Line>
      <Line label='Timestamp'>
        {pending ? (
          'Pending'
        ) : (
          <>
            <IconClock width='1em' />
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
  txID: string
  message: GqlMessage | GqlMessagePending
  methodName: string
  time: number
  confirmations?: number
  pending?: boolean
  exitCode?: number
}

MessageDetailBase.propTypes = {
  txID: PropTypes.string.isRequired,
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
  executionTrace
}: SeeMoreContentProps) => {
  const isToDelegated = useMemo(
    () => isDelegatedAddress(message.to.robust),
    [message]
  )
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
      <Line label='Exit code'>{executionTrace.MsgRct.ExitCode}</Line>
      <hr />
      {isToDelegated && (
        <>
          <Line label='ABI'>
            <AbiSelector address={message.to.robust} />
          </Line>
          <hr />
        </>
      )}
      <LinesParams
        address={message.to.robust || message.to.id}
        method={message.method}
        params={message.params}
      />
      <hr />
      <LinesReturn
        address={message.to.robust || message.to.id}
        method={message.method}
        params={message.params}
        returnVal={executionTrace.MsgRct.Return}
      />
    </>
  )
}

type SeeMoreContentProps = {
  message: GqlMessage
  gasUsed: number
  gasCost: GasCost
  executionTrace: ExecutionTrace
}

SeeMoreContent.propTypes = {
  message: GRAPHQL_MESSAGE_PROPTYPE.isRequired,
  gasUsed: PropTypes.number.isRequired,
  gasCost: GRAPHQL_GAS_COST_PROPTYPE.isRequired,
  executionTrace: EXECUTION_TRACE_PROPTYPE.isRequired
}
