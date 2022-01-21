import { FilecoinNumber, BigNumber } from '@glif/filecoin-number'
import { MessageConfirmed } from '../../generated/graphql'
import makeFriendlyBalance from '../../utils/makeFriendlyBalance'

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

export function getTotalCostShort(
  message: Pick<
    MessageConfirmed,
    'baseFeeBurn' | 'overEstimationBurn' | 'minerTip'
  >
): string {
  const bnBaseFeeBurn = new BigNumber(message.baseFeeBurn)
  const bnOverEstimationBurn = new BigNumber(message.overEstimationBurn)
  const bnMinerTip = new BigNumber(message.minerTip)
  const totalCost = bnBaseFeeBurn.plus(bnOverEstimationBurn).plus(bnMinerTip)
  const totalFil = new FilecoinNumber(totalCost, 'attofil')
  return makeFriendlyBalance(totalFil) + ' FIL'
}

export function getGasPercentage(
  message: Pick<MessageConfirmed, 'gasLimit' | 'gasUsed'>
): string {
  const gasLimit = new BigNumber(message.gasLimit)
  const gasUsed = new BigNumber(message.gasUsed)
  return gasUsed.dividedBy(gasLimit).times(100).toFixed(1) + '%'
}

export function formatNumber(input: string | number | BigNumber): string {
  const bigNr = input instanceof BigNumber ? input : new BigNumber(input)
  return bigNr.toFormat()
}
