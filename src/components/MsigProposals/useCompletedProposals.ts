import { useState, useEffect, useMemo } from 'react'
import { cloneDeep } from '@apollo/client/utilities'
import {
  MessageConfirmed,
  MsigTransaction,
  useMessagesConfirmedQuery,
  useMsigPendingQuery
} from '../../generated/graphql'

const DEFAULT_LIMIT = 10
const DEFAULT_OFFSET = 0

export type CompleteProposal = {
  proposal: MsigTransaction
  messageConfirmed: MessageConfirmed
}

export const useCompletedProposals = (address: string) => {
  const [offset, setOffset] = useState(DEFAULT_OFFSET)

  function onClickLoadMore() {
    fetchMoreMsigTransactions({
      variables: {
        offset: offset + DEFAULT_LIMIT
      }
    })
    setOffset(offset + DEFAULT_LIMIT)
  }

  const {
    data: msigData,
    loading: msigDataLoading,
    error: msigDataError,
    fetchMore: fetchMoreMsigTransactions
  } = useMsigPendingQuery({
    variables: {
      address: address,
      limit: DEFAULT_LIMIT,
      offset: DEFAULT_OFFSET
    },
    pollInterval: 0
  })

  const {
    data: messageConfirmedData,
    loading: messageConfirmedLoading,
    error: messageConfirmedError,
    fetchMore: fetchMoreMessagesConfirmed
  } = useMessagesConfirmedQuery({
    variables: {
      address: address,
      limit: DEFAULT_LIMIT,
      offset: DEFAULT_OFFSET
    },
    pollInterval: 0
  })

  const [completedProposals, setCompletedProposals] = useState<
    CompleteProposal[]
  >([])

  // merges each proposal with its confirmed message for additional information about the proposal
  useEffect(() => {
    const assembleCompleteProposals = async () => {
      // keep track of proposalIDs and their index in original array
      let proposalIDsWIdxs: { id: number; idx: number }[] =
        msigData.msigPending.map((proposal, idx) => ({
          id: proposal.id as number,
          idx
        }))
      // keep track of each proposal id to find
      let currentProposalToFind = proposalIDsWIdxs[0].id
      // keep track of all the proposal ids weve found in confirmed messages
      let proposalIDFound = -1
      // keep track of message confirmed pagination
      let messageConfirmedOffset = 0

      while (proposalIDsWIdxs.length > 0) {
        messageConfirmedData.messagesConfirmed.forEach(message => {
          // if we find a proposal...
          if ((message.method as number) === 2) {
            // mark it as found (ids happen in order)
            proposalIDFound += 1
            // if this is the proposal we were looking for...
            if (proposalIDFound === currentProposalToFind) {
              // create the completed proposal w/out mutations
              const completedProposal = {
                proposal: cloneDeep<MsigTransaction>(
                  msigData.msigPending[
                    proposalIDsWIdxs[0].idx
                  ] as MsigTransaction
                ),
                messageConfirmed: cloneDeep<MessageConfirmed>(
                  message as MessageConfirmed
                )
              }
              // shift the proposal id off our proposal to find queue (stops infinite loops..)
              proposalIDsWIdxs.shift()
              // reset the next proposal id to find through confirmed messages
              currentProposalToFind = proposalIDsWIdxs[0]?.id || null
              // load the completed proposals found into the UI lazily
              setCompletedProposals(prevState => [
                ...prevState,
                completedProposal
              ])
            }
          }
        })

        // if we havent found matching msgs for all the proposals were looking for
        if (proposalIDsWIdxs.length > 0) {
          await fetchMoreMessagesConfirmed({
            variables: {
              offset: messageConfirmedOffset + DEFAULT_LIMIT
            }
          })
          // mark the paginator
          messageConfirmedOffset += 1
        }
      }
    }
    if (!msigDataLoading && !messageConfirmedLoading) {
      assembleCompleteProposals()
    }
  }, [
    msigData,
    messageConfirmedData,
    fetchMoreMessagesConfirmed,
    msigDataLoading,
    messageConfirmedLoading
  ])

  const loading = useMemo(() => {
    // if either data sources are loading, we're loading
    if (msigDataLoading || messageConfirmedLoading) return true
    // otherwise, wed expect completedProposals.length to be greater than 0 if were not loading
    if (completedProposals.length === 0) return true
    // if msig data isnt loading, but we dont have msig data, were not loading
    if (!msigDataLoading && msigData?.msigPending?.length === 0) return false

    return false
  }, [
    msigDataLoading,
    messageConfirmedLoading,
    msigData?.msigPending?.length,
    completedProposals.length
  ])

  return {
    completedProposals,
    error: msigDataError || messageConfirmedError,
    loading,
    onClickLoadMore
  }
}
