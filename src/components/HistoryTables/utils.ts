import { FilecoinNumber, BigNumber } from '@glif/filecoin-number'
import { MessageConfirmed } from '../../generated/graphql'

export function attoFilToFil(amount: string | number | BigNumber): string {
  return new FilecoinNumber(amount, 'attofil').toFil() + ' FIL'
}

export function getTotalCost(
  message: Pick<
    MessageConfirmed,
    'baseFeeBurn' | 'overEstimationBurn' | 'minerTip'
  >
): string {
  const bnBaseFeeBurn = new BigNumber(message.baseFeeBurn)
  const bnOverEstimationBurn = new BigNumber(message.overEstimationBurn)
  const bnMinerTip = new BigNumber(message.minerTip)
  const totalCost = bnBaseFeeBurn.plus(bnOverEstimationBurn).plus(bnMinerTip)
  return new FilecoinNumber(totalCost, 'attofil').toFil() + ' FIL'
}

export function getGasPercentage(
  message: Pick<MessageConfirmed, 'gasLimit' | 'gasUsed'>
): string {
  const gasLimit = new BigNumber(message.gasLimit)
  const gasUsed = new BigNumber(message.gasUsed)
  return gasUsed.dividedBy(gasLimit).times(100).toFixed(1) + '%'
}
