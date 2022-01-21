import {
  ApolloClient,
  InMemoryCache,
  InMemoryCacheConfig
} from '@apollo/client'
import Logger from '../../utils/logger'

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
      keyFields: ['cid']
    },
    MessageConfirmed: {
      keyFields: ['cid'],
      fields: {
        params: {
          // The params field is expected to be a JSON string
          // or null. Both are safe to pass to JSON parse. The
          // result should be a valid javascript object or null.
          merge(_: any, incoming: any) {
            try {
              return JSON.parse(incoming)
            } catch (e) {
              const msg = e instanceof Error ? e.message : String(e)
              Logger.error(`Failed to parse MessageConfirmed.params: ${msg}`)
              return null
            }
          }
        }
      }
    },
    MessagePending: {
      keyFields: ['cid']
    },
    MsigPending: {
      keyFields: ['id']
      // fields: {
      //   params: {
      //     // The params field is expected to be a JSON string
      //     // or null. Both are safe to pass to JSON parse. The
      //     // result should be a valid javascript object or null.
      //     merge(_: any, incoming: any) {
      //       try {
      //         return JSON.parse(incoming)
      //       } catch (e) {
      //         const msg = e instanceof Error ? e.message : String(e)
      //         Logger.error(`Failed to parse MessageConfirmed.params: ${msg}`)
      //         return null
      //       }
      //     }
      //   }
      // }
    }
  }
}

export const client = new ApolloClient({
  uri: 'https://graph.glif.host/query',
  cache: new InMemoryCache({ ...defaultMessageHistoryClientCacheConfig })
})
