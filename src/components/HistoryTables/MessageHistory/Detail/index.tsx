import React, { useState, useMemo, useEffect } from 'react'
import { FilecoinNumber } from '@glif/filecoin-number'
import PropTypes from 'prop-types'
import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'
import {
  Message,
  useGasCostQuery,
  useMessageReceiptQuery
} from '../../../../generated/graphql'
import { AddressLink } from '../../../LabeledText/AddressLink'
import { DetailCaption, MessageDetailBase, SeeMoreContent } from '../../detail'
import { useMessage } from '../hooks/useAllMessages'
import { useMethodName } from '../hooks/useMethodName'
import { Lines, Line, StandardBox, PageTitle } from '../../../Layout'
import { isAddrEqual, makeFriendlyBalance } from '../../../../utils'
import {
  ExecReturn,
  getAddrFromReceipt
} from '../../../../utils/getAddrFromReceipt'
import { LoadingIcon } from '../../../Loading/LoadingIcon'
import { logger } from '../../../../logger'
import { ButtonV2Link } from '../../../Button/V2'
import { IconCancel, IconSpeedUp } from '../../../Icons'

// add RelativeTime plugin to Day.js
dayjs.extend(relativeTime.default)

enum MessageState {
  Loading,
  // message is in the mempool
  Pending,
  // message is included in chain, but not yet executed (no gas cost, no receipt)
  Confirmed,
  // message has been fully executed - all variables should exist now
  Executed,
  // failed to get message
  Error,
  NotFound
}

export default function MessageDetail(props: MessageDetailProps) {
  const { cid, speedUpHref, cancelHref, confirmations } = props
  const time = useMemo(() => Date.now(), [])
  const [seeMore, setSeeMore] = useState(false)
  const { message, error, loading, pending } = useMessage(cid)

  const { data: gasQuery, error: gasStateError } = useGasCostQuery({
    variables: { cid },
    pollInterval: 10000
  })
  const { data: msgRcptQuery, error: msgRcptError } = useMessageReceiptQuery({
    variables: { cid },
    pollInterval: 10000
  })

  const transactionFee = useMemo<string>(() => {
    if (pending) return 'Pending...'
    const cost = gasQuery?.gascost?.totalCost
    return cost
      ? `${makeFriendlyBalance(new FilecoinNumber(cost, 'attofil'))} FIL`
      : 'Calculating...'
  }, [gasQuery?.gascost?.totalCost, pending])

  const gasUsed = useMemo(
    () => gasQuery?.gascost?.gasUsed || 0,
    [gasQuery?.gascost]
  )

  const { methodName, actorName } = useMethodName(message)

  const execReturn = useMemo<ExecReturn | null>(() => {
    if (!message) return null
    const isToExec = isAddrEqual(message?.to, 'f01')
    const isInitTx = Number(message?.method) === 2
    const receiptReturn = msgRcptQuery?.receipt?.return
    return isToExec && isInitTx && receiptReturn
      ? getAddrFromReceipt(receiptReturn)
      : null
  }, [message, msgRcptQuery?.receipt])

  const messageState = useMemo<MessageState>(() => {
    if (error) return MessageState.Error
    if (loading) return MessageState.Loading
    if (pending) return MessageState.Pending
    if (!message) return MessageState.NotFound
    if (!gasUsed) return MessageState.Confirmed
    return MessageState.Executed
  }, [pending, message, error, gasUsed, loading])

  // Log errors
  useEffect(() => error && logger.error(error), [error])
  useEffect(() => gasStateError && logger.error(gasStateError), [gasStateError])
  useEffect(() => msgRcptError && logger.error(msgRcptError), [msgRcptError])

  return (
    <>
      <PageTitle
        sideContent={
          pending && (
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
          )
        }
      >
        Message Overview
      </PageTitle>
      <hr />
      <Lines>
        {messageState === MessageState.Error && (
          <DetailCaption
            name='Message Overview'
            caption='Error'
            loading={false}
            error={error}
          />
        )}
        {messageState === MessageState.NotFound && (
          <StandardBox>
            <p>Message {cid} not found.</p>
            <p>
              Note - it may take 1-2 minutes for a recently confirmed message to
              show up here.
            </p>
          </StandardBox>
        )}
        {messageState === MessageState.Loading && (
          <StandardBox>
            <LoadingIcon />
            <p>Searching for {cid}... Give us a moment</p>
          </StandardBox>
        )}
        {messageState === MessageState.Pending && (
          <MessageDetailBase
            cid={cid}
            methodName={methodName}
            message={message}
            time={time}
            pending
          />
        )}
        {messageState === MessageState.Confirmed && (
          <MessageDetailBase
            cid={cid}
            methodName={methodName}
            confirmations={confirmations}
            time={time}
            message={message}
          />
        )}
        {messageState === MessageState.Executed && (
          <>
            <MessageDetailBase
              cid={cid}
              exitCode={msgRcptQuery?.receipt?.exitCode}
              methodName={methodName}
              confirmations={confirmations}
              time={time}
              message={message}
            />
            <Line label='Transaction Fee'>{transactionFee}</Line>
            {!!execReturn && (
              <Line label='New actor created: '>
                <AddressLink
                  id={execReturn.id}
                  address={execReturn.robust}
                  hideCopyText={false}
                />
              </Line>
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
            {seeMore && (
              <SeeMoreContent
                message={message as Message}
                gasUsed={gasUsed}
                gasCost={gasQuery?.gascost}
                actorName={actorName}
              />
            )}
          </>
        )}
      </Lines>
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
