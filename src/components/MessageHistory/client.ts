import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: 'https://graph.glif.host/query',
  cache: new InMemoryCache()
})
