import { useState, useMemo, useEffect } from 'react'
import { ExecutionTrace } from '@glif/filecoin-wallet-provider'
import { FilecoinNumber } from '@glif/filecoin-number'
import PropTypes from 'prop-types'
import { Message, useStateReplayQuery } from '../../../../generated/graphql'
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
import { ButtonV2Link } from '../../../Button/V2'
import { IconCancel, IconSpeedUp } from '../../../Icons'
import {
  useEnvironment,
  useLogger
} from '../../../../services/EnvironmentProvider'

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
  const { isProd } = useEnvironment()
  const logger = useLogger()

  const { data: stateReplayQuery, error: stateReplayError } =
    useStateReplayQuery({
      variables: { cid: props.cid },
      pollInterval: 30000,
      fetchPolicy: 'cache-first',
      // give the message time to execute on-chain before fetching
      skip: !props.cid || props.confirmations < 2
    })

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

  const { methodName, actorName } = useMethodName(message)

  const { coinType } = useEnvironment()

  const execReturn = useMemo<ExecReturn | null>(() => {
    if (!message) return null
    const isToExec = isAddrEqual(message?.to, 'f01')
    const isInitTx = Number(message?.method) === 2
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

  return (
    <>
      <PageTitle
        sideContent={
          pending && (
            <>
              {speedUpHref && !isProd && (
                <ButtonV2Link green href={speedUpHref} retainParams>
                  <IconSpeedUp width='1.25rem' />
                  Speed up
                </ButtonV2Link>
              )}
              {cancelHref && !isProd && (
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
          <>
            <MessageDetailBase
              cid={cid}
              methodName={methodName}
              confirmations={confirmations}
              time={time}
              message={message}
            />
            <p>Loading more details...</p>
          </>
        )}
        {messageState === MessageState.Executed && (
          <>
            <MessageDetailBase
              cid={cid}
              exitCode={stateReplayQuery?.stateReplay?.receipt?.exitCode}
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
                gasCost={stateReplayQuery?.stateReplay?.gasCost}
                executionTrace={executionTrace}
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
