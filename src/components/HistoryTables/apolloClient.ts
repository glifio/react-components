import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'
import { defaultMessageHistoryClientCacheConfig } from './defaultCacheConfig'

const httpLink = new HttpLink({
  uri: 'https://graph.glif.host/query'
})

const wsLink = process.browser
  ? new WebSocketLink({
      uri: 'wss://graph.glif.host/query',
      options: {
        reconnect: false,
        lazy: true
      }
    })
  : null

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const link = process.browser //only create the split in the browser
  ? split(
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
  : httpLink

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache({ ...defaultMessageHistoryClientCacheConfig })
})
