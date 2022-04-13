import { MessageConfirmed, MessagePending } from '../../generated/graphql'

export function uniqueifyMsgs(messages: (MessagePending | MessageConfirmed)[]) {
  const cids = new Set([])
  return messages
    .reduce((uniqueMessageArr, message) => {
      if (!cids.has(message.cid)) {
        cids.add(message.cid)
        uniqueMessageArr.push(message)
      }
      return uniqueMessageArr
    }, [])
    .sort((a, b) => Number(b.nonce) - Number(a.nonce))
}
