import { MessageConfirmed, MessagePending } from '../../generated/graphql'

export function uniqueifyMsgs(
  oldMessages: (MessagePending | MessageConfirmed)[],
  newMessages: (MessagePending | MessageConfirmed)[]
) {
  const cids = new Set(newMessages.map(msg => msg.cid))
  return oldMessages
    .reduce(
      (uniqueMessageArr, message) => {
        if (!cids.has(message.cid)) {
          cids.add(message.cid)
          uniqueMessageArr.push(message)
        }
        return uniqueMessageArr
      },
      [...newMessages]
    )
    .sort((a, b) => Number(b.nonce) - Number(a.nonce))
}
