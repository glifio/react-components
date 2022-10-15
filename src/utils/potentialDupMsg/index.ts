import { Message } from '@glif/filecoin-message'
import BigNumber from 'bignumber.js'
import { MessagePending } from '../../generated/graphql'
import { isAddrEqual } from '../isAddrEqual'

export const potentialDupMsg = (
  msg1: Omit<MessagePending, '__typename'>,
  msg2: Message,
  currentHeight: number,
  isPending: boolean = false
): string | null => {
  if (!msg1 || !msg2) return null

  const fromAddrEq = isAddrEqual(msg1.from, msg2.from)
  const toAddrEq = isAddrEqual(msg1.to, msg2.to)
  const methodEq = Number(msg1.method) === msg2.method
  const valueEq = new BigNumber(msg1.value).isEqualTo(msg2.value)
  const paramsEq =
    !msg1.params && !msg2.params ? true : msg1.params === msg2.params
  // if the message is pending or occurred in the last 900 epochs, it's considered "recent"
  const isRecent =
    isPending || (msg1.height > 0 && currentHeight - msg1.height < 900)

  if (fromAddrEq && toAddrEq && methodEq && valueEq && paramsEq && isRecent)
    return msg1.cid
  return null
}
