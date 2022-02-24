import { gql } from '@apollo/client'

export const messageConfirmedFragment = gql`
  fragment CachedMessage on MessageConfirmed {
    cid
    height
    from {
      id
      robust
    }
    to {
      id
      robust
    }
    value
    nonce
    gasFeeCap
    gasPremium
    gasLimit
    method
    exitCode
    gasUsed
    baseFeeBurn
    overEstimationBurn
    minerPenalty
    minerTip
    refund
    gasRefund
    gasBurned
    params
    actorName
    block {
      Cid
      Timestamp
    }
  }
`

export const messagePendingFragment = gql`
  fragment CachedMessage on MessagePending {
    cid
    version
    to {
      robust
      id
    }
    from {
      robust
      id
    }
    nonce
    value
    gasLimit
    gasFeeCap
    gasPremium
    method
    height
    params
  }
`
