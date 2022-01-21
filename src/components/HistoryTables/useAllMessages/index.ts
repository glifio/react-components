import { useMemo, useState } from 'react'
import {
  MessagePending,
  MessageConfirmed,
  useMpoolUpdateSubscription,
  usePendingMessagesQuery,
  useStateListMessagesQuery,
  useMessagesConfirmedQuery
} from '../../../generated/graphql'
import { uniqueifyMsgs } from '../../../utils/uniqueifyMsgs'
import { useSubmittedMessages } from '../PendingMsgContext'

const DEFAULT_LIMIT = 10

export const usePendingMessages = (address: string) => {
  const { messages: submittedMessages } = useSubmittedMessages()
  const pendingMsgs = usePendingMessagesQuery({
    variables: { address, offset: 0, limit: Number.MAX_SAFE_INTEGER },
    // dont poll here because we rely on the subscription and StateListMessage query for updates
    pollInterval: 0
  })

  const pendingMsgSub = useMpoolUpdateSubscription({ variables: { address } })

  const pendingMsgList = useMemo(() => {
    // start with the messages we know about
    let messageList = [...submittedMessages]

    // add any messages that we get from our query
    if (!pendingMsgs?.loading && pendingMsgs.data) {
      messageList = uniqueifyMsgs(
        [...messageList] as Required<MessagePending>[],
        ([
          ...pendingMsgs?.data?.pendingMessages
        ] as Required<MessagePending>[]) || []
      ) as MessagePending[]
    }

    // add any messages that came from our subscription
    if (!pendingMsgSub?.loading) {
      if (pendingMsgSub.data.mpoolUpdate.type === 0) {
        messageList = uniqueifyMsgs(
          [...messageList] as Required<MessagePending>[],
          [
            // @ts-expect-error
            pendingMsgSub.data.mpoolUpdate.message as MessagePending
          ]
        ) as MessagePending[]
      }
    }

    return messageList
  }, [pendingMsgSub, pendingMsgs, submittedMessages])

  return pendingMsgList
}

// note this does not filter out errors for loading pending messages...
export const useAllMessages = (address: string, _offset: number = 0) => {
  // these pending messages might have recently confirmed low conf messages... filter them out
  const _pendingMsgs = usePendingMessages(address)
  // const lowConfidenceMsgs = useStateListMessagesQuery({
  //   variables: { address }
  // })

  const lowConfidenceMsgs = useMemo(
    () => ({
      data: {
        stateListMessages: [] as MessageConfirmed[]
      },
      loading: false,
      error: null
    }),
    []
  )

  // pluck confirmed messages from the pending message list
  const pendingMsgs = useMemo(() => {
    if (
      !lowConfidenceMsgs.loading &&
      !!lowConfidenceMsgs?.data?.stateListMessages
    ) {
      const confirmedCids = new Set(
        lowConfidenceMsgs?.data?.stateListMessages.map(msg => msg.cid)
      )
      return _pendingMsgs
        .filter(msg => !confirmedCids.has(msg.cid))
        .sort((a, b) => Number(b.nonce) - Number(a.nonce))
    } else {
      return []
    }
  }, [_pendingMsgs, lowConfidenceMsgs]) as MessagePending[]

  const [offset, setOffset] = useState(_offset)

  const {
    data,
    loading: confirmedMsgsLoading,
    error: confirmedMsgsErr,
    fetchMore
  } = useMessagesConfirmedQuery({
    variables: { address, limit: DEFAULT_LIMIT, offset }
  })

  function onClickLoadMore() {
    fetchMore({
      variables: {
        offset: offset + DEFAULT_LIMIT
      }
    })
    setOffset(offset + DEFAULT_LIMIT)
  }

  const loading = useMemo(() => {
    return confirmedMsgsLoading || lowConfidenceMsgs.loading
  }, [confirmedMsgsLoading, lowConfidenceMsgs.loading])

  const error = useMemo(() => {
    return confirmedMsgsErr || lowConfidenceMsgs.error
  }, [confirmedMsgsErr, lowConfidenceMsgs.error])

  const messages = useMemo<MessageConfirmed[]>(() => {
    if (
      !confirmedMsgsLoading &&
      !confirmedMsgsErr &&
      !lowConfidenceMsgs.loading &&
      !lowConfidenceMsgs.error
    ) {
      // mark the CIDs we have from high confidence
      const highConfidenceCIDs = new Set(
        [...data?.messagesConfirmed].map(msg => msg.cid)
      )

      // dont include any from low confidence when we have high confidence
      const filteredLowConfidenceMsgs = lowConfidenceMsgs?.data
        ?.stateListMessages
        ? lowConfidenceMsgs?.data?.stateListMessages.filter(
            msg => !highConfidenceCIDs.has(msg.cid)
          )
        : []

      // merge the two results
      return [
        // TODO remove the sort once we have that done
        ...filteredLowConfidenceMsgs.sort((a, b) => b.height - a.height),
        ...data.messagesConfirmed
      ] as MessageConfirmed[]
    }
    return []
  }, [confirmedMsgsLoading, confirmedMsgsErr, lowConfidenceMsgs, data])

  return { messages, pendingMsgs, fetchMore: onClickLoadMore, loading, error }
}
