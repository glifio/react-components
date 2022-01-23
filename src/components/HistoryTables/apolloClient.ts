import {
  ApolloClient,
  InMemoryCache,
  InMemoryCacheConfig,
  HttpLink,
  split
} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'
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

const httpLink = new HttpLink({
  uri: 'https://graph.glif.host/query'
})

const wsLink = new WebSocketLink({
  uri: 'wss://graph.glif.host/subscriptions',
  options: {
    reconnect: true
  }
})

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache({ ...defaultMessageHistoryClientCacheConfig })
})
