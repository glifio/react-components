import { BigNumber } from '@glif/filecoin-number'
import { MessageConfirmed, MessagePending } from '../../generated/graphql'

export function uniqueifyMsgs(
  messages: (MessagePending | MessageConfirmed)[]
): (MessagePending | MessageConfirmed)[] {
  const cids = new Set([])
  return (
    messages

      // Remove duplicate CIDs
      .reduce((uniqueMessageArr, message) => {
        if (!cids.has(message.cid)) {
          cids.add(message.cid)
          uniqueMessageArr.push(message)
        }
        return uniqueMessageArr
      }, [] as (MessagePending | MessageConfirmed)[])

      // Remove replaced messages
      .filter((msg, i, arr) => {
        return !arr.find(
          m =>
            m.from === msg.from &&
            m.nonce === msg.nonce &&
            new BigNumber(m.gasPremium).isGreaterThan(msg.gasPremium)
        )
      })

      // Sort messages by nonce, descending
      .sort((a, b) => Number(b.nonce) - Number(a.nonce))
  )
}
