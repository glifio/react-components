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
import { defaultMessageHistoryClientCacheConfig } from './defaultCacheConfig'

import { useEnvironment } from '../../services'

const httpLink = (uri: string, secure: boolean): HttpLink =>
  new HttpLink({
    uri: `http${secure ? 's' : ''}://${uri}`
  })

const wsLink = (uri: string, secure: boolean): WebSocketLink =>
  new WebSocketLink({
    uri: `ws${secure ? 's' : ''}://${uri}`,
    options: {
      reconnect: true,
      lazy: true
    }
  })

export function createApolloClient(uri: string, secure: boolean) {
  // The split function takes three parameters:
  //
  // * A function that's called for each operation to execute
  // * The Link to use for an operation if the function returns a "truthy" value
  // * The Link to use for an operation if the function returns a "falsy" value

  // Only create the split in the browser
  const isBrowser = typeof window !== 'undefined'
  const link = isBrowser
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query)
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          )
        },
        wsLink(uri, secure),
        httpLink(uri, secure)
      )
    : httpLink(uri, secure)

  return new ApolloClient({
    link,
    cache: new InMemoryCache({ ...defaultMessageHistoryClientCacheConfig })
  })
}

export function ApolloWrapper({ children }: { children: ReactNode }) {
  const { graphUrl, graphSecure } = useEnvironment()
  const client = createApolloClient(graphUrl, graphSecure)
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export * from './defaultCacheConfig'
