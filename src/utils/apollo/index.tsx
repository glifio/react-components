import { ReactNode } from 'react'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  split
} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'
import { defaultMessageHistoryClientCacheConfig } from '../../components/HistoryTables/defaultCacheConfig'
import { useEnvironment } from '../../services'

const httpLink = (uri: string): HttpLink =>
  new HttpLink({
    uri: `https://${uri}`
  })

const wsLink = (uri: string): WebSocketLink | null => {
  return process.browser
    ? new WebSocketLink({
        uri: `wss://${uri}`,
        options: {
          reconnect: true,
          lazy: true
        }
      })
    : null
}

export function createApolloClient(uri: string) {
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
        wsLink(uri),
        httpLink(uri)
      )
    : httpLink(uri)

  return new ApolloClient({
    link,
    cache: new InMemoryCache({ ...defaultMessageHistoryClientCacheConfig })
  })
}

export function ApolloWrapper({ children }: { children: ReactNode }) {
  const client = createApolloClient(useEnvironment().graphUrl)
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
