import { BigNumber, FilecoinNumber } from '@glif/filecoin-number'

export const getMaxAffordableFee = (
  balance: FilecoinNumber,
  value: FilecoinNumber
): FilecoinNumber => {
  const balanceBigNr = new BigNumber(balance.toAttoFil())
  const valueBigNr = new BigNumber(value.toAttoFil())
  const maxAffordableFeeBigNr = BigNumber.maximum(
    balanceBigNr.minus(valueBigNr),
    0
  )
  return new FilecoinNumber(maxAffordableFeeBigNr.toString(), 'attofil')
}
