import styled from 'styled-components'
import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'
import {
  useChainHeadSubscription,
  useGasCostQuery,
  useMessageReceiptQuery
} from '../../../generated/graphql'
import { IconClock } from '../../Icons'
import { AddressLink } from '../../AddressLink'
import { Badge } from '../generic'
import {
  Head,
  DetailCaption,
  Status,
  Confirmations,
  Parameters
} from '../detail'
import { attoFilToFil, getGasPercentage, formatNumber } from '../utils'
import { useMessage } from '../useAllMessages'
import { useUnformattedDateTime } from './useAge'
import { useMethodName } from './useMethodName'
import { Lines, Line, InfoBox, StandardBox } from '../../Layout'
import { isAddrEqual, makeFriendlyBalance } from '../../../utils'
import { FilecoinNumber } from '@glif/filecoin-number'
import {
  ExecReturn,
  getAddrFromReceipt
} from '../../../utils/getAddrFromReceipt'

// add RelativeTime plugin to Day.js
dayjs.extend(relativeTime.default)

const SpanGray = styled.span`
  color: var(--gray-medium);
`

export default function MessageDetail(props: MessageDetailProps) {
  const { cid, speedUpHref, cancelHref, confirmations } = props
  const time = useMemo(() => Date.now(), [])
  const [seeMore, setSeeMore] = useState(false)
  const { message, error, loading, pending } = useMessage(cid)

  const { data: gasQuery } = useGasCostQuery({ variables: { cid } })
  const { data: msgQuery } = useMessageReceiptQuery({
    variables: { cid }
  })

  const chainHeadSubscription = useChainHeadSubscription({
    variables: {},
    shouldResubscribe: true,
    skip: pending
  })

  const value = useMemo<string>(
    () => (message?.value ? attoFilToFil(message.value) : ''),
    [message?.value]
  )
  const transactionFee = useMemo<string>(() => {
    if (pending || !gasQuery?.gascost?.totalCost) return 'Pending...'
    const cost = gasQuery?.gascost?.totalCost
    return cost
      ? `${makeFriendlyBalance(new FilecoinNumber(cost, 'attofil'))} FIL`
      : ''
  }, [gasQuery?.gascost?.totalCost, pending])

  const gasUsed = useMemo(
    () => gasQuery?.gascost?.gasUsed || '',
    [gasQuery?.gascost]
  )

  const gasPercentage = useMemo<string>(
    () =>
      !gasUsed && !!message?.gasLimit
        ? getGasPercentage(message?.gasLimit, gasUsed, pending)
        : '',
    [message?.gasLimit, gasUsed, pending]
  )
  const gasBurned = useMemo<string>(() => {
    if (
      !gasQuery?.gascost?.baseFeeBurn ||
      !gasQuery?.gascost?.overEstimationBurn
    ) {
      return ''
    }

    const baseFeeBurn = new FilecoinNumber(
      gasQuery?.gascost?.baseFeeBurn || '0',
      'attofil'
    )
    const overEstimationBurn = new FilecoinNumber(
      gasQuery?.gascost?.overEstimationBurn || '0',
      'attofil'
    )
    return formatNumber(baseFeeBurn.plus(overEstimationBurn).toAttoFil())
  }, [gasQuery?.gascost])

  const unformattedTime = useUnformattedDateTime(message, time)

  const confirmationCount = useMemo<number>(
    () =>
      chainHeadSubscription.data?.chainHead.height && !!message?.height
        ? chainHeadSubscription.data.chainHead.height - Number(message.height)
        : 0,
    [message?.height, chainHeadSubscription.data?.chainHead.height]
  )

  const { methodName, actorName } = useMethodName(message)

  const execReturn = useMemo<ExecReturn | null>(() => {
    if (!message) return null
    const toExec = isAddrEqual(message?.to, 'f01')
    const receiptExists = !!msgQuery?.receipt?.return
    const initTx = Number(message?.method) === 2
    if (toExec && receiptExists && initTx) {
      return getAddrFromReceipt(msgQuery?.receipt?.return)
    }
    return null
  }, [message, msgQuery?.receipt])

  return (
    <>
      <Head
        title='Message Overview'
        pending={pending}
        speedUpHref={speedUpHref}
        cancelHref={cancelHref}
      />
      <hr />
      {gasUsed ? (
        <InfoBox>
          Message {cid} has been included into the Filecoin Blockchain and will
          be shown here in 1-2 minutes.
        </InfoBox>
      ) : !loading && !error && !message ? (
        <StandardBox>
          <p>Message {cid} not found.</p>
          <p>
            Note - it may take 1-2 minutes for a recently confirmed message to
            show up here.
          </p>
        </StandardBox>
      ) : (
        <Lines>
          <DetailCaption
            name='Message Overview'
            captian='Scanning Filecoin for your message... This could take a minute.'
            loading={loading}
            error={error}
          />
          {!loading && !error && !!message && (
            <>
              <Line label='CID'>{cid}</Line>
              <Line label='Status and Confirmations'>
                <Status
                  exitCode={msgQuery?.receipt?.exitCode}
                  pending={pending}
                />
                {!pending && (
                  <Confirmations
                    count={confirmationCount}
                    total={confirmations}
                  />
                )}
              </Line>
              <Line label='Height'>{pending ? 'Pending' : message.height}</Line>
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
              <Line label='Value'>{value}</Line>
              <Line label='Transaction Fee'>{transactionFee}</Line>
              {!loading && methodName && (
                <Line label='Method'>
                  <Badge color='purple' text={methodName} />
                </Line>
              )}
              {!!execReturn && (
                <>
                  <hr />
                  <Line label='New actor created: '>
                    <AddressLink
                      id={execReturn.id}
                      address={execReturn.robust}
                      hideCopyText={false}
                    />
                  </Line>
                </>
              )}
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
                  <Line label='Gas Limit & Usage by Txn'>
                    {formatNumber(message.gasLimit)}
                    <SpanGray>|</SpanGray>
                    {!gasUsed ? (
                      '?'
                    ) : (
                      <>
                        {`${formatNumber(gasUsed)}
                    attoFil`}
                        <span>({gasPercentage})</span>
                      </>
                    )}
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
                    {formatNumber(gasQuery?.gascost?.baseFeeBurn)} attoFIL
                  </Line>
                  <Line label='Gas Burned'>{gasBurned} attoFIL</Line>
                  <hr />
                  <Parameters
                    params={{ params: message.params }}
                    actorName={actorName}
                    depth={0}
                  />
                </>
              )}
            </>
          )}
        </Lines>
      )}
    </>
  )
}

type MessageDetailProps = {
  cid: string
  speedUpHref?: string
  cancelHref?: string
  confirmations: number
}

MessageDetail.propTypes = {
  cid: PropTypes.string.isRequired,
  speedUpHref: PropTypes.string,
  cancelHref: PropTypes.string,
  confirmations: PropTypes.number
}

MessageDetail.defaultProps = {
  confirmations: 50
}
