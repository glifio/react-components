import { useState, useMemo, useEffect } from 'react'
import { ExecutionTrace } from '@glif/filecoin-wallet-provider'
import { FilecoinNumber } from '@glif/filecoin-number'
import PropTypes from 'prop-types'

import {
  useStateReplayQuery,
  useTxIdQuery
} from '../../../../generated/graphql'
import { AddressLink } from '../../../LabeledText/AddressLink'
import { DetailCaption, MessageDetailBase, SeeMoreContent } from '../../detail'
import { useMessage } from '../hooks/useAllMessages'
import { useMethodName } from '../hooks/useMethodName'
import { Lines, Line, StandardBox, PageTitle } from '../../../Layout'
import { makeFriendlyBalance } from '../../../../utils/makeFriendlyBalance'
import { isAddrEqual } from '../../../../utils/isAddrEqual'
import { isMsgCID, isTxHash } from '../../../../utils/isTxID'
import {
  ExecReturn,
  getAddrFromReceipt
} from '../../../../utils/getAddrFromReceipt'
import { LoadingIcon } from '../../../Loading/LoadingIcon'
import { ButtonV2Link } from '../../../Button/V2'
import { IconCancel, IconSpeedUp } from '../../../Icons'
import {
  useEnvironment,
  useLogger,
  Network
} from '../../../../services/EnvironmentProvider'
import { GqlMessage } from '../../../../customPropTypes'

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

export default function MessageDetail({
  txID,
  speedUpHref,
  cancelHref,
  confirmations
}: MessageDetailProps) {
  const time = useMemo(() => Date.now(), [])
  const [seeMore, setSeeMore] = useState(false)
  const { message, error, loading, pending } = useMessage(txID)
  const { isProd, networkName } = useEnvironment()
  const logger = useLogger()

  const { data: stateReplayQuery, error: stateReplayError } =
    useStateReplayQuery({
      variables: { cid: txID },
      pollInterval: 30000,
      fetchPolicy: 'cache-first',
      // give the message time to execute on-chain before fetching
      skip: !txID || confirmations < 2
    })

  const { data: txIdQuery, error: txIdError } = useTxIdQuery({
    variables: {
      str: txID
    },
    skip: networkName !== Network.HYPERSPACE
  })

  const msgCID = useMemo<string | null>(() => {
    if (networkName !== Network.HYPERSPACE) return txID
    return isMsgCID(txID) ? txID : txIdQuery.txID?.cid ?? null
  }, [networkName, txIdQuery, txID])

  const fevmHex = useMemo<string | null>(() => {
    if (networkName !== Network.HYPERSPACE) return null
    return isTxHash(txID) ? txID : txIdQuery.txID?.ethHash ?? null
  }, [networkName, txIdQuery, txID])

  const transactionFee = useMemo<string>(() => {
    if (pending) return 'Pending...'
    const cost = stateReplayQuery?.stateReplay?.gasCost?.totalCost
    return cost
      ? `${makeFriendlyBalance(new FilecoinNumber(cost, 'attofil'))} FIL`
      : 'Calculating...'
  }, [stateReplayQuery?.stateReplay?.gasCost?.totalCost, pending])

  const gasUsed = useMemo(
    () => stateReplayQuery?.stateReplay?.gasCost?.gasUsed || 0,
    [stateReplayQuery?.stateReplay?.gasCost]
  )

  const executionTrace = useMemo(
    () =>
      (stateReplayQuery?.stateReplay?.executionTrace
        ?.executionTrace as unknown as ExecutionTrace) || null,
    [stateReplayQuery]
  )

  const methodName = useMethodName(
    message?.to,
    message?.method,
    message?.params
  )

  const { coinType } = useEnvironment()

  const execReturn = useMemo<ExecReturn | null>(() => {
    if (!message) return null
    const isToExec = isAddrEqual(message?.to, 'f01')
    const isInitTx = message?.method === 2
    const receiptReturn = stateReplayQuery?.stateReplay?.receipt?.return
    return isToExec && isInitTx && receiptReturn
      ? getAddrFromReceipt(receiptReturn, coinType)
      : null
  }, [message, stateReplayQuery?.stateReplay?.receipt, coinType])

  const messageState = useMemo<MessageState>(() => {
    if (error) return MessageState.Error
    if (loading) return MessageState.Loading
    if (pending) return MessageState.Pending
    if (!message) return MessageState.NotFound
    if (!gasUsed) return MessageState.Confirmed
    return MessageState.Executed
  }, [pending, message, error, gasUsed, loading])

  // Log errors
  useEffect(() => error && logger.error(error), [error, logger])
  useEffect(
    () => stateReplayError && logger.error(stateReplayError),
    [stateReplayError, logger]
  )
  useEffect(() => txIdError && logger.error(txIdError), [txIdError, logger])

  return (
    <>
      <PageTitle
        sideContent={
          pending && (
            <>
              {speedUpHref && !isProd && (
                <ButtonV2Link green href={speedUpHref} retainParams>
                  <IconSpeedUp height='1em' />
                  Speed up
                </ButtonV2Link>
              )}
              {cancelHref && !isProd && (
                <ButtonV2Link red href={cancelHref} retainParams>
                  <IconCancel height='1em' />
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
          <DetailCaption name='Message Overview' error={error} />
        )}
        {messageState === MessageState.NotFound && (
          <StandardBox>
            <p>Message {txID} not found.</p>
            <p>
              Note - it may take 1-2 minutes for a recently confirmed message to
              show up here.
            </p>
          </StandardBox>
        )}
        {messageState === MessageState.Loading && (
          <StandardBox>
            <LoadingIcon />
            <p>Searching for {txID}... Give us a moment</p>
          </StandardBox>
        )}
        {messageState === MessageState.Pending && (
          <MessageDetailBase
            msgCID={msgCID}
            fevmHex={fevmHex}
            methodName={methodName}
            message={message}
            time={time}
            pending
          />
        )}
        {messageState === MessageState.Confirmed && (
          <>
            <MessageDetailBase
              msgCID={msgCID}
              fevmHex={fevmHex}
              methodName={methodName}
              confirmations={confirmations}
              time={time}
              message={message}
            />
            <hr />
            <p>
              Your transaction has made it on to the Filecoin Network! Once it
              executes, we&apos;ll show more details below.{' '}
            </p>
          </>
        )}
        {messageState === MessageState.Executed && (
          <>
            <MessageDetailBase
              msgCID={msgCID}
              fevmHex={fevmHex}
              methodName={methodName}
              exitCode={stateReplayQuery?.stateReplay?.receipt?.exitCode}
              confirmations={confirmations}
              time={time}
              message={message}
            />
            <Line label='Transaction Fee'>{transactionFee}</Line>
            {!!execReturn && (
              <Line label='New actor created'>
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
                fevmHex={fevmHex}
                message={message as GqlMessage}
                gasUsed={gasUsed}
                gasCost={stateReplayQuery?.stateReplay?.gasCost}
                executionTrace={executionTrace}
              />
            )}
          </>
        )}
      </Lines>
    </>
  )
}

type MessageDetailProps = {
  txID: string
  speedUpHref?: string
  cancelHref?: string
  confirmations: number
}

MessageDetail.propTypes = {
  txID: PropTypes.string.isRequired,
  speedUpHref: PropTypes.string,
  cancelHref: PropTypes.string,
  confirmations: PropTypes.number
}

MessageDetail.defaultProps = {
  confirmations: 50
}
