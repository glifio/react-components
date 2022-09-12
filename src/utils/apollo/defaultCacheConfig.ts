import { InMemoryCacheConfig } from '@apollo/client'
import { removeMessageDups } from '../removeGQLMsgDups'

const parseExecutionTrace = (_: any, incoming: any) => {
  try {
    if (incoming) {
      const params = JSON.parse(incoming)
      return params
    }
    return null
  } catch (e) {
    console.error(e)
    return null
  }
}

export const defaultMessageHistoryClientCacheConfig: InMemoryCacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        messages: {
          // Cache separate results based on address passed as arg
          keyArgs: ['address'],
          // Concatenate the incoming list items with
          // the existing list items.
          merge(existing = [], incoming = [], { args }) {
            return removeMessageDups(
              existing ? [...existing] : [],
              incoming ? [...incoming] : [],
              args as unknown as { limit: number; offset: number }
            )
          }
        },
        message: {
          read(_, { args, toReference }) {
            return toReference({
              __typename: 'Message',
              cid: args.cid
            })
          }
        }
      }
    },
    Block: {
      keyFields: ['cid']
    },
    Message: {
      keyFields: ['cid']
    },
    Tipset: {
      keyFields: ['height']
    },
    StateReplay: {
      keyFields: ['cid']
    },
    ExecutionTrace: {
      fields: {
        executionTrace: {
          merge: parseExecutionTrace
        }
      }
    },
    Address: {
      keyFields: ['robust', 'id']
    },
    MessagePending: {
      keyFields: ['cid']
    },
    MsigTransaction: {
      keyFields: ['id']
    }
  }
}
