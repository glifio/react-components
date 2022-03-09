import { FilecoinNumber, BigNumber } from '@glif/filecoin-number'
import { MessageConfirmed, MessagePending } from '../../../generated/graphql'
import makeFriendlyBalance from '../../../utils/makeFriendlyBalance'

export function attoFilToFil(amount: string | number | BigNumber): string {
  return new FilecoinNumber(amount, 'attofil').toFil() + ' FIL'
}

export function getTotalCost(
  message:
    | Pick<MessageConfirmed, 'baseFeeBurn' | 'overEstimationBurn' | 'minerTip'>
    | MessagePending,
  pending: boolean
): string {
  if (pending) return ''
  message = message as MessageConfirmed
  const bnBaseFeeBurn = new BigNumber(message.baseFeeBurn)
  const bnOverEstimationBurn = new BigNumber(message.overEstimationBurn)
  const bnMinerTip = new BigNumber(message.minerTip)
  const totalCost = bnBaseFeeBurn.plus(bnOverEstimationBurn).plus(bnMinerTip)
  return new FilecoinNumber(totalCost, 'attofil').toFil() + ' FIL'
}

export function getTotalCostShort(
  message:
    | Pick<MessageConfirmed, 'baseFeeBurn' | 'overEstimationBurn' | 'minerTip'>
    | MessagePending,
  pending: boolean = false
): string {
  if (pending) return ''
  message = message as MessageConfirmed
  const bnBaseFeeBurn = new BigNumber(message.baseFeeBurn)
  const bnOverEstimationBurn = new BigNumber(message.overEstimationBurn)
  const bnMinerTip = new BigNumber(message.minerTip)
  const totalCost = bnBaseFeeBurn.plus(bnOverEstimationBurn).plus(bnMinerTip)
  const totalFil = new FilecoinNumber(totalCost, 'attofil')
  return makeFriendlyBalance(totalFil) + ' FIL'
}

export function getGasPercentage(
  message: Pick<MessageConfirmed, 'gasLimit' | 'gasUsed'> | MessagePending,
  pending: boolean
): string {
  if (pending) return ''
  message = message as MessageConfirmed
  const gasLimit = new BigNumber(message.gasLimit)
  const gasUsed = new BigNumber(message.gasUsed)
  return gasUsed.dividedBy(gasLimit).times(100).toFixed(1) + '%'
}

export function formatNumber(input: string | number | BigNumber): string {
  const bigNr = input instanceof BigNumber ? input : new BigNumber(input)
  return bigNr.toFormat()
}

export function removeMessageDups(
  existing: { __ref: any }[],
  incoming: { __ref: any }[],
  args: { offset: number; limit: number }
) {
  const head = [...existing]
  const tail = head.splice(args.offset * args.limit)
  const merged = [].concat(head, incoming, tail)

  const found = new Set([])
  return [...merged].filter(ele => {
    if (!found.has(ele.__ref)) {
      found.add(ele.__ref)
      return true
    }

    return false
  })
}
