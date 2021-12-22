import { gql } from '@apollo/client'

export interface MessagesVars {
  address: string
  limit: number
  offset: number
}

export const MESSAGES = gql`
  query Messages {
    messages(
      address: "t1b7l72vdnasf5yxoft5ihtujsnm6nvdpejsqj3ta"
      limit: 10
      offset: 20
    ) {
      cid
      method
      height
      to {
        id
      }
      value
    }
  }
`
