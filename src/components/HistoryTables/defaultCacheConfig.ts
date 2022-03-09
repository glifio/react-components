import { InMemoryCacheConfig } from '@apollo/client'
import Logger from '../../utils/logger'

// The params field is expected to be a JSON string
// or null. Both are safe to pass to JSON parse. The
// result should be a valid javascript object or null.
const parseParams = (_: any, incoming: any) => {
  try {
    if (incoming) {
      return JSON.parse(incoming)
    }
    return null
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    Logger.error(`Failed to parse MessageConfirmed.params: ${msg}`)
    return null
  }
}

export const defaultMessageHistoryClientCacheConfig: InMemoryCacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        messagesConfirmed: {
          // Cache separate results based on address passed as arg
          keyArgs: ['address'],
          // Concatenate the incoming list items with
          // the existing list items.
          merge(existing = [], incoming) {
            return [...existing, ...incoming]
          }
        },
        messages: {
          // Cache separate results based on address passed as arg
          keyArgs: ['address'],
          // Concatenate the incoming list items with
          // the existing list items.
          merge(existing = [], incoming) {
            return [...existing, ...incoming]
          }
        },
        messageLowConfidence: {
          read(_, { args, toReference }) {
            return toReference({
              __typename: 'MessageConfirmed',
              cid: args.cid
            })
          }
        },
        message: {
          read(_, { args, toReference }) {
            return toReference({
              __typename: 'MessageConfirmed',
              cid: args.cid
            })
          }
        }
      }
    },
    Block: {
      keyFields: ['Cid']
    },
    Message: {
      keyFields: ['cid'],
      fields: {
        params: {
          merge: parseParams
        }
      }
    },
    MessageConfirmed: {
      keyFields: ['cid'],
      fields: {
        params: {
          merge: parseParams
        }
      }
    },
    MessagePending: {
      keyFields: ['cid'],
      fields: {
        params: {
          merge: parseParams
        }
      }
    },
    MsigTransaction: {
      keyFields: ['id'],
      fields: {
        params: {
          merge: parseParams
        }
      }
    }
  }
}
