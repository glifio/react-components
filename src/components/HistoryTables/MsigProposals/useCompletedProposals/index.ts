import { useState, useEffect, useMemo } from 'react'
import { cloneDeep } from '@apollo/client/utilities'
import {
  MessageConfirmed,
  MsigTransaction,
  useMessageQuery,
  useMessagesConfirmedQuery,
  useMsigPendingQuery
} from '../../../../generated/graphql'

const DEFAULT_LIMIT = 10
const DEFAULT_OFFSET = 0

export type CompleteProposal = {
  proposal: MsigTransaction
  messageConfirmed: MessageConfirmed
}

/* CURRENTLY UNUSED BC PRONE TO BUGS WITH HOW STATELISTMESSAGES LAGS */
export const useCompletedProposals = (address: string) => {
  const [assemblingProposals, setAssemblingProposals] = useState(false)

  const {
    data: msigData,
    loading: msigDataLoading,
    error: msigDataError
  } = useMsigPendingQuery({
    variables: {
      address: address,
      limit: Number.MAX_SAFE_INTEGER,
      offset: 0
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
      let proposalIDsWIdxs: { id: number; idx: number }[] = msigData.msigPending
        .map((proposal, idx) => ({
          id: proposal.id as number,
          idx
        }))
        .sort((a, b) => a.id - b.id)
      // keep track of each proposal id to find
      let currentProposalToFind = proposalIDsWIdxs[0].id
      // keep track of all the proposal ids weve found in confirmed messages
      let proposalIDFound = -1
      // keep track of message confirmed pagination
      let messageConfirmedOffset = 0

      let messagesConfirmed = cloneDeep<MessageConfirmed[]>(
        messageConfirmedData.messagesConfirmed as MessageConfirmed[]
      )

      while (proposalIDsWIdxs.length > 0) {
        messagesConfirmed.forEach(message => {
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
          const { data } = await fetchMoreMessagesConfirmed({
            variables: {
              offset: messageConfirmedOffset + DEFAULT_LIMIT
            }
          })
          messagesConfirmed = data.messagesConfirmed as MessageConfirmed[]
          // mark the paginator
          messageConfirmedOffset += 1
        }
      }
    }
    if (!msigDataLoading && !messageConfirmedLoading && !assemblingProposals) {
      setAssemblingProposals(true)
      assembleCompleteProposals()
    }
  }, [
    assemblingProposals,
    setAssemblingProposals,
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
    loading
  }
}

export const useCompletedProposal = (
  id: number,
  address: string,
  cid?: string
) => {
  const [assemblingProposal, setAssemblingProposal] = useState(false)
  const [completedProposal, setCompletedProposal] =
    useState<CompleteProposal | null>(null)

  const {
    data: msigData,
    loading: msigDataLoading,
    error: msigDataError
  } = useMsigPendingQuery({
    variables: {
      address,
      limit: Number.MAX_SAFE_INTEGER,
      offset: 0
    },
    pollInterval: 0
  })

  const relevantProposal = useMemo(
    () => msigData?.msigPending?.find(p => p.id === id) as MsigTransaction,
    [msigData?.msigPending, id]
  )
  const {
    data: messageConfirmedData,
    loading: messageConfirmedLoading,
    error: messageConfirmedError,
    fetchMore: fetchMoreMessagesConfirmed
  } = useMessagesConfirmedQuery({
    variables: {
      address,
      limit: DEFAULT_LIMIT,
      offset: DEFAULT_OFFSET
    },
    pollInterval: 0,
    skip: !!cid
  })

  const {
    data: proposalTXData,
    loading: proposalTXLoading,
    error: proposalTXError
  } = useMessageQuery({
    variables: { cid },
    pollInterval: 0,
    skip: !cid
  })

  // merges each proposal with its confirmed message for additional information about the proposal
  useEffect(() => {
    const assembleCompleteProposal = async () => {
      let proposalFound = false
      // keep track of all the proposal ids weve found in confirmed messages
      let proposalIDFound = -1
      // keep track of message confirmed pagination
      let messageConfirmedOffset = 0

      let messagesConfirmed = cloneDeep<MessageConfirmed[]>(
        messageConfirmedData.messagesConfirmed as MessageConfirmed[]
      )

      while (!proposalFound) {
        messagesConfirmed.forEach(message => {
          // if we find a proposal...
          if ((message.method as number) === 2) {
            // mark it as found (ids happen in order)
            proposalIDFound += 1
            // if this is the proposal we were looking for...
            if (proposalIDFound === relevantProposal.id) {
              // load the completed proposals found into the UI lazily
              setCompletedProposal({
                proposal: cloneDeep<MsigTransaction>(relevantProposal),
                messageConfirmed: cloneDeep<MessageConfirmed>(
                  message as MessageConfirmed
                )
              })
            }
          }
        })

        // if we havent found matching msgs for all the proposals were looking for
        if (!proposalFound) {
          const { data } = await fetchMoreMessagesConfirmed({
            variables: {
              offset: messageConfirmedOffset + DEFAULT_LIMIT
            }
          })
          messagesConfirmed = data.messagesConfirmed as MessageConfirmed[]
          // mark the paginator
          messageConfirmedOffset += 1
        }
      }
    }

    if (
      !msigDataLoading &&
      !messageConfirmedLoading &&
      !assemblingProposal &&
      !cid
    ) {
      setAssemblingProposal(true)
      assembleCompleteProposal()
    }
  }, [
    assemblingProposal,
    setAssemblingProposal,
    msigData,
    messageConfirmedData,
    fetchMoreMessagesConfirmed,
    msigDataLoading,
    messageConfirmedLoading,
    relevantProposal,
    cid
  ])

  const completedProposalReturn = useMemo<CompleteProposal>(() => {
    if (cid && !proposalTXLoading && relevantProposal) {
      return {
        proposal: cloneDeep<MsigTransaction>(relevantProposal),
        messageConfirmed: cloneDeep<MessageConfirmed>(
          proposalTXData.message as MessageConfirmed
        )
      }
    } else if (cid) {
      return null
    } else {
      return completedProposal
    }
  }, [
    cid,
    completedProposal,
    relevantProposal,
    proposalTXData?.message,
    proposalTXLoading
  ])

  const loading = useMemo(() => {
    // if either data sources are loading, we're loading
    if (msigDataLoading || messageConfirmedLoading || proposalTXError)
      return true
    // otherwise, wed expect completedProposal to be present
    if (!completedProposalReturn) return true
    // if msig data isnt loading, but we dont have msig data, were not loading
    if (!msigDataLoading && msigData?.msigPending?.length === 0) return false

    return false
  }, [
    msigDataLoading,
    messageConfirmedLoading,
    msigData?.msigPending?.length,
    completedProposalReturn,
    proposalTXError
  ])

  const badMatch = useMemo(() => {
    if (completedProposalReturn?.messageConfirmed.method !== 2) {
      return new Error('CID does not match proposal')
    }
  }, [completedProposalReturn])

  return {
    completedProposal: badMatch ? null : completedProposalReturn,
    error:
      msigDataError || messageConfirmedError || proposalTXError || badMatch,
    loading
  }
}
