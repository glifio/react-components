import { InMemoryCacheConfig } from '@apollo/client'
import Logger from '../../utils/logger'

// The params field is expected to be a JSON string
// or null. Both are safe to pass to JSON parse. The
// result should be a valid javascript object or null.
const parseParams = (_: any, incoming: any) => {
  try {
    console.log('parsing params')
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
          // Don't cache separate results based on
          // any of this field's arguments.
          keyArgs: false,
          // Concatenate the incoming list items with
          // the existing list items.
          merge(existing = [], incoming) {
            return [...existing, ...incoming]
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
    StateListMessages: {
      keyFields: ['cid'],
      fields: {
        params: {
          merge: parseParams
        }
      }
    },
    MessagePending: {
      keyFields: ['cid']
    },
    MsigPending: {
      keyFields: ['id'],
      fields: {
        params: {
          merge: parseParams
        }
      }
    }
  }
}
