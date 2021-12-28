import { gql } from '@apollo/client'

export interface MessagesConfirmedVars {
  address: string
  limit: number
  offset: number
}

export const MESSAGES_CONFIRMED = gql`
  query MessagesConfirmed($address: String!, $limit: Int!, $offset: Int!) {
    messagesConfirmed(address: $address, limit: $limit, offset: $offset) {
      cid
      height
      from {
        robust
        id
      }
      to {
        robust
        id
      }
      value
      gasFeeCap
      gasPremium
      gasLimit
      methodName
      method
      actorFamily
      exitCode
      gasUsed
      parentBaseFee
      baseFeeBurn
      overEstimationBurn
      minerPenalty
      minerTip
      refund
      gasRefund
      gasBurned
      block {
        Timestamp
      }
    }
  }
`

export const MESSAGE_CONFIRMED = gql`
  query Message($cid: String!) {
    message(cid: $cid) {
      cid
      height
      from {
        robust
        id
      }
      to {
        robust
        id
      }
      value
      gasFeeCap
      gasPremium
      gasLimit
      methodName
      method
      actorFamily
      exitCode
      gasUsed
      parentBaseFee
      baseFeeBurn
      overEstimationBurn
      minerPenalty
      minerTip
      refund
      gasRefund
      gasBurned
      block {
        Timestamp
      }
    }
  }
`
